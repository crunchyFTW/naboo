import { Fragment, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'

import { treeActions } from '../../store'
import { getNewTree } from '../../services/nabooApp'


const FolderBuilder = ({ node, depth = 2 }) => {
  const [openNodes, setOpenNodes] = useState({});

  const dispatch = useDispatch()
  const treeParents = useSelector(state => state.treeParents)
  const treeEdges = useSelector(state => state.edges)

  const toggleNodeHandler = (nodeId) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [nodeId]: !prevOpenNodes[nodeId],
    }))
  };

  const updateTreeHandler = async (nodeId) => {
    toggleNodeHandler(nodeId)

    var newParentIdList = [...treeParents]
    if (newParentIdList.includes(nodeId)) {
      let filterParents = [...treeEdges[String(nodeId)]] || []
      filterParents.push(nodeId)
      newParentIdList = newParentIdList.filter(node_id => !filterParents.includes(node_id));
      // newParentIdList = newParentIdList.filter(node_id => node_id !== nodeId);
    } else {
      newParentIdList.push(nodeId)
    }

    try {
      const resp = await getNewTree(newParentIdList)
      dispatch(treeActions.UPDATE_PARENT_ID_LIST(newParentIdList))
      let newTree = resp.data.tree
      dispatch(treeActions.GET_PART_TREE(newTree))
    } catch (error) {
      console.error(error);
    }

    // axios.post('http://localhost:5555/naboo_get_by_id', body)
    //   .then(response => {
    //     let newTree = response.data.tree
    //     // dispatch(treeActions.(nodeId))
    //     dispatch(treeActions.GET_TREE(newTree))
    //   })
    //   .catch(error => {
    //     console.error('Error fetching folder tree:', error);
    //   });
  }

  const isNodeParent = (nodeId) => {
    const keyExists = treeEdges.hasOwnProperty(nodeId);
    return keyExists
    // const obj = { a: 1, b: 2, c: 3 };

    // Object.keys(treeEdges).forEach(parentId => {
    //   console.log(key); // Outputs: a, b, c
    // });
  }

  const renderNode = (node) => (
    <Fragment key={node.node_id}>
      {/* <ListItemButton onClick={() => toggleNodeHandler(node.node_id)} sx={{ pl: depth }}> */}
      <ListItemButton onClick={() => updateTreeHandler(node.node_id)} sx={{ pl: depth }}>
        <ListItemText primary={node.node_name} />
        {isNodeParent(node.node_id) && (openNodes[node.node_id] ? <ExpandLess /> : <ExpandMore />)}

        {/* {node.node_children.length > 0 && (openNodes[node.node_id] ? <ExpandLess /> : <ExpandMore />)} */}
      </ListItemButton>
      <Collapse in={openNodes[node.node_id]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {node.node_children.map((child) => (<FolderBuilder node={child} depth={depth + 2} />))}
        </List>
      </Collapse>
    </Fragment>
  );

  return renderNode(node);
};


export default FolderBuilder;

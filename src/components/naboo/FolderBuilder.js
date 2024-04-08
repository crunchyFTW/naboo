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
  const edges = useSelector(state => state.edges)

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
      let filterParents = edges[String(nodeId)] ? [...edges[String(nodeId)]] : []
      filterParents.push(nodeId)
      newParentIdList = newParentIdList.filter(node_id => !filterParents.includes(node_id));
    } else {
      newParentIdList.push(nodeId)
    }

    try {
      const resp = await getNewTree(newParentIdList)
      dispatch(treeActions.UPDATE_PARENT_ID_LIST(newParentIdList))
      dispatch(treeActions.GET_PART_TREE(resp.data.tree))
    } catch (error) {
      console.error(error);
    }
  }

  const isNodeParent = (nodeId) => {
    return edges.hasOwnProperty(nodeId);
  }

  const renderNode = (node) => (
    <Fragment key={node.node_id}>
      <ListItemButton onClick={() => updateTreeHandler(node.node_id)} sx={{ pl: depth }}>
        <ListItemText primary={node.node_name} />
        {isNodeParent(node.node_id) && (openNodes[node.node_id] ? <ExpandLess /> : <ExpandMore />)}
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

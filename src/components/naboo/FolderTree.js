import List from '@mui/material/List';
import { useSelector } from 'react-redux'

import FolderBuilder from './FolderBuilder';

const FolderTree = () => {

  const tree = useSelector(state => state.tree)

  return <div>
    <h2>Folder Tree</h2>
    <List component="nav">
      {Object.keys(tree).length > 0  && <FolderBuilder node={tree} ></FolderBuilder>}
    </List>
  </div>
};

export default FolderTree;

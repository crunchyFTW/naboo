import List from '@mui/material/List';
import { useSelector } from 'react-redux'

import FolderBuilder from './FolderBuilder';

const FolderTree = () => {

  const tree = useSelector(state => state.tree)


  return <div>
    <h2>Folder Tree</h2>
    <List component="nav">
      {tree && <FolderBuilder node={tree} ></FolderBuilder>}
    </List>
  </div>
};

export default FolderTree;

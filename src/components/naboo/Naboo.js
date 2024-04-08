import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

import FolderTree from './FolderTree';
import { treeActions } from '../../store'


const Naboo = () => {
    const treeParents = useSelector(state => state.treeParents)

    const dispatch = useDispatch()


    // get only the root node and his children
    useEffect(() => {
        // set edges
        axios.get('http://localhost:5555/get_edges')
            .then(response => {
                dispatch(treeActions.GET_EDGES(response.data))
            })
            .catch(error => {
                console.error('Error fetching folder tree:', error);
            });

        // set basics
        const body = {
            parent_id_list: treeParents
        };
        axios.post('http://localhost:5555/naboo_get_by_id', body)
            .then(response => {
                dispatch(treeActions.GET_PART_TREE(response.data.tree))
            })
            .catch(error => {
                console.error('Error fetching folder tree:', error);
            });
    }, []);


    return (
        <Fragment>
            <FolderTree></FolderTree>
        </Fragment>
    )
};

export default Naboo;
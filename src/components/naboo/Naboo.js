import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

import FolderTree from './FolderTree';
import { treeActions } from '../../store'


const Naboo = () => {
    const tree = useSelector(state => state.tree)
    const treeParents = useSelector(state => state.treeParents)
    const edges = useSelector(state => state.edges)

    const dispatch = useDispatch()


    useEffect(() => {
        axios.get('http://localhost:5555/tree_get_all')
            .then(response => {
                dispatch(treeActions.GET_EDGES(response.data.edges))
            })
            .catch(error => {
                console.error('Error fetching folder tree:', error);
            });
    }, []);

    // get only the root node and his children
    // useEffect(() => {
    //     const body = {
    //         parent_id_list: parentIdList
    //     };
    //     axios.post('http://localhost:5555/naboo_get_by_id', body)
    //         .then(response => {
    //             let newTree = response.data.tree
    //             dispatch(updateTree(newTree))
    //         })
    //         .catch(error => {
    //             console.error('Error fetching folder tree:', error);
    //         });
    // }, []);



    const handleGetMoreData = () => {
        // get all

        // axios.get('http://localhost:5555/tree_get_all')
        //     .then(response => {
        //         let newTree = response.data.tree
        //         dispatch(treeActions.GET_TREE(newTree))
        //     })
        //     .catch(error => {
        //         console.error('Error fetching folder tree:', error);
        //     });

        // get part

        const body = {
            parent_id_list: treeParents
        }
        axios.post('http://localhost:5555/naboo_get_by_id', body)
            .then(response => {
                let newTree = response.data.tree
                dispatch(treeActions.GET_PART_TREE(newTree))
            })
            .catch(error => {
                console.error('Error fetching folder tree:', error);
            });
    }

    const stm = () => {
        dispatch(treeActions.removeData())
    }

    return (
        <Fragment>
            {/* <pre>{JSON.stringify(tree, null, 2)}</pre> */}
            <button onClick={handleGetMoreData}>get more data</button>
            <button onClick={stm}>re move data</button>

            <FolderTree></FolderTree>
            <br></br>
            Naboo tree: {tree && <pre>{JSON.stringify(tree, null, 2)}</pre>}
            <br></br>
            Naboo tree parents: {treeParents && <pre>{JSON.stringify(treeParents, null, 2)}</pre>}
            <br></br>
            Naboo edges: {edges && <pre>{JSON.stringify(edges, null, 2)}</pre>}
        </Fragment>
    )
};

export default Naboo;
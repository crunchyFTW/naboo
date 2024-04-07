import { createSlice, configureStore, current } from '@reduxjs/toolkit'

import { GET_PART_TREE, UPDATE_PARENT_ID_LIST, GET_TREE, GET_EDGES } from './actionTypes'
import { treeDumy } from './dataDumy'



const deleteMeChangeInitialData = treeDumy
// deleteMeChangeInitialData.tree = {
//     "node_id": 1,
//     "node_name": "house",
//     "node_children": []
// }

const treeSlice = createSlice({
    name: "tree",
    initialState: deleteMeChangeInitialData,
    reducers: {
        [GET_TREE](state, action) {
            const prevState = current(state)
            state.tree = action.payload
        },
        [GET_PART_TREE](state, action) {
            const prevState = current(state)
            state.tree = action.payload
        },
        [UPDATE_PARENT_ID_LIST](state, action) {
            const prevState = current(state)
            state.treeParents = action.payload
        },

        [GET_EDGES](state, action) {
            const prevState = current(state)
            state.edges = action.payload
        },
        removeData(state) {
            state.tree = null
        }
    }
})

// const nabooReducer = (state = { parentIdList: [], tree: treeDumy }, action) => {
//     switch (action.type) {
//         case UPDATE_TREE:
//             const newState = { ...state, tree: action.newTree }
//             return newState
//         case UPDATE_PARENT_ID_LIST:

//             let newParentIdList = [...state.parentIdList]
//             if (newParentIdList.includes(action.newParentId)) {
//                 newParentIdList = newParentIdList.filter(nodeId => nodeId !== action.newParentId);
//             } else {
//                 newParentIdList.push(action.newParentId)
//             }
//             return { ...state, ...newParentIdList }
//         default:
//             return state
//     }
// }

const store = configureStore({
    reducer: treeSlice.reducer
})

export const treeActions = treeSlice.actions

export default store
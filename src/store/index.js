import { createSlice, configureStore } from '@reduxjs/toolkit'

import { nabooInitialState } from './dataDumy'


const treeSlice = createSlice({
    name: "tree",
    initialState: nabooInitialState,
    reducers: {
        GET_PART_TREE(state, action) {
            state.tree = action.payload
        },
        UPDATE_PARENT_ID_LIST(state, action) {
            state.treeParents = action.payload
        },
        GET_EDGES(state, action) {
            state.edges = action.payload
        }
    }
})


const store = configureStore({
    reducer: treeSlice.reducer
})

export const treeActions = treeSlice.actions

export default store
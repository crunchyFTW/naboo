import axios from 'axios';


export const getNewTree = async (newParentsList) => {
    const body = { parent_id_list: newParentsList }
    return axios.post('http://localhost:5555/naboo_get_by_id', body)
}

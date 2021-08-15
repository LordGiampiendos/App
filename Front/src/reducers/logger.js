const reducerL = (state = false, action) => {
    switch(action.type) {
        case 'log':
            return true
        case 'unlog':
            return false
        default:
            return state    
    }
}

export default reducerL;
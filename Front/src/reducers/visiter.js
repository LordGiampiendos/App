const reducerF = (state = false, action) => {
    switch(action.type) {
        case 'vis':
            return !state
        default:
            return state    
    }
}

export default reducerF;
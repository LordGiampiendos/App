const reducerF1 = (state = false, action) => {
    switch(action.type) {
        case 'vis1':
            return !state
        default:
            return state    
    }
}

export default reducerF1;
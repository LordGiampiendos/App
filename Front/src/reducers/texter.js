const reducerT = (state = false, action) => {
    switch(action.type) {
        case 'text':
            return true
        case 'untext':
            return false    
        default:
            return state    
    }
}

export default reducerT;
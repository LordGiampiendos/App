const reducerA = (state = false, action) => {
    switch(action.type) {
        case 'admin':
            return true
        case 'unadmin':
            return false
        default:
            return state    
    }
}

export default reducerA;
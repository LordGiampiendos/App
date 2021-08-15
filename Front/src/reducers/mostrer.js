const reducerM = (state = false, action) => {
    switch(action.type) {
        case 'mostra':
            return !state
        default:
            return state    
    }
}

export default reducerM;
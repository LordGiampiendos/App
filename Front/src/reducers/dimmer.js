const reducerDim = (state = false, action) => {
    switch(action.type) {
        case 'dim':
            return !state
        case 'undim':
            return false
        default:
            return state    
    }
}

export default reducerDim;
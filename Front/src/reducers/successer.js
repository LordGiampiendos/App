const reducerS = (state = false, action) => {
    switch(action.type) {
        case 'successo':
            return !state;
        default: 
            return state;
    }
}

export default reducerS;
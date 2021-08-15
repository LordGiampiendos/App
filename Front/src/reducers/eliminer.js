function reducerE(state = '', action) {
    switch(action.type) {
        case 'elimina':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerE;
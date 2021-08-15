function reducerP(state = '', action) {
    switch(action.type) {
        case 'insertP':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerP;
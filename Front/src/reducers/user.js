function reducerU(state = '', action) {
    switch(action.type) {
        case 'insertU':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerU;
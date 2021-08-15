function reducerC(state = '', action) {
    switch(action.type) {
        case 'insertC':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerC;
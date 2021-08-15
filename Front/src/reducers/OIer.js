function reducerOI(state = '', action) {
    switch(action.type) {
        case 'insertOI':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerOI;
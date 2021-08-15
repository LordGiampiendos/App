function reducerDI(state = '', action) {
    switch(action.type) {
        case 'insertDI':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerDI;
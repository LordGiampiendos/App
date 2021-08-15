function reducerSC(state = '', action) {
    switch(action.type) {
        case 'scelta':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerSC;
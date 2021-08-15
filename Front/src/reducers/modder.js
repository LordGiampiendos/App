function reducerMOD(state = '', action) {
    switch(action.type) {
        case 'mod':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerMOD;
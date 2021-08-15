function reducerOB(state = '', action) {
    switch(action.type) {
        case 'insertOB':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerOB;
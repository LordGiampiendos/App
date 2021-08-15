function reducerOB2(state = '', action) {
    switch(action.type) {
        case 'insertOB2':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerOB2;
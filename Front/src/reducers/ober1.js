function reducerOB1(state = '', action) {
    switch(action.type) {
        case 'insertOB1':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerOB1;
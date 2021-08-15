function reducerOB3(state = '', action) {
    switch(action.type) {
        case 'insertOB3':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerOB3;
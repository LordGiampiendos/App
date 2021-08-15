function reducerDT2(state = '', action) {
    switch(action.type) {
        case 'insertDT2':
            return !state;
        default: 
            return state;
    }
}

export default reducerDT2;
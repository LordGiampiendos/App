function reducerDT1(state = '', action) {
    switch(action.type) {
        case 'insertDT1':
            return !state;
        default: 
            return state;
    }
}

export default reducerDT1;
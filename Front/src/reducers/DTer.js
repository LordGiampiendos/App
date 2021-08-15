function reducerDT(state = '', action) {
    switch(action.type) {
        case 'insertDT':
            return !state;
        default: 
            return state;
    }
}

export default reducerDT;
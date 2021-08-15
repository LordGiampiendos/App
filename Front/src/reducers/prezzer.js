function reducerPr(state = '', action) {
    switch(action.type) {
        case 'prezzo':
            state = action.payload;
            return state;
        default: 
            return state;
    }
}

export default reducerPr;
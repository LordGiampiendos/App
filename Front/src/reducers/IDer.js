function reducerID(state = '', action) {
    switch(action.type) {
        case 'insertID':
            state = action.payload;
            return state;     
        default:
            return state;        
    }
}

export default reducerID;
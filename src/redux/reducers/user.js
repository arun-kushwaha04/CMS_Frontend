const intitialState = {};

const user = (state = intitialState,action)=>{
    switch (action.type) {
        case 'UPDATE_USER':return action.payload;
        default:
            return state;
    }
}
export default user;
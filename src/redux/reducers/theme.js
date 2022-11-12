const intitialState = {};

const enrolledClassrooms = (state = intitialState,action)=>{
    switch (action.type) {
        case 'UPDATE_THEMES':return action.payload;
        case "REMOVE_CLASSROOM_THEME":{
            delete state[action.payload];
            return state;
        }
        default:
            return state;
    }
}
export default enrolledClassrooms;
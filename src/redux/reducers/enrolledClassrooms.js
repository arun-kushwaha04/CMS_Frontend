const intitialState = [];

const enrolledClassrooms = (state = intitialState, action) => {
    switch (action.type) {
        case "UPDATE_CLASSROOMS":
            return action.payload;
        case "PUSH_CLASSROOM":
            return [...state, action.payload];
        case "REMOVE_FROM_CLASSROOM":{
            const newState = state.filter(item=>item._id!==action.payload)
            return newState;
        }
        default:
            return state;
    }
};
export default enrolledClassrooms;

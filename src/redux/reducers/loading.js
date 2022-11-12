const intitialState = true;

const loading = (state = intitialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return true;
        case "UNSET_LOADING":
            return false;
        default:
            return state;
    }
};
export default loading;

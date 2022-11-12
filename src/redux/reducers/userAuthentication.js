const intitialState = false;

const userAuthentication = (state = intitialState, action) => {
    switch (action.type) {
        case "SET_USER_AUTHENTICATION":
            return true;
        case "UNSET_USER_AUTHENTICATION":
            return false;
        default:
            return state;
    }
};
export default userAuthentication;

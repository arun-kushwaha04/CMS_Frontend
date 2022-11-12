export const updateClassrooms = (payload) => {
    return { type: "UPDATE_CLASSROOMS", payload: payload };
};
export const pushClassroom = (payload) => {
    return { type: "PUSH_CLASSROOM", payload: payload };
};
export const removeFromClassroom = (payload) => {
    return { type: "REMOVE_FROM_CLASSROOM", payload: payload };
};

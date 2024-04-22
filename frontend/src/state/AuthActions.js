export const loginStart = () => ({
    type: "LOGIN_START"
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginError = (error) => ({
    type: "LOGIN_ERROR",
    payload: error
});
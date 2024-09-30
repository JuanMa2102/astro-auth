import { login, loginWithGoogle, logout, registerUser } from "./auth";

export const server = {
    registerUser,
    logout,
    login,
    loginWithGoogle
}
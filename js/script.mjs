import { checkLoginStatus, loginContainerEvent, loginFormEvent, loginContainerClose, logout } from './LoginCheckerTest.mjs';

export const api = "http://localhost:8080/api/v1";
export const loginContainer = document.getElementById("login-container");
export const loginBtn = document.getElementById("login-btn");
export const loginForm = document.getElementById("login-form");


loginContainerEvent();

loginFormEvent();
loginContainerClose();

checkLoginStatus();

logout();


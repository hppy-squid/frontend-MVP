import { checkLoginStatus, loginContainerEvent, loginFormEvent, loginContainerClose, logout } from './LoginCheckerTest.mjs';

//denna klass är till för att länka in universella modueler som delas av alla html.
export const api = "http://localhost:8080/api/v1";
export const loginContainer = document.getElementById("login-container");
export const loginBtn = document.getElementById("login-btn");
export const loginForm = document.getElementById("login-form");

//säkerställer att funktinerna kör EFTER att DOM är laddad korrekt.
document.addEventListener('DOMContentLoaded', function() {
  
//funktioner från LoginCheckerTest
loginContainerEvent();
loginFormEvent();
loginContainerClose();
checkLoginStatus();
logout();

});
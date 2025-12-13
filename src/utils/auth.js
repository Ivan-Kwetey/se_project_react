import { BASE_URL } from "./constants.js";
import { checkResponse } from "./api.js";

// POST /signup
export function register({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

// POST /signin
export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// GET /users/me
export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
  }).then(checkResponse);
}

// PATCH /users/me
export function updateProfile({ name, avatar }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export default {
  register,
  login,
  checkToken,
  updateProfile,
};

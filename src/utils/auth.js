import { checkResponse } from "./api.js"; // shared helper

const BASE = process.env.NODE_ENV === "production"
  ? "https://api.seasonwear.mine.bz" // production backend
  : "http://localhost:3001"; // local dev backend

export async function register({ name, avatar, email, password }) {
  return fetch(`${BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export async function login({ email, password }) {
  return fetch(`${BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export async function checkToken(token) {
  return fetch(`${BASE}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export async function updateProfile({ name, avatar }, token) {
  return fetch(`${BASE}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export default { register, login, checkToken, updateProfile };

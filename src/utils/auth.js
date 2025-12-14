<<<<<<< HEAD
import { checkResponse } from "./api.js"; // shared helper

const BASE = process.env.NODE_ENV === "production"
  ? "https://api.seasonwear.mine.bz" // production backend
  : "http://localhost:3001"; // local dev backend

export async function register({ name, avatar, email, password }) {
  return fetch(`${BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
=======
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
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

<<<<<<< HEAD
export async function login({ email, password }) {
  return fetch(`${BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
=======
// POST /signin
export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

<<<<<<< HEAD
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
=======
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
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

<<<<<<< HEAD
export default { register, login, checkToken, updateProfile };
=======
export default {
  register,
  login,
  checkToken,
  updateProfile,
};
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9

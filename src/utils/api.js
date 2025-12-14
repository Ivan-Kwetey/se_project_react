<<<<<<< HEAD
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api.seasonwear.mine.bz/items"
  : "http://localhost:3001/items";

// rest of your functions remain unchanged


// Reusable response checker
export function checkResponse(res, message = "Error") {
  if (!res.ok) throw new Error(message);
  return res.json();
}
// Normalize item data structure
=======
import { BASE_URL } from "./constants.js";

// Reusable response checker
export function checkResponse(res, message = "Error") {
  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text || message);
    });
  }
  return res.json();
}

// Normalize item data
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9
function normalizeItem(item) {
  return {
    id: item._id,
    name: item.name,
    weather: item.weather,
    imageUrl: item.imageUrl,
    likes: item.likes || [],
    owner: item.owner,
    createdAt: item.createdAt,
  };
}

<<<<<<< HEAD
export async function getItems() {
  const res = await fetch(BASE_URL);
  const json = await checkResponse(res, "Failed to fetch items");
  return (json.data || []).map(normalizeItem);
}
// PUT /items/:id/likes
export async function addCardLike(id, token) {
  const res = await fetch(`${BASE_URL}/${id}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  });
  return checkResponse(res, "Failed to like item");
}

// DELETE /items/:id/likes
export async function removeCardLike(id, token) {
  const res = await fetch(`${BASE_URL}/${id}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });
  return checkResponse(res, "Failed to remove like");
}

export async function addItem(item) {
  // item, optional token
  const { token } = item || {};
  const payload = { ...item };
  delete payload.token;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
=======
// GET /items
export async function getItems() {
  const res = await fetch(`${BASE_URL}/items`, {
    credentials: "include",
  });

  const json = await checkResponse(res, "Failed to fetch items");
  return (json.data || []).map(normalizeItem);
}

// POST /items
export async function addItem(item) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(item),
  });

>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9
  const json = await checkResponse(res, "Failed to add item");
  return normalizeItem(json.data);
}

<<<<<<< HEAD
export async function deleteItem(id) {
  // second optional arg token
  let token;
  if (typeof id === "object") {
    token = id.token;
    id = id.id;
  }
  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  return checkResponse(res, "Failed to delete item");
}
=======
// DELETE /items/:id
export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return checkResponse(res, "Failed to delete item");
}

// PUT /items/:id/likes
export async function addCardLike(id) {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    credentials: "include",
  });

  return checkResponse(res, "Failed to like item");
}

// DELETE /items/:id/likes
export async function removeCardLike(id) {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    credentials: "include",
  });

  return checkResponse(res, "Failed to remove like");
}
>>>>>>> a050306698dc50dbe9c21e5eb055dfd95aa169d9

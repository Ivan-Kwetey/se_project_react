const BASE_URL = "http://localhost:3001/items";

// Reusable response checker
function checkResponse(res, message = "Error") {
  if (!res.ok) throw new Error(message);
  return res.json();
}

// Helper to normalize backend item to frontend shape
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

// GET all clothing items (returns an array of normalized items)
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


// POST add a new clothing item (returns the created normalized item)
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
  const json = await checkResponse(res, "Failed to add item");
  return normalizeItem(json.data);
}

// DELETE a clothing item by id (returns backend response object)
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

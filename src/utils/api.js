const BASE_URL = "http://localhost:3001/items";

// Reusable response checker
function checkResponse(res, message = "Error") {
  if (!res.ok) throw new Error(message);
  return res.json();
}

// GET all clothing items
export async function getItems() {
  const res = await fetch(BASE_URL);
  return checkResponse(res, "Failed to fetch items");
}

// POST add a new clothing item
export async function addItem(item) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return checkResponse(res, "Failed to add item");
}

// DELETE a clothing item by id
export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return checkResponse(res, "Failed to delete item");
}

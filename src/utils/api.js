const BASE_URL = "http://localhost:3001/items";

// GET all clothing items
export async function getItems() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
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
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

// DELETE a clothing item by id
export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}

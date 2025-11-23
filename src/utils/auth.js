const BASE = "http://localhost:3001";

export async function register({ name, avatar, email, password }) {
  const res = await fetch(`${BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function checkToken(token) {
  const res = await fetch(`${BASE}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Token invalid");
  return res.json();
}

export async function updateProfile({ name, avatar }, token) {
  const res = await fetch(`${BASE}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  if (!res.ok) throw new Error("Profile update failed");
  return res.json();
}



export default { register, login, checkToken, updateProfile };

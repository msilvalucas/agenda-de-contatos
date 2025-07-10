const API_URL = "https://agenda-de-contatos-backend.onrender.com";

export const getContatos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getContato = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createContato = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateContato = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteContato = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

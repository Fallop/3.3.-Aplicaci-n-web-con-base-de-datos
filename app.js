const API_URL = "https://63abc123.mockapi.io/api/v1/usuarios"; // Coloca tu URL real

const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('user-list');

async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  displayUsers(users);
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.name} (${user.email})
      <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
      <button onclick="deleteUser(${user.id})">Eliminar</button>
    `;
    userList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newUser = {
    name: nameInput.value,
    email: emailInput.value
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  nameInput.value = '';
  emailInput.value = '';
  fetchUsers();
});

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

async function editUser(id, oldName, oldEmail) {
  const name = prompt("Nuevo nombre:", oldName);
  const email = prompt("Nuevo correo:", oldEmail);
  if (name && email) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    fetchUsers();
  }
}

fetchUsers();

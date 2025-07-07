const API_URL = "/usuarios";  // La API está en el mismo dominio

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
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };
  if (!newUser.name || !newUser.email) return alert("Completa ambos campos");

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

async function editUser(id, currentName, currentEmail) {
  const name = prompt("Nuevo nombre:", currentName);
  const email = prompt("Nuevo correo:", currentEmail);

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

"use strict";

const fetchUsers = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/users")).json();

const deleteUser = async userId => {
  await fetch(`http://localhost:3000/api/v1/user/users/${userId}`, {
    method: "delete"
  });
  renderUsers();
};

const renderUsers = async () => {
  const users = await fetchUsers();
  console.log(users);
  const dbContent = document.getElementsByClassName("dashboard-content")[0];
  dbContent.innerHTML = "";
  users.forEach(user => {
    const itemEl = document.createElement("li");
    itemEl.className = "dashboard-user-item";
    const avatar = document.createElement("img");
    avatar.src = user.photo_url_thumb;
    const username = document.createElement("span");
    username.className = "dashboard-username";
    username.innerText = `${user.firstname} ${user.lastname}`;
    const delBtn = document.createElement("i");
    delBtn.className = "fas fa-times user-del-btn";

    itemEl.appendChild(avatar);
    itemEl.appendChild(username);
    itemEl.appendChild(delBtn);
    dbContent.appendChild(itemEl);

    delBtn.addEventListener("click", e => deleteUser(user.uId));
  });
};

const main = async () => {
  await renderUsers();
};

window.addEventListener("load", main);

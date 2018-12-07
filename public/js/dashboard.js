"use strict";

const fetchUsers = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/users")).json();

const deleteUser = async userId => {
  await fetch(`http://localhost:3000/api/v1/user/users/${userId}`, {
    method: "delete"
  });
  renderUsers();
};

const fetchUser = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/current")).json();

const showDetails = async userId => {
  console.log("show details todo");
};

const renderUsers = async () => {
  const users = await fetchUsers();
  const currentUser = await fetchUser();
  console.log(users);
  const dbContent = document.getElementsByClassName("dashboard-content")[0];
  dbContent.innerHTML = "";
  users.forEach(user => {
    const showAllBtn = document.createElement("i");
    showAllBtn.className = "fas fa-clipboard";
    const itemEl = document.createElement("li");
    itemEl.className = "dashboard-user-item";
    const avatarLink = document.createElement("a");
    avatarLink.href = `/profile/${user.uId}`;
    const avatar = document.createElement("img");
    avatar.src = user.photo_url_thumb;
    avatarLink.appendChild(avatar);
    const username = document.createElement("span");
    username.className = "dashboard-username";
    username.innerText = `${user.firstname} ${user.lastname}`;
    const delBtn = document.createElement("i");
    delBtn.className = "fas fa-times user-del-btn";

    itemEl.appendChild(avatarLink);
    itemEl.appendChild(username);

    if (currentUser.uId !== user.uId) {
      itemEl.appendChild(delBtn);
      itemEl.appendChild(showAllBtn);
    }

    dbContent.appendChild(itemEl);
    delBtn.addEventListener("click", e => deleteUser(user.uId));
    showAllBtn.addEventListener("click", e => showDetails(user.uId));
  });
};

const main = async () => {
  await renderUsers();
};

window.addEventListener("load", main);

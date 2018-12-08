"use strict";

const fetchUsers = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/users")).json();

const fetchUserComments = async userId =>
  await (await fetch(
    `http://localhost:3000/api/v1/comments/user/${userId}`
  )).json();

const fetchUserEvents = async userId =>
  await (await fetch(
    `http://localhost:3000/api/v1/event/user/${userId}`
  )).json();

const deleteUser = async userId => {
  await fetch(`http://localhost:3000/api/v1/user/users/${userId}`, {
    method: "delete"
  });
  renderUsers();
};

const changeRole = async (userId, isAdmin) => {
  let body;
  console.log(isAdmin);
  if (isAdmin) {
     body = JSON.stringify({
      isAdmin: 0
    })
  } else {
     body = JSON.stringify({
      isAdmin: 1
    })
  }
  

  console.log(body);


  await fetch(`http://localhost:3000/api/v1/user/users/${userId}`, {
    method: 'post',
     headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: body
  })
  renderUsers()
}

const fetchUser = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/current")).json();

const renderUserEvents = events => {
  const eventList = document.getElementsByClassName("dashboard-event-list")[0];
  eventList.innerHTML = "";
  events.forEach(event => {
    const eventLink = document.createElement("a");
    eventLink.className = "dashboard-event-link";
    eventLink.href = `/event/${event.eId}`;
    const eventItem = document.createElement("li");
    eventItem.className = "dashboard-eventitem";
    const eventCover = document.createElement("img");
    eventCover.className = "dashboard-event-cover";
    eventCover.src = event.photo_card_url;
    const eventTitle = document.createElement("span");
    eventTitle.className = "dashboard-event-title";
    eventTitle.innerHTML = event.title;
    const delEventBtn = document.createElement("i");
    delEventBtn.className = "fas fa-times event-del-btn";

    eventLink.appendChild(eventCover);
    eventLink.appendChild(eventTitle);
    eventItem.appendChild(eventLink);
    eventItem.appendChild(delEventBtn)
    eventList.appendChild(eventItem);
    
  });
};

const showDetails = async userId => {
  const events = await fetchUserEvents(userId);
  const comments = await fetchUserComments(userId);
  renderUserEvents(events);
  console.log(events);
  console.log(comments);
};

const renderUsers = async () => {
  const users = await fetchUsers();
  console.log(users);
  const currentUser = await fetchUser();
  console.log(users);
  const dbContent = document.getElementsByClassName("dashboard-list")[0];
  dbContent.innerHTML = "";
  users.forEach(user => {
    const showAllBtn = document.createElement("i");
    showAllBtn.className = "fas fa-arrow-right show-icon";
    const itemEl = document.createElement("li");
    itemEl.className = "dashboard-user-item";
    const avatarLink = document.createElement("a");
    avatarLink.href = `/profile/${user.uId}`;
    const avatar = document.createElement("img");
    avatar.src = user.photo_url_thumb;
    avatar.className = "dashboard-user-img rounded";
    avatarLink.appendChild(avatar);
    const username = document.createElement("span");
    username.className = "dashboard-username";
    username.innerText = `${user.firstname} ${user.lastname}`;
    const delBtn = document.createElement("i");
    delBtn.className = "fas fa-times user-del-btn";
    const userRole = document.createElement("span");
    userRole.className = "dashboard-user-role";
    // user.isAdmin ? (userRole.innerHTML = "Admin": )
    userRole.innerHTML = user.isAdmin ? "Admin" : "User";

    itemEl.appendChild(avatarLink);
    itemEl.appendChild(username);
    itemEl.appendChild(userRole);

    if (currentUser.uId !== user.uId) {
      itemEl.appendChild(delBtn);
      itemEl.appendChild(showAllBtn);
      userRole.addEventListener('click', e => changeRole(user.uId, user.isAdmin))
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

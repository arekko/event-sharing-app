'use strict';

const eventId = window.location.href.split("/").slice(-1)[0];

const fetchUser = async () => await (await fetch(
    'http://localhost:3000/api/v1/user/current')).json();

const fetchComments = async eventId =>
  await (await fetch(`/api/v1/comments?eventId=${eventId}`)).json();

const deleteComment = async e => {
  const commentId = e.target.attributes.name.value;
  console.log(commentId);

  await fetch(`http://localhost:3000/api/v1/comments/${commentId}`, {
    method: 'DELETE',
  })

    renderComments(eventId)
}

const commentTemplate = (comm, userId) => {

  // const delbtn = if (userId === comm.uId)

  return `
        <li class="comment-item">
            <div class="comm-img-container">
              <a href="/profile/${comm.uId}">
                <img src=${comm.photo_url_thumb} alt=${ comm.text } class="comment-img rounded" />
                </a>
            </div>
            <div class="comm-body">
                <span class="comm-username">${comm.firstname} ${ comm.lastname }</span>
                <span class="comm-date">${comm.date}</span>
                ${userId === comm.uId ? `<i class="fas fa-times del-icon" name="${comm.cId}"></i>` : ''}
                
                <p class="comm-text">${comm.text}</p>
            </div>
        </li>
    `;
};

const renderComments = async eventId => {
  let user;
  try {

  const user = await fetchUser()
  } catch(e) {
    console.log(e);
  }
  let userId;
  if (user) {
    userId = user.uId;
  }
  const listContainer = document.getElementById("list-container");
  const comments = await fetchComments(eventId);
  let html = "";
  console.log(comments);
  if (comments.message !== null) {

    comments.message.forEach(comm => {
      const commEl = commentTemplate(comm, userId);
      html = " " + commEl + html;

      // listContainer.innerHTML = commEl;
    });
    listContainer.innerHTML = html;
    const deleteBtn = document.querySelectorAll('.del-icon');
    deleteBtn.forEach(el => el.addEventListener('click', (e) => deleteComment(e)))
  } else {

    const noComm = document.createElement('p');
    noComm.className = "no-comm"
    noComm.innerHTML = "No comments yet ..."
    listContainer.appendChild(noComm) 
    // listContainer.innerHTML = 'No comments yet ...';
  }
  
};

// Post the comment
const postComment = async (e, eventId) => {
  e.preventDefault();

  const commentInput = document.getElementById("comment-input");

  let jsonFormData = JSON.stringify({
    text: commentInput.value,
    event_id: eventId
  });

  const response = await fetch("/api/v1/comments", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: jsonFormData
  });
  const res = await response.json();
  commentInput.value = "";
  renderComments(eventId);
};

// const loadComment = async eventId => {
//   return await fetch("/api/v1/comments");
// };

const main = async () => {
  // const eventId = window.location.href.split("/").slice(-1)[0];

  //   const comments = await fetchComments(eventId);
  //   console.log(comments);

  const postBtn = document.getElementsByClassName("comment-btn")[0];
  console.log(postBtn);
  if (postBtn) {
    postBtn.addEventListener("click", e => postComment(e, eventId));
  }

  await renderComments(eventId);
};

window.addEventListener("load", main);

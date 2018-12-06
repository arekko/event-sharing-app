const fetchComments = async eventId =>
  await (await fetch(`/api/v1/comments?eventId=${eventId}`)).json();

const commentTemplate = comm => {
  return `
        <li class="comment-item">
            <div class="comm-img-container">
                <img src=${comm.photo_url_thumb} alt=${comm.text} class="comment-img rounded" />
            </div>
            <div class="comm-body">
                <span class="comm-username">${comm.firstname} ${
    comm.lastname
  }</span>
                <span class="comm-date">${comm.date}</span>
                <p class="comm-text">${comm.text}</p>
            </div>


        </li>
    `;
};

const renderComments = async eventId => {
  const listContainer = document.getElementById("list-container");
  const comments = await fetchComments(eventId);
  let html = "";
  comments.message.forEach(comm => {
    const commEl = commentTemplate(comm);
    html = " " + commEl + html;
    // listContainer.innerHTML = commEl;
  });
  listContainer.innerHTML = html;
};



// Post the comment
const postComment = async (e, eventId) => {
    console.log('hi');
  e.preventDefault();

  const commentInput = document.getElementById("comment-input");

  let jsonFormData = JSON.stringify({
    text: commentInput.value,
    event_id: eventId
  });
  console.log(jsonFormData);

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
  const eventId = window.location.href.split("/").slice(-1)[0];

  //   const comments = await fetchComments(eventId);
  //   console.log(comments);


  const postBtn = document.getElementsByClassName("comment-btn")[0];
  console.log(postBtn);
  postBtn.addEventListener("click", (e) => postComment(e, eventId));


  await renderComments(eventId);
};

window.addEventListener("load", main);






const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-submit-btn");
let username = document.getElementById('login-username');
let password = document.getElementById('login-password');

const sendLoginForm = async e => {
  e.preventDefault();
  username = username.value;
  password = password.value;

  let jsonFormData = JSON.stringify({
    username : username,
    password : password
  });

  const response = await fetch("/login", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: jsonFormData
  });
  console.log(response);

  if (response.status === 200) {
    window.location.href = response.url;
  }
};


loginBtn.addEventListener("click",  e => sendLoginForm(e) );

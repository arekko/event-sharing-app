




const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-submit-btn");
let username = document.getElementById('login-username');
let password = document.getElementById('login-password');
const loginError = document.getElementById('login-errors');
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

  if (response) {
    console.log(response);
    const data = await response.json();
    console.log(data.error);

    if (data.error) {
      const errorMsg = document.createElement("div");
      errorMsg.innerText = data.error.message;
      loginError.appendChild(errorMsg);
      console.log(username);
      username = "";
      console.log(username)

    } else {
      console.log('here');

      window.location.href = "http://localhost:3000/profile";
    }
  }



  // if (response.status === 200) {
  //   window.location.href = response.url;
  // }
};


loginBtn.addEventListener("click",  e => sendLoginForm(e) );

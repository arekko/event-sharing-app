console.log("work");

const registerBtn = document.querySelector(".register-submit-btn");

// make an event listener which calls upload function when the form is submitted
const registerForm = document.getElementById("register-form");
const input = document.querySelector('input[type="file');
const submit = document.querySelector('input[type="submit"]');

const registerErrors = document.getElementById("register-errors");

const upload = async e => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  // formData.append('avatar', input.files[0]);

  const setting = {
    method: "POST",
    body: formData
  };

  const response = await fetch("http://localhost:3000/registration", setting);
  const data = await response.json();
  console.log(data.error);

  if (data.message === "error") {
    const errorMsg = document.createElement("div");
    errorMsg.innerText = data.error;
    registerErrors.appendChild(errorMsg);
  } else {
    console.log("here we are");
    window.location.href = "http://localhost:3000/login";
  }
};

registerBtn.addEventListener("click", e => {
  upload(e);
});

// Login logic
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-submit-btn");
let username = document.getElementById('login-username')
let password = document.getElementById('login-password')

const sendLoginForm = async e => {
  e.preventDefault();
  username = username.value
  password = password.value

  console.log(username)
  const loginSettings = {
    method: "POST",
    body: {
      username,
      password
    }
  };

  const response = await fetch("/login", loginSettings);
  console.log(response);
};


loginBtn.addEventListener("click",  sendLoginForm );


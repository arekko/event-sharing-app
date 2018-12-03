const HOST = "http://localhost:3000";

const headerTemplateForAll = () => ` <header class="header">
        <div class="header-container">

            <span class="header-logo"><i class="fas fa-calendar-alt fa-logo"></i>evoo</span>
            <ul class="header-auth-btns">
                <li ><a href="/login" class="header-auth-btn btn--inline" id="loginBtn">Login</a></li>
                <li ><a href="/registration" class="header-auth-btn btn--green" id="signin-btn">Join free</a></li>
            </ul>
        </div>
      </header>
    `;

const headerTemplateForUser = user => ` <header class="header">
        <div class="header-container">

            <span class="header-logo"><i class="fas fa-calendar-alt fa-logo"></i>evoo</span>
            <ul class="header-auth-btns">
               <li><a href="${HOST}/profile/${
  user.uId
}"><img class="rounded avatar-img" src="${user.photo_url_thumb}" /></a></li>
               <li><a class="header-username" href="${HOST}/profile/${
  user.uId
}">${user.firstname} ${user.lastname}</a></li>
               <li ><a href="/logout" class="header-auth-btn btn--green" id="signin-btn">Logout</a></li>
            </ul>
        </div>
      </header>
    `;

const Header = user => {
  if (user) {
    return headerTemplateForUser(user);
  }
  return headerTemplateForAll();
};

const fetchUser = async () =>
  await (await fetch("http://localhost:3000/api/v1/user/current")).json();

let user;

const inputTemplate = (type, name, placeholder, id, value) => ` 
    <input type="${type}" name="${name}" placeholder="${placeholder}" id="${id}" />`;

const formTemplate = () => `
  <form >
    ${inputTemplate("text", "username", "Username", "login-username")}
    ${inputTemplate("text", "password", "Password", "login-password")}
    ${inputTemplate("submit", "btn", "Username", "login-submit-btn", "Login")}
  </form>
`;

const LoginView = async () => {
  try {
    user = await fetchUser();
  } catch (e) {
    console.error(new Error("Can not fetch user"));
  }
  return `
    ${Header(user)}
    <div class="login-container">
    <h3>Login</h3>
    ${formTemplate()}
    </div>
  
  `;
};

const mainLogin = async () => {
  console.log("hi");
  const root = document.getElementById("root");

  root.innerHTML = await LoginView();

  const loginForm = document.getElementById("login-form");
  const loginBtn = document.getElementById("login-submit-btn");
  let username = document.getElementById("login-username");
  let password = document.getElementById("login-password");
  const loginError = document.getElementById("login-errors");
  const sendLoginForm = async e => {
    e.preventDefault();
    username = username.value;
    password = password.value;

    let jsonFormData = JSON.stringify({
      username: username,
      password: password
    });
    console.log(jsonFormData);

    const response = await fetch("/api/v1/auth/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
        document.getElementById("login-username").value = "asdfasdfasdf";
      } else {
        console.log("here");

        window.location.href = "http://localhost:3000/";
      }
    }

    // if (response.status === 200) {
    //   window.location.href = response.url;
    // }
  };

  console.log(loginBtn);

  loginBtn.addEventListener("click", e => sendLoginForm(e));
};

window.addEventListener("load", mainLogin);

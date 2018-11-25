const headerTemplateForAll = ` <header class="header">
        <div class="header-container">

            <span class="header-logo"><i class="fas fa-calendar-alt fa-logo"></i>evoo</span>
            <ul class="header-auth-btns">
                <li ><a href="/login" class="header-auth-btn btn--inline" id="loginBtn">Login</a></li>
                <li ><a href="/registration" class="header-auth-btn btn--green" id="signin-btn">Join free</a></li>
            </ul>
        </div>
      </header>
    `;

const headerTemplateForUser = ` <header class="header">
        <div class="header-container">

            <span class="header-logo"><i class="fas fa-calendar-alt fa-logo"></i>evoo</span>
            <ul class="header-auth-btns">
               <li class="header-auth-btn btn--green" id="signin-btn">Logout</li>
            </ul>
        </div>
      </header>
    `;







const main = () => {
  const root = document.getElementById("root");

  const Header = () => {
    return headerTemplateForAll;
  };

  root.innerHTML = Header();
};

window.addEventListener("load", main);


const registerBtn = document.querySelector('.register-submit-btn');

// make an event listener which calls upload function when the form is submitted
const registerForm = document.getElementById('register-form');
const input = document.querySelector('input[type="file');
const submit = document.querySelector('input[type="submit"]');

const registerErrors = document.getElementById('register-errors');

const upload = async e => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  // formData.append('avatar', input.files[0]);

  const setting = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch('http://localhost:3000/api/v1/auth/registration', setting);
  const data = await response.json();
  console.log(data.error);

  if (data.message === 'error') {
    const errorMsg = document.createElement('div');
    errorMsg.innerText = data.error;
    registerErrors.appendChild(errorMsg);
  } else {
    console.log('here we are');
    window.location.href = 'http://localhost:3000/login';
  }
};

registerBtn.addEventListener('click', e => {
  upload(e);
});

// Main screen js

const loginBtn = document.getElementById("loginBtn");
const signinBtn = document.getElementById("signin-btn");

const showLoginModal = () => {};

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
loginBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it

window.addEventListener("click", event => {
  console.log(event.target);
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

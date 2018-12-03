
const HOST = 'http://localhost:3000';


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

const headerTemplateForUser = (user) => ` <header class="header">
        <div class="header-container">

            <span class="header-logo"><i class="fas fa-calendar-alt fa-logo"></i>evoo</span>
            <ul class="header-auth-btns">
               <li><a href="${HOST}/profile/${user.uId}"><img class="rounded avatar-img" src="${user.photo_url_thumb}" /></a></li>
               <li><a class="header-username" href="${HOST}/profile/${user.uId}">${user.firstname} ${user.lastname}</a></li>
               <li ><a href="/logout" class="header-auth-btn btn--green" id="signin-btn">Logout</a></li>
            </ul>
        </div>
      </header>
    `;


const Header = (user) => {
  if (user) {
    return headerTemplateForUser(user)
  }
  return headerTemplateForAll();
};


const fetchUser = async () => await (await fetch(
    'http://localhost:3000/api/v1/user/current')).json();

let user;

const renderView = async () => {
  try {
    user = await fetchUser();
  } catch (e) {
    console.error(new Error('Can not fetch user'))
  }

    this.render = `
      ${Header(user)}

    `



  const root = document.getElementById('root');

  root.innerHTML = this.render;
};

window.addEventListener('load', renderView);

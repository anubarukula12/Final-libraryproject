const baseUri = "http://localhost:3000/";
const user = "users/";
const adminlogin = "adminlogin";

const loginUser = async (uri, fields) => {
  try {
    const loginOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(uri, loginOptions);

    const user = await response.json();

    const token = response.headers.get("x-auth-token");
    return { error: null, value: user, token };
  } catch (error) {
    console.log("Error in loginUser", error.message);
    return { error: error.message, value: null };
  }
};

const email = document.querySelector('[name = "email"]');
const password = document.querySelector('[name = "password"]');
const loginForm = document.querySelector("#login-form");
const failureAlert = document.querySelector("#failure-alert");

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const {
      error: loginUserError,
      value: loggedInUser,
      token,
      role,
    } = await loginUser(baseUri.concat(user, adminlogin), {
      email: email.value,
      password: password.value,
    });
    if (loginUserError) {
      failureAlert.classList.remove("visually-hidden");
      return;
    } else {
      failureAlert.classList.add("visually-hidden");
    }
    if (loggedInUser.success) {
      failureAlert.classList.add("visually-hidden");
     localStorage.setItem("x-auth-token", token);
      window.location.href = "admin.html";
    } else {
      failureAlert.innerHTML = loggedInUser.message;
      failureAlert.classList.remove("visually-hidden");
    }
  } catch (error) {
    console.error("Error in user log in", error);
    alert("Error while logging");
  }
});

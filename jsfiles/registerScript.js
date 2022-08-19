const baseUri = "http://localhost:3000/";
const user = "users/";
const register = "register";
const registerUser = async (uri, fields) => {
  try {
    const registervalues = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(uri, registervalues);

    const userRegister = await response.json();
    //const token = response.headers.get('x-auth-token')

    return { error: null, value: userRegister };
  } catch (error) {
    console.log("Error in registerUser", error.message);
    return { error: error.message, value: null };
  }
};
const firstname = document.querySelector('[name="firstname"]');
const lastname = document.querySelector('[name="lastname"]');
const email = document.querySelector('[name = "email"]');
const password = document.querySelector('[name = "password"]');
const address = document.querySelector('[name = "address"]');
const mobileno = document.querySelector('[name = "mobileno"]');
const registerForm = document.querySelector("#register-form");
const failureAlert = document.querySelector("#failure-alert");
const successAlert = document.querySelector("#success-alert");
registerForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const { error: registerUserError, value: registerInUser } =
      await registerUser(baseUri.concat(user, register), {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        address: address.value,
        password: password.value,
        mobileno: mobileno.value,
      });
    if (registerUserError) {
      failureAlert.classList.remove("visually-hidden");
      return;
    } else {
      failureAlert.classList.add("visually-hidden");
    }
    if (registerInUser.success) {
      successAlert.classList.add("visually-hidden");
      if (email === "admin.gmail.com") {
        window.location.href = "adminlogin.html";
      } else {
        window.location.href = "studentlogin.html";
      }
    } else {
      successAlert.innerHTML = registerInUser.message;
      successAlert.classList.remove("visually-hidden");
    }
  } catch (error) {
    console.error("Error in register", error);
  }
});

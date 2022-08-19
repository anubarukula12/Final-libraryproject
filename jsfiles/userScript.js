const email = localStorage.getItem("useremail");
const getUserList = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/userprofile/${email.trimStart()}`
    );
    const user = await response.json();
    return { error: null, value: user };
  } catch (error) {
    console.log("Error in getuserlist", error.message);
    return { error: error.message, value: null };
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const { error: userListError, value: userList } = await getUserList();
  // document.getElementById.innerHTML = userList.firstName;
  root = document.getElementById("root");
  root.innerHTML =
    '<table class="table mt-4 table-fluid" id="myTable"><tr><td>Name</td><td>' +
    userList.firstname +
    "" +
    userList.lastname +
    "</td></tr><tr><td>Email</td><td>" +
    userList.email +
    "</td></tr><tr><td>Address</td><td>" +
    userList.address +
    "</td></tr><tr><td>MobileNumber</td><td>" +
    userList.mobileno +
    "</td></tr></table>";
});

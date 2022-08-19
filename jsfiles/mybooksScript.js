const email = localStorage.getItem("useremail");
const getbooksList = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/bookprofile/${email.trimStart()}`
    );
    const books = await response.json();
    return { error: null, value: books };
  } catch (error) {
    console.log("Error in getbooklist", error.message);
    return { error: error.message, value: null };
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const { error: userListError, value: issueList } = await getbooksList();
  myTable = document.getElementById("myTable");
  myTable.innerHTML =
    '<table id="myTable"><thead><tr><th>BOOKID</th><th>BookName</th><th>Genre</th><th>Author</th><th>Period(days)</th><th>issueDate</th></tr><thead><tr><td>' +
    issueList.bookid +
    "</td><td>" +
    issueList.bookname +
    "</td><td>" +
    issueList.genre +
    "</td><td>" +
    issueList.price +
    "</td><td>" +
    issueList.period +
    "</td><td>" +
    issueList.date +
    "</td></tr></table>";
});

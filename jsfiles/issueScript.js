const baseUri = "http://localhost:3000/";
const issue = "issue/";
const books = "books";
const insertBooks = async (uri, fields) => {
  try {
    const issuevalues = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(uri, issuevalues);

    const issueBooks = await response.json();
    //const token = response.headers.get('x-auth-token')
    return { error: null, value: issueBooks };
  } catch (error) {
    console.log("Error in registerIssue", error.message);
    return { error: error.message, value: null };
  }
};
const bookid = document.querySelector('[name="bookid"]');
const useremail = document.querySelector('[name="useremail"]');
const period = document.querySelector('[name="period"]');
const date = document.querySelector('[name = "date"]');
const bookForm = document.querySelector("#issue-form");
const failureAlert = document.querySelector("#failure-alert");
const successAlert = document.querySelector("#success-alert");
bookForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const { error: issueBookError, value: issueInBook } = await insertBooks(
      baseUri.concat(issue, books),
      {
        bookid: bookid.value,
        useremail: useremail.value,
        period: period.value,
        date: date.value,
      }
    );
    if (issueBookError) {
      failureAlert.classList.remove("visually-hidden");
      return;
    } else {
      failureAlert.classList.add("visually-hidden");
    }
    if (issueInBook.success) {
      alert("hi");
      successAlert.classList.add("visually-hidden");
      window.location.href = "/issue";
    } else {
      successAlert.innerHTML = registerInUser.message;
      successAlert.classList.remove("visually-hidden");
    }
  } catch (error) {
    console.error("Error in register", error);
  }
});

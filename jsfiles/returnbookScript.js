const baseUri = "http://localhost:3000/";
const returnb = "returnb/";
const issuedbooks = "issuedbooks";
const returnBooks = async (uri, fields) => {
  try {
    const returnvalues = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(uri, returnvalues);

    const returnBooks = await response.json();
    //const token = response.headers.get('x-auth-token')
    return { error: null, value: returnBooks };
  } catch (error) {
    console.log("Error in returnIssue", error.message);
    return { error: error.message, value: null };
  }
};

const useremail = document.querySelector('[name="useremail"]');
const bookid = document.querySelector('[name="bookid"]');
const date = document.querySelector('[name = "date"]');
const bookForm = document.querySelector("#return-form");
const failureAlert = document.querySelector("#failure-alert");
const successAlert = document.querySelector("#success-alert");
bookForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const { error: returnBookError, value: returnInBook } = await returnBooks(
      baseUri.concat(returnb, issuedbooks),
      {
        bookid: bookid.value,
        useremail: useremail.value,
        date: date.value,
      }
    );
    if (returnBookError) {
      failureAlert.classList.remove("visually-hidden");
      return;
    } else {
      failureAlert.classList.add("visually-hidden");
    }
    if (returnInBook.success) {
      alert("hi");
      successAlert.classList.add("visually-hidden");
      window.location.href = "/issue";
    } else {
      successAlert.innerHTML = returnInBook.message;
      successAlert.classList.remove("visually-hidden");
    }
  } catch (error) {
    console.error("Error in register", error);
  }
});

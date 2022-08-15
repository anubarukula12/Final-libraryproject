const baseUri = "http://localhost:3000/";
const books = "books/";
const details = "details";
const insertBooks = async (uri, fields) => {
  try {
    const bookvalues = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(fields),
    };
    const response = await fetch(uri, bookvalues);

    const bookRegister = await response.json();
    //const token = response.headers.get('x-auth-token')
    return { error: null, value: bookRegister };
  } catch (error) {
    console.log("Error in registerUser", error.message);
    return { error: error.message, value: null };
  }
};
const bookid = document.querySelector('[name="bookid"]');
const bookname = document.querySelector('[name="bookname"]');
const genre = document.querySelector('[name="genre"]');
const price = document.querySelector('[name = "price"]');
const bookForm = document.querySelector("#book-form");
const failureAlert = document.querySelector("#failure-alert");
const successAlert = document.querySelector("#success-alert");
bookForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const { error: registerBookError, value: registerInBook } =
      await insertBooks(baseUri.concat(books, details), {
        bookid: bookid.value,
        bookname: bookname.value,
        genre: genre.value,
        price: price.value,
      });
    if (registerBookError) {
      failureAlert.classList.remove("visually-hidden");
      return;
    } else {
      failureAlert.classList.add("visually-hidden");
    }
    if (registerInBook.success) {
      successAlert.classList.add("visually-hidden");
      window.location.href = "/books";
    } else {
      successAlert.innerHTML = registerInUser.message;
      successAlert.classList.remove("visually-hidden");
    }
  } catch (error) {
    console.error("Error in register", error);
  }
});

///////////Variables
let searchButton = document.querySelector("#search-button");
let cardsContainer = document.querySelector(".cards-container");
let initialGoogleObjects = [];
let valuableGoogleObjects = [];
let valuableGoogleObjects2 = [];

//////////Google Functions
function drillDownGoogle() {
  for (let index = 0; index < 9; index++) {
    let tryObject = {};
    try {
      tryObject.Title = initialGoogleObjects[0].items[index].volumeInfo.title;
    } catch {
      tryObject.Title = "Title Unavaliable.";
    }
    try {
      tryObject.Subtitle =
        initialGoogleObjects[0].items[index].volumeInfo.subtitle;
    } catch {
      tryObject.Subtitle = "Subtitle N/A.";
    }
    try {
      tryObject.Description =
        initialGoogleObjects[0].items[index].volumeInfo.description;
    } catch {
      tryObject.Description = "Description unavaliable.";
    }
    try {
      tryObject.Author =
        initialGoogleObjects[0].items[index].volumeInfo.authors[0];
    } catch {
      tryObject.Author = "Author unknown.";
    }
    try {
      tryObject.Pages =
        initialGoogleObjects[0].items[index].volumeInfo.pageCount;
    } catch {
      tryObject.Pages = "Page Count Unavaliable";
    }
    try {
      tryObject.Published =
        initialGoogleObjects[0].items[index].volumeInfo.publishedDate;
    } catch {
      tryObject.Published = "Publishing information unavaliable.";
    }
    try {
      tryObject.ISBN_10 =
        initialGoogleObjects[0].items[
          index
        ].volumeInfo.industryIdentifiers[1].identifier;
    } catch {
      tryObject.ISBN_10 = "ISBN unavaliable.";
    }
    try {
      tryObject.Category =
        initialGoogleObjects[0].items[index].volumeInfo.categories[0];
    } catch {
      tryObject.Category = "Category is unavaliable.";
    }
    try {
      tryObject.Image =
        initialGoogleObjects[0].items[index].volumeInfo.imageLinks.thumbnail;
    } catch {
      tryObject.Image = "images/placeholder.png";
    }
    valuableGoogleObjects.push(tryObject);
    valuableGoogleObjects2.push(tryObject);
  }
}
function createBookCards(objToCreateFrom) {
  let container = document.querySelector(".cards-container");
  let output = "";
  objToCreateFrom.forEach(
    ({ Image, Title, Author, Category, Description, ISBN_10 }) =>
      (output += `
              <p></p>
              <div class="card">
                <img class="card--avatar" src=${Image} />
                <h4>${Title}</h4>
                <p>By: ${Author}</p>
                <p>Category: ${Category}</p>
                <p>Description: ${Description}</p>
                <p>ISBN_10: ${ISBN_10}</p>
                <form method='POST' action='/admin'>
                <input type='hidden' value='${Image}' name='bookImage'>
                <input type='hidden' value='${Title}' name='bookTitle'>
                <input type='hidden' value='${Author}' name='bookAuthor'>
                <input type='hidden' value='${Category}' name='bookCategory'>                
                <input type='hidden' value='${Description}' name='bookDescription'>
                <input type='hidden' value='${ISBN_10}' name='bookISBN_10'>
                <input class="form-control form-control-book" type='double' placeHolder='Enter Book Price' name='bookPrice'>
                <button class="btn btn-success">Sumbit to Products Page</button>
                </form>
              </div>
              <p></p>
              `)
  );
  container.innerHTML = output;
}

//Event listeners
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  valuableGoogleObjects2 = [];
  let input = document.querySelector("#input").value;
  let userInput = input;
  let googleBookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  fetch(googleBookUrl + `${userInput}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      initialGoogleObjects.push(json);
    })
    .then(() => {
      drillDownGoogle();
    })
    .then(() => {
      createBookCards(valuableGoogleObjects);
    })
    .then(() => {
      initialGoogleObjects = [];
      valuableGoogleObjects = [];
    })
    .catch(() => {
      console.log("error");
    });
});

///////////Variables
let searchButton = document.querySelector(".search-button");
let cardsContainer = document.querySelector(".cards-container");
let initialGoogleObjects = [];
let valuableGoogleObjects = [];
let valuableGoogleObjects2 = [];

//////////Google
//Functions
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
        ].volumeInfo.industryIdentifiers[0].identifier;
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
              <div class="card" id=>
                <img class="card--avatar" src=${Image} />
                <h4>${Title}</h4>
                <p>By: ${Author}</p>
                <p>Category: ${Category}</p>
                <p>Description: ${Description}</p>
                <p>ISBN_10: ${ISBN_10}</p>
                <form method='POST' action='/admin'>
                <input type='hidden' value='{{${Image}}}' name='bookImage'>
                <input type='hidden' value='{{${Title}}}' name='bookTitle'>
                <input type='hidden' value='{{${Author}}}' name='bookAuthor'>
                <input type='hidden' value='{{${Category}}}' name='bookCategory'>                
                <input type='hidden' value='{{${Description}}}' name='bookDescription'>
                <input type='hidden' value='{{${ISBN_10}}}' name='bookISBN_10'>
                <input type='double' placeHolder='Enter Book Price' name='bookPrice'>
                <button>Sumbit to Products Page</button>
                </form>
              </div>
              <p></p>
              `)
  );
  container.innerHTML = output;
}

function populateModal(populatingItem) {
  modalContent = `
  <div id='open-modal' class='modal-window'>
    <div>
      <a href='#modal-close' title='Close' class='modal-close'>
        close &times;
      </a>
      <h1>${populatingItem.Title || "Title not avaliable."}</h1>
      <div>${populatingItem.Subtitle || "Subtitle not avaliable."}</div><br>
      <div>Description: ${
        populatingItem.Description || "Description not avaliable."
      }</div><br>
      <div>By: ${populatingItem.Author || "Author not avaliable."}</div><br>
      <div>Page count: ${
        populatingItem.Pages || "Page count unknown."
      }</div><br> 
      <div>Published on: ${
        populatingItem.Published || "Publishing date unknown."
      }</div><br>
      <div>ISBN: ${populatingItem.ISBN_10 || "ISBN unknown."}
    </div>
  </div>`;
  cardsContainer.insertAdjacentHTML("afterend", modalContent);
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

cardsContainer.addEventListener("click", (e) => {
  let cardButton = document.querySelectorAll(".card--link");
  console.log(valuableGoogleObjects2);
  if (e.target.className == "card--link" && e.target == cardButton[0]) {
    populateModal(valuableGoogleObjects2[0]);
  } else if (e.target.className == "card--link" && e.target == cardButton[1]) {
    populateModal(valuableGoogleObjects2[1]);
  } else if (e.target.className == "card--link" && e.target == cardButton[2]) {
    populateModal(valuableGoogleObjects2[2]);
  } else if (e.target.className == "card--link" && e.target == cardButton[3]) {
    populateModal(valuableGoogleObjects2[3]);
  } else if (e.target.className == "card--link" && e.target == cardButton[4]) {
    populateModal(valuableGoogleObjects2[4]);
  } else if (e.target.className == "card--link" && e.target == cardButton[5]) {
    populateModal(valuableGoogleObjects2[5]);
  } else if (e.target.className == "card--link" && e.target == cardButton[6]) {
    populateModal(valuableGoogleObjects2[6]);
  } else if (e.target.className == "card--link" && e.target == cardButton[7]) {
    populateModal(valuableGoogleObjects2[7]);
  } else if (e.target.className == "card--link" && e.target == cardButton[8]) {
    populateModal(valuableGoogleObjects2[8]);
  }
});

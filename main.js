const API_KEY = "080ad8052cf223a7d33ffc8dd6683d03";
const button = document.querySelector("#recipe-button");
let inputField = document.querySelector("#recipe-input-field");
const recipesRenderBox = document.querySelector("#recipes-render-box");
let recipesArray = [];

function selectRecipeCards() {
  let recipeCardArray = document.querySelectorAll(".recipe-card");
  recipeCardArray.forEach(function (card) {
    card.addEventListener("click", showModal);
  });
}

function showModal(event) {
  let backgroundModal = document.createElement("div");
  let modal = document.createElement("div");
  modal.classList.add("modal");
  recipesArray.forEach(function (recipe) {
    if (event.target.parentElement.dataset.id === recipe.name) {
      modal.innerHTML = `
      <h4 class="modal-header">${recipe.name}</h4>
      <h5 class="modal-meal-type">Meal Type: ${recipe.mealType[0]}</h5>
      <ol class="ingredients-list">
      </ol>
      <button id="modal-button">Close</button>
      `;
      console.log(recipe.mealType[0]);
    }
  });

  const ingredientsList = document.querySelector(".ingredients-list");

  recipesArray.forEach(function (recipe) {
    if (event.target.parentElement.dataset.id === recipe.name) {
      recipe.ingredients.forEach(function (ingredient) {
        console.log(ingredient);
      });
    }
  });

  backgroundModal.classList.add("background-Modal");
  let documentHeight = document.body.clientHeight;
  backgroundModal.style.height = `${documentHeight}px`;
  backgroundModal.appendChild(modal);
  document.body.appendChild(backgroundModal);
}

function handleRecipeClick() {
  let optionPicked = inputField.value;
  fetchRecipe(optionPicked);
  recipesArray = [];
}

function handleInputChange() {}

async function fetchRecipe(food) {
  await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=0c94e0cd&app_key=${API_KEY}
  `)
    .then((response) => response.json())
    .then(function (data) {
      data.hits.forEach(function (hit) {
        let recipeObject = {
          image: hit.recipe.image,
          name: hit.recipe.label,
          mealType: hit.recipe.mealType,
          ingredients: hit.recipe.ingredientLines,
        };
        recipesArray.push(recipeObject);
      });
    });
  renderRecipes(recipesArray);
  selectRecipeCards();
}

function renderRecipes(array) {
  recipesRenderBox.innerText = "";
  array.forEach(function (recipe) {
    let recipeCardDiv = document.createElement("div");
    recipeCardDiv.dataset.id = recipe.name;
    recipeCardDiv.classList.add("recipe-card");
    let recipeImg = document.createElement("img");
    let recipeHeader = document.createElement("h4");
    recipeImg.setAttribute("src", recipe.image);
    recipeHeader.innerText = recipe.name;
    recipeCardDiv.appendChild(recipeImg);
    recipeCardDiv.appendChild(recipeHeader);
    recipesRenderBox.appendChild(recipeCardDiv);
  });
}

button.addEventListener("click", handleRecipeClick);

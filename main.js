const API_KEY = "080ad8052cf223a7d33ffc8dd6683d03";
const button = document.querySelector("#recipe-button");
let inputField = document.querySelector("#recipe-input-field");
const recipesRenderBox = document.querySelector("#recipes-render-box");
let recipesArray = [];

function handleRecipeClick() {
  let optionPicked = inputField.value;
  recipesArray = [];
  fetchRecipe(optionPicked);
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
        };
        recipesArray.push(recipeObject);
      });
    });
    renderRecipes(recipesArray);
}

function renderRecipes(array) {
  recipesRenderBox.innerText = "";
  array.forEach(function(recipe) {
    let recipeCardDiv = document.createElement("div");
    let recipeImg = document.createElement("img");
    let recipeHeader = document.createElement("h4");
    recipeImg.setAttribute("src", recipe.image)
    recipeHeader.innerText = recipe.name
    recipeCardDiv.appendChild(recipeImg);
    recipeCardDiv.appendChild(recipeHeader);
    recipesRenderBox.appendChild(recipeCardDiv);
  })
}

button.addEventListener("click", handleRecipeClick);

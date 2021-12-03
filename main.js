const API_KEY = "080ad8052cf223a7d33ffc8dd6683d03";
const button = document.querySelector("#recipe-button");
let inputField = document.querySelector("#recipe-input-field");
let recipesArray = [];

function handleRecipeClick() {
  console.log(inputField.value);
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
        let recipeObject = { image: hit.recipe.image, name: hit.recipe.label };
        console.log(recipeObject);
        recipesArray.push(recipeObject);
      });
    });
}

button.addEventListener("click", handleRecipeClick);

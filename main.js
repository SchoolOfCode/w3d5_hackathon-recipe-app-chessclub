const API_KEY = "080ad8052cf223a7d33ffc8dd6683d03";

function handleRecipeClick() {}

function handleInputChange() {}

async function fetchRecipe(food) {
  await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=0c94e0cd&app_key=${API_KEY}
  `)
    .then((response) => response.json())
    .then((data) => data.hits.forEach(hit => console.log(hit.recipe.cuisineType)));
}


fetchRecipe("american")
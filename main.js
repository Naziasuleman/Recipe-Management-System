// Recipe data storage
let recipes = [];

// Get form and recipe list elements
const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");

// Function to add a new recipe
function addRecipe(event) {
  event.preventDefault();

  // Get form inputs
  const titleInput = document.getElementById("title");
  const ingredientsInput = document.getElementById("ingredients");
  const instructionsInput = document.getElementById("instructions");
  const imageInput = document.getElementById("image");

  // Create a new recipe object
  const newRecipe = {
    title: titleInput.value,
    ingredients: ingredientsInput.value,
    instructions: instructionsInput.value,
    image: imageInput.value || "default.jpg",
  };

  // Add the new recipe to the data structure
  recipes.push(newRecipe);

  // Clear form inputs
  titleInput.value = "";
  ingredientsInput.value = "";
  instructionsInput.value = "";
  imageInput.value = "";

  // Refresh the displayed recipes
  displayRecipes();
}

// Function to display the list of recipes
function displayRecipes(searchQuery = "") {
  // Clear the existing list
  recipeList.innerHTML = "";

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create HTML elements for each filtered recipe
  filteredRecipes.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.ingredients}</p>
      <button onclick="viewRecipe(${index})">View</button>
      <button onclick="editRecipe(${index})">Edit</button>
      <button onclick="deleteRecipe(${index})">Delete</button>
    `;
    recipeList.appendChild(li);
  });
}

// Function to view a recipe
function viewRecipe(index) {
  const recipe = recipes[index];

  // Create a modal to display the recipe details
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>${recipe.title}</h2>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <img src="${recipe.image}" alt="${recipe.title}">
    </div>
  `;

  // Append the modal to the body
  document.body.appendChild(modal);

  // Display the modal
  modal.style.display = "block";
}

// Function to edit a recipe
function editRecipe(index) {
  const recipe = recipes[index];

  // Populate the form inputs with the existing recipe data
  const titleInput = document.getElementById("title");
  const ingredientsInput = document.getElementById("ingredients");
  const instructionsInput = document.getElementById("instructions");
  const imageInput = document.getElementById("image");

  titleInput.value = recipe.title;
  ingredientsInput.value = recipe.ingredients;
  instructionsInput.value = recipe.instructions;
  imageInput.value = recipe.image;

  // Delete the existing recipe from the data structure
  recipes.splice(index, 1);

  // Refresh the displayed recipes
  displayRecipes();
}

// Function to delete a recipe
function deleteRecipe(index) {
  // Delete the recipe from the data structure
  recipes.splice(index, 1);

  // Refresh the displayed recipes
  displayRecipes();
}

// Function to close the modal
function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.display = "none";
    modal.remove();
  }
}

// Function to handle the search button click event
function searchRecipes() {
  const searchInput = document.getElementById("search");
  const searchQuery = searchInput.value;
  displayRecipes(searchQuery);
}

// Add event listener to the form submission
recipeForm.addEventListener("submit", function (event) {
  addRecipe(event);
  displayRecipes();
});

// Initial display of recipes
displayRecipes();

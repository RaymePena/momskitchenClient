import { http } from "./HttpService";

export function getAllRecipe() {
  return http().get("/recipe");
}

export function createRecipe(recipe) {
  console.log(recipe, 333);
  return http().post("/recipe", recipe);
}

export function getRecipeById(id) {
  return http().get(`/recipe/${id}`);
}

export function deleteRecipe(id) {
  return http().delete(`/recipe/${id}`);
}
export function deleteSingleRecipe(id) {
  return http().delete(`/single-recipe/${id}`);
}

export function updateRecipe(recipe) {
  return http().put("/recipe", recipe);
}
export function updatefavorite(recipe) {
  return http().put(`/recipe/${recipe._id}`, recipe);
}

export function addFavorite(favorite) {
  return http().post("/recipe/favorite", favorite);
}
export function getAllFavorites() {
  return http().get("/recipe/favorite");
}

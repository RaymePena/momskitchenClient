<template>
  <div class="home">
    <h1 class="subheading grey--text">Favorites</h1>
    <v-container class="my-5 container-width">
      <!-- layout represent a row of content  -->
      <v-layout row wrap>
        <!-- v-flex can have different properties that allow me to space out the content  -->
        <v-flex
          xs12
          sm6
          md4
          lg3
          xlg3
          v-for="recipe in recipes"
          :key="recipe._id"
        >
          <v-card
            class=" text-center mx-auto my-3 "
            max-width="400"
            width="300"
          >
            <router-link v-bind:to="'/single-recipe/' + recipe._id">
              <v-img
                width="300"
                height="200"
                :src="$store.state.getImageUrl + recipe.imageUrl"
              ></v-img>
            </router-link>
            <router-link v-bind:to="'/single-recipe/' + recipe._id">
              <v-card-title>{{ recipe.name }}</v-card-title>
            </router-link>
            <v-row align="center" class="mx-0">
              <v-rating
                class="text-left mx-3"
                :value="recipe.averageRating"
                color="primary"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-1">{{ recipe.averageRating }}</div>
            </v-row>

            <v-card-text class="text-left"
              >Create By: {{ recipe.author.username }}
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="error"
                class="mr-4"
                v-on:click.prevent="currentRecipeId = recipe._id"
                @click.prevent="deleteFavorite"
                icon
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import * as recipe from "../../Services/RecipeService";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      recipes: [],
      currentRecipeId: null,
    };
  },
  mounted() {
    this.getRecipes();
  },
  methods: {
    getRecipes: async function() {
      const data = await recipe.getAllFavorites();
      this.recipes = data.data.recipes;
      console.log(this.recipes, 888);

      //   this.recipes = data.recipes;
      //   console.log(this.recipes);
    },
    deleteFavorite: async function() {
      console.log(this.currentRecipeId);
      // console.log(this.recipes);
      recipe.updateFavorite(recipe);
      await recipe.deleteFavorite(this.currentRecipeId);
      const index = this.recipes.findIndex(
        (recipe) => recipe._id === this.currentRecipeId
      );
      this.recipes.splice(index, 1);
      this.currentRecipeId = null;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.container-width {
  width: 75%;
}
</style>

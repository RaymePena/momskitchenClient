<template>
  <div>
    <h1 class="subheading grey--text">DashBoard</h1>
    <v-container class="my-5 container-width">
      <!-- layout represent a row of content  -->
      <v-row wrap>
        <!-- v-flex can have different properties that allow me to space out the content  -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="recipe in recipes"
          :key="recipe._id"
        >
          <v-card class=" text-center mx-auto my-3 " max-width="400" width="300">
           <router-link v-bind:to="'/single-recipe/' + recipe._id">
              <v-img width="300" height="200" :src="$store.state.getImageUrl + recipe.imageUrl"></v-img>
            </router-link>
            <router-link v-bind:to="'/single-recipe/' + recipe._id">
              <v-card-title>{{ recipe.name }}</v-card-title>
            </router-link>
            <v-row align="center" class="mx-0">
              <v-rating
                class="text-left mx-3"
                :value="4.5"
                color="primary"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-4">4.5 (200)</div>
            </v-row>

            <v-card-text class="text-left"
              >Create By: {{ recipe.author.username }}
            </v-card-text >
            
              <v-card-actions class="justify-end">
                <v-btn
                  color="secondary"
                  class="mr-4"
                  :to="{ name: 'Edit-recipe', params: { id: recipe._id } }"
                  icon
                >
                  <v-icon> mdi-playlist-edit</v-icon>
                </v-btn>
                <v-btn

                  color="error"
                  class="mr-4"
                  v-on:click.prevent="currentRecipeId = recipe._id"
                  @click.prevent="deleteRecipe"
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import * as recipie from "../../Services/RecipeService";
import * as users from "../../Services/AuthService";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      recipes: [],
      currentRecipeId: null,
    };
  },
  
  mounted() {
    this.getRecipes();
    console.log(this.recipes, 3333);
  },
  created(){
    
  },
  methods: {
    getRecipes: async function() {
      const data = await recipie.getAllRecipe();
      console.log(data.data, 1111111);
      const user = await users.getUserId();
      console.log(user);
      for (let i = 0; i < data.data.length; i++) {
        if (user === data.data[i].author._id) {
          this.recipes.push(data.data[i]);
        }
      }
      console.log(this.recipes);
    },

    deleteRecipe: async function() {
      console.log(this.currentRecipeId);

      await recipie.deleteRecipe(this.currentRecipeId);
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
/* .container-width{
  width: 75%;
} */
</style>

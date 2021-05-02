<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>

    <v-container class="home-container">
      <v-layout row>
        <v-flex>
          <v-card width="100%" class="pa-2">
            <v-card-title class="success white--text"
              >Search Recipes</v-card-title>
            <v-text-field
              @input="isLoad = ! isLoad"
              v-model="search"
              placeholder="Search by keywork such as author, chicken, salad, etc"
              :loading="isLoad"
            ></v-text-field>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="my-5 home-container">
      <!-- layout represent a row of content  -->
      <v-row>
        <!-- v-flex can have different properties that allow me to space out the content  -->
        <v-col
          class="mx-0"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="recipe in filterRecipes"
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
              <div class="grey--text ml-1">{{recipe.averageRating}}</div>
              <v-icon class="light-green--text ml-4">mdi-heart</v-icon>
              
            </v-row>

            <v-card-text class="text-left"
              >Create By: {{ recipe.author.username }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-layout>
        <v-flex class=" d-flex justify-center my-10">
          <v-btn
            @click="loadMore"
            v-if="currentPage * maxPerPage < recipes.length"
            dark
            color="primary"
          >
            Load More</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import * as recipie from "../Services/RecipeService";

export default {
  name: "Home",
  components: {
    
  },
  data() {
    return {
      recipes: [],
      currentPage: 1,
      maxPerPage: 8,
      showMore: true,
      search: "",
      isLoad: false
    };
  },
  mounted() {
  
    this.getRecipes();
     console.log(this.recipes);
  },
  methods: {
    getRecipes: async function() {
      const data = await recipie.getAllRecipe(this.page);
      console.log(data.data)
      for (let recip of data.data) {
        console.log(recip.share);
        if (recip.share === true) {
          this.recipes.push(recip);
        }
      }
    },

    loadMore() {
      this.currentPage += 1;
    },
  },

  computed: {
    totalResults() {
      return Object.keys(this.recipes).length;
    },
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    paginateRecipes() {
      return this.recipes.slice(0, this.currentPage * this.maxPerPage);
    },

    filterRecipes(){
      return this.paginateRecipes.filter(recipe => {
        return recipe.name.toLowerCase().match(this.search.toLowerCase()) || 
                recipe.author.username.toLowerCase().match(this.search.toLowerCase()) ||
                recipe.type.toLowerCase().match(this.search.toLowerCase())
               
      })
    }

  },
    
  
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.home-container {
  width: 75%;
}
</style>

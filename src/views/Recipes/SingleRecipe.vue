<template>
  <div id="single-recipe">
        <!-- snackbar  start -->
    <v-container class="text-center">
        <v-snackbar
            centered
            v-model="snackbar"
        >
        {{snackbarText}}
        <template v-slot:action="{attrs}">
            <v-btn 
            color="primary"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
                Close
            </v-btn>
        </template>
        </v-snackbar>
    </v-container>
    <!-- snackbar end  -->
    <v-btn
      v-show="upFab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="backTop"
    >
      <v-icon>mdi-chevron-double-up</v-icon>
    </v-btn>

    <v-container> </v-container>
    <v-card class="mx-auto " max-width="900">
      <v-container class="my-10 container">
        <v-layout row>
          <v-flex>
            <v-card-title
              class="justify-start grey--text h2--text mt-5 display-1"
              >{{ recipe.name }}</v-card-title
            >
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <DisplayRating :id="id" />
              </v-col>
            </v-row>
            <!-- <v-card-subtitle class="offset-1 text--grey" >Created By: {{recipe.author.username}}</v-card-subtitle> -->
            <v-img
              max-height="400"
              max-width="600"
              :src="$store.state.getImageUrl + recipe.imageUrl"
              class="mx-auto my-5"
            ></v-img>
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex class="d-flex justify-center aling-self-center flex-wrap">
            <!-- <div class="text-center ma-2"> -->
            <v-chip color="success" class="mr-2 my-2 " label outlined flat
              >Servings: {{ recipe.servings }}</v-chip
            >
            <v-chip color="success" class="mr-2 my-2" label outlined
              >Cook: {{ setCookTime }}</v-chip
            >
            <v-chip color="success" class="mr-2 my-2" label outlined
              >Prep: {{ setPreTime }}</v-chip
            >
            <v-chip color="success" class="mr-2 my-2" label outlined
              >Total: {{ setTotalTime }}</v-chip
            >
            <!-- <v-chip color="primary" class="mr-2 my-2"  label outlined @click="printRecipe()">
                                <v-icon>mdi-printer</v-icon>
                                <span class="mx-2">Print</span>
                            </v-chip> -->
            <v-btn bottom fab icon @click.prevent="addtoFavorite">
              <v-icon
                size="35"
                class=""
                :color="selected === true ? 'success' : 'primary'"
                >mdi-heart</v-icon
              >
            </v-btn>

            <!-- </div> -->
          </v-flex>
          <v-divider class="mr-2 my-2 "></v-divider>
          <v-row class="my-1">
              <v-col cols="6" md="6" lg="6">
                  <h3 class="grey--text my-2 ">Ingredients:</h3>
              </v-col>
              
              <v-col cols="6" md="6" lg="6">
                <v-card-actions class="justify-end">
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn 
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      small
                      @click="addToGroceryList"
                      >
                        <v-icon>mdi-plus</v-icon>
                        <span>To List</span>
                    </v-btn>
                </template>
                  <span>Send ingredients to grocery list</span>
                </v-tooltip>
                </v-card-actions>
              </v-col>
          </v-row>
          <v-flex class="d-flex justify-start flex-wrap ">
            <v-list flat>
              <v-list-item-group multiple>
                <v-list-item
                  v-for="(ingredient, index) in ingredients"
                  :key="index"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ ingredient.whole }} {{ ingredient.measure }}
                        {{ ingredient.utensil }} {{ ingredient.ingredient }}
                        {{ ingredient.action }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-flex>

          <v-divider class="my-2 "></v-divider>
          <h3 class="grey--text my-2 ">Instructions:</h3>
          <v-flex class="d-flex justify-start flex-wrap ">
            <v-list flat>
              <v-list-item-group multiple>
                <v-list-item
                  v-for="instruction in instructions"
                  :key="instruction.step"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <span></span>
                      <v-list-item-title class="text-wrap"
                        ><span class="grey--text "
                          >Step: {{ instruction.step }}</span
                        >
                        <p>{{ instruction.instruction }}</p></v-list-item-title
                      >
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-divider></v-divider>
    <v-container>
      <div class="display-1 ">Reviews</div>
      <Reviews :recipeId="id" />
    </v-container>
  </div>
</template>

<script>
import * as recipes from "../../Services/RecipeService";
import * as user from "../../Services/AuthService";
import * as review from "../../Services/RatingServices";
// import Rating from '../Ratings/Rating'
import DisplayRating from "../Ratings/DisplayRating";
import Reviews from "../Ratings/Review";
import * as GroceryService from '../../Services/GroceryServices'

export default {
  name: "SingleRecipe",
  components: {
    //    Rating,
    DisplayRating,
    Reviews,
  },
  data() {
    return {
      id: this.$route.params.id,
      recipe: {},
      ingredients: [],
      instructions: [],
      usernname: "",
      upFab: false,
      selected: false,
      newItem: [],
      snackbar: false,
      snackbarText: 'Your items has been added to the grocery list!'
    };
  },

  created() {
    recipes.getRecipeById(this.id).then((res) => {
      this.recipe = res.data;
      this.ingredients = JSON.parse(res.data.ingredients);
      console.log(this.ingredients);
      this.instructions = JSON.parse(res.data.instructions);
    });

    review.getRatingById(this.id).then((res) => {
      console.log(res, 888);
    });
  },

  methods: {
    printRecipe() {
      window.print();
    },

    async addToGroceryList(){
      if(!user.isLoggedIn()){
        this.$router.push({ name: "Login" })
      }
      if(this.ingredients.length === 0){
        this.snackbarText = "There is not items in this recipe"
      }
      const newItems = this.ingredients.map(d => {
        return {
          text: d.ingredient,
          completed: false
          }
      })
        for(let item of newItems){
          await  GroceryService.createGrocery(item)
        }
        this.snackbar = true
      
      
    },

    addtoFavorite() {
      if(user.isLoggedIn()){
      this.selected = !this.selected;
      const userId = user.getUserId();
      if (!userId) {
        this.$router.push({ name: "Login" });
      }
      const favorite = {
        userId: userId,
        recipeId: this.id,
      };
      recipes.addFavorite(favorite);
      }else {
        this.$router.push({ name: "Login" })
      }
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.upFab = top > 20;
    },
    backTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    setPreTime() {
      if (Number(this.recipe.prepTime) < 60) {
        return `${Number(this.recipe.prepTime)} mins`;
      } else {
        let hours = Math.floor(Number(this.recipe.prepTime) / 60);
        let minutes = Number(this.recipe.prepTime) % 60;
        return `${hours} hr: ${minutes} mins`;
      }
    },
    setCookTime() {
      if (Number(this.recipe.cookTime) < 60) {
        return `${Number(this.recipe.cookTime)} mins`;
      } else {
        let hours = Math.floor(Number(this.recipe.cookTime) / 60);
        let minutes = Number(this.recipe.cookTime) % 60;
        return `${hours} hr: ${minutes} mins`;
      }
    },
    setTotalTime() {
      if (
        Number(this.recipe.prepTime) < 60 &&
        Number(this.recipe.prepTime) < 60
      ) {
        return `${Number(this.recipe.prepTime) +
          Number(this.recipe.cookTime)} mins`;
      } else {
        let hours = Math.floor(
          (Number(this.recipe.prepTime) + Number(this.recipe.cookTime)) / 60
        );
        let minutes =
          (Number(this.recipe.prepTime) + Number(this.recipe.cookTime)) % 60;
        return `${hours} hr: ${minutes} mins`;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  height: auto;
}
</style>

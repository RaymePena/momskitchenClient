<template>
  <div>
    <v-container>
      <v-flex sm12 class="pa-3">
        <v-card class="mt-5">
          <v-toolbar color="white" light flat>
            <v-icon left color="secondary">mdi-plus-outline</v-icon>
            <v-toolbar-title> Add Recipe</v-toolbar-title>
          </v-toolbar>
          <v-form offset-sm4 enctype="multipart/form-data" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="RecipeName"
                    :error-messages="RecipeNameError"
                    label="Recipe Name"
                    required
                    @input="$v.RecipeName.$touch()"
                    @blur="$v.RecipeName.$touch()"
                  ></v-text-field>
                  <v-autocomplete
                    v-model="RecipeType"
                    :error-messages="RecipeTypeError"
                    :items="$store.state.dishesType"
                    chips
                    small-chips
                    label="Type"
                    required
                    @input="$v.RecipeType.$touch()"
                    @blur="$v.RecipeType.$touch()"
                  >
                  </v-autocomplete>
                  <v-card>
                    <v-container>
                      <v-card-title class="ml-0 pl-0"
                        >Ingredients:</v-card-title
                      >

                      <v-row
                        v-for="(ingredient, index) in $store.state.ingrendients"
                        :key="index"
                      >
                        <v-card-text
                          ><strong>#{{ index + 1 }}</strong></v-card-text
                        >
                        <v-col cols="12" md="1" lg="1">
                          <v-autocomplete
                            v-model="ingredient.whole"
                            :items="$store.state.wholeNumbers"
                            chips
                            small-chips
                            label="Qty"
                            dense
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2" lg="2">
                          <v-autocomplete
                            v-model="ingredient.measure"
                            :items="$store.state.measures"
                            chips
                            small-chips
                            label="Measures"
                            dense
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2" lg="2">
                          <v-autocomplete
                            v-model="ingredient.utensil"
                            :items="$store.state.utensils"
                            chips
                            small-chips
                            label="Utensils"
                            dense
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="4" sm="5">
                          <v-text-field
                            dense
                            label="Ingredient"
                            v-model="ingredient.ingredient"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2" sm="12">
                          <v-autocomplete
                            v-model="ingredient.action"
                            :items="$store.state.actions"
                            chips
                            small-chips
                            label="Actions"
                            item-value="utensil"
                            item-text="utensil"
                            return-object
                            dense
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="1" lg="1">
                          <div class="d-flex justify-end">
                            <v-btn icon @click="deleteIngredientField(index)">
                              <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                  <!-- end ingredients  -->
                  <v-card-actions class="justify-end mr">
                    <v-btn class="success" @click="addIngredientField">
                      <v-icon>mdi-plus</v-icon>
                      <span>Ingredient</span>
                    </v-btn>
                  </v-card-actions>
                  <!-- start instructions  -->

                  <v-card>
                    <v-container>
                      <v-card-title class="ml-0 pl-0"
                        >Instructions:</v-card-title
                      >

                      <v-row
                        v-for="(instruction, index) in $store.state
                          .instructions"
                        :key="index"
                      >
                        <v-col cols="11" md="11" sm="11">
                          <v-textarea
                            rows="3"
                            :label="`Instruction # ` + Number(index + 1)"
                            v-model="instruction.instruction"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="1" md="1" lg="1">
                          <div class="d-flex justify-end">
                            <v-btn icon @click="deleteInstructionField">
                              <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card-actions class="justify-end mr">
                    <v-btn class="success" @click="addInstructionField">
                      <v-icon>mdi-plus</v-icon>
                      <span>Instruction</span>
                    </v-btn>
                  </v-card-actions>
                  <!-- end of instructions  -->
                </v-col>
                <!-- second collumn  -->
                <v-col cols="12" sm="4">
                  <div class="images">
                    <v-file-input
                      :rules="imageRules"
                      type="file"
                      name="image"
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      @change="pickFile"
                      label="Pick an Image (900x900 max)"
                    >
                    </v-file-input>

                    <v-img :src="imageUrl" aspect-ratio="2"></v-img>
                  </div>
                  <v-text-field
                    label="Prep time in minutes"
                    v-model="prepTime"
                    :error-messages="PrepTimeError"
                    required
                    @input="$v.prepTime.$touch()"
                    @blur="$v.prepTime.$touch()"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Cook time in minutes"
                    v-model="cookTime"
                    :error-messages="cookTimeError"
                    required
                    @input="$v.cookTime.$touch()"
                    @blur="$v.cookTime.$touch()"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Servings"
                    v-model="servings"
                    :error-messages="ServingError"
                    required
                    @input="$v.servings.$touch()"
                    @blur="$v.servings.$touch()"
                  >
                  </v-text-field>
                  <v-radio-group v-model="share">
                    <v-radio
                      label="Public Recipe"
                      color="secondary"
                      value="true"
                      name="share"
                    ></v-radio>
                    <v-radio
                      label="Private Recipe"
                      color="secondary"
                      name="share"
                      value="false"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-btn
                :disabled="!valid"
                color="secondary"
                class="mr-4"
                @click.prevent="addRecipe"
              >
                Add Recipe
              </v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import * as RecipeService from "../../Services/RecipeService";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "New-Recipe",
  mixins: [validationMixin],
  validations: {
    RecipeName: { required },
    RecipeType: { required },
    prepTime: { required },
    cookTime: { required },
    servings: { required },
  },
  data() {
    return {
      valid: true,
      RecipeName: "",
      RecipeType: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      selected: "",
      share: false,
      imageUrl: null,
      image: null,
      imageRules: [(v) => !!v || "Image is required"],
      val: "",
    };
  },
  computed: {
    RecipeNameError() {
      const errors = [];
      if (!this.$v.RecipeName.$dirty) return errors;
      !this.$v.RecipeName.required && errors.push("Recipe Name is required.");
      return errors;
    },
    RecipeTypeError() {
      const errors = [];
      if (!this.$v.RecipeType.$dirty) return errors;
      !this.$v.RecipeType.required && errors.push("Recipe Type is required.");
      return errors;
    },
    PrepTimeError() {
      const errors = [];
      if (!this.$v.prepTime.$dirty) return errors;
      !this.$v.prepTime.required && errors.push("Prep time is required.");
      return errors;
    },
    cookTimeError() {
      const errors = [];
      if (!this.$v.cookTime.$dirty) return errors;
      !this.$v.cookTime.required && errors.push("Cook time is required.");
      return errors;
    },
    ServingError() {
      const errors = [];
      if (!this.$v.servings.$dirty) return errors;
      !this.$v.servings.required && errors.push("Servings is required.");
      return errors;
    },
  },
  created() {
    this.$store.state.ingrendients = [
      { measure: "", utensil: "", ingredient: "", action: "" },
    ];
    this.$store.state.instructions = [{ step: 1, instruction: "" }];
  },
  mounted() {
    console.log(this.selected);
  },

  methods: {
    pickFile(file) {
      const name = file.name;
      if (name.lastIndexOf(".") <= 0) {
        alert("Please enter a valid file");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        this.image = file;
      });

      fileReader.readAsDataURL(file);
    },

    addRecipe: async function() {
      console.log(this.share);
      let data = this.gatherData();
      console.log(data);
      await RecipeService.createRecipe(data);
      this.$router.push({ name: "Home" });
      //  console.log(this.$store.state.ingrendients, 999);
      //  console.log(this.$store.state.instructions, 555);
    },

    addIngredientField() {
      this.$store.state.ingrendients.push({
        measure: "",
        utensil: "",
        ingredient: "",
        action: "",
        whole: ""
      });
    },

    deleteIngredientField(index) {
      console.log(index);
      this.$store.state.ingrendients.splice(index, 1);
    },

    addInstructionField() {
      let step = this.$store.state.instructions.length + 1;
      this.$store.state.instructions.push({
        instruction: "",
        step: step,
      });
    },

    deleteInstructionField(index) {
      this.$store.state.instructions.splice(index, 1);
    },

    gatherData() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("recipeName", this.RecipeName);
      formData.append("recipeType", this.RecipeType);
      formData.append(
        "ingredients",
        JSON.stringify(this.$store.state.ingrendients)
      );
      formData.append(
        "instructions",
        JSON.stringify(this.$store.state.instructions)
      );
      formData.append("prepTime", this.prepTime);
      formData.append("cookTime", this.cookTime);
      formData.append("servings", this.servings);
      formData.append("share", this.share);
      return formData;
    },
  },
};
</script>

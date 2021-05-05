<template>
<v-container class="mx-0">

    <v-row align="center"
    class="mx-0"
    >
        
        <v-rating
            v-model="ratings"
            background-color="primary"
            color="primary"
            size="19"
            readonly
            half-increments
            dense
        >
    </v-rating>
        <div class="ml-4">{{ratings? ratings.toFixed(2): ''}}  </div>
        <div class="ml-4">
            <Rating /> 
        </div>
    </v-row>
</v-container>
</template>

<script>
// import * as RatingServices from '../../Services/RatingServices'
// 
import * as RecipeServices from '../../Services/RecipeService'
import Rating from './Rating'

export default {
    name: 'DisplayRating',
    components:{
        Rating
    },
   
    props:{
        id: String
    },
     data(){
        return{
            recipeId: this.id,
            ratings: null,
            ratingCount: 0
            
        }
    },
    created(){
         RecipeServices.getRecipeById(this.id).then(res => {
            // console.log(res.data.averageRating);
            this.ratings = res.data.averageRating
        })

       
    },
    mounted(){
        
    },


}
</script>
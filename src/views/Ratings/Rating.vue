<template>
    <div class="text-center mx-0">
        
        <v-dialog
            v-model="dialog"
            width="700"
        >
        <template v-slot:activator="{on, attrs}">
            <v-btn text
                color="secondary"
                v-on="on"
                v-bind="attrs"
                dark
                @click="openModal"
            >
            <v-icon>mdi-plus</v-icon>
                <span>Review</span>
            </v-btn>   
        </template>
        <v-card dark>
            <div v-if="!isSave">
            <v-card-title class="secondary">
                <v-icon color="wite--text" class="mr-2">mdi-star-face</v-icon>
                <span>Please, rate this recipe!</span>
            </v-card-title>
            <v-card-text>
                
                <v-rating
                v-model.number="ratings.rating"
                background-color="primary"
                color="primary"
                size="40"
                
                >
                </v-rating>
               
                <v-divider></v-divider>
                <v-text-field 
                    v-model="ratings.title"
                    label="Title"
                    required
                    :rules="titleRule"
                >

                </v-text-field>
                <v-form
                ref="form"
                v-model="valid"
                >
                <v-textarea
                    placeholder="How did you like this recipe? What changes did you made?"
                    v-model="ratings.comment"
                    required
                    :rules="commentRule"
                    
                >

                </v-textarea>
                    <v-card-actions class=" justify-end">
                        <v-btn 
                        color="primary" 
                        @click.prevent="addRating"
                        :disabled="!valid"
                        >Submit</v-btn>
                        <v-btn color="error" @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </div>
        <v-card v-if="isSave" width="700">
            <v-card-title class="secondary">
                <v-icon color="wite--text" class="mr-2">mdi-star-face</v-icon>
                <span>Thank you for your rating!</span>
            </v-card-title>
            <v-card-text>
               <div class="text-h4 pa-12"> We appreciate your feed back!</div>
            </v-card-text>
            <v-card-actions class="justify-end mx-2">
                <v-btn color="error" @click.prevent="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-card>
        
        </v-dialog>
    </div>
</template>

<script>
import * as RatingServices from '../../Services/RatingServices'
// import * as RecipeServices from '../../Services/RecipeService'
import * as user from '../../Services/AuthService'


export default {
    name: 'Rating',
    data(){
        return {
            id: this.$route.params.id,
            dialog: false,
            ratings: {},
            isSave: false,
            titleRule: [(v) => !!v || "Title is required"],
            commentRule: [(v) => !!v || "Comment is required"],
            ratingRule: [(v) => !!v || "Ratings are is required"],
            valid: false
        }
    },

    

    created(){
        this.ratings.recipe = this.id

        if(this.dialog){
            this.isSave = false
        }
        // RecipeServices.getRecipeById(this.id).then(res => {
        //     console.log(res.data.averageRating, 999);
        //     this.ratings.rating = res.data.averageRating
        // })
        
    },

    methods:{
        async addRating(){
            await RatingServices.createRating(this.ratings)
            this.isSave = true
            this.$root.$emit('refreshData')
        },
        closeDialog: function(){
            this.dialog = false
            this.isSave = false
        },
        openModal(){
            if(!user.isLoggedIn()){
                this.$router.push({name: 'Login'})
            }
        }
    },


    
}
</script>
<template>
    <v-container>
        <v-row >
            <v-col cols="12" dm="4" lg="3" v-for="review in reviews" :key="review._id">
                <v-card max-width="300" class="justify-center">
                    <v-card-title><strong>{{review.title}}</strong></v-card-title>
                        <v-card-text class="justify-center">
                        <v-row  >
                            <v-rating
                                class="text-left ml-2"
                                :value="review.rating"
                                color="primary"
                                dense
                                half-increments
                                readonly
                                size="16"
                            ></v-rating>
                            <div class="grey--text ml-1 caption">{{review.reviewDate}}</div>
                         </v-row>
                         </v-card-text>
                    <v-card-text class="justify-center">
                        {{review.comment}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as ReviewServices from '../../Services/RatingServices'
import moment from 'moment'
export default {
    name: 'Reviews',
    props:{
        recipeId: String
    },

    data(){
        return {
            id: this.recipeId,
            reviews: [],
            reviewDate: null
            
        }
    },

    created(){
        ReviewServices.getRatingById(this.recipeId).then(res => {
            console.log(res.data.data, 1111);
            this.reviews = res.data.data.map(review => {
                return {
                    comment: review.comment,
                    rating: review.rating,
                    title: review.title,
                    reviewDate: moment(review.createAt).format("L")
                }
            })
            
        })
    }
}
</script>
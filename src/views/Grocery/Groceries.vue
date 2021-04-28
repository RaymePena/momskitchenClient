<template>
<v-container style="max-width: 800px">
    
        <h2 class="pa-3  my-5 display-3">My Grocery List</h2>
    <v-text-field
        v-model="item.text"
        label="Add item and hit enter or press add item button that shows when typing"
        solo
        @keydown.enter="addItem"

    >
        <template v-slot:append>
            <v-fade-transition>
                <v-btn v-if="item.text"  @click="addItem" small color="primary">
                    <v-icon>mdi-plus</v-icon>
                    <span>Add Item</span>
                </v-btn>
                
            </v-fade-transition>
        </template>
    </v-text-field>
    
    <h2 class="display-1 success--text pl-4">
        Grocery Items:&nbsp;
        <v-fade-transition leave-absolute>
            <span :key="`task-${count}`">{{count}}</span>
        </v-fade-transition>
    </h2>
    <v-divider class="mt-4"></v-divider>
    <v-row class="my-1" align="center">
        <strong class="mx-4 info--text text--darken-2"> Remaining: {{remainingItem}}</strong> 
        <v-divider vertical></v-divider>
        <strong class="mx-4 info--text text--darken-2"> Completed: {{markedItem}} </strong>
        <v-spacer></v-spacer>
        <v-progress-circular
            :value="progress"
        ></v-progress-circular>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <div v-if="count > 0" >
        <v-slide-y-transition class="py-0" group  >
            <template v-for="(grocery, i) in groceries">
                <!-- <v-divider
                    v-if="i !== 0"
                    :key="`${i}-divider`"
                ></v-divider> -->
            
                <v-card :key="`${i}-${grocery.text}`" class="my-5">
                <v-list>
                <v-list-item :key="`${i}-${grocery.text}`">
                    <v-list-item-action>
                        <v-checkbox
                         v-model="grocery.completed"
                         :color="grocery.completed && 'grey' || 'primary'"
                        >
                            <template v-slot:label>
                                <div 
                                :class="grocery.completed && 'grey--text' || 'primary--text'"
                                class="ml-4"
                                v-text="grocery.text"
                                >
                                </div>
                            </template>
                        </v-checkbox>
                    </v-list-item-action>
                    <v-spacer></v-spacer>
                    <v-scroll-x-transition>
                        <v-icon 
                            v-if="grocery.completed"
                            color="success"
                        >
                            mdi-check
                        </v-icon>
                    </v-scroll-x-transition>
                <v-btn icon color="error" @click="deleteGrocery(grocery._id)">
                   <v-icon>mdi-delete</v-icon>
               </v-btn>
                </v-list-item>
                </v-list>
         
           </v-card>
            
           
            </template>
           
        </v-slide-y-transition>

    </div>

</v-container>


    
</template>

<script>

// import * as AuthServices from '../../Services/AuthService'
import * as GroceryService from '../../Services/GroceryServices'

export default {
    name: 'Groceries',
    components:{
        
    },
    data(){
        return {
            item: {},
            groceries: [],
            newItem: null,
            count: 0
        }
    },
    async created(){
        try{
        const groceryData = await GroceryService.getAllGrocery();
        console.log(groceryData);
        if(groceryData.data.success){
            this.groceries = groceryData.data.data
            this.count = groceryData.data.count
        }
        }catch(error){
            console.log(error);
        }
   
    },
    methods:{
        async addItem(){
            this.item.completed =  false
            console.log(this.item);
           await  GroceryService.createGrocery(this.item)
           this.item.text= null
           const groceryData = await GroceryService.getAllGrocery();
           if(groceryData.data.success){
            this.groceries = groceryData.data.data
            this.count = groceryData.data.count
        }
        },

       async deleteGrocery(id){
           await GroceryService.deleteGrocery(id)
           const groceryData = await GroceryService.getAllGrocery();
            if(groceryData.data.success){
                this.groceries = groceryData.data.data
            }
        },

        // async saveCompleted(id){
        //     console.log(this.item)         
        //     await GroceryService.updateItem()
        // }
    },
    computed:{

         markedItem(){
            return this.groceries.filter(grocery => grocery.completed).length
        },
        progress(){
            return this.markedItem / this.groceries.length * 100
        },
       
        remainingItem(){
            return this.groceries.length - this.markedItem
        }
    }


}
</script>
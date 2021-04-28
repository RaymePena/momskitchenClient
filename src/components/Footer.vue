<template>
    
        <v-footer>
            <v-card flat tile width="100%" class="secondary text-center">
                
                <v-card-text>
                   <span class="white--text"><strong>Connect With Us!</strong></span>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">{{icon}}</v-icon>
                    </v-btn>
                </v-card-text>
                
                <v-divider></v-divider>
                <v-card-text class="white--text">
                    {{new Date().getFullYear()}} - <strong>Mom's Kitchen</strong>
                </v-card-text>
                

            </v-card>
        </v-footer>
    
</template>

<script>
export default {
    name: 'Footer',


    data(){
        return {
        icons: [
        'mdi-facebook',
        'mdi-linkedin',
        'mdi-instagram',
      ],
        }
    }
}
</script>


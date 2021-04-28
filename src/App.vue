<template>
  <v-app class="grey ligthen-4">
    <Navbar />

    <v-main class="mx-4 mb-4">
        
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
// import Home from "./views/Home";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    // Home,
    Navbar,
    Footer
  },
  beforeCreate() {
    this.$store.dispatch("authenticate");
  },

  data: () => ({
    //
    drawer: false,
  }),

  methods: {
      onScroll(e){
           if(typeof window === 'undefined') return
           const top = window.pageYOffset || e.target.scrollTop || 0
            this.upFab = top > 20
       },
       backTop(){
           window.scrollTo({
               top:0,
               left: 0,
               behavior: 'smooth'
           })
       },
       backHome(){
           this.$router.push({name: 'Home'})
       }
  }
};
</script>

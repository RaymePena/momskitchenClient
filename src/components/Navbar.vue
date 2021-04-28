<template>
  <div class="navbar">
    <v-app-bar flat app color="secondary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          ><v-btn text to="/" exact
            ><em>Mom's Kitchen</em></v-btn
          ></v-toolbar-title
        >
      </div>
      <v-spacer></v-spacer>
      <v-btn text to="/sign-up" v-if="!$store.state.isLoggedIn">
        <span class="mr-2">Sign Up</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn text to="/login" v-if="!$store.state.isLoggedIn" exact>
        <span class="mr-2">Login</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn text v-if="$store.state.isLoggedIn" @click="logout()">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="success">
      <v-list>
        <v-list-item  to="/home">
             <v-list-item-action>
              <v-icon class="white--text">mdi-home-export-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text">
              Home
            </v-list-item-title>
        </v-list-item>
        <v-list-item 
          
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          v-show="$store.state.isLoggedIn"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
        <v-list-item v-if="!$store.state.isLoggedIn" to="/login">
             <v-list-item-action>
              <v-icon class="white--text">mdi-login-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text">
              Login
            </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!$store.state.isLoggedIn" to="/signup">
             <v-list-item-action>
              <v-icon class="white--text">mdi-login-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text">
              Signup
            </v-list-item-title>
        </v-list-item>
          <v-divider></v-divider>
         <v-list-item v-if="$store.state.isLoggedIn" @click="logout()">
             <v-list-item-action>
              <v-icon class="white--text">mdi-login-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title class="white--text">
              Logout
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import * as auth from "../Services/AuthService";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "mdi-plus", text: "Add Recipe", route: "/recipe/add-recipe" },
        { icon: "mdi-heart", text: "Favorites", route: "/favorite" },
        { icon: "mdi-view-list", text: "Grocery List", route: "/groceries" },
        
       
      ],
      
    };
  },
  
  created() {
    
    
  },
  methods: {
    logout: function() {
      auth.logout();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

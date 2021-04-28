<template>
  <div>
    <v-flex sm4 offset-sm4 class="pa-3">
      <v-card class="mt-5">
        <v-toolbar color="success" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-text-field
              v-model="username"
              :error-messages="usernameError"
              label="User Name"
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :error-messages="passwordError"
              label="Password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-container>
          <v-card-actions class="justify-end">
            <v-btn color="yellow darken-2" class="mr-4" @click="loginUser">
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import * as auth from "../../Services/AuthService";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required },
  },
  data() {
    return {
      username: "",
      // usernameRule: [(v) => !!v || "Username is required"],
      password: "",
      // passwordRule: [(v) => !!v || "Password is required"],
      showPassword: false,
    };
  },
  computed: {
    usernameError() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },

  methods: {
    loginUser: async function() {
      this.$v.$touch();
      const user = {
        username: this.username,
        password: this.password,
      };
      console.log(user, 5555);
      const result = await auth.login(user);
      console.log(result);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

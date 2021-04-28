<template>
  <div>
    <v-flex sm4 offset-sm4 class="pa-3">
      <v-card class="mt-5">
        <v-toolbar color="success" dark>
          <v-icon left>mdi-account-plus-outline</v-icon>
          <v-toolbar-title> Sign Up </v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-text-field
              v-model="first"
              :error-messages="firstError"
              label="First Name"
              required
              @input="$v.first.$touch()"
              @blur="$v.first.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="last"
              :error-messages="lastError"
              label="Last Name"
              required
              @input="$v.last.$touch()"
              @blur="$v.last.$touch()"
            ></v-text-field>
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
            <v-text-field
              v-model="email"
              :error-messages="emailError"
              label="Email "
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-container>
          <v-card-actions class="justify-end ">
            <v-btn color="primary" class="mr-4" @click="register">
              Register
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
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Sign-Up",
  mixins: [validationMixin],
  validations: {
    first: { required },
    last: { required },
    username: { required },
    password: { required },
    email: { required, email },
  },
  computed: {
    firstError() {
      const errors = [];
      if (!this.$v.first.$dirty) return errors;
      !this.$v.first.required && errors.push("First Name is required.");
      return errors;
    },
    lastError() {
      const errors = [];
      if (!this.$v.last.$dirty) return errors;
      !this.$v.last.required && errors.push("Last Name is required.");
      return errors;
    },
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
    emailError() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  data() {
    return {
      first: "",
      last: "",
      username: "",
      password: "",
      email: "",
      showPassword: false,
    };
  },
  methods: {
    register: async function() {
      this.$v.$touch();
      const user = {
        first: this.first,
        last: this.last,
        username: this.username,
        password: this.password,
        email: this.email,
      };
      console.log(user, 2222);
      const registerPromise = auth.registerUser(user);
      const loginPromise = auth.login(user);
      await Promise.all([registerPromise, loginPromise]);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

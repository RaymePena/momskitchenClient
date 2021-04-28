import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from '../Services/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
		username: null,
		userId: null,
		getImageUrl: `${window.location.protocol}//${window.location.hostname}:3000/`,
		allIngredients: [],
		recipeTypes: [],
		wholeNumbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
		measures: ['none', '1/4', '1/2', '1/3', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
		utensils: ['none', 'teaspoon', 'tablespoon', 'cup', 'pint', 'quart', 'galon', 'once', 'pound', 'small', 'large', 'medium', ' 8 once', '4 once', '16 once'],
		actions: ['none', 'divided', 'dice', 'slice', 'chop', 'roll out', 'knead', 'add', 'bake', 'whip', 'peel', 'boil', 'grate', 'cook', 'fry', 'grill'],
		dishesType: ['Pasta', 'Salad', 'Bread & Doughs', 'Curry', 'Soup', 'Antipasti', 'Roast', 'BBQ', 'Stew', 'Pizza', 'Sandwitch & Wraps', 'Dessert', 'Sauces', 'Drinks'],
		ingreds: ['none', 'onion', 'butter', 'lemon', 'water'],
		ingrendients: [{measure: '', utensil: '', ingredient: '', action: ''}],
		instructions: [{step: 1, instruction: ''}],
		averageRating: null,
		
	},
	mutations: {
		authenticate(state) {
			state.isLoggedIn = auth.isLoggedIn();
			if (state.isLoggedIn) {
				state.username = auth.getUsername();
				state.userId = auth.getUserId();
			} else {
				state.userId = null;
				state.username = null;
			}
		}
	},
	actions: {
		authenticate(context) {
			context.commit('authenticate');
		}
	},
	modules: {}
});

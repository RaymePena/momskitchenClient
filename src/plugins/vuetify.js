import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#ff9800',
				secondary: '#ff5722',
				accent: '#ffeb3b',
				error: '#f44336',
				warning: '#ffc107',
				info: '#cddc39',
				success: '#8bc34a'
			}
		}
	}
});

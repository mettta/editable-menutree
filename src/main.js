
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyA6MrUgAlk-MI9ALoS0wDrBGihokS1J-EQ",
	authDomain: "editable-tree.firebaseapp.com",
	databaseURL: "https://editable-tree.firebaseio.com",
	projectId: "editable-tree",
	storageBucket: "",
	messagingSenderId: "1087544042407"
	};
	firebase.initializeApp(config);

import {App} from './components/app/app.js';

new App({
	el: document.querySelector('.js-app')
});
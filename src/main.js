import {App} from './components/app/app.js';

import './main.css';

const el = document.createElement('div');
el.classList.add('js-app');

window.onload = function() {
	document.body.append(el);
}

new App({
	el: el
});

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

let TESTDATA = firebase.database().ref();

TESTDATA.on("value", (snapshot) => {
	console.log(snapshot.val());
})



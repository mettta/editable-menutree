import {Tree} from './../tree/tree.js';
import {Menutree} from './../menutree/menutree.js';
import {Additem} from './../additem/additem.js';

const APP_ENDPOINT = '_data/data.json';

export class App {
	constructor({data, el}) {
		this.data = data;
		this.el = el;

		const tree = new Tree({
			data: this.data
		});

		const menutree = new Menutree({
			el: document.createElement('div'),
			template: menutreeTemplate,
			tree: tree, 
			onItemEvent: (element) => {
				form.update(element);
			}
		});

		const form = new Additem({
			el: document.createElement('div'),
			template: additemTemplate,
			onSendData: (element, address) => {
				menutree.addElement(element, address);
			},
		});

		this.el.append(menutree.el, form.el);
		this.fetchData();
		menutree.render();
		form.render();
	}

	fetchData() {
		fetch(APP_ENDPOINT).
		then((res) => res.json()).
		then((data) => {
			this.data = data;
		});
	}

	// не работает пока:
	postData(data) {
		fetch(APP_ENDPOINT, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), 
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));
	}
}

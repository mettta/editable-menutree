import {Tree} from './../tree/tree.js';
import {Menutree} from './../menutree/menutree.js';
import {Additem} from './../additem/additem.js';

const APP_ENDPOINT = '_data/data.json';

export class App {
	constructor({el}) {
		this.el = el;

		this.tree = new Tree();

		this.menutree = new Menutree({
			el: document.createElement('div'),
			template: menutreeTemplate,
			tree: this.tree, 
			onItemEvent: (element) => {
				this.form.update(element);
			}
		});

		this.form = new Additem({
			el: document.createElement('div'),
			template: additemTemplate,
			onSendData: (element, address) => {
				this.menutree.addElement(element, address);
				// TODO setData()
				// this.postData(this.tree.setData());
			},
		});

		this.el.append(this.menutree.el, this.form.el);
		this.menutree.render();
		this.form.render();

		this.fetchData();
	}

	fetchData() {
		fetch(APP_ENDPOINT).
		then((res) => res.json()).
		then(({tree}) => {
			this.tree.data = tree;
			this.menutree.render();
		});
	}

	// не используется в песочнице:
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

import {Tree} from './../tree/tree.js';
import {Menutree} from './../menutree/menutree.js';
import {Form} from './../form/form.js';

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

		const form = new Form({
			el: document.createElement('div'),
			template: formTemplate,
			onSendData: (element, address) => {
				menutree.addElement(element, address);
			},
		});

		this.el.append(menutree.el, form.el);
		menutree.render();
		form.render();
	}
}

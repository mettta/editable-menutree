'use strict';

import './menutree.css';
import componentTemplate from './menutree.pug';

export class Menutree {
	constructor({el, tree, onItemEvent}) {
		this.el = el;

		this._tree = tree;
		this._onItemEvent = onItemEvent;

		this._blockName = "menutree";
		this.el.classList.add(this._blockName);
		this._initEvents();
	}

	render() {
		this.el.innerHTML = componentTemplate({
			blockName: this._blockName,
			data: this._tree.getAdaptedData()
		});
	}

	addElement(el, address) {
		this._addElementToTree(el, address);
		console.log(address);
		this.render();
	}

	removeElement(el) {
		this._tree.removeNode(this._getElementAddress(el));
		this.render();
	}

	_getElementAddress(el) {
		let elemIdx = el.parentNode.dataset.idx;
		const address = elemIdx ? elemIdx.split('.') : [];
		return address;
	}

	_addElementToTree(el, address) {
		this._tree.addNode(el, address);
	}

	_toggleOpenStatus(el) {
		el.classList.toggle(`${this._blockName}__section_title_open`);
		let node = this._tree.getNode(this._getElementAddress(el));
		let state = node.state;
		node.state = state ? '' : 'open';
	}

	_initEvents() {
		this.el.addEventListener('click', () => {
			let element = event.target;

			if (element.classList.contains(`${this._blockName}__section_title`)) {
				this._toggleOpenStatus(element);
			}

			if (element.classList.contains(`${this._blockName}__item_del`)) {
				this.removeElement(element);
				this._onItemEvent(null);
			}

			if (element.classList.contains(`${this._blockName}__item_add`)) {
				this._onItemEvent({
				title: element.parentNode.querySelector(`.${this._blockName}__title`).textContent,
				address: this._getElementAddress(element)
				});
			}
		});
	}
}


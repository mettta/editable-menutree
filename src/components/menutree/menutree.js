'use strict';

export class Menutree {
	constructor({el, template, tree, onItemEvent}) {
		this.el = el;
		this.template = template;
		this._tree = tree;
		this.onItemEvent = onItemEvent;
		this.blockName = "menutree";
		this.el.classList.add(this.blockName);
		this._initEvents();
	}

	render() {
		this.el.innerHTML = this.template({
			blockName: "menutree",
			data: this._tree.getAdaptedData()
		});
	}

	addElement(el, address) {
		this._addElementToTree(el, address);
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
		el.classList.toggle(`${this.blockName}__section_title_open`);
		let node = this._tree.getNode(this._getElementAddress(el));
		// TODO: -------------- проверка на ноду
		let state = node.state;
		node.state = state ? '' : 'open';
	}

	_initEvents() {
		this.el.addEventListener('click', () => {
			let element = event.target;

			if (element.classList.contains(`${this.blockName}__section_title`)) {
				this._toggleOpenStatus(element);
			}

			if (element.classList.contains(`${this.blockName}__item_del`)) {
				this.removeElement(element);
				this.onItemEvent(null);
			}

			if (element.classList.contains(`${this.blockName}__item_add`)) {
				this.onItemEvent({
				title: element.parentNode.querySelector(`.${this.blockName}__title`).textContent,
				address: this._getElementAddress(element)
				});
			}
		});
	}
}


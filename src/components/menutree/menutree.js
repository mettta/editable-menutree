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
		this.el.innerHTML = this._createList(this._tree.getData());
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

	// HTML

	_createList(data, parentIdx = "") {
		return `<ul class="${this.blockName}__section">
		${data.map( (obj, idx) => this._createItem(obj, idx, parentIdx)).join('')}
		<li class="${this.blockName}__placeholder">Ваш список пуст</li></ul>`;
	}

	_createItem(obj, idx, parentIdx) {
		if (!obj.name) return;
		const dataIdx = parentIdx ? parentIdx + '.' + idx : parentIdx + idx;
		const urlOrTitle = obj.url ? this._createLink(obj) : this._createTitle(obj);
		const sectionOrNil = obj.children ? this._createList(obj.children, dataIdx) : "";
		const content = urlOrTitle + sectionOrNil;

		const html = 
		`<li data-idx="${dataIdx}" class="${this.blockName}__item">
			<span class="${this.blockName}__item_del">&times;</span>
			${content}
		</li>`;

		return html;
	}

	_createLink(obj) {
		return `<a href="${obj.url}" class="${this.blockName}__link" target="_blank">${
				obj.name}</a>`
	}

	_createTitle(obj) {
		return `<span class="${this.blockName}__item_add">&plus;</span><span class="${
				this.blockName}__title ${
				(obj.children && obj.children.length) ? `${this.blockName}__section_title` : ""} ${
				(obj.children && obj.children.length && obj.state == 'open') ? `${
				this.blockName}__section_title_open` : ""}">${
				obj.name}</span>`;
	}
}


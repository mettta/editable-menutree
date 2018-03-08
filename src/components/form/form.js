'use strict';

export class Form {

	constructor({el, onSendData}) {
		this.el = el;
		this.onSendData = onSendData;

		this.blockName = "addItemForm";
		this.el.classList.add(this.blockName);
		this._initEvents();

		this.targetTitle = null;
		this.targetAddress = null;
	}

	render() {
		this.el.innerHTML = this._createForm();
	}

	reset() {
		this.targetTitle = null;
		this.targetAddress = null;
		this.render();
	}

	update(element) {
		if(element) {
			this._setTarget(element);
			this.render();
		} else {
			this.reset();
		}
	}

	// private

	_setTarget(element) {
		this.targetTitle = element.title;
		this.targetAddress = element.address;
	}

	_createForm() {
		return `<div class="${this.blockName}__form">
		<p>Добавить элемент ${
			this.targetTitle ? '<mark>в&nbsp;"<i>' + this.targetTitle + '</i>"</mark>' : ""
		}</p>
		<input type="text" name="name" placeholder="Название" value="" class="form-text">
		<input type="text" name="url" placeholder="http://.." value="" class="form-text">
		<button class="${this.blockName}__button ${this.blockName}__button_submit">добавить</button>
		</div>`;
	}

	_initEvents() {
		this.el.addEventListener('click', () => {
			if (!event.target.classList.contains(`${this.blockName}__button_submit`)) return;
			const newEl = {};
			event.target.parentNode.querySelectorAll('input').forEach(el => {
			  newEl[el.name] = el.value;
			});
			this._onSendData(newEl);
		});
	}
	
	_onSendData(el) {
		this.onSendData(el, this.targetAddress);
		this.reset();
	}
}
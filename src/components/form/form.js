'use strict';

export class Form {

	constructor({el, template, onSendData}) {
		this.el = el;
		this.template = template;
		this.onSendData = onSendData;

		this.blockName = "addItemForm";
		this.el.classList.add(this.blockName);
		this._initEvents();

		this.targetTitle = null;
		this.targetAddress = null;
	}

	render() {
		this.el.innerHTML = this.template({
			blockname: this.blockname
		});
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
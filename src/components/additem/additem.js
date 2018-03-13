'use strict';

export class Additem {

	constructor({el, template, onSendData}) {
		this.el = el;

		this._template = template;
		this._onSendData = onSendData;

		this._blockName = "additem";
		this.el.classList.add(this._blockName);
		this._initEvents();

		this._targetTitle = null;
		this._targetAddress = null;
	}

	render() {
		this.el.innerHTML = this._template({
			blockName: this._blockName,
			targetTitle: this._targetTitle
		});
	}

	reset() {
		this._targetTitle = null;
		this._targetAddress = null;
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
		this._targetTitle = element.title;
		this._targetAddress = element.address;
	}

	_initEvents() {
		this.el.addEventListener('click', () => {
			if (!event.target.classList.contains(`${this._blockName}__submit`)) return;
			const newEl = {};
			event.target.parentNode.querySelectorAll('input').forEach(el => {
			  newEl[el.name] = el.value;
			});
			this._sendData(newEl);
		});
	}
	
	_sendData(el) {
		this._onSendData(el, this._targetAddress);
		this.reset();
	}
}
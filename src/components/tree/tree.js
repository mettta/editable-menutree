'use strict';

export class Tree {

	constructor({data}) {
		this._data = data;
	}

	getData() {
		return this._data;
	}

	getNodeIdx(address) {
		return address[address.length - 1];
	}

	getNode(address) {
		return this.getParentNode(address)[this.getNodeIdx(address)];
	}

	getParentNode(address) {
		let parentNode = this._data;
		if (address) {
			for(let i = 0; i < address.length - 1; i++) {
				parentNode = parentNode[+address[i]].children;
			}
		}
		return parentNode;
	}

	getChildren(address) {
		return address ? this.getNode(address).children : this._data;
	}

	addNode(el, address) {
		if(!address) { 
			this._data.push(el);
			return;
		}

		const children = this.getChildren(address);
		const parent = this.getNode(address);

		if(!children) { 
			parent.children = [el];
		} else {
			children.push(el);
		}

		if(parent) {
			parent.state = 'open';
		}
	}

	// todo: после удаления элемента делать reset форме.
	removeNode(address) {
		const idx = this.getNodeIdx(address);
		const arr = this.getParentNode(address);
		arr.splice(idx, 1);
	}
}


'use strict';

export class Tree {

	constructor(data = []) {
		this.data = data;
	}

	getData() {
		return this.data;
	}

	getAdaptedData() {
		this._adaptData(this.data, []);
		return this.data;
	}

	_adaptData(data, address) {
		let currAddress = address;
		data.forEach( (obj, idx) => {
			obj.address = currAddress.concat(idx);
			if (obj.children) {
				this._adaptData(obj.children, obj.address);
			};
		});
	}

	getNodeIdx(address) {
		return (address && address.length) ? 
		address[address.length - 1] : undefined;
	}

	getNode(address) {
		return (address && address.length) ? 
		this.getParentNode(address)[this.getNodeIdx(address)] : undefined;
	}

	getParentNode(address) {
		let parentNode = this.data;
		if (address) {
			for(let i = 0; i < address.length - 1; i++) {
				parentNode = parentNode[+address[i]].children;
			}
		}
		return parentNode;
	}

	getChildren(address) {
		return (address && address.length) ? 
		this.getNode(address).children : this.data;
	}

	addNode(el, address) {
		if(!el || !el.name) { return; }

		if(!address) { 
			this.data.push(el);
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

	removeNode(address) {
		if(!address || !address.length) { return; }
		const idx = this.getNodeIdx(address);
		const arr = this.getParentNode(address);
		arr.splice(idx, 1);
	}
}


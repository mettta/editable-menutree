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
  
	getNode(address, tree) {
		return this.getParentNode(address, tree)[this.getNodeIdx(address)];
	}
  
	getParentNode(address, tree) {
		let parentNode = tree;
		if (address) {
			for(let i = 0; i < address.length - 1; i++) {
				parentNode = parentNode[+address[i]].children;
			}
		}
		return parentNode;
	}
  
	getChildren(address, tree) {
		return address ? this.getNode(address, tree).children : tree;
	}
  
	addNode(el, address, tree) {
		if(!address) { 
			tree.push(el);
			return;
		}
	
		const children = this.getChildren(address, tree);
		const parent = this.getNode(address, tree);
		
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
	removeNode(address, tree) {
		const idx = this.getNodeIdx(address);
		const arr = this.getParentNode(address, tree);
		arr.splice(idx, 1);
	}
  
	// enumeration test ////////////////////////////////////////////////////
  
	enumerate(callback) {
		let data = this._data;
		this._enumerate(data, 0, callback);
	}
  
	_enumerate(data, level, callback) {
		data.forEach((item, idx) => {
			if(callback) {
				callback(item, idx, level);
			}
			if(item.children) {
				this._enumerate(item.children, level + 1, callback);
			}
		});
	}
  
	dump() {
		this.enumerate(function(item, level){
			console.log('-->' + level + '**' + item.name);
		}); 
	}
}


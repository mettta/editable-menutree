'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Tree as Module} from './tree.js';

describe("Tree", function() {

	describe("Tree. Formal tests", function() {

		let data = [];
		let instance = new Module({data});

		it('Tree should be a function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(instance).to.be.an('object');
		});
	
		it('Instance should contains _data property', function() {
			expect(instance).to.have.property('_data');
		});

	});

	describe("Tree.getData()", function() {

		let init_data = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		let instance = new Module({data: init_data});

		it("Instance.getData() returns data", function() {
			expect(instance.getData()).to.deep.equal(init_data);
		});
	});

	describe("Tree.getAdaptedData()", function() {

		let init_data = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];
		
		let adapted_data = [
			{
				name: 'first',
				address: [0],
				children: [
					{
						name: 'second',
						address: [0, 0],
						children: [
							{
								name: 'third',
								address: [0, 0, 0]
							}
						]
					}
				]
			}
		];

		let instance = new Module({data: init_data});

		it("Instance.getAdaptedData() returns data with addresses", function() {
			expect(instance.getAdaptedData()).to.deep.equal(adapted_data);
		});
	});

	describe("Tree.getNodeIdx(address)", function() {

		let data = [];
		let instance = new Module({data});

		it("For address = undefined returns undefined", function() {
			expect(instance.getNodeIdx()).to.equal(undefined);
		});

		it("For address = null returns undefined", function() {
			expect(instance.getNodeIdx(null)).to.equal(undefined);
		});

		it("For address = [] returns undefined", function() {
			expect(instance.getNodeIdx([])).to.equal(undefined);
		});

		it("For address = [1, 2, 3] returns last: 3", function() {
			expect(instance.getNodeIdx([1,2,3])).to.equal(3);
		});

	});

	describe("Tree.getNode(address)", function() {

		let init_data = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		let third_node = {
			name: 'third'
		};

		let instance = new Module({data: init_data});

		it("For address = undefined returns undefined", function() {
			expect(instance.getNode()).to.deep.equal(undefined);
		});

		it("For address = null returns undefined", function() {
			expect(instance.getNode(null)).to.deep.equal(undefined);
		});

		it("For address = [] returns undefined", function() {
			expect(instance.getNode([])).to.deep.equal(undefined);
		});

		it("For address = [0, 0, 0] returns 'third' node", function() {
			expect(instance.getNode([0, 0, 0])).to.deep.equal(third_node);
		});

	});

	describe("Tree.getParentNode(address)", function() {

		let init_data = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		let third_element_parent = [
			{
				name: 'third'
			}
		];

		let instance = new Module({data: init_data});

		it("For address = undefined returns data-object as parent node", function() {
			expect(instance.getParentNode()).to.deep.equal(init_data);
		});

		it("For address = [] returns data-object as parent node", function() {
			expect(instance.getParentNode([])).to.deep.equal(init_data);
		});

		it("For address = null returns data-object as parent node", function() {
			expect(instance.getParentNode(null)).to.deep.equal(init_data);
		});

		it("For address = [0, 0, 0] returns third element parent as parent node", function() {
			expect(instance.getParentNode([0, 0, 0])).to.deep.equal(third_element_parent);
		});

		it("For address = [0, 0] includes second element in parent node", function() {
			expect(instance.getParentNode([0, 0])).to.deep.include({name: 'second', children: [{name: 'third'}]});
		});

		it("For address = [0] ('first') returns 'first' as name for node[0]", function() {
			assert.equal(instance.getParentNode([0])[0].name, 'first');
		});

		it("For address = [0, 0, 0] ('third') returns 'third' as name for node[0]", function() {
			assert.equal(instance.getParentNode([0, 0, 0])[0].name, 'third');
		});
	});

	describe("Tree.getChildren(address)", function() {

		let init_data = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		let second_element_children = [
			{
				name: 'third'
			}
		];

		let instance = new Module({ data: init_data });

		it("For address = undefined returns data-object as children", function() {
			expect(instance.getChildren()).to.deep.equal(init_data);
		});

		it("For address = null returns data-object as children", function() {
			expect(instance.getChildren(null)).to.deep.equal(init_data);
		});

		it("For address = [] returns data-object as children", function() {
			expect(instance.getChildren([])).to.deep.equal(init_data);
		});

		it("For address = [0, 0, 0] returns undefined as children", function() {
			expect(instance.getChildren([0, 0, 0])).to.deep.equal(undefined);
		});

		it("For address = [0, 0] returns second element children", function() {
			expect(instance.getChildren([0, 0])).to.deep.equal(second_element_children);
		});
	});

	describe("Tree.addNode(el, address)", function() {

		let _el = { name: 'addedElement' };
		let data = [];

		const oldDataState = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		const newDataState_addInside = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						state: 'open',
						children: [
							{
								name: 'third'
							},
							{
								name: 'addedElement'
							}
						]
					}
				]
			}
		];

		const newDataState_addInRoot = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			},
			{
				name: 'addedElement'
			}
		];

		const newDataState_createChildren = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third',
								state: 'open',
								children: [
									{
										name: 'addedElement'
									}
								]
							}
						]
					}
				]
			}
		];

		beforeEach(function() { 
			data = [
				{
					name: 'first',
					children: [
						{
							name: 'second',
							children: [
								{
									name: 'third'
								}
							]
						}
					]
				}
			];
		});

		it("For el = undefined doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.addNode();
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = null doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.addNode(null);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = {} doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.addNode({});
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = { ... }, address = undefined, adds to the root", function() {
			let instance = new Module({ data: data });
			instance.addNode(_el);
			expect(data).to.deep.equal(newDataState_addInRoot);
		});

		it("For el = { ... }, address = [0, 0], adds to address, and sets the state of the parent 'open' ", function() {
			let instance = new Module({ data: data });
			instance.addNode(_el, [0, 0]);
			expect(data).to.deep.equal(newDataState_addInside);
		});

		it("For el = { ... }, address = [0, 0, 0], creates 'children', and sets the state of the parent 'open' ", function() {
			let instance = new Module({ data: data });
			instance.addNode(_el, [0, 0, 0]);
			expect(data).to.deep.equal(newDataState_createChildren);
		});
	});

	describe("Tree.removeNode(address)", function() {

		let data = [];

		const oldDataState = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							{
								name: 'third'
							}
						]
					}
				]
			}
		];

		const newDataState = [
			{
				name: 'first',
				children: [
					{
						name: 'second',
						children: [
							
						]
					}
				]
			}
		];

		beforeEach(function() { 
			data = [
				{
					name: 'first',
					children: [
						{
							name: 'second',
							children: [
								{
									name: 'third'
								}
							]
						}
					]
				}
			];
		});

		it("For address = undefined doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.removeNode();
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = null doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.removeNode(null);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = [] doesn't change data", function() {
			let instance = new Module({ data: data });
			instance.removeNode([]);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = [0, 0, 0] removes node", function() {
			let instance = new Module({ data: data });
			instance.removeNode([0, 0, 0]);
			expect(data).to.deep.equal(newDataState);
		});
	});
});

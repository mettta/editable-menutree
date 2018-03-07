'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Tree as Module} from './tree.js';

let data = [];
let data123 = [
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

let Instance = new Module({data});

describe("Tree", function() {

	describe("Tree. Formal tests", function() {

		it('Tree should be a function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(Instance).to.be.an('object');
		});
	
		it('Instance should contains _data property', function() {
			expect(Instance).to.have.property('_data');
		});

	});

	describe("Tree.getData()", function() {

		it("Instance.getData() returns data", function() {
			assert.equal(Instance.getData(), data);
		});

	});

	describe("Tree.getNodeIdx(address)", function() {

		it("For address = undefined returns undefined", function() {
			expect(Instance.getNodeIdx()).to.equal(undefined);
		});

		it("For address = null returns undefined", function() {
			expect(Instance.getNodeIdx(null)).to.equal(undefined);
		});

		it("For address = [] returns undefined", function() {
			expect(Instance.getNodeIdx([])).to.equal(undefined);
		});

		it("For address = [1, 2, 3] returns last: 3", function() {
			expect(Instance.getNodeIdx([1,2,3])).to.equal(3);
		});

	});

	describe("Tree.getNode(address)", function() {

		let tree = new Module({ data: data123 });

		it("For address = undefined returns undefined", function() {
			expect(tree.getNode()).to.deep.equal(undefined);
		});

		it("For address = null returns undefined", function() {
			expect(tree.getNode(null)).to.deep.equal(undefined);
		});

		it("For address = [] returns undefined", function() {
			expect(tree.getNode([])).to.deep.equal(undefined);
		});

		it("For address = [0, 0, 0] returns {name: 'third'} as node", function() {
			expect(tree.getNode([0, 0, 0])).to.deep.equal({name: 'third'});
		});

	});

	describe("Tree.getParentNode(address)", function() {

		let tree = new Module({ data: data123 });

		it("For address = undefined returns data-object as parent node", function() {
			expect(tree.getParentNode()).to.deep.equal(data123);
		});

		it("For address = [] returns data-object as parent node", function() {
			expect(tree.getParentNode([])).to.deep.equal(data123);
		});

		it("For address = null returns data-object as parent node", function() {
			expect(tree.getParentNode(null)).to.deep.equal(data123);
		});

		it("For address = [0, 0, 0] returns [ {name: 'third'} ] as parent node", function() {
			expect(tree.getParentNode([0, 0, 0])).to.deep.equal([{name: 'third'}]);
		});

		it("For address = [0, 0] includes {name: 'second', children: [ {name: 'third'} ]} in parent node", function() {
			expect(tree.getParentNode([0, 0])).to.deep.include({name: 'second', children: [{name: 'third'}]});
		});

		it("For address = [0] ('first') returns 'first' as name for node[0]", function() {
			assert.equal(tree.getParentNode([0])[0].name, 'first');
		});

		it("For address = [0, 0, 0] ('third') returns 'third' as name for node[0]", function() {
			assert.equal(tree.getParentNode([0, 0, 0])[0].name, 'third');
		});
	});

	describe("Tree.getChildren(address)", function() {

		let tree = new Module({ data: data123 });

		it("For address = undefined returns data-object as children", function() {
			expect(tree.getChildren()).to.deep.equal(data123);
		});

		it("For address = null returns data-object as children", function() {
			expect(tree.getChildren(null)).to.deep.equal(data123);
		});

		it("For address = [] returns data-object as children", function() {
			expect(tree.getChildren([])).to.deep.equal(data123);
		});

		it("For address = [0, 0, 0] returns undefined as children", function() {
			expect(tree.getChildren([0, 0, 0])).to.deep.equal(undefined);
		});

		it("For address = [0, 0] returns [ {name: 'third'} ] as children", function() {
			expect(tree.getChildren([0, 0])).to.deep.equal([{name: 'third'}]);
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
			let tree = new Module({ data: data });
			tree.addNode();
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = null doesn't change data", function() {
			let tree = new Module({ data: data });
			tree.addNode(null);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = {} doesn't change data", function() {
			let tree = new Module({ data: data });
			tree.addNode({});
			expect(data).to.deep.equal(oldDataState);
		});

		it("For el = { ... }, address = undefined, adds to the root", function() {
			let tree = new Module({ data: data });
			tree.addNode(_el);
			expect(data).to.deep.equal(newDataState_addInRoot);
		});

		it("For el = { ... }, address = [0, 0], adds to address, and sets the state of the parent 'open' ", function() {
			let tree = new Module({ data: data });
			tree.addNode(_el, [0, 0]);
			expect(data).to.deep.equal(newDataState_addInside);
		});

		it("For el = { ... }, address = [0, 0, 0], creates 'children', and sets the state of the parent 'open' ", function() {
			let tree = new Module({ data: data });
			tree.addNode(_el, [0, 0, 0]);
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
			let tree = new Module({ data: data });
			tree.removeNode();
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = null doesn't change data", function() {
			let tree = new Module({ data: data });
			tree.removeNode(null);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = [] doesn't change data", function() {
			let tree = new Module({ data: data });
			tree.removeNode([]);
			expect(data).to.deep.equal(oldDataState);
		});

		it("For address = [0, 0, 0] removes node", function() {
			let tree = new Module({ data: data });
			tree.removeNode([0, 0, 0]);
			expect(data).to.deep.equal(newDataState);
		});
	});
});

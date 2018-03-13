'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Menutree as Module} from './menutree.js';

const _el = document.createElement('div');
const _template = () => { return; };
const _tree = {};
const _onItemEvent = () => { return; };

describe("Menutree", function() {
	describe("Menutree. Formal tests", function() {

		const instance = new Module({
			el: _el,
			template: _template,
			tree: _tree, 
			onItemEvent: _onItemEvent
		});

		it('Menutree should be a function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(instance).to.be.an('object');
		});

		it('Instance should contains el property', function() {
			expect(instance).to.have.property('el');
		});

		it('Instance.el should be a HTML Element', function() {
			expect(instance.el).to.be.an.instanceof(Object);
			expect(instance.el).to.be.an.instanceof(HTMLElement);
		});

		it('Instance should contains _onItemEvent property', function() {
			expect(instance).to.have.property('_onItemEvent');
		});

		it('Instance._onItemEvent should be a function', function() {
			expect(instance._onItemEvent).to.be.an('function');
		});

		it('Instance should contains render() function', function() {
			expect(instance).to.have.property('render').an('function');
		});
	});

	// TODO

	// describe("Menutree.removeElement(el)", function() {

	// 	const _test = (options) => {
	// 		return options;
	// 	}

	// 	const instance = new Module({
	// 		el: _el,
	// 		template: _template,
	// 		tree: {
	// 			getAdaptedData: _test,
	// 			getNode: _test,
	// 			removeNode: _test,
	// 			addNode: _test,
	// 		}, 
	// 		onItemEvent: _onItemEvent
	// 	});

	// 	it('Sends element data to Tree method', function() {
	// 		const testElement = document.createElement('div');
	// 		testElement.innerHTML =
	// 		`<li class="targetElement" data-idx="1.2.3"><span class="resivedElement">×</span>Элемент</li>`;
	// 		const resivedElement = testElement.querySelector('.resivedElement');
	// 		const targetElement = testElement.querySelector('.targetElement');
	// 		expect(instance.removeElement(resivedElement)).to.equal(targetElement);
	// 	});
	// });
});
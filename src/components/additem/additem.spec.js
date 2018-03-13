'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Additem as Module} from './additem.js';

let _el = document.createElement('div');
let _template = () => { return; };
let _onSendData = () => { return; };

describe("Additem", function() {
	describe("Additem. Formal tests", function() {

		let instance = new Module({el: _el, template: _template, onSendData: _onSendData});

		it('Additem should be a function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(instance).to.be.an('object');
		});

		it('Instance should contains _el property', function() {
			expect(instance).to.have.property('_el');
		});

		it('Instance._el should be a HTML Element', function() {
			expect(instance._el).to.be.an.instanceof(Object);
			expect(instance._el).to.be.an.instanceof(HTMLElement);
		});

		it('Instance should contains _onSendData property', function() {
			expect(instance).to.have.property('_onSendData');
		});

		it('Instance._onSendData should be a function', function() {
			expect(instance._onSendData).to.be.an('function');
		});

		it('Instance should contains render() function', function() {
			expect(instance).to.have.property('render').an('function');
		});
	});

	describe("Additem.update(element)", function() {

		let instance = new Module({el: _el, template: _template, onSendData: _onSendData});

		it('Sets data from the fields of the received element as Additem data', function() {
			const resivedElement = {
				title: 'Title',
				address: [0,0,0]
			};
			instance.update(resivedElement);
			expect(instance._targetTitle).to.equal(resivedElement.title);
			expect(instance._targetAddress).to.equal(resivedElement.address);
		});
	});

	describe("Additem.reset()", function() {

		let instance = new Module({el: _el, template: _template, onSendData: _onSendData});

		it('Clears out the Additem data', function() {
			instance._targetTitle = 'Title';
			instance._targetAddress = [];
			instance.reset();
			expect(instance._targetTitle).to.equal(null);
			expect(instance._targetAddress).to.equal(null);
		});
	});

	describe("Additem._onSendData(el)", function() {

		const resivedElement = {
			title: 'Title',
			address: [0,0,0]
		};

		it('Sends data from the Additem to callback "onSendData" ', function() {

			let expectedElement = null;

			let instance = new Module({
				el: _el,
				template: _template,
				onSendData: (element, address) => {
					expectedElement = element;
				},
			});

			instance._onSendData(resivedElement);
			expect(expectedElement).to.deep.equal(resivedElement);
		});
	});
});
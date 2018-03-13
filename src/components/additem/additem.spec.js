'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Additem as Module} from './additem.js';

let Instance = new Module({
	el: document.createElement('div'),
	onSendData: (element, address) => {
		return;
		// menutree.addElement(element, address);
	},
});

describe("Additem", function() {
	describe("Additem. Formal tests", function() {

		it('Additem should be a function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(Instance).to.be.an('object');
		});

		it('Instance should contains el property', function() {
			expect(Instance).to.have.property('el');
		});

		it('Instance.el should be a HTML Element', function() {
			expect(Instance.el).to.be.an.instanceof(Object);
			expect(Instance.el).to.be.an.instanceof(HTMLElement);
		});

		it('Instance should contains onSendData property', function() {
			expect(Instance).to.have.property('onSendData');
		});

		it('Instance.onSendData should be a function', function() {
			expect(Instance.onSendData).to.be.an('function');
		});

		it('Instance should contains render() function', function() {
			expect(Instance).to.have.property('render').an('function');
		});
	});

	describe("Additem.update(element)", function() {

		it('Sets data from the fields of the received element as Additem data', function() {
			const resivedElement = {
				title: 'Title',
				address: [0,0,0]
			};
			Instance.update(resivedElement);
			expect(Instance.targetTitle).to.equal(resivedElement.title);
			expect(Instance.targetAddress).to.equal(resivedElement.address);
		});
	});

	describe("Additem.reset()", function() {

		it('Clears out the Additem data', function() {
			Instance.targetTitle = 'Title';
			Instance.targetAddress = [];
			Instance.reset();
			expect(Instance.targetTitle).to.equal(null);
			expect(Instance.targetAddress).to.equal(null);
		});
	});

	describe("Additem._onSendData(el)", function() {

		before(function() {
			Instance.targetAddress = [];
		});

		after(function() {
			Instance.targetAddress = null;
		});

		const resivedElement = {
			title: 'Title',
			address: [0,0,0]
		};

		it('Sends data from the Additem to callback "onSendData" ', function() {

			let expectedElement = null;

			let instance = new Module({
				el: document.createElement('div'),
				onSendData: (element, address) => {
					expectedElement = element;
				},
			});

			instance._onSendData(resivedElement);
			expect(expectedElement).to.deep.equal(resivedElement);
		});
	});
});
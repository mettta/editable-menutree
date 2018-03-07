'use strict';

const assert = chai.assert;
const expect = chai.expect;

import {Form as Module} from './form.js';

let Instance = new Module({
	el: document.createElement('div'),
	onSendData: (element, address) => {
		return;
		// menutree.addElement(element, address);
	},
});

describe("Form", function() {
	describe("Form. Formal tests", function() {

		it('Form should be a function', function() {
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
});
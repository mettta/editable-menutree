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

		it('Form should be an function', function() {
			expect(Module).to.be.an('function');
		});
	
		it('Instance should be an object', function() {
			expect(Instance).to.be.an('object');
		});

		it('Instance should contains el property', function() {
			expect(Instance).to.have.property('el');
		});

		it('Instance should contains onSendData property', function() {
			expect(Instance).to.have.property('onSendData');
		});

		it('onSendData should be an function', function() {
			expect(Instance.onSendData).to.be.an('function');
		});

		it('Instance should contains render() function', function() {
			expect(Instance).to.have.property('render').an('function');
		});
		
		it('el exists -------- TODO -------', function() {
			// console.log(Instance.el);
			// console.log(typeof Instance.el);
			
			// expect(Instance.el).to.be.an.instanceof('object');
			// expect(Instance.el).to.be.an('object');
		});

	});
});
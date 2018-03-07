'use strict';

// var assert = chai.assert;

import {Tree} from './../src/components/tree/tree.js';

const tree = new Tree({
	data: []
});

// const expect = chai.expect;

// describe('test', function() {
//     it('hypotenuse 5, 12', function() { expect(MyLib.hypotenuse(5, 12)).to.equal(13); });
//     it('hypotenuse 8, 15', function() { expect(MyLib.hypotenuse(8, 15)).to.equal(17); });
// });

describe("Tree", function() {

	before(function() {  });

	describe("Tree.getNodeIdx", function() {

		it("Для массива индексов [1,2,3] возвращает последний - 3", function() {
			chai.assert.equal(tree.getNodeIdx([1,2,3]), 3);
		});

	});
});

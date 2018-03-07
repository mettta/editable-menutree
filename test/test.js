describe("Tree", function() {

	before(function() {  });

	describe("Tree.getNodeIdx", function() {

		it("Для массива индексов [1,2,3] возвращает последний - 3", function() {
			assert.equal(tree.getNodeIdx([1,2,3]), 3);
		});

	});
});




// function makeTest(x) {
// 	var expected = x * x * x;
// 	it("при возведении " + x + " в степень 3 результат: " + expected, function() {
// 		assert.equal(pow(x, 3), expected);
// 	});
// 	}

// 	for (var x = 1; x <= 5; x++) {
// 	makeTest(x);
// }
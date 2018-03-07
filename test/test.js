describe("Tree", function() {

	before(function() {  });

	describe("Tree.getNodeIdx", function() {

		it("Для массива индексов [1,2,3] возвращает последний - 3", function() {
			assert.equal(tree.getNodeIdx([1,2,3]), 3);
		});

	});
});

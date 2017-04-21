roofs = [
	[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1],
	[1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]
]

m = new Machine({
	width: 101,
	height: 101,
	size: 5,
	container: 'container',
	colors: ['white', '#57b13b']
})

cell = {
	vision: 1,
	process: function(n) {
		if (this.y == row) {
			var left = set(n, { y: this.y - 1, x: this.x - 1 })
			left = left.length && left[0].color ? 1 : 0
			var center = set(n, { y: this.y - 1, x: this.x })
			center = center.length && center[0].color ? 1: 0
			var right = set(n, { y: this.y - 1, x: this.x + 1 })
			right = right.length && right[0].color ? 1 : 0
			for (var i = 0; i < 8; ++i)
				if (left == roofs[i][0] && center == roofs[i][1] && right == roofs[i][2]) {
					this.color = parseInt(rule[7 - i])
					break
				}
		}
	}
}

apply()

function apply() {
	row = 1

	rule = (document.getElementById('rule').value >>> 0).toString(2)
	while (rule.length < 8) rule = '0' + rule

	m.init([
		[cell, 1, { color: 0 }]
	])

	m.grid[Math.floor(m.width / 2)].color = 1

	m.start(100, function() { ++row })
}

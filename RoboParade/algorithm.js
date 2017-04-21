M = 20

m = new Machine({
	width: 100,
	height: 100,
	size: 6,
	container: 'container',
	colors: ['white', '#57b13b'],
	moving: true
})

cell = {
	vision: 1,
	process: function(n) {
		this.top = !set(n, { x: this.x, y: this.y - 1, color: 1 }).length
		this.left = !set(n, { x: this.x - 1, y: this.y, color: 1 }).length
		this.down = !set(n, { x: this.x, y: this.y + 1, color: 1 }).length
		this.right = !set(n, { x: this.x + 1, y: this.y, color: 1 }).length
	},
	move: function(n) {
		var x = this.x, y = this.y

		if (this.x > 0 && this.left && !this.r)
			--x
		else if (this.y > 0 && this.top)
			--y
		else if (this.y > M - 1 && this.right)
			++x

		if (!this.x)
			this.r = true
		
		if (this.color)	
			return { x: x, y: y, instead: { color: 0 }, priority: 0 }
	}
}

m.init([
	[cell, 0.8, { color: 0 }],
	[cell, 0.2, { color: 1 }]
])

m.start(1)
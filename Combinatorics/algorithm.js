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
		
	},
	move: function(n) {

	}
}

m.init([
	[cell, 1, { color: 0 }]
])

m.start(1000)
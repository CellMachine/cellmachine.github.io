a = 2, b = 1

m = new Machine({
	width: 101,
	height: 101,
	size: 6,
	container: 'container',
	colors: ['white', '#57b13b', 'red'],
	moving: true
})

k = 50

feromon = new Rainbow()
feromon.setSpectrum('yellow', '0b243b')
feromon.setNumberRange(0, k)
for (var i = 0; i <= k; ++i)
	m.colors[3+i] = '#' + feromon.colourAt(i)

cell = {
	vision: 1,
	process: function(n) {
		this.toX = this.x
		this.toY = this.y

		if (this.color > 3)
			this.color--

		this.TAU = this.color - 2

		if (this.color == 1) {

			n = neimann(n, this)
			if (set(n, { color: 2 }).length)
				this.back = true

			if (this.back) {
				if (this.route.length) {
					var step = this.route.pop()
					this.toX = m.grid[step].x
					this.toY = m.grid[step].y
					if (m.grid[step].color == 1)
						this.color = k
				} else {
					this.color = k
				}
			} else {
				n = passable(n, this)

				var p = new Array(n.length)
				var s = 0
				for (var i = 0; i < n.length; ++i)
					s += n[i].TAU
				for (var i = 0; i < n.length; ++i)
					p[i] = n[i].TAU / s

				var rand = Math.random()
				s = 0
				var best = n[0]
				for (var i = 0; i < p.length; ++i)
					if (s <= rand && rand <= s + p[i]) {
						best = n[i]
						break
					} else
						s += p[i]

				this.toX = best.x
				this.toY = best.y

				this.route.push(this.id)
			}
		}
	},
	move: function(n) {
		if (this.color == 1)
			return { x: this.toX, y: this.toY, instead: { color: k }, priority: this.back ? 1 : 0 }
	}
}

m.init([
	[cell, 1, { color: 0 }]
])

m.grid[id(50, 50)].color = 1
m.grid[id(50, 70)].color = 2

verLine(50, 51, 69)
horLine(51, 51, 70)
verLine(70, 51, 70)
horLine(70, 51, 70)
horLine(51, 30, 49)
verLine(30, 51, 70)
horLine(70, 30, 49)

for (var i = 0; i < m.grid.length; ++i) {
	m.grid[i].TAU = 1
	m.grid[i].route = []
	m.grid[i].back = false
}

appearInterval = 40
step = 0
m.start(100, function() {
	step++
	if (!(step % appearInterval)) {
		m.grid[id(50, 50)].color = 1
		m.grid[id(50, 50)].route = []
		m.grid[id(50, 50)].back = false
	}
})

function verLine(x, s, f) {
	for (var i = s; i <= f; ++i)
		m.grid[id(x, i)].color = 3
}

function horLine(y, s, f) {
	for (var i = s; i <= f; ++i)
		m.grid[id(i, y)].color = 3
}

function id(x, y) {
	return y * m.width + x
}

function neimann(n, self) {
	return set(n, function(cell, self) {
		return Math.abs(cell.x - self.x) + Math.abs(cell.y - self.y) <= 1
	}, self)
}

function passable(n, self) {
	return set(n, function(cell, self) {
		var flag = cell.color
		for (var i = 0; i < self.route.length; ++i)
			if (cell.id == self.route[i])
				return false

		if (flag)
			return true
	}, self)
}

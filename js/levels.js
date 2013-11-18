var levelIndex = 0;
var levels = [
{ // lvl 1
	scene: {
		width: 400,
		height: 400
	},
	hero: {
		x: 10,
		y: 10
	},
	enemys: [{
		x: 100,
		y: 100,
		type: 0
	},
	{
		x: 200,
		y: 50,
		type: 1
	},
	{
		x: 150,
		y: 50,
		type: 2
	}],
	target: {
		x: 280,
		y: 100 - 10,
		size: 40,
		color: "#ffff00"
	}
},
{ // lvl 2
	scene: {
		width: 400,
		height: 500
	},
	hero: {
		x: 10,
		y: 10
	},
	enemys: [{
		x: 100,
		y: 100,
		type: 0,
		subtype: 1
	},{
		x: 100,
		y: 200,
		type: 0,
		subtype: 1
	},{
		x: 100,
		y: 300,
		type: 0,
		subtype: 1
	},
	{
		x: 200 - 20,
		y: 50,
		type: 1
	},
	{
		x: 150,
		y: 50,
		type: 2
	}],
	target: {
		x: 200 - 20,
		y: 500 - 20,
		size: 20,
		color: "#0FF"
	}
},
{ // lvl 3
	scene: {
		width: 800,
		height: 600
	},
	hero: {
		x: 10,
		y: 10
	},
	enemys: [{
		x: 100,
		y: 100,
		type: 0,
		subtype: 1
	},{
		x: 100,
		y: 200,
		type: 0,
		subtype: 1
	},{
		x: 100,
		y: 300,
		type: 0,
		subtype: 1
	},
	{
		x: 200 - 20,
		y: 50,
		type: 1
	},
	{
		x: 150,
		y: 50,
		type: 2
	}],
	target: {
		x:  200,
		y: 200,
		size: 20,
		color: "#ffff00"
	}
}
]
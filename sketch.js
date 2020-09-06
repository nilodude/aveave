var cols, rows;
var scl = 1;
var w = 1400;
var h = 1000;

var flying = 0;
var rotY = 14;
var terrain = [];
var spectrum = [];

function preload() {
	sound = loadSound('scorpio-demo02.mp3');
}

function setup() {
	let cnv = createCanvas(600, 500, WEBGL);
	camera();

	cols = 200;
	rows = cols;

	for (var x = 0; x < cols; x++) {
		terrain[x] = [];
		for (var y = 0; y < rows; y++) {
			terrain[x][y] = 0; //specify a default value for now
		}
	}

	cnv.mouseClicked(togglePlay);
	fft = new p5.FFT(0.3, 64);
	sound.amp(0.4);
	fft.smooth(0.4)
}

function draw() {
	orbitControl();


	flying++;
	var yoff = flying;
	// for (var y = 0; y < rows; y++) {
	spectrum.push([]);
	spectrum.push(fft.analyze());
	console.log(spectrum, frameCount);
	var xoff = 0;
	for (var x = 0; x < 50; x++) {
		// terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
		terrain[x][frameCount] = map(spectrum[x], 10, 255, -50, -10)
		xoff += 0.2;
	}
	yoff += 0.2;
	// }

	background(0);
	rotateX(PI / 3);

	var R = map(sin(47 * frameCount / 10000), 0, 1, 100, 200);
	var G = map(0.5 * sin(9 * frameCount / 10000), 0, 1, 100, 200);
	var B = map(0.8 * sin(55 * frameCount / 10000), 0, 1, 100, 200);

	fill(R, G, B, 50);
	translate(0, 0, 0);
	for (var y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		let decre = Math.log(y ^ (1 / 2) + 1);
		for (var x = 0; x < 64; x++) {
			// rotateY(PI * rotY++); // añade lineas to raras
			vertex(x * scl, y * scl, terrain[x][y]);
			vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
		}
		endShape();
	}

	if (spectrum.length > rows - 5) {
		spectrum.splice(0, 1);
	}
}
function togglePlay() {
	if (sound.isPlaying()) {
		sound.pause();
	} else {
		sound.loop();
	}
}

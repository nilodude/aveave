var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;
var rotY = 14;
var terrain = [];
let spectrum = null;

function preload() {
	sound = loadSound('scorpio-demo02.mp3');
}

function setup() {
	let cnv = createCanvas(600, 600, WEBGL);
	cols = 64;
	rows = 64;

	for (var x = 0; x < cols; x++) {
		terrain[x] = [];
		for (var y = 0; y < rows; y++) {
			terrain[x][y] = 0; //specify a default value for now
		}
	}

	cnv.mouseClicked(togglePlay);
	fft = new p5.FFT(0.3, cols);
	sound.amp(0.2);

}

function draw() {
	spectrum = fft.analyze();

	console.log(spectrum);
	flying += 0.1;
	var yoff = flying;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
			xoff += 0.2;
		}
		yoff += 0.2;
	}

	background(0);
	translate(0, 50);
	rotateX(PI / 3);

	var R = map(sin(47 * frameCount / 10000), 0, 1, 100, 200);
	var G = map(0.5 * sin(9 * frameCount / 10000), 0, 1, 100, 200);
	var B = map(0.8 * sin(55 * frameCount / 10000), 0, 1, 100, 200);

	fill(R, G, B, 50);
	translate(-w / 2, -h / 2);
	for (var y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (var x = 0; x < cols; x++) {
			// rotateY(PI * rotY++); // añade lineas to raras
			vertex(x * scl, y * scl, terrain[x][y]);
			vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);

		}
		endShape();
	}
}
function togglePlay() {
	if (sound.isPlaying()) {
		sound.pause();
	} else {
		sound.loop();
	}
}
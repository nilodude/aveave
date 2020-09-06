var hist = [];

function preload() {
	sound = loadSound('scorpio-demo02.mp3');
}

function setup() {
	let cnv = createCanvas(700, 500, WEBGL);
	cnv.mouseClicked(togglePlay);
	fft = new p5.FFT(0.8, 512);
	fft.smooth();
	sound.amp(0.2);
}

function draw() {

	camera(mouseX - width / 2, mouseY - height / 2, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	background(0);
	translate(-width / 2, -height / 2, -500)

	let spectrum = fft.analyze();
	hist.push(spectrum);
	noStroke();
	fill(255, 0, 255);
	for (let i = 0; i < spectrum.length; i++) {
		let x = map(i, 0, spectrum.length, 0, width);
		let h = -height + map(spectrum[i], 0, 255, height, 0);
		rect(x, height, width / spectrum.length, h)
	}

	let waveform = fft.waveform();
	// noFill();
	beginShape();
	stroke(20);
	for (let i = 0; i < waveform.length; i++) {
		let x = map(i, 0, waveform.length, 0, width);
		let y = map(waveform[i], -1, 1, 0, height);
		vertex(x, y);
	}
	endShape();

	// text('tus muertos', 20, 20);
}

function togglePlay() {
	if (sound.isPlaying()) {
		sound.pause();
	} else {
		sound.loop();
	}
}
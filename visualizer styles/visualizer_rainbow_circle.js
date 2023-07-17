function main() {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	class Bar {
		constructor(x, y, width, height, color, index) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.color = color;
			this.index = index;
		}
		update(micInput) {
			const sound = micInput * 1000 + 110;

			if (sound > this.height) {
				this.height = sound;
			} else if (this.height > 110) {
				this.height -= this.height * 0.013;
			}
		}
		draw(context) {
			context.strokeStyle = this.color;
			context.lineWidth = 2;
			context.save();
			context.translate(canvas.width / 2, canvas.height / 2);
			context.rotate(this.index * 0.02455);
			context.beginPath();
			context.moveTo(100, 100);
			context.lineTo(this.height, this.height);
			context.stroke();

			context.restore();
		}
	}
	const microphone = new Microphone();
	let bars = [];
	let barWidth = canvas.width / 128;
	function createBars() {
		for (let i = 0; i < 256; i++) {
			let color = "hsl(" + i * 1.40625 + ", 100%, 50%)";
			bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 0, color, i));
		}
	}
	createBars();
	function animate() {
		if (microphone.initialized) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const samples = microphone.getSamples();
			bars.forEach(function (bar, i) {
				bar.update(samples[i]);
				bar.draw(ctx);
			});
		}

		requestAnimationFrame(animate);
	}
	animate();
}

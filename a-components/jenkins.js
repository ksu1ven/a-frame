import "aframe";

export const registerJenkins = () => {
	AFRAME.registerComponent("jenkins", {
		init() {
			this.sceneEl = document.querySelector("a-scene");
			this.hi = this.hi.bind(this);
			this.bue = this.bue.bind(this);

			this.el.addEventListener("model-loaded", () => {
				this.el.addEventListener("hi", this.hi);

				this.el.addEventListener("bue", this.bue);
			});
		},
		remove() {
			this.el.removeEventListener("model-loaded", () => {
				this.el.removeEventListener("hi", this.hi);

				this.el.removeEventListener("bue", this.bue);
			});
		},
		hi() {
			const model = this.el.object3D;

			if (!model) return;

			let sound = document.querySelector("a-sound");
			if (!sound) {
				this.sound = document.createElement("a-sound");
				this.sound.setAttribute(
					"src",
					"url(/music/bring-me-the-horizon-can-you-feel-my-heart.mp3)"
				);

				this.sound.setAttribute("autoplay", "true");
				this.sound.setAttribute("loop", "true");
				this.sound.setAttribute("volume", "0.5");

				this.sceneEl.appendChild(this.sound);
			} else sound.play();

			model.traverse((child) => {
				if (child.name === "mixamorigRightHand") {
					this.hand = child;

					this.hand.rotation.x += 4;
				}
			});
		},
		bue() {
			const model = this.el.object3D;

			if (!model) return;

			let sound = document.querySelector("a-sound");
			if (sound) sound.pause();

			model.traverse((child) => {
				if (child.name === "mixamorigRightHand") {
					this.hand = child;

					this.hand.rotation.x -= 4;
				}
			});
		},
	});
};

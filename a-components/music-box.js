import "aframe";
import { guiParams } from "../js/gui";

export const registerMusicBox = () => {
	AFRAME.registerComponent("music-box", {
		init() {
			this.sceneEl = document.querySelector("a-scene");
			this.sound = document.querySelector("a-sound");
			this.onClick = this.onClick.bind(this);

			guiParams.addMusic();
			guiParams.addColor(this.el);

			this.el.addEventListener("click", this.onClick);
		},

		remove() {
			if (sound) {
				this.sound.stop();
			}

			this.el.removeEventListener("click", this.onClick);
		},

		onClick() {
			if (!this.sound) {
				this.sound = document.createElement("a-sound");
				this.sound.setAttribute(
					"src",
					"url(/music/bring-me-the-horizon-can-you-feel-my-heart.mp3)"
				);

				if (guiParams.sceneMusic) {
					this.sound.setAttribute("autoplay", "true");
					this.sound.setAttribute("loop", "true");
					this.sound.setAttribute("volume", "0.5");
					this.sound.play();
				} else {
					this.sound.pause();
				}

				this.sceneEl.appendChild(this.sound);
			}
		},
	});
};

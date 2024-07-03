import "aframe";
import { guiParams } from "../js/gui";

export const registerMusicBox = () => {
	AFRAME.registerComponent("music-box", {
		init() {
			this.sceneEl = document.querySelector("a-scene");
			this.sound = document.querySelector("#sound");
			this.onClick = this.onClick.bind(this);

			guiParams.addMusic();
			guiParams.addColor(this.el);

			this.el.addEventListener("click", this.onClick);
		},

		remove() {
			if (this.sound) {
				this.sound.components.sound.stopSound();
			}
			this.el.removeEventListener("click", this.onClick);
		},

		onClick() {
			if (this.sound) {
				if (guiParams.sceneMusic) {
					this.sound.components.sound.playSound();
				} else {
					this.sound.components.sound.pauseSound();
				}
			}
		},
	});
};

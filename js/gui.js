import * as THREE from "three";
import GUI from "lil-gui";

export const gui = new GUI();

class GuiParams {
	constructor() {
		this.primitiveColorsObj = {
			string: "#FFA500",
		};
		this.sceneMusic = true;
		this.modelRotation = true;
		this.modelGreeting = false;
		this.fieldsObject = {
			rotationButton: true,
			musicButton: true,
			greetingButton: false,
		};
	}

	addColor(mesh) {
		gui.addColor(this.primitiveColorsObj, "string")
			.name("Color of music cube")
			.onChange((value) => {
				mesh.setAttribute("material", "color", new THREE.Color(value));
			});
	}

	addRotation() {
		gui.add(this.fieldsObject, "rotationButton")
			.name("Rotation of model")
			.onChange((value) => {
				this.modelRotation = value;
			});
	}

	addGreeting() {
		gui.add(this.fieldsObject, "greetingButton")
			.name("Greeting")
			.onChange((value) => {
				this.modelGreeting = value;
				const eventHi = new Event("hi");
				const eventBye = new Event("bye");
				const element = document.querySelector("#model");
				this.modelRotation = value;
				if (value && element) {
					element.dispatchEvent(eventHi);
				} else if (element) {
					element.dispatchEvent(eventBye);
				}
			});
	}

	addMusic() {
		gui.add(this.fieldsObject, "musicButton")
			.name("Music can play")
			.onChange((value) => {
				this.sceneMusic = value;

				const sound = document.querySelector("#sound");
				if (sound) {
					if (value) sound.components.sound.playSound();
					else sound.components.sound.pauseSound();
				}
			});
	}
}

export const guiParams = new GuiParams();

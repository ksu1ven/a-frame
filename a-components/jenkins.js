import "aframe";
import gsap from "gsap";
import { guiParams } from "../js/gui";

export const registerJenkins = () => {
	AFRAME.registerComponent("jenkins", {
		init() {
			this.model = null;
			this.animatedModel = false;
			this.sound = document.querySelector("#sound");
			this.sceneEl = document.querySelector("a-scene");

			this.hand = null;
			this.handInitialRotation = { x: 0, y: 0, z: 0 };

			this.head = null;
			this.headInitialRotationX = 0;
			this.headRotation = "down";

			this.fingerMiddle = null;
			this.fingerMiddleInitialRotationX = 0;
			this.fingerRing = null;
			this.fingerRingInitialRotationX = 0;

			this.fingerMiddle2 = null;
			this.fingerMiddle2InitialRotationX = 0;
			this.fingerRing2 = null;
			this.fingerRing2InitialRotationX = 0;

			this.fingerPinky = null;
			this.fingerPinkyInitialRotationX = 0;

			this.hi = this.hi.bind(this);
			this.bye = this.bye.bind(this);
			this.rock = this.rock.bind(this);

			this.el.addEventListener("model-loaded", () => {
				guiParams.addRotation();
				guiParams.addGreeting();
				const model = this.el.object3D;

				if (!model) return;

				model.traverse((child) => {
					if (child.name === "mixamorigRightForeArm") {
						this.hand = child;
						this.handInitialRotation.x = child.rotation.x;
						this.handInitialRotation.y = child.rotation.y;
						this.handInitialRotation.z = child.rotation.z;
					}
					if (child.name === "mixamorigNeck") {
						this.head = child;
						this.headInitialRotationX = child.rotation.x;
					}

					if (child.name === "mixamorigRightHandMiddle1") {
						this.fingerMiddle = child;
						this.fingerMiddleInitialRotationX = child.rotation.x;
					}

					if (child.name === "mixamorigRightHandRing1") {
						this.fingerRing = child;
						this.fingerRingInitialRotationX = child.rotation.x;
					}

					if (child.name === "mixamorigRightHandMiddle2") {
						this.fingerMiddle2 = child;
						this.fingerMiddle2InitialRotationX = child.rotation.x;
					}

					if (child.name === "mixamorigRightHandRing2") {
						this.fingerRing2 = child;
						this.fingerRing2InitialRotationX = child.rotation.x;
					}

					if (child.name === "mixamorigRightHandPinky1") {
						this.fingerPinky = child;
						this.fingerPinkyInitialRotationX = child.rotation.x;
					}
				});

				this.el.addEventListener("hi", this.hi);
				this.el.addEventListener("bye", this.bye);
			});
		},
		remove() {
			this.el.removeEventListener("model-loaded", () => {
				this.el.removeEventListener("hi", this.hi);

				this.el.removeEventListener("bue", this.bye);
			});
		},

		rock() {
			if (this.animatedModel) requestAnimationFrame(this.rock);
			if (this.headRotation === "down") {
				this.head.rotation.x += 0.05;
				if (this.head.rotation.x >= 1) this.headRotation = "up";
			} else if (this.headRotation === "up") {
				this.head.rotation.x -= 0.05;
				if (this.head.rotation.x <= 0) this.headRotation = "down";
			}
		},

		hi() {
			this.animatedModel = true;
			this.sound.components.sound.playSound();
			gsap.to(this.hand.rotation, {
				x: -2.3293,
				y: -3.78923,
				z: -0.15708,
				duration: 0.5,
			});
			gsap.to(this.fingerMiddle.rotation, {
				x: 1,
				duration: 0.5,
			});
			gsap.to(this.fingerMiddle2.rotation, {
				x: 1.8,
				duration: 0.5,
			});
			gsap.to(this.fingerRing.rotation, {
				x: 1,
				duration: 0.5,
			});
			gsap.to(this.fingerRing2.rotation, {
				x: 1.8,
				duration: 0.5,
			});
			gsap.to(this.fingerPinky.rotation, {
				x: -0.3,
				duration: 0.5,
			});

			this.rock();
		},
		bye() {
			this.animatedModel = false;
			this.sound.components.sound.pauseSound();
			gsap.to(this.hand.rotation, {
				x: this.handInitialRotation.x,
				y: this.handInitialRotation.y,
				z: this.handInitialRotation.z,
				duration: 0.5,
			});

			gsap.to(this.head.rotation, {
				x: this.headInitialRotationX,
				duration: 0.5,
			});

			gsap.to(this.fingerMiddle.rotation, {
				x: this.fingerMiddle2InitialRotationX,
				duration: 0.5,
			});
			gsap.to(this.fingerMiddle2.rotation, {
				x: this.fingerMiddleInitialRotationX,
				duration: 0.5,
			});
			gsap.to(this.fingerRing.rotation, {
				x: this.fingerRingInitialRotationX,
				duration: 0.5,
			});
			gsap.to(this.fingerRing2.rotation, {
				x: this.fingerRing2InitialRotationX,
				duration: 0.5,
			});
			gsap.to(this.fingerPinky.rotation, {
				x: this.fingerPinkyInitialRotationX,
				duration: 0.5,
			});
		},
	});
};

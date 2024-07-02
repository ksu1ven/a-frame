import "aframe";
import { guiParams } from "../js/gui";

export const registerModelRotation = (screenX, screenY) => {
	AFRAME.registerComponent("model-rotation", {
		schema: {
			speed: { type: "number", default: 100 },
		},
		init() {
			this.sceneEl = document.querySelector("a-scene");

			this.isMouseDown = false;
			this.previousMousePosition = { x: 0, y: 0 };

			this.handleMouseDown = this.handleMouseDown.bind(this);
			this.handleMouseMove = this.handleMouseMove.bind(this);
			this.handleMouseUp = this.handleMouseUp.bind(this);
			this.handleTouchStart = this.handleTouchStart.bind(this);
			this.handleTouchMove = this.handleTouchMove.bind(this);
			this.handleTouchEnd = this.handleTouchEnd.bind(this);
			this.addEventListeners();
		},

		remove() {
			const canvas = document.querySelector("a-scene").canvas;
			if (canvas) {
				canvas.removeEventListener("mousedown", this.handleMouseDown);
				canvas.removeEventListener("mousemove", this.handleMouseMove);
				canvas.removeEventListener("mouseup", this.handleMouseUp);
				canvas.removeEventListener("touchstart", this.handleTouchStart);
				canvas.removeEventListener("touchmove", this.handleTouchMove);
				canvas.removeEventListener("touchend", this.handleTouchEnd);
			}
		},
		addEventListeners() {
			const canvas = document.querySelector("a-scene").canvas;
			if (canvas) {
				canvas.addEventListener("mousedown", this.handleMouseDown);
				canvas.addEventListener("mousemove", this.handleMouseMove);
				canvas.addEventListener("mouseup", this.handleMouseUp);
				canvas.addEventListener("touchstart", this.handleTouchStart);
				canvas.addEventListener("touchmove", this.handleTouchMove);
				canvas.addEventListener("touchend", this.handleTouchEnd);
			}
		},
		checkCorrectIntersect(event, value) {
			const raycaster = new THREE.Raycaster();
			const mouse = new THREE.Vector2();

			const mouseEvent = event instanceof MouseEvent;
			const touchEvent = event instanceof TouchEvent;

			if (mouseEvent) {
				mouse.x = (event.clientX / screenX) * 2 - 1;
				mouse.y = -(event.clientY / screenY) * 2 + 1;
			} else if (touchEvent) {
				mouse.x = (event.changedTouches[0].clientX / screenX) * 2 - 1;
				mouse.y = -(event.changedTouches[0].clientY / screenY) * 2 + 1;
			}

			const camera = this.sceneEl.camera;
			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObject(
				this.el.object3D,
				true
			);

			if (intersects.length > 0) {
				intersects.forEach((intersect) => {
					if (intersect.object.name === "Body_monke1_5001mesh001") {
						this.isMouseDown = true;
						this.previousMousePosition = value;
					}
				});
			}
		},
		handleMouseDown(event) {
			if (guiParams.modelRotation)
				this.checkCorrectIntersect(event, {
					x: event.clientX,
					y: event.clientY,
				});
		},
		handleMouseMove(event) {
			if (!this.isMouseDown) return;
			const deltaMove = {
				x: event.clientX - this.previousMousePosition.x,
				y: event.clientY - this.previousMousePosition.y,
			};
			const rotation = this.el.getAttribute("rotation");
			rotation.y += deltaMove.x * this.data.speed * 0.1;
			this.el.setAttribute("rotation", rotation);
			this.previousMousePosition = { x: event.clientX, y: event.clientY };
		},
		handleMouseUp() {
			this.isMouseDown = false;
		},
		handleTouchStart(event) {
			if (event.touches.length === 1 && guiParams.modelRotation) {
				this.checkCorrectIntersect(event, {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
				});
			}
		},
		handleTouchMove(event) {
			if (!this.isMouseDown) return;
			if (event.touches.length === 1) {
				const deltaMove = {
					x: event.touches[0].clientX - this.previousMousePosition.x,
					y: event.touches[0].clientY - this.previousMousePosition.y,
				};
				const rotation = this.el.getAttribute("rotation");
				rotation.y += deltaMove.x * this.data.speed * 0.1;
				this.el.setAttribute("rotation", rotation);
				this.previousMousePosition = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
				};
			}
		},
		handleTouchEnd() {
			this.isMouseDown = false;
		},
	});
};

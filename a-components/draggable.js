import "aframe";

export const registerDraggable = (screenX, screenY) => {
	const aPlane = document.querySelector("a-plane");

	let { x } = aPlane.object3D.position;

	AFRAME.registerComponent("draggable", {
		schema: {
			speed: { type: "number", default: 0.1 },
			minX: {
				type: "number",
				default: x - aPlane.getAttribute("width") / 2,
			},
			maxX: {
				type: "number",
				default: x + aPlane.getAttribute("width") / 2,
			},
			minZ: {
				type: "number",
				default: -4 - aPlane.getAttribute("height") / 2,
			},
			maxZ: {
				type: "number",
				default: -4 + aPlane.getAttribute("height") / 2,
			},
		},
		init: function () {
			this.sceneEl = document.querySelector("a-scene");

			this.isDragging = false;
			this.targetPosition = new THREE.Vector3();
			this.previousPosition = new THREE.Vector3();
			this.lerpFactor = 0.1;

			this.onMouseDown = this.onMouseDown.bind(this);
			this.onMouseMove = this.onMouseMove.bind(this);
			this.onMouseUp = this.onMouseUp.bind(this);
			this.onTouchStart = this.onTouchStart.bind(this);
			this.onTouchMove = this.onTouchMove.bind(this);
			this.onTouchEnd = this.onTouchEnd.bind(this);

			const canvas = document.querySelector("a-scene").canvas;

			if (canvas) {
				canvas.addEventListener("mousedown", this.onMouseDown);
				canvas.addEventListener("mousemove", this.onMouseMove);
				canvas.addEventListener("mouseup", this.onMouseUp);
				canvas.addEventListener("touchstart", this.onTouchStart);
				canvas.addEventListener("touchmove", this.onTouchMove);
				canvas.addEventListener("touchend", this.onTouchEnd);
			}
		},
		remove() {
			const canvas = document.querySelector("a-scene").canvas;

			if (canvas) {
				canvas.removeEventListener("mousedown", this.onMouseDown);
				canvas.removeEventListener("mousemove", this.onMouseMove);
				canvas.removeEventListener("mouseup", this.onMouseUp);
				canvas.removeEventListener("touchstart", this.onTouchStart);
				canvas.removeEventListener("touchmove", this.onTouchMove);
				canvas.removeEventListener("touchend", this.onTouchEnd);
			}
		},

		checkCorrectIntersect(event, value) {
			this.isDragging = false;
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
						this.isDragging = true;
						this.previousMousePosition = value;
					}
				});
			}
		},
		onMouseDown(event) {
			this.checkCorrectIntersect(event, {
				x: event.clientX,
				y: event.clientY,
			});
		},
		onMouseMove(event) {
			if (!this.isDragging) return;
			this.targetPosition.set(event.clientX, event.clientY, 0);
		},
		onMouseUp() {
			this.isDragging = false;
		},
		onTouchStart(event) {
			if (event.touches.length === 1) {
				this.checkCorrectIntersect(event, {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
				});
			}
		},
		onTouchMove(event) {
			if (!this.isDragging || event.touches.length !== 1) return;
			this.targetPosition.set(
				event.touches[0].clientX,
				event.touches[0].clientY,
				0
			);
		},
		onTouchEnd() {
			this.isDragging = false;
		},
		tick(time, timeDelta) {
			if (this.isDragging) {
				const delta = this.targetPosition
					.clone()
					.sub(this.previousPosition);
				const lerpDelta = delta.multiplyScalar(
					this.lerpFactor * (timeDelta / 16.67)
				);

				delta.multiplyScalar(this.lerpFactor);

				const position = this.el.object3D.position;

				position.x = Math.max(
					this.data.minX,
					Math.min(this.data.maxX, position.x + lerpDelta.x)
				);

				position.z = Math.max(
					this.data.minZ,
					Math.min(this.data.maxZ, position.z + lerpDelta.y)
				);

				this.previousPosition.copy(this.targetPosition);
			}
		},
	});
};

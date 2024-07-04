import "aframe";

export const registerPlane = () => {
	AFRAME.registerComponent("plane", {
		init() {
			this.sceneEl = document.querySelector("a-scene");
			this.onClick = this.onClick.bind(this);

			this.el.addEventListener("click", this.onClick);
		},
		remove() {
			this.el.removeEventListener("click", this.onClick);
		},
		onClick(event) {
			const raycaster = new THREE.Raycaster();
			const mouse = new THREE.Vector2();

			const mouseEvent = event.detail?.mouseEvent;
			const touchEvent = event.detail?.touchEvent;

			if (mouseEvent) {
				mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
				mouse.y = -(mouseEvent.clientY / window.innerHeight) * 2 + 1;
			} else if (touchEvent) {
				mouse.x =
					(touchEvent.changedTouches[0].clientX / window.innerWidth) *
						2 -
					1;
				mouse.y =
					-(
						touchEvent.changedTouches[0].clientY /
						window.innerHeight
					) *
						2 +
					1;
			}

			const camera = this.sceneEl.camera;
			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObject(
				this.el.object3D,
				true
			);

			if (intersects.length > 0) {
				const intersect = intersects[0];
				const intersectPoint = intersect.point;

				if (!document.querySelector("#model")) {
					const model = document.createElement("a-entity");
					model.setAttribute("id", "model");
					model.setAttribute("gltf-model", "#jenkinsModel");
					model.setAttribute("position", intersectPoint);
					model.setAttribute("rotative", true);
					model.setAttribute("class", "raycastable");
					model.setAttribute("jenkins", true);
					model.setAttribute("levitate", true);
					model.setAttribute("draggable", true);
					model.setAttribute("shadow", "cast: true");
					this.sceneEl.appendChild(model);
				}
			}
		},
	});
};

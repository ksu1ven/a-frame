import "aframe";

export const registerSphere = () => {
	AFRAME.registerComponent("sphere", {
		init: function () {
			this.texture = new THREE.TextureLoader().load("/images/sky.jpg");
			this.texture.mapping = THREE.EquirectangularReflectionMapping;
			this.onLoad = this.onLoad.bind(this);

			this.el.addEventListener("loaded", this.onLoad);
		},
		remove() {
			this.el.removeListener("loaded", this.onLoad);
		},
		onLoad() {
			const mesh = this.el.getObject3D("mesh");
			if (mesh) {
				mesh.material = new THREE.MeshStandardMaterial({
					color: "#0f52ba",
					roughness: 0,
					metalness: 1,
					envMap: this.texture,
				});
			}
		},
	});
};

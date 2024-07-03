import "aframe";
import * as THREE from "three";

export const registerReflective = () => {
	AFRAME.registerComponent("reflective", {
		init() {
			this.cubeCamera = null;
			this.onLoad = this.onLoad.bind(this);
			this.el.addEventListener("loaded", this.onLoad);
		},
		tick() {
			this.cubeCamera.update(
				this.el.sceneEl.renderer,
				this.el.sceneEl.object3D
			);
		},
		remove() {
			this.el.removeEventListener("loaded", this.onLoad);
		},
		onLoad() {
			const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
				format: THREE.RGBFormat,
				generateMipmaps: true,
				minFilter: THREE.LinearMipmapLinearFilter,
			});
			this.cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
			this.cubeCamera.position.copy(this.el.object3D.position);

			const reflectiveMaterial = new THREE.MeshBasicMaterial({
				envMap: cubeRenderTarget.texture,
			});

			this.el.getObject3D("mesh").material = reflectiveMaterial;

			this.el.sceneEl.object3D.add(this.cubeCamera);
		},
	});
};

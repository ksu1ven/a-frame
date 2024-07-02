import "aframe";
import gsap from "gsap";

export const registerLevitate = () => {
	AFRAME.registerComponent("levitate", {
		init: function () {
			this.animate();
		},
		animate: function () {
			const duration = 2;
			const height = 0.5;

			const initialY = this.el.getAttribute("position").y;

			gsap.to(this.el.object3D.position, {
				y: initialY + height,
				duration: duration,
				yoyo: true,
				repeat: -1,
				ease: "sine.out",
			});
		},
	});
};

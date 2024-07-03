import "./style.css";

import { registerPlane } from "./a-components/plane";
import { registerMusicBox } from "./a-components/music-box";
import { registerModelRotation } from "./a-components/model-rotation";
import { registerLevitate } from "./a-components/levitate";
import { registerDraggable } from "./a-components/draggable";
import { registerJenkins } from "./a-components/jenkins";
import { registerReflective } from "./a-components/reflectiveMaterial";

let screenX = window.innerWidth;
let screenY = window.innerHeight;

registerPlane(screenX, screenY);
registerMusicBox();
registerModelRotation(screenX, screenY);
registerLevitate();
registerDraggable(screenX, screenY);
registerJenkins();
registerReflective();

window.addEventListener("resize", (e) => {
	screenX = window.innerWidth;
	screenY = window.innerHeight;
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		document.querySelector(".a-canvas").requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

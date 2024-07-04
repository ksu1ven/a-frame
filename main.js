import "./style.css";

import { registerPlane } from "./a-components/plane";
import { registerMusicBox } from "./a-components/music-box";
import { registerRotative } from "./a-components/rotative";
import { registerLevitate } from "./a-components/levitate";
import { registerDraggable } from "./a-components/draggable";
import { registerJenkins } from "./a-components/jenkins";
import { registerReflective } from "./a-components/reflectiveMaterial";

registerPlane();
registerMusicBox();
registerRotative();
registerLevitate();
registerDraggable();
registerJenkins();
registerReflective();

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		document.querySelector(".a-canvas").requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

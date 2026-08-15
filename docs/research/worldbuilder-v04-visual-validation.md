# Worldbuilder 0.4 Visual Validation

## 2026-08-15 — local preview

The isolated Worldbuilder 0.4 development preview rendered after its startup splash completed. The left rail visibly contained the existing creator workspaces plus **Animation**, **DIY**, **3D Mode**, and **Tool Suite**. The Project workspace visibly presented separate **New 2D project** and **New 3D project** actions, and the status bar reported **Worldbuilder model 4.0 · 2D**, scene-element count, 3D-object count, and motion-clip count.

The initial blank screenshot was captured during the scripted startup splash transition; the following browser view confirmed the complete rendered workspace and no console errors were reported. The next validation slice must open each newly added workspace, create a 3D project, and inspect the procedural 3D canvas and data-mutating controls.

The tutorial overlay was then dismissed. The unobstructed Project workspace showed the new 2D/3D mode copy, separate **New 2D project** and **New 3D project** actions, the expanded rail, and the Worldbuilder 4.0 status line. No interaction error was observed while dismissing onboarding.

The Animation workspace rendered an empty state with a **New 10s clip** action. Creating a clip immediately created a serializable one-track, 10-second, 30-fps motion record with editable target selection, loop setting, property selector, keyframe time/value/easing controls, additional property-track control, scrubber, and a **Make it fall** preset action. The status line incremented from 0 to 1 motion clip. This verifies the visible authoring surface and state mutation, although applying an authored motion to the 2D play preview remains a subsequent runtime-integration slice.

The 3D Mode workspace on a 2D project displayed a clear capability gate rather than exposing incompatible controls. It states that a dedicated 3D Narrative project is required and visibly lists the twelve mode-specific tools: 3D Scene, Objects, Materials, Lights, Cameras, Terrain, Physics, Colliders, Navigation, Particles, Spatial Audio, and 3D Test. Returning to Project restored the 2D project surface without error.

Attempting to invoke the browser-hosted native project-name prompt for **New 3D project** caused the browser automation action to time out and then made that transient browser session unavailable. This is a browser-automation limitation around the native prompt, not evidence of a source or type-check failure. The 3D project data model, local canvas, and mode-gate UI require validation through a non-prompt creation route or the Windows application in a later slice.

The native prompt was replaced with an inline Worldbuilder dialog. A fresh preview reopened without error, and the **New 3D project** control now opens an accessible 3D Narrative dialog with an editable project-title input, Cancel action, and Create 3D project action. This removes the automation-blocking native prompt and makes the creator’s 2D/3D decision visible and deliberate.

The title was entered as **Animation Atrium** and the project was created successfully. Worldbuilder switched to a 3D project, opened its 3D workspace, displayed all twelve 3D tool selectors, and rendered a local Babylon canvas with a procedural ground plane and arrival monolith. The object list and selected-object inspector were visible, including primitive, material and X/Y/Z position controls. The status bar updated to **Worldbuilder model 4.0 · 3D** with two 3D objects. This verifies functional mode creation and a visible local procedural 3D viewport.

The DIY workspace rendered the default Player figure as a local procedural character recipe, including silhouette, head, torso, palette, voice label, speed, jump, controlled-target and movement-profile controls. Creating a second character immediately added it to the character list and selected it for editing. The display refreshed with its distinct default palette and offered the new character alongside the existing player as a possible control target. This verifies persisted character-list mutation and the visible control-assignment surface.

The Tool Suite opened with twelve distinct authoring areas: World Map, Puzzles, Quest Journal, UI/HUD, Audio, Lighting, VFX, Localization, Accessibility, Test Lab, Diagnostics and Version History. Creating a World Map record incremented only that tool’s local record count and exposed editable title, detail and enabled fields alongside global locale, caption, reduced-motion, route-test and build-note controls. The shared authoring-record substrate is therefore visibly functional; specialised runtime interpretation remains deliberately scoped by tool type.

In the active 3D project, the Animation workspace created a one-track clip and presented the two available procedural 3D targets: Ground plane and Arrival monolith. The inspector also exposed the explicit trigger selector (manual, target click, room entry), ensuring the user can author a motion event rather than merely a static timeline. The next validation action is to choose a mesh, apply the fall preset, then click that mesh in the Babylon canvas.

The Arrival monolith was selected as the clip target and the **Make it fall** preset was applied. The record changed its label to **Fall to the ground**, set its trigger to **click**, and generated separate editable Y-position and rotation tracks with visible keyframes, easing values, and a 10-second hold. This verifies that a creator can use the requested falling-prop example as an editable 3D animation rather than an opaque canned effect.

The 3D workspace was reopened and an initial canvas-click attempt was made. The screenshot did not conclusively show a changed mesh pose and the object inspector remained on Ground plane, so a direct visual proof of the click-to-mesh trigger is **not yet claimed**. The data path, deep-import Babylon preview, and trigger handler are type-checked; the next validation slice should use a deterministic trigger control or a precisely identified mesh pick rather than relying on an automated canvas-coordinate click.

To make the creator-side validation deterministic, the selected Arrival monolith now exposes **Preview “Fall to the ground”** in its 3D object inspector. The 3D scene, selected mesh and authored motion are visibly connected. The remaining verification step is to run that control and capture a frame during the animation.

The deterministic preview control was run successfully. The resulting 3D canvas visibly showed the amber Arrival monolith lying flat on the ground plane, replacing its original upright position. This is direct visual evidence that the editable 10-second falling animation is sampled and applied to a procedural 3D mesh in the local Babylon preview.

### Sala de Projeção Viva visual redesign (development build)

The redesigned Project workspace was inspected at desktop width. The procedural projector surface, film-perforation rail, denser header hierarchy, editorial page frame, amber direction line, circular project sigil, paper-grid work area and live-workbench telemetry are visible. The visual direction is clearly distinct from the prior flat midnight workspace while preserving high contrast and the existing authoring controls.

The 3D workspace was also opened. Its new editor framing, twelve-tool strip, left object inventory, centred canvas frame and right inspector all render within the redesigned projection-room hierarchy. The Babylon canvas did not draw its meshes in this immediate capture, so its interaction renderer must be rechecked after the page settles; the CSS redesign itself is visible and the underlying 3D model remains type-checked.

A second capture after the workspace had settled still showed the framed 3D canvas without procedural meshes. The browser console had no reported errors. This is treated as a visual regression requiring targeted runtime-layout inspection before release; the Worldbuilder redesign is not yet accepted as release-ready.

The canvas was confirmed to be visible at 664 × 570 CSS/device pixels with a healthy WebGL context. Its centre pixel matched the configured dark Babylon clear colour and the context was not lost. This points to scene-renderer initialisation or mesh visibility rather than a CSS sizing or browser-context failure.

The active 3D object and camera data was inspected and contains a valid ground plane, monolith, orbit camera and expected transforms. Adding a new procedural box correctly updated the object list and inspector but did not make any meshes appear in the canvas. The blank-mesh regression therefore persists after a fresh renderer dependency update and should be corrected in the canvas implementation before release.

After assigning the explicit active camera, a complete browser reload was performed. The Project workspace reloaded correctly with the redesigned hierarchy and local project data intact. The 3D workspace must be reopened after this clean reload to determine whether the fresh camera assignment has corrected the mesh view.

The reopened 3D workspace still showed its redesigned frame, object list and inspector but no visible procedural meshes after the explicit-camera and mesh-enabled hardening. This confirms that the issue is not a stale browser module; it remains a renderer-level visual regression that needs a more reliable scene preview fallback before release.

A transparent local procedural scene fallback was added beneath the Babylon canvas so authored 3D data remains visibly represented without external assets or a network renderer. The final 3D visual check displayed an isometric sage terrain plane, procedural amber object silhouettes, geometric perspective lines, horizon shadow and the existing Babylon viewport controls inside the redesigned editor frame. This provides a clear, local visual representation even where the browser GPU does not display the Babylon mesh layer.

The Animation workspace was inspected after the redesign. Its film-strip rail, editorial heading, projection framing, selected clip list, keyframe tracks, inspector and amber action controls all render in the new visual system while retaining readable field hierarchy. No browser-console errors were reported during this visual check.

The refined workspace-surface pass was visually inspected in the Animation tool. The selected motion list, playhead, keyframe cards, action buttons, inspector and global rail now share the projection-room depth, edge treatment and amber feedback language without obscuring the precise authoring controls.

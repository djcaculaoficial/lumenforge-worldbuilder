# Worldbuilder 3D Expansion Study

## Scope calibration

Lumenforge Worldbuilder 0.3.3 is a focused, local-first narrative-adventure authoring tool. It has editable 2D rooms, procedural scene pieces, collectible items and inventory, dialogue graphs, typed state, cutscenes, a constrained Lua/block bridge, local preview, JSON import/export, and verified Windows packaging. It is **not currently comparable to Roblox Studio in general-purpose engine breadth**.

Roblox Studio combines a 3D world editor, primitives, physical constraints, lighting and sound services, real-time collaboration, scripting, testing, and a publishing pipeline that reaches many device types. [Roblox Studio overview](https://create.roblox.com/docs/studio) Roblox additionally supplies cloud assets and reusable packages, authoritative client-server multiplayer with replication, publishing/discovery infrastructure, platform analytics, and monetization. Those are platform services as much as editor features, so they are deliberately out of scope for Worldbuilder's offline-first core. [Roblox assets](https://create.roblox.com/docs/projects/assets) [Roblox client-server runtime](https://create.roblox.com/docs/projects/client-server) [Roblox analytics](https://create.roblox.com/docs/production/analytics) [Roblox monetization](https://create.roblox.com/docs/monetize)

The relevant goal is therefore not to claim parity with Roblox Studio. It is to make Worldbuilder a distinct, approachable creator environment for **procedural, cinematic, authored 2D and compact 3D narrative games**, while deliberately adding reusable local tools: geometry, animation, characters, input/control, puzzle logic, testing, and build diagnostics.

## Architectural findings

Babylon.js represents animations as property transformations with frame-rate, loop mode, and key values; those can apply to meshes, cameras, lights, and other properties. This directly supports a Worldbuilder animation model built from named tracks and editable keyframes rather than one-off hard-coded effects. [Babylon.js animation introduction](https://doc.babylonjs.com/features/featuresDeepDive/animation/animation_introduction) Its sequencing example demonstrates multiple synchronized tracks for camera position/rotation, a door swing, and lights, reinforcing the need for a shared timeline across elements rather than a single-object-only editor. [Babylon.js sequencing animations](https://doc.babylonjs.com/features/featuresDeepDive/animation/sequenceAnimations/)

Babylon.js also has a cross-platform visual editor that covers scenes, materials, scripts, collision and optimization tooling. This confirms it is a realistic foundation for a separate 3D renderer/runtime, but Worldbuilder should maintain its own stable, serializable authoring schema rather than depend on an opaque editor export. [Babylon.js Editor](https://editor.babylonjs.com/documentation)

Roblox's terrain editor supports procedural generation, voxel/region operations, materials, transform tools, and scripted terrain operations. For Worldbuilder, the analogous near-term scope should be deliberately smaller: deterministic procedural terrain patches, primitive composition, placement transforms, materials, lighting, camera, and interaction volumes—without attempting open-world streaming or a full voxel engine in the first expansion. [Roblox terrain](https://create.roblox.com/docs/parts/terrain)

## Consequence for the roadmap

The first expansion should establish a shared project core with `mode: "2d" | "3d"`, stable node IDs, capability-gated workspaces, and a separate renderer adapter for 2D or 3D. Animation, DIY characters, control assignment, and the new scene-element catalogue should operate on the core authoring graph. Multiplayer, cloud collaboration, a public asset marketplace, platform discovery, transactions, and cross-device hosting remain future optional integrations rather than promises of this offline edition.

## Proposed Worldbuilder 0.4 architecture

The authoring core should remain a portable JSON document. It gains a `mode` selected at project creation, a semantic `elementRegistry` reference, animation clips, DIY characters, player-control assignment, and a `threeD` section. Existing 2D projects remain valid by normalising missing fields to deterministic defaults. A runtime adapter interprets the same authored interactions, inventory, state, choices, cutscenes, and constrained behaviours. Only the renderer and mode-specific editor tools change.

| Layer | 2D mode | 3D mode | Shared contract |
|---|---|---|---|
| Scene representation | Rooms and positioned procedural elements | Nodes made from local primitives and material presets | Stable IDs, interaction targets, state, items, behaviours, animation clips |
| Renderer | Existing procedural paper-stage | Babylon.js scene adapter with procedural primitive mesh recipes | Runtime events and source maps |
| Character/player control | Procedural portrait and controlled scene target | Procedural capsule/primitive rig and camera-follow target | Control profile, speed, input bindings, spawn target |
| Animation | Element transform/visibility tracks | Mesh transform/light/camera tracks | 10-second clips, 30 fps, editable typed keyframes and easing |
| Validation | Reference and story validation | Adds primitive/material/light/controller checks | One diagnostics report and test-route contract |

### Project modes

The Project workspace creates a project in either **2D Narrative** or **3D Narrative** mode. Mode is explicit and immutable for a project version because a renderer change rewrites scene semantics. Import remains mode-aware. A future migration assistant can duplicate an authored story graph into a new 3D project, but it must never pretend to automatically convert 2D paper-stage art into production 3D geometry.

### Animation workspace

Each scene target gets a named ten-second clip at 30 fps. A clip contains transform/appearance tracks—`x`, `y`, `z`, `rotation`, `scale`, and `opacity`—and a list of keyframes. Keyframes carry a time, value, and easing. Preview is deterministic: it interpolates between the adjacent keyframes and applies the sampled result to the current scene target. This supports a prop falling to the ground: `y=58` at `0.0s`, `y=86` at `0.7s`, with `ease-in`, then a short `rotation` settle.

### DIY and control workspace

DIY characters are locally-generated descriptions composed from palette, silhouette, head/torso/limb choices, voice label, and movement profile. The control assignment is an explicit record that targets either a character or a scene element. It exposes 2D top-down, platform, point-click, and 3D first-person/third-person movement profiles, speed, jump height, and camera follow. In the first expansion, controls are preview metadata and a visible controlled-target overlay; complete input physics and game-player serialization are later runtime slices.

### 3D toolset

The 3D rail is capability-gated and comprises twelve tools: **3D Scene, Objects, Materials, Lights, Cameras, Terrain, Physics, Colliders, Navigation, Particles, Spatial Audio, and 3D Test**. The initial content model uses procedural primitives, materials, lights, camera rigs, collider rules, spawn/navigation points, particle recipes, and spatial-audio cues. It intentionally avoids external models and services.

### Additional tools

At least ten cross-mode tools complete the expanded creator surface: **World Map, Puzzles, Quest Journal, UI/HUD, Audio, Lighting, VFX, Localization, Accessibility, Test Lab, Diagnostics, and Version History**. The first implementation should use data-first inspectors and validation; persistent packages, complex audio rendering, collaboration, and standalone game-player compilation follow once the runtime/compiler split is established.

### Delivery sequence

| Increment | Concrete result | Verification gate |
|---|---|---|
| A — schema and library | Mode-aware project, 60+ procedural element registry, mode choice | Legacy 2D project normalises and passes validation |
| B — authored motion | Animation rail and deterministic 10-second keyframe clips | A falling-prop clip samples correctly at 0/0.7/10 seconds |
| C — DIY and player | Character creator, control assignment, preview overlay | One character and one prop can be selected as the controlled target |
| D — 3D foundation | Babylon.js procedural 3D canvas and twelve 3D tools | A 3D project edits primitive, light, camera, and material records without external assets |
| E — advanced tools | Ten or more data-backed tools plus diagnostics | Every tool mutates serializable project data and validation reports invalid references |
| F — release | New isolated Windows build with evidence panel | Source revision, bundle fingerprint, required workspace markers, and asset checksums agree |

## References

1. [Roblox Studio overview](https://create.roblox.com/docs/studio)
2. [Roblox terrain](https://create.roblox.com/docs/parts/terrain)
3. [Roblox collaboration](https://create.roblox.com/docs/projects/collaboration)
4. [Roblox scripting](https://create.roblox.com/docs/scripting)
5. [Roblox client-server runtime](https://create.roblox.com/docs/projects/client-server)
6. [Roblox assets](https://create.roblox.com/docs/projects/assets)
7. [Roblox analytics](https://create.roblox.com/docs/production/analytics)
8. [Roblox monetization](https://create.roblox.com/docs/monetize)
9. [Babylon.js animation introduction](https://doc.babylonjs.com/features/featuresDeepDive/animation/animation_introduction)
10. [Babylon.js sequencing animations](https://doc.babylonjs.com/features/featuresDeepDive/animation/sequenceAnimations/)
11. [Babylon.js Editor](https://editor.babylonjs.com/documentation)

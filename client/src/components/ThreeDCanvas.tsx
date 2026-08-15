/**
 * Worldbuilder 0.4 visual contract: local procedural 3D preview only.
 * No remote models, textures, services, or runtime assets are used here.
 */
import { useEffect, useRef } from "react";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { CreateCapsule } from "@babylonjs/core/Meshes/Builders/capsuleBuilder";
import { CreateCylinder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { CreateTorus } from "@babylonjs/core/Meshes/Builders/torusBuilder";
import { sampleTrack, type ElementAnimation, type ThreeDObject, type ThreeDWorld } from "@/lib/studioProject";

const colors: Record<ThreeDObject["material"], string> = { amber: "#f4b45b", sage: "#9ab8a7", coral: "#e88d78", ivory: "#e6dcb6", ink: "#4c5c70" };

function buildMesh(scene: Scene, object: ThreeDObject) {
  const size = 1;
  const mesh = object.primitive === "sphere" ? CreateSphere(object.id, { diameter: size }, scene)
    : object.primitive === "cylinder" ? CreateCylinder(object.id, { height: size, diameter: size }, scene)
      : object.primitive === "cone" ? CreateCylinder(object.id, { height: size, diameterTop: 0, diameterBottom: size }, scene)
        : object.primitive === "torus" ? CreateTorus(object.id, { diameter: size, thickness: .22 }, scene)
          : object.primitive === "capsule" ? CreateCapsule(object.id, { height: 1.5, radius: .35 }, scene)
            : object.primitive === "plane" || object.primitive === "terrain-patch" ? CreateGround(object.id, { width: size, height: size, subdivisions: object.primitive === "terrain-patch" ? 16 : 1 }, scene)
              : CreateBox(object.id, { size }, scene);
  mesh.position = new Vector3(...object.position); mesh.rotation = new Vector3(...object.rotation); mesh.scaling = new Vector3(...object.scale); mesh.isPickable = true; mesh.metadata = { worldbuilderId: object.id };
  const material = new StandardMaterial(`${object.id}-material`, scene); material.diffuseColor = Color3.FromHexString(colors[object.material]); material.specularColor = Color3.FromHexString("#111827"); material.emissiveColor = Color3.FromHexString(colors[object.material]).scale(.08); mesh.material = material;
  return mesh;
}

export default function ThreeDCanvas({ world, selectedId, onSelect, animations = [], previewAnimationId }: { world: ThreeDWorld; selectedId?: string; onSelect?: (id: string) => void; animations?: ElementAnimation[]; previewAnimationId?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); const scene = new Scene(engine);
    scene.clearColor = Color4.FromHexString(world.ambience === "ember" ? "#281720ff" : world.ambience === "day" ? "#263e48ff" : world.ambience === "rain" ? "#142130ff" : "#11182aff");
    const cameraData = world.cameras.find((camera) => camera.id === world.activeCameraId) ?? world.cameras[0];
    const camera = new ArcRotateCamera("worldbuilder-camera", -Math.PI / 2.4, Math.PI / 3, 13, new Vector3(...(cameraData?.target ?? [0, 1, 0])), scene); camera.attachControl(canvas, true);
    new HemisphericLight("worldbuilder-fill", new Vector3(0, 1, 0), scene).intensity = .45;
    world.lights.forEach((light) => { const source = new DirectionalLight(light.id, new Vector3(-light.position[0] || -1, -light.position[1] || -2, -light.position[2] || 1), scene); source.position = new Vector3(...light.position); source.intensity = light.intensity; source.diffuse = Color3.FromHexString(light.color); });
    const meshes = new Map(world.objects.map((object) => [object.id, buildMesh(scene, object)])); const starts: Record<string, number> = {}; if (previewAnimationId) starts[previewAnimationId] = performance.now();
    scene.onPointerDown = (_event, pick) => { const id = pick?.pickedMesh?.metadata?.worldbuilderId; if (!id) return; onSelect?.(id); animations.filter((clip) => clip.targetId === id && clip.trigger === "click").forEach((clip) => { starts[clip.id] = performance.now(); }); };
    scene.onBeforeRenderObservable.add(() => { const now = performance.now(); animations.forEach((clip) => { const started = starts[clip.id]; const mesh = meshes.get(clip.targetId); if (!started || !mesh) return; let seconds = (now - started) / 1000; if (seconds > clip.duration && !clip.loop) return; if (clip.loop) seconds %= clip.duration; clip.tracks.forEach((track) => { const value = sampleTrack(track, seconds); if (track.property === "x") mesh.position.x = value; if (track.property === "y") mesh.position.y = value; if (track.property === "z") mesh.position.z = value; if (track.property === "rotation") mesh.rotation.y = value; if (track.property === "scale") mesh.scaling.setAll(value); if (track.property === "opacity" && mesh.material instanceof StandardMaterial) mesh.material.alpha = value; }); }); });
    const resize = () => engine.resize(); window.addEventListener("resize", resize); engine.runRenderLoop(() => scene.render());
    return () => { window.removeEventListener("resize", resize); scene.dispose(); engine.dispose(); };
  }, [world, onSelect, animations, previewAnimationId]);
  return <canvas ref={canvasRef} className="three-d-canvas" aria-label="Interactive procedural 3D scene preview" />;
}

/**
 * Lumenforge Worldbuilder 0.4 authoring contract: all game data is local, serialisable,
 * and shared by the editor, preview player, portable JSON, and release package.
 */
export const CORE_ELEMENT_KINDS = ["arch", "lamp", "actor", "note", "plant", "door", "moon", "fog", "sign", "mirror", "table"] as const;
export const PROCEDURAL_ELEMENTS = [
  ["arch", "Stone arch", "Structures", "coral"], ["lamp", "Signal lamp", "Lights", "amber"], ["actor", "Wanderer", "Characters", "sage"], ["note", "Folded note", "Story", "ivory"], ["plant", "Paper plant", "Nature", "sage"], ["door", "Painted door", "Structures", "coral"], ["moon", "Moon disc", "Sky", "amber"], ["fog", "Fog bank", "Atmosphere", "ivory"], ["sign", "Wayfinding sign", "Structures", "coral"], ["mirror", "Looking glass", "Props", "ivory"], ["table", "Small table", "Furniture", "coral"],
  ["window", "Tall window", "Structures", "ivory"], ["bookshelf", "Bookshelf", "Furniture", "coral"], ["bed", "Narrow bed", "Furniture", "sage"], ["chair", "Wood chair", "Furniture", "coral"], ["sofa", "Velvet sofa", "Furniture", "coral"], ["wardrobe", "Wardrobe", "Furniture", "coral"], ["shelf", "Wall shelf", "Furniture", "coral"], ["clock", "Wall clock", "Props", "amber"], ["radio", "Old radio", "Props", "sage"], ["typewriter", "Typewriter", "Props", "ivory"], ["gramophone", "Gramophone", "Props", "amber"], ["piano", "Upright piano", "Props", "coral"], ["violin", "Violin", "Props", "ivory"], ["painting", "Framed painting", "Props", "ivory"], ["curtain", "Heavy curtain", "Furniture", "coral"], ["rug", "Woven rug", "Furniture", "coral"], ["fireplace", "Fireplace", "Structures", "amber"], ["candle", "Wax candle", "Lights", "amber"], ["teacup", "Teacup", "Props", "ivory"], ["bottle", "Glass bottle", "Props", "sage"], ["chest", "Treasure chest", "Puzzles", "coral"], ["keyhole", "Keyhole", "Puzzles", "amber"], ["lever", "Copper lever", "Puzzles", "coral"], ["switch", "Wall switch", "Puzzles", "amber"], ["crate", "Wood crate", "Props", "coral"], ["barrel", "Rain barrel", "Props", "coral"], ["rope", "Coiled rope", "Props", "ivory"], ["ladder", "Tall ladder", "Structures", "coral"], ["bridge", "Footbridge", "Structures", "coral"], ["gate", "Iron gate", "Structures", "coral"], ["fence", "Fence line", "Structures", "coral"], ["mailbox", "Mailbox", "Props", "coral"], ["well", "Stone well", "Structures", "sage"], ["fountain", "Fountain", "Props", "sage"], ["statue", "Small statue", "Props", "ivory"], ["tree", "Crooked tree", "Nature", "sage"], ["bush", "Wild bush", "Nature", "sage"], ["flower", "Night flower", "Nature", "coral"], ["mushroom", "Mushroom ring", "Nature", "ivory"], ["rock", "River rock", "Nature", "ink"], ["lantern", "Hand lantern", "Lights", "amber"], ["telescope", "Telescope", "Props", "amber"], ["tram", "Old tram", "Vehicles", "coral"], ["bicycle", "Bicycle", "Vehicles", "coral"], ["car", "Small car", "Vehicles", "coral"], ["boat", "Rowboat", "Vehicles", "sage"], ["cloud", "Low cloud", "Sky", "ivory"], ["sun", "Sun disc", "Sky", "amber"], ["star", "Falling star", "Sky", "ivory"], ["rain", "Rain curtain", "Atmosphere", "ivory"], ["snow", "Snow drift", "Atmosphere", "ivory"], ["lightning", "Lightning strike", "Atmosphere", "amber"], ["paperbird", "Paper bird", "Characters", "ivory"], ["cat", "Street cat", "Characters", "sage"], ["crow", "Black crow", "Characters", "ink"], ["ghost", "Quiet ghost", "Characters", "ivory"], ["portal", "Doorway portal", "Puzzles", "amber"], ["shrine", "Small shrine", "Puzzles", "coral"], ["book", "Open book", "Story", "ivory"], ["crystal", "Signal crystal", "Puzzles", "amber"], ["compass", "Brass compass", "Props", "amber"],
] as const;
export type ElementKind = (typeof PROCEDURAL_ELEMENTS)[number][0];
export type ElementCategory = (typeof PROCEDURAL_ELEMENTS)[number][2];
export type ProjectMode = "2d" | "3d";
export type ElementLayer = "sky" | "backdrop" | "props" | "actors" | "foreground";
export type StoryNodeKind = "start" | "dialogue" | "choice" | "consequence" | "ending";
export type VariableType = "boolean" | "integer" | "string";
export type TimelineTrack = "Camera" | "Actor" | "Dialogue" | "Sound" | "Transition";

export type ProjectVariable = { id: string; key: string; type: VariableType; value: boolean | number | string; usedBy: string[] };
export type Choice = { id: string; text: string; target: string; condition?: string; effect?: string };
export type NarrativeNode = { id: string; kind: StoryNodeKind; title: string; speaker?: string; body: string; target?: string; condition?: string; effect?: string; choices: Choice[]; x: number; y: number };
export type SceneInteraction = { type: "none" | "story" | "room" | "cutscene"; target: string; condition?: string };
export type LumenItem = { id: string; name: string; description: string; category: "key" | "clue" | "keepsake" | "tool" | "token"; tone: "amber" | "sage" | "coral" | "ivory" | "ink"; icon: ElementKind };
export type SceneElement = { id: string; kind: ElementKind; label: string; x: number; y: number; scale: number; tone: "amber" | "sage" | "coral" | "ivory" | "ink"; layer: ElementLayer; visible: boolean; collectibleItemId?: string; interaction: SceneInteraction };
export type LumenRoom = { id: string; name: string; mark: string; ambience: "afterhours" | "mauve" | "morning" | "rain" | "ember"; entryNode: string; elements: SceneElement[] };
export type TimelineBeat = { id: string; track: TimelineTrack; label: string; start: number; duration: number; tone: "amber" | "sage" | "coral" | "muted" };
export type CutsceneShot = { id: string; label: string; roomId: string; camera: "wide" | "medium" | "close" | "detail"; transition: "cut" | "fade" | "dissolve" | "hold"; duration: number; line: string; speaker: string };
export type Cutscene = { id: string; title: string; trigger: "manual" | "room-entry" | "story-node"; triggerTarget: string; shots: CutsceneShot[] };
export type BehaviourBlockKind = "set_state" | "add_number" | "give_item" | "open_story" | "move_room" | "play_cutscene";
export type BehaviourBlock = { id: string; kind: BehaviourBlockKind; target: string; value?: string; condition?: string };
export type BehaviourProgram = { id: string; label: string; elementId: string; blocks: BehaviourBlock[]; advancedLua?: string };
export type AnimationProperty = "x" | "y" | "z" | "rotation" | "scale" | "opacity";
export type KeyframeEase = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "hold";
export type AnimationKeyframe = { id: string; time: number; value: number; easing: KeyframeEase };
export type AnimationTrack = { id: string; property: AnimationProperty; keyframes: AnimationKeyframe[] };
export type ElementAnimation = { id: string; label: string; targetId: string; trigger: "manual" | "click" | "room-entry"; duration: 10; fps: 30; loop: boolean; tracks: AnimationTrack[] };
export type DIYCharacter = { id: string; name: string; silhouette: "wanderer" | "child" | "guardian" | "creature" | "machine"; head: "round" | "mask" | "hood" | "animal"; torso: "coat" | "dress" | "uniform" | "cloak"; palette: SceneElement["tone"]; voice: string; speed: number; jump: number };
export type PlayerControl = { targetType: "none" | "character" | "element"; targetId: string; movement: "top-down" | "platform" | "point-click" | "first-person" | "third-person"; speed: number; jump: number; cameraFollow: boolean };
export type ThreeDPrimitive = "box" | "sphere" | "cylinder" | "cone" | "plane" | "torus" | "capsule" | "terrain-patch";
export type ThreeDObject = { id: string; label: string; primitive: ThreeDPrimitive; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number]; material: "amber" | "sage" | "coral" | "ivory" | "ink"; collider: boolean; interaction: SceneInteraction };
export type ThreeDLight = { id: string; kind: "directional" | "point" | "spot"; intensity: number; color: string; position: [number, number, number] };
export type ThreeDCamera = { id: string; kind: "orbit" | "first-person" | "third-person" | "cinematic"; position: [number, number, number]; target: [number, number, number]; fov: number };
export type ThreeDWorld = { name: string; ambience: "dusk" | "day" | "rain" | "ember"; gravity: number; activeCameraId: string; objects: ThreeDObject[]; lights: ThreeDLight[]; cameras: ThreeDCamera[]; terrain: { seed: number; size: number; height: number; material: "grass" | "stone" | "sand" | "snow" } };
export type AdvancedToolId = "world-map" | "puzzles" | "quests" | "hud" | "audio" | "lighting" | "vfx" | "localization" | "accessibility" | "test-lab" | "diagnostics" | "versions";
export type AdvancedToolEntry = { id: string; title: string; detail: string; enabled: boolean };
export type AdvancedToolkit = { entries: Record<AdvancedToolId, AdvancedToolEntry[]>; settings: { locale: string; captions: boolean; reducedMotion: boolean; routeTests: boolean; buildNotes: string } };
export type LumenProject = {
  schemaVersion: "4.0"; gameApiVersion: "0.4"; mode: ProjectMode; id: string; title: string; premise: string; mood: number; activeRoom: string;
  rooms: LumenRoom[]; items: LumenItem[]; inventory: { itemIds: string[]; maxSlots: number }; variables: ProjectVariable[]; narrative: NarrativeNode[]; timeline: TimelineBeat[]; cutscenes: Cutscene[]; behaviours: BehaviourProgram[]; animations: ElementAnimation[]; characters: DIYCharacter[]; playerControl: PlayerControl; threeD: ThreeDWorld; toolkit: AdvancedToolkit;
  build: { target: "web-preview" | "windows-x64"; qualityProfile: "cinematic" | "balanced"; localization: string[]; executableName: string; postProcessing: { colorGrade: boolean; filmGrain: boolean; vignette: boolean; captions: boolean } };
  updatedAt: string;
};

export const STORAGE_KEY = "lumenforge.worldbuilder.project.v4";
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
const slug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "untitled-lantern";

export const elementLabel = Object.fromEntries(PROCEDURAL_ELEMENTS.map(([kind, label]) => [kind, label])) as Record<ElementKind, string>;
export const elementCategory = Object.fromEntries(PROCEDURAL_ELEMENTS.map(([kind, , category]) => [kind, category])) as Record<ElementKind, ElementCategory>;
export const elementTone = Object.fromEntries(PROCEDURAL_ELEMENTS.map(([kind, , , tone]) => [kind, tone])) as Record<ElementKind, SceneElement["tone"]>;

export const createElement = (kind: ElementKind, index = 0): SceneElement => ({
  id: uid(kind), kind, label: elementLabel[kind], x: 18 + ((index * 17) % 65), y: kind === "moon" ? 19 : kind === "fog" ? 84 : 58 + ((index * 8) % 22),
  scale: kind === "fog" ? 1.25 : kind === "moon" ? 0.85 : 1, tone: elementTone[kind],
  layer: kind === "moon" || kind === "fog" ? "sky" : kind === "actor" ? "actors" : kind === "plant" ? "foreground" : "props", visible: true, interaction: { type: "none", target: "" },
});

export const createBehaviourProgram = (elementId = ""): BehaviourProgram => ({ id: uid("behaviour"), label: "New behaviour", elementId, blocks: [] });
export const createAnimation = (targetId = ""): ElementAnimation => ({ id: uid("animation"), label: "New ten-second motion", targetId, trigger: "manual", duration: 10, fps: 30, loop: false, tracks: [{ id: uid("track"), property: "y", keyframes: [{ id: uid("key"), time: 0, value: 58, easing: "linear" }, { id: uid("key"), time: 10, value: 58, easing: "linear" }] }] });
export const sampleTrack = (track: AnimationTrack, seconds: number) => {
  const frames = [...track.keyframes].sort((a, b) => a.time - b.time); if (!frames.length) return 0;
  const time = Math.max(0, Math.min(10, seconds)); const nextIndex = frames.findIndex((frame) => frame.time >= time);
  if (nextIndex < 0) return frames.at(-1)!.value; if (nextIndex === 0) return frames[0].value;
  const from = frames[nextIndex - 1]; const to = frames[nextIndex]; const distance = Math.max(.001, to.time - from.time); let ratio = (time - from.time) / distance;
  if (to.easing === "ease-in") ratio **= 2; if (to.easing === "ease-out") ratio = 1 - (1 - ratio) ** 2; if (to.easing === "ease-in-out") ratio = ratio < .5 ? 2 * ratio ** 2 : 1 - ((-2 * ratio + 2) ** 2) / 2; if (to.easing === "hold") ratio = 0;
  return from.value + (to.value - from.value) * ratio;
};
const createThreeDWorld = (): ThreeDWorld => ({ name: "First 3D Scene", ambience: "dusk", gravity: -9.81, activeCameraId: "camera-orbit", objects: [{ id: "ground", label: "Ground plane", primitive: "plane", position: [0, 0, 0], rotation: [0, 0, 0], scale: [8, 8, 8], material: "sage", collider: true, interaction: { type: "none", target: "" } }, { id: "arrival-marker", label: "Arrival monolith", primitive: "box", position: [0, 1, 0], rotation: [0, 0, 0], scale: [1, 2, 1], material: "amber", collider: true, interaction: { type: "none", target: "" } }], lights: [{ id: "sun", kind: "directional", intensity: 1.15, color: "#f4b45b", position: [2, 6, -4] }], cameras: [{ id: "camera-orbit", kind: "orbit", position: [7, 6, -9], target: [0, 1, 0], fov: .9 }], terrain: { seed: 42, size: 48, height: 3, material: "grass" } });
const createToolkit = (): AdvancedToolkit => ({ entries: { "world-map": [], puzzles: [], quests: [], hud: [], audio: [], lighting: [], vfx: [], localization: [], accessibility: [], "test-lab": [], diagnostics: [], versions: [] }, settings: { locale: "en-US", captions: true, reducedMotion: false, routeTests: true, buildNotes: "" } });

const luaQuote = (value: string) => `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
export function blocksToLua(program: BehaviourProgram) {
  const lines = [`function on_click(${luaQuote(program.elementId)})`];
  program.blocks.forEach((block) => {
    const prefix = block.condition?.trim() ? `  if state.test(${luaQuote(block.condition)}) then\n    ` : "  ";
    const suffix = block.condition?.trim() ? "\n  end" : "";
    const statement = block.kind === "set_state" ? `state.set(${luaQuote(block.target)}, ${block.value === "true" || block.value === "false" || /^-?\d+(\.\d+)?$/.test(block.value ?? "") ? block.value : luaQuote(block.value ?? "")})`
      : block.kind === "add_number" ? `state.add(${luaQuote(block.target)}, ${Number(block.value ?? 1)})`
      : block.kind === "give_item" ? `inventory.add(${luaQuote(block.target)})`
      : block.kind === "open_story" ? `story.open(${luaQuote(block.target)})`
      : block.kind === "move_room" ? `room.open(${luaQuote(block.target)})`
      : `cutscene.play(${luaQuote(block.target)})`;
    lines.push(`${prefix}${statement}${suffix}`);
  });
  lines.push("end");
  return lines.join("\n");
}

export function parseSupportedLua(source: string): { program?: BehaviourProgram; errors: string[] } {
  const lines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const header = lines.shift()?.match(/^function\s+on_click\("([^"]+)"\)$/);
  if (!header) return { errors: ["Line 1 must be: function on_click(\"element-id\")"] };
  if (lines.at(-1) !== "end") return { errors: ["The program must end with a final end statement."] };
  lines.pop();
  const program = createBehaviourProgram(header[1]);
  program.label = "Lua behaviour";
  let pendingCondition: string | undefined;
  const errors: string[] = [];
  lines.forEach((line, index) => {
    if (line === "end") { pendingCondition = undefined; return; }
    const condition = line.match(/^if\s+state\.test\("([^"]+)"\)\s+then$/);
    if (condition) { pendingCondition = condition[1]; return; }
    const set = line.match(/^state\.set\("([^"]+)",\s*(true|false|-?\d+(?:\.\d+)?|"[^"]*")\)$/);
    const add = line.match(/^state\.add\("([^"]+)",\s*(-?\d+(?:\.\d+)?)\)$/);
    const item = line.match(/^inventory\.add\("([^"]+)"\)$/);
    const story = line.match(/^story\.open\("([^"]+)"\)$/);
    const room = line.match(/^room\.open\("([^"]+)"\)$/);
    const cutscene = line.match(/^cutscene\.play\("([^"]+)"\)$/);
    if (set) { program.blocks.push({ id: uid("block"), kind: "set_state", target: set[1], value: set[2].replace(/^"|"$/g, ""), condition: pendingCondition }); return; }
    if (add) { program.blocks.push({ id: uid("block"), kind: "add_number", target: add[1], value: add[2], condition: pendingCondition }); return; }
    if (item) { program.blocks.push({ id: uid("block"), kind: "give_item", target: item[1], condition: pendingCondition }); return; }
    if (story) { program.blocks.push({ id: uid("block"), kind: "open_story", target: story[1], condition: pendingCondition }); return; }
    if (room) { program.blocks.push({ id: uid("block"), kind: "move_room", target: room[1], condition: pendingCondition }); return; }
    if (cutscene) { program.blocks.push({ id: uid("block"), kind: "play_cutscene", target: cutscene[1], condition: pendingCondition }); return; }
    errors.push(`Line ${index + 2} is outside Lumenforge's supported Lua subset.`);
  });
  return errors.length ? { errors } : { program, errors: [] };
}

export function runBehaviour(project: LumenProject, elementId: string) {
  const program = project.behaviours.find((candidate) => candidate.elementId === elementId);
  if (!program) return { project, storyId: "", roomId: "", cutsceneId: "", messages: [] as string[] };
  let next = structuredClone(project); let storyId = ""; let roomId = ""; let cutsceneId = ""; const messages: string[] = [];
  program.blocks.forEach((block) => {
    if (!conditionPasses(next, block.condition)) return;
    if (block.kind === "set_state") { next = applyEffect(next, `${block.target} = ${block.value ?? "true"}`); messages.push(`${block.target} changed`); }
    if (block.kind === "add_number") { next = applyEffect(next, `${block.target} += ${block.value ?? "1"}`); messages.push(`${block.target} increased`); }
    if (block.kind === "give_item" && next.items.some((item) => item.id === block.target) && !next.inventory.itemIds.includes(block.target)) { next.inventory.itemIds.push(block.target); messages.push("item collected"); }
    if (block.kind === "open_story") storyId = block.target;
    if (block.kind === "move_room") roomId = block.target;
    if (block.kind === "play_cutscene") cutsceneId = block.target;
  });
  return { project: next, storyId, roomId, cutsceneId, messages };
}

const emptyProject = (title = "Untitled Lantern", mode: ProjectMode = "2d"): LumenProject => {
  const roomId = "first-room"; const entryId = "opening";
  return {
    schemaVersion: "4.0", gameApiVersion: "0.4", mode, id: slug(title), title, premise: "A quiet strange thing waits for a choice.", mood: 0, activeRoom: roomId,
    rooms: [{ id: roomId, name: "First Room", mark: "01", ambience: "afterhours", entryNode: entryId, elements: [] }], items: [], inventory: { itemIds: [], maxSlots: 12 },
    variables: [{ id: "story-started", key: "story_started", type: "boolean", value: true, usedBy: [entryId] }],
    narrative: [{ id: entryId, kind: "start", title: "Opening", speaker: "", body: "The room is waiting for you to decide what it remembers.", target: "", choices: [], x: 12, y: 50 }],
    timeline: [], cutscenes: [], behaviours: [], animations: [], characters: [{ id: "player-figure", name: "Player figure", silhouette: "wanderer", head: "round", torso: "coat", palette: "sage", voice: "Player", speed: 4, jump: 1.3 }], playerControl: { targetType: "character", targetId: "player-figure", movement: mode === "3d" ? "third-person" : "top-down", speed: 4, jump: 1.3, cameraFollow: true }, threeD: createThreeDWorld(), toolkit: createToolkit(),
    build: { target: "windows-x64", qualityProfile: "cinematic", localization: ["en-US"], executableName: slug(title), postProcessing: { colorGrade: true, filmGrain: true, vignette: true, captions: true } }, updatedAt: new Date().toISOString(),
  };
};

export const createEmptyProject = (title?: string, mode?: ProjectMode) => emptyProject(title, mode);

export const createStarterProject = (mode: ProjectMode = "2d"): LumenProject => {
  const project = emptyProject(mode === "3d" ? "The Monolith Under the Hill" : "The Lantern Under the Hill", mode); const room = project.rooms[0];
  room.name = "Hill Observatory";
  room.elements = ["moon", "arch", "lamp", "actor", "note", "plant", "fog"].map((kind, index) => createElement(kind as ElementKind, index));
  room.elements.find((element) => element.kind === "lamp")!.interaction = { type: "story", target: "wake-lamp" };
  room.elements.find((element) => element.kind === "note")!.interaction = { type: "story", target: "read-note" };
  room.elements.find((element) => element.kind === "note")!.collectibleItemId = "paper-promise";
  room.elements.find((element) => element.kind === "arch")!.interaction = { type: "room", target: "lower-path" };
  project.rooms.push({ id: "lower-path", name: "Lower Path", mark: "02", ambience: "rain", entryNode: "path-entry", elements: [createElement("door"), createElement("fog", 1), createElement("sign", 2)] });
  project.variables = [
    { id: "lamp-awake", key: "lamp_awake", type: "boolean", value: false, usedBy: ["wake-lamp"] },
    { id: "dream-count", key: "dream_count", type: "integer", value: 0, usedBy: ["read-note"] },
    { id: "kept-promise", key: "kept_promise", type: "boolean", value: false, usedBy: ["promise-ending"] },
  ];
  project.items = [{ id: "paper-promise", name: "Paper promise", description: "A folded promise that seems to weigh less than rain.", category: "keepsake", tone: "ivory", icon: "note" }];
  project.narrative = [
    { id: "opening", kind: "start", title: "Opening", speaker: "Mira", body: "The hill is breathing through the glass.", target: "ask-hill", choices: [], x: 10, y: 50 },
    { id: "ask-hill", kind: "choice", title: "What does Mira do?", body: "The lantern waits for an answer.", choices: [{ id: "wake", text: "Wake the lantern", target: "wake-lamp" }, { id: "read", text: "Read the folded note", target: "read-note" }], x: 30, y: 50 },
    { id: "wake-lamp", kind: "consequence", title: "Wake the lantern", speaker: "Mira", body: "A warm pulse travels down the stairs.", effect: "lamp_awake = true", target: "lamp-ending", choices: [], x: 54, y: 24 },
    { id: "read-note", kind: "consequence", title: "Read the note", speaker: "Mira", body: "The note asks you to keep a small promise.", effect: "dream_count += 1", target: "promise-ending", choices: [], x: 54, y: 76 },
    { id: "lamp-ending", kind: "ending", title: "Amber path", body: "The lower path opens under a careful light.", choices: [], x: 84, y: 24 },
    { id: "promise-ending", kind: "ending", title: "Paper promise", body: "Something soft knocks from beyond the painted door.", choices: [], x: 84, y: 76 },
    { id: "path-entry", kind: "dialogue", title: "Lower path", speaker: "Mira", body: "Rain has written a map on the stones.", choices: [], x: 16, y: 88 },
  ];
  project.timeline = [
    { id: "opening-wide", track: "Camera", label: "wide / hill observatory", start: 0, duration: 2.2, tone: "amber" },
    { id: "mira-idle", track: "Actor", label: "Mira looks toward the glass", start: 0.5, duration: 3.2, tone: "sage" },
    { id: "opening-line", track: "Dialogue", label: "The hill is breathing", start: 1.2, duration: 2.4, tone: "coral" },
  ];
  project.cutscenes = [{ id: "arrival", title: "Arrival at the hill", trigger: "manual", triggerTarget: "", shots: [{ id: "arrival-01", label: "Lantern in the rain", roomId: room.id, camera: "wide", transition: "fade", duration: 2.5, line: "There are places that only answer in weather.", speaker: "Mira" }] }];
  const lamp = room.elements.find((element) => element.kind === "lamp");
  if (lamp) project.behaviours = [{ id: "lamp-script", label: "Wake the lantern", elementId: lamp.id, blocks: [{ id: "lamp-state", kind: "set_state", target: "lamp_awake", value: "true" }, { id: "lamp-story", kind: "open_story", target: "wake-lamp" }] }];
  if (mode === "3d") { project.threeD.objects.push({ id: "hill-door", label: "Monolith door", primitive: "box", position: [0, 1.4, 2.7], rotation: [0, 0, 0], scale: [1.6, 2.8, .25], material: "coral", collider: true, interaction: { type: "room", target: "lower-path" } }); project.animations = [{ id: "monolith-fall", label: "Arrival marker falls", targetId: "arrival-marker", trigger: "click", duration: 10, fps: 30, loop: false, tracks: [{ id: "monolith-y", property: "y", keyframes: [{ id: "monolith-start", time: 0, value: 4, easing: "hold" }, { id: "monolith-fall", time: .7, value: 1, easing: "ease-in" }, { id: "monolith-end", time: 10, value: 1, easing: "hold" }] }] }]; }
  return project;
};

export function getActiveRoom(project: LumenProject) { return project.rooms.find((room) => room.id === project.activeRoom) ?? project.rooms[0]; }

export function applyEffect(project: LumenProject, effect?: string): LumenProject {
  if (!effect) return project;
  const inventory = effect.match(/^\s*inventory\.(add|remove)\("?([^"\)]+)"?\)\s*$/);
  if (inventory) { const next = structuredClone(project); const [, action, itemId] = inventory; if (!next.items.some((item) => item.id === itemId)) return next; if (action === "add" && !next.inventory.itemIds.includes(itemId)) next.inventory.itemIds.push(itemId); if (action === "remove") next.inventory.itemIds = next.inventory.itemIds.filter((candidate) => candidate !== itemId); return next; }
  const match = effect.match(/^\s*([a-zA-Z_][\w]*)\s*(=|\+=)\s*(.+?)\s*$/); if (!match) return project;
  const [, key, operator, raw] = match; const next = structuredClone(project); const variable = next.variables.find((candidate) => candidate.key === key); if (!variable) return next;
  if (variable.type === "boolean") variable.value = raw === "true";
  if (variable.type === "integer") variable.value = operator === "+=" ? Number(variable.value) + Number(raw) : Number(raw);
  if (variable.type === "string") variable.value = raw.replace(/^['"]|['"]$/g, "");
  return next;
}

export function conditionPasses(project: LumenProject, expression?: string) {
  if (!expression?.trim()) return true;
  const hasItem = expression.match(/^\s*has_item\("?([^"\)]+)"?\)\s*$/);
  if (hasItem) return project.inventory.itemIds.includes(hasItem[1]);
  const match = expression.match(/^\s*([a-zA-Z_][\w]*)\s*(==|>=|<=|>|<)\s*(.+?)\s*$/); if (!match) return false;
  const [, key, operator, raw] = match; const value = project.variables.find((variable) => variable.key === key)?.value;
  const target = raw === "true" ? true : raw === "false" ? false : Number.isNaN(Number(raw)) ? raw.replace(/^['"]|['"]$/g, "") : Number(raw);
  if (operator === "==") return value === target;
  if (typeof value !== "number" || typeof target !== "number") return false;
  return operator === ">=" ? value >= target : operator === "<=" ? value <= target : operator === ">" ? value > target : value < target;
}

export function validateProject(project: LumenProject) {
  const errors: string[] = []; const warnings: string[] = [];
  if (!project.title.trim()) errors.push("Project title is required.");
  if (!project.rooms.length) errors.push("Create at least one room.");
  if (!project.rooms.some((room) => room.id === project.activeRoom)) errors.push("Active room points to an unknown room.");
  const nodes = new Set(project.narrative.map((node) => node.id)); const rooms = new Set(project.rooms.map((room) => room.id)); const items = new Set(project.items.map((item) => item.id)); const targets = new Set(project.rooms.flatMap((room) => room.elements.map((element) => element.id)).concat(project.threeD.objects.map((object) => object.id), project.characters.map((character) => character.id)));
  const keys = project.variables.map((variable) => variable.key); if (new Set(keys).size !== keys.length) errors.push("Variable keys must be unique.");
  project.rooms.forEach((room) => { if (room.entryNode && !nodes.has(room.entryNode)) warnings.push(`${room.name} has no valid entry node.`); room.elements.forEach((element) => { if (element.interaction.type === "story" && element.interaction.target && !nodes.has(element.interaction.target)) errors.push(`${element.label} targets a missing story node.`); if (element.interaction.type === "room" && element.interaction.target && !rooms.has(element.interaction.target)) errors.push(`${element.label} targets a missing room.`); if (element.collectibleItemId && !items.has(element.collectibleItemId)) errors.push(`${element.label} points to a missing collectible item.`); }); });
  project.narrative.forEach((node) => { if (node.target && !nodes.has(node.target)) warnings.push(`${node.title} has no linked continuation.`); node.choices.forEach((choice) => { if (choice.target && !nodes.has(choice.target)) errors.push(`Choice “${choice.text || "unnamed"}” targets a missing story node.`); }); });
  project.behaviours.forEach((program) => { const element = project.rooms.flatMap((room) => room.elements).find((candidate) => candidate.id === program.elementId); if (!element) errors.push(`${program.label} is not attached to a scene element.`); program.blocks.forEach((block) => { if (block.kind === "open_story" && block.target && !nodes.has(block.target)) errors.push(`${program.label} opens a missing story node.`); if (block.kind === "move_room" && block.target && !rooms.has(block.target)) errors.push(`${program.label} opens a missing room.`); if (block.kind === "play_cutscene" && block.target && !project.cutscenes.some((cutscene) => cutscene.id === block.target)) errors.push(`${program.label} plays a missing cutscene.`); if (block.kind === "give_item" && block.target && !items.has(block.target)) errors.push(`${program.label} gives an unknown item.`); if ((block.kind === "set_state" || block.kind === "add_number") && !project.variables.some((variable) => variable.key === block.target)) errors.push(`${program.label} changes an unknown state variable.`); }); });
  project.animations.forEach((animation) => { if (!targets.has(animation.targetId)) errors.push(`${animation.label} is attached to a missing target.`); if (animation.duration !== 10 || animation.fps !== 30) errors.push(`${animation.label} must be a ten-second, 30 fps clip.`); animation.tracks.forEach((track) => track.keyframes.forEach((keyframe) => { if (keyframe.time < 0 || keyframe.time > 10) errors.push(`${animation.label} contains a keyframe outside 0–10 seconds.`); })); });
  if (project.playerControl.targetType !== "none" && !targets.has(project.playerControl.targetId)) errors.push("Player control points to a missing character or scene target.");
  if (project.mode === "3d") { if (!project.threeD.cameras.some((camera) => camera.id === project.threeD.activeCameraId)) errors.push("The active 3D camera is missing."); if (!project.threeD.objects.length) warnings.push("The 3D scene has no procedural objects yet."); }
  if (!project.narrative.some((node) => node.kind === "start")) warnings.push("No start node exists; preview will use the active room entry.");
  if (project.rooms.every((room) => room.elements.length === 0)) warnings.push("The project has no scene elements yet.");
  return { errors, warnings, score: Math.max(0, 100 - errors.length * 24 - warnings.length * 7) };
}

function normaliseProject(raw: LumenProject): LumenProject { const defaults = emptyProject(raw.title || "Untitled Lantern", raw.mode ?? "2d"); return { ...defaults, ...raw, mode: raw.mode ?? "2d", behaviours: Array.isArray(raw.behaviours) ? raw.behaviours : [], items: Array.isArray(raw.items) ? raw.items : [], inventory: raw.inventory?.itemIds ? raw.inventory : { itemIds: [], maxSlots: 12 }, animations: Array.isArray(raw.animations) ? raw.animations.map((animation) => ({ ...animation, trigger: animation.trigger ?? "manual" })) : [], characters: Array.isArray(raw.characters) && raw.characters.length ? raw.characters : defaults.characters, playerControl: raw.playerControl ?? defaults.playerControl, threeD: raw.threeD ?? defaults.threeD, toolkit: raw.toolkit ?? defaults.toolkit }; }
function migrateV3(raw: any): LumenProject { const defaults = emptyProject(typeof raw?.title === "string" ? raw.title : "Untitled Lantern", "2d"); return normaliseProject({ ...defaults, ...raw, schemaVersion: "4.0", gameApiVersion: "0.4", mode: "2d" } as LumenProject); }
export function loadLocalProject(): LumenProject { try { const current = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem("lumenforge.worldbuilder.project.v3"); if (current) { const parsed = JSON.parse(current); if (parsed.schemaVersion === "4.0" && Array.isArray(parsed.rooms) && Array.isArray(parsed.narrative)) return normaliseProject(parsed as LumenProject); if (parsed.schemaVersion === "3.0" && Array.isArray(parsed.rooms) && Array.isArray(parsed.narrative)) return migrateV3(parsed); } return createStarterProject(); } catch { return createStarterProject(); } }
export function saveLocalProject(project: LumenProject) { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...project, updatedAt: new Date().toISOString() })); }

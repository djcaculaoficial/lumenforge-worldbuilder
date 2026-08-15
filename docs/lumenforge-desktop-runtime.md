# Lumenforge 0.2 Desktop Runtime Contract

Lumenforge 0.2 is delivered as a **Windows desktop application**, not as a website that must remain open in a browser. The editor interface is authored with React and bundled into the local Tauri application. Once installed, the executable opens its own native Windows window and loads the bundled application files locally.

| Surface | Delivery mechanism | Network requirement | Local behaviour |
| --- | --- | --- | --- |
| **Lumenforge Story Studio** | NSIS-installed Tauri executable | None | Opens the bundled editor in an application window and stores working data locally. |
| **Project file** | `.lumenforge.json` | None | A portable, editable description of rooms, elements, narrative, items, inventory, cutscenes and behaviours. |
| **Game package** | `game.lumenforge.json` written by the desktop shell or downloaded in browser fallback | None | A validated release manifest containing the authored project and display-treatment settings. |
| **Final game executable** | Windows game-player build adapter | None while playing | A separately compiled player runtime that embeds or accompanies a validated game package. |

## Offline Runtime Boundary

The installed studio does not require a development server, cloud project database, remote asset catalogue, or runtime API. Its procedural stage art, scene definitions, behaviours, cutscenes, item library, preview runtime, import/export functions and release metadata are all held locally. The Windows bundle uses an offline WebView installer so the setup flow can also provide the required Windows web rendering component without relying on an already-installed runtime.

## Native Operations

The desktop shell intentionally exposes a narrow native surface. It can read and atomically write JSON project files, report desktop status, and write a validated game package into the user’s local export folder. Each write operation uses a temporary file followed by a rename, preventing a partially written project from replacing the prior saved copy.

## Release Honesty

The game-package export is real and local. It is not itself a Windows executable. Converting a package into a finished `.exe` requires a **separate game-player runtime** and a Windows native build step. Lumenforge keeps this gate visible so a portable manifest is never misrepresented as a compiled standalone game.

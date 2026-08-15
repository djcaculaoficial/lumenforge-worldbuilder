# Lumenforge Worldbuilder release identity

Lumenforge Worldbuilder is a **separate product and release lineage** from every former Lumenforge prototype. This repository is the only source used for a Worldbuilder Windows release.

| Boundary | Worldbuilder value | Reason |
|---|---|---|
| Repository | `djcaculaoficial/lumenforge-worldbuilder` | No inherited Git history or release assets. |
| Desktop identifier | `im.lumenforge.worldbuilder` | Windows treats the application as a distinct installed program. |
| Product name | `Lumenforge Worldbuilder` | The installer, window, and shortcut have an unmistakable identity. |
| Local browser state | `lumenforge.worldbuilder.project.v3` | It cannot silently reopen prototype projects. |
| Project schema | `3.0` | Imported projects must explicitly match the new contract. |
| Game-package format | `lumenforge-worldbuilder-game-package` | Export files are unambiguously Worldbuilder packages. |
| Export folder | `Documents/Lumenforge Worldbuilder Exports` | Native export locations do not overlap prototype output. |
| Release tags | `worldbuilder-v*` | The new workflow cannot publish from a generic legacy tag. |

Every production build generates `worldbuilder-verification.json` inside the bundled frontend. It records the product, source revision, UTC build time, file inventory, and SHA-256 digest of the compiled frontend. The **Export** workspace displays the revision and fingerprint; a release workflow also checks that the compiled bundle contains the expanded-editor markers: `WORLDBUILDER`, `Items`, `Cutscene`, `Logic`, and the Worldbuilder game-package format.

The public release contains both a **portable executable** and an **NSIS installer**, plus `worldbuilder-verification.json` and `SHA256SUMS.txt`. A release is not considered verified merely because an installer exists: the visible in-app release badge, compiled marker assertions, manifest fingerprint, and uploaded checksum must agree.

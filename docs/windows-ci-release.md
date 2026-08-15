# Lumenforge Windows Installer Without a Local Windows Machine

This release route uses a **native Windows continuous-integration runner** rather than attempting to cross-compile the installer in the Linux sandbox. It exists because the local sandbox repeatedly terminated the Windows-target Rust compiler before the installer bundle could be produced.

> The new workflow deliberately treats the **NSIS setup executable** as the required download and the **MSI package** as supplemental. The installed project configuration asks Tauri for both formats; however, an MSI build can depend on the Windows VBSCRIPT optional feature, while a native NSIS setup executable is the simpler direct-download route.[1] [2]

## One-time repository setup

Create a new GitHub repository from the extracted Lumenforge source. Upload or commit the entire project root, including the new `.github/workflows/windows-installer.yml` file, `client/`, `src-tauri/`, `docs/`, `package.json`, `pnpm-lock.yaml`, and the TypeScript configuration files. Do **not** upload `node_modules` or `src-tauri/target`.

The workflow uses `windows-latest`, Node 22, pnpm 10.4.1, and a stable Rust toolchain. It installs dependencies from the supplied lockfile, runs the TypeScript check, builds the NSIS installer, then attempts the MSI package. The NSIS output is uploaded as a required workflow artifact. GitHub supports artifact uploads with a configurable retention period through `actions/upload-artifact`; this workflow keeps the outputs for 30 days, subject to the repository’s retention limits.[3]

## Trigger the installer build

Open the repository on GitHub and use the following sequence:

1. Select the **Actions** tab.
2. Select **Build Windows installer** from the workflow list.
3. Select **Run workflow** and confirm the default branch.
4. Wait for the **Windows x64 installer** job to finish.
5. Open the completed run and download the **Lumenforge-Windows-x64-NSIS** artifact from the Artifacts section.

The downloaded artifact is a ZIP file created by GitHub. Extract it and run the contained `*-setup.exe` file on a Windows 10 or Windows 11 x64 computer.

## What the workflow actually verifies

| Workflow step | Expected outcome | Meaning |
|---|---|---|
| `pnpm install --frozen-lockfile` | Succeeds | The package set matches the project lockfile. |
| `pnpm check` | Succeeds | The React/TypeScript source type-checks. |
| `pnpm desktop:build --bundles nsis` | Succeeds | A native Windows setup executable has been bundled. |
| Artifact upload | Succeeds | The installer is available for download from that workflow run. |
| `pnpm desktop:build --bundles msi` | Optional | Produces an MSI package when the runner has all MSI-specific Windows prerequisites. |

The workflow does **not** sign the installer and does not automatically publish a public GitHub Release. Do not distribute an unsigned installer widely without first obtaining and securely configuring an appropriate Windows code-signing certificate. Code signing is a separate distribution concern in Tauri’s release guidance.[4]

## After downloading the NSIS artifact

Before calling the file a release, use a clean Windows test environment and verify that the installer launches, Lumenforge opens without a development server, local project saving works, JSON export/import round-trips correctly, the playable preview responds to both authored choices, and uninstall completes cleanly. The separate `Lumenforge-Windows-Build-Tutorial.md` covers these checks in detail.

## References

[1] [Tauri — Windows Installer](https://v2.tauri.app/distribute/windows-installer/)

[2] [Tauri — GitHub Pipeline](https://v2.tauri.app/distribute/pipelines/github/)

[3] [GitHub Docs — Store and Share Data with Workflow Artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)

[4] [Tauri — Distribute](https://v2.tauri.app/distribute/)

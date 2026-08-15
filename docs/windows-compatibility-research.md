# Lumenforge Windows Compatibility Research

## Current evidence boundary

The current Lumenforge implementation is a browser-based React prototype. It can be used in a modern Windows browser, but it is **not yet a packaged Windows desktop executable**. No Windows image, physical device, installer, WebView runtime condition, GPU driver, accessibility tool, or release package has been tested in this environment. Therefore, native Windows compatibility is a delivery target and validation plan, not a claim about the present build.

## Recommended desktop route

The most direct evolution path from the existing React application is a **Tauri 2 desktop shell**, with a deliberately narrow native command surface. The React interface remains the creative workspace; a Rust host owns native windowing, file dialogs, atomic project writes, project-folder access, autosave recovery, and a constrained build runner. The game runtime must remain a separate process or separate sandbox boundary.

Tauri’s documented Windows prerequisites include Microsoft C++ Build Tools and Microsoft Edge WebView2 for development. Its Windows installer guidance documents MSI and NSIS installer outputs, an x64 MSVC target, and several WebView2 installation modes. This makes it appropriate for a later, auditable Windows delivery pipeline, but does not remove the need to test on named Windows releases and hardware classes.[1][2]

WebView2 is a credible bridge from the present React interface to a native shell: Microsoft documents that it embeds HTML, CSS, and JavaScript inside native applications, supports Windows 10 and Windows 11, and offers both evergreen and fixed-version distribution models.[3] A production implementation must decide deliberately whether installer size, offline installation, and patch ownership justify an offline installer or a fixed runtime; the default downloaded bootstrapper is incompatible with the offline-creation requirement.

## Compatibility contract for the first native candidate

| Dimension | Proposed initial contract | Current evidence |
| --- | --- | --- |
| Host operating system | Windows 10 22H2 x64 and Windows 11 22H2+ x64 | Not yet tested; these are named target environments, not a guarantee. |
| Desktop shell | Tauri 2, React renderer, WebView2, MSVC target | Architecture proposal; no shell has been added yet. |
| Browser prototype | Current stable Chromium-family browser on Windows 10/11 | Supported by the web platform only; browser/device QA pending. |
| Installer candidate | Signed NSIS or MSI installer for initial direct distribution, with an embedded offline WebView2 installer if offline first-run installation is required; assess MSIX separately for Store/enterprise needs | Packaging route not implemented or signed. |
| CPU architecture | x64 first; ARM64 only after a native build and target-device validation | ARM64 out of the initial acceptance gate. |
| GPU | Direct3D-class hardware capable of current WebView2 composition | Capability checks and physical GPU testing are not yet implemented. |
| Offline creation | Project editing, preview, save, and JSON export must work without network access | Prototype is designed around local data; persistence still requires implementation. |

## Release gates to implement

The future native release must establish a reproducible build on Windows, signed installer behavior, clean install/update/uninstall, file-association behavior, crash recovery, and a compatibility matrix covering Windows 10/11, 100–200% display scaling, integrated and discrete GPUs, keyboard-only navigation, and at least one screen-reader pass. The Windows App Certification Kit is a useful additional gate for package readiness; its documented tests include crash/hang monitoring, resilience against forward Windows-version checks, activation, and binary security expectations such as DEP and ASLR.[3]

## Sources

[1] [Tauri — Prerequisites](https://v2.tauri.app/start/prerequisites/)

[2] [Tauri — Windows Installer](https://v2.tauri.app/distribute/windows-installer/)

[3] [Microsoft Learn — Microsoft Edge WebView2](https://learn.microsoft.com/en-us/microsoft-edge/webview2/)

[4] [Microsoft Learn — Windows App Certification Kit tests](https://learn.microsoft.com/en-us/windows/uwp/debug-test-perf/windows-app-certification-kit-tests)

[5] [Microsoft Learn — Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/)

[6] [Microsoft Learn — MSIX Packaging Tool overview](https://learn.microsoft.com/en-us/windows/msix/packaging-tool/tool-overview)

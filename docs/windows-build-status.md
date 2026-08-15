# Windows Native Build Status

The public repository is available at `https://github.com/djcaculaoficial/lumenforge-creator`.

The first two native Windows builds identified packaging omissions: the initial archive lacked `patches/wouter@3.7.1.patch`, and the next archive retained managed-web analytics placeholders that cannot resolve in an offline desktop build. The current v3 source archive includes the required patch, source directories, desktop shell, and an analytics-free HTML entry point.

The icon-complete Windows-native workflow is `https://github.com/djcaculaoficial/lumenforge-creator/actions/workflows/build-windows-v4.yml`. Its run `https://github.com/djcaculaoficial/lumenforge-creator/actions/runs/31852639936` completed successfully on 15 August 2026. The Windows runner installed dependencies, passed TypeScript validation, built the production frontend, compiled the Tauri application, generated `Lumenforge_0.1.0_x64-setup.exe`, and uploaded it as the `Lumenforge-Windows-x64-NSIS` artifact.

The downloadable build artifact is available at `https://github.com/djcaculaoficial/lumenforge-creator/actions/runs/31852639936/artifacts/9238119939`. GitHub reported an artifact archive size of 217,576,658 bytes and SHA-256 digest `e0490c06615d670536f60d86540dd5fed03d539a11eddd23782b617b198f3123`.

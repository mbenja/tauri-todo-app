<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/23458996/169625198-7db8fbf5-ae14-4876-8989-578aabec0dba.png" />
  <h1 align="center">Todo</h1>
  <p align="center">
    A simple desktop to-do list application written with React and Rust.<br /><br />
    <a href="https://github.com/mbenja/tauri-todo-app/files/8745880/Todo_0.1.0_x64.dmg.zip">Download for macOS</a>
  </p>
</p>


Todo is a minimalistic, cross-platform desktop application for creating and managing to-do lists. It's built with [Tauri](https://tauri.studio/), a framework for building desktop applications using a web front-end and Rust. Unlike Electron, Tauri doesn't ship an entire browser. Instead, the UI is rendered in a native WebView, resulting with a lower memory footprint and smaller bundles.

<div align="center">
  <img width="49%" style="margin: auto;" alt="Todo light mode" src="https://user-images.githubusercontent.com/23458996/169627461-e54e9ec9-647e-4cbf-bd01-51d84f23f93e.png">
  <img width="49%" alt="Todo dark mode" src="https://user-images.githubusercontent.com/23458996/169627466-bba3c89f-ffcd-4a79-9bdc-4308268c6550.png">
</div>

### Features
* Create, rename, and delete to-do lists
* Create, mark as complete/incomplete, and delete to-do items
* Light and dark themes
* Native system menu and keyboard shortcut support
* Local SQLite database
* Lightning fast

### Tech Stack
* React + TypeScript
* tailwindcss
* Tauri
* Rust
* Prisma + SQLite

This app has only been tested and built for macOS, but a Windows or Linux bundle can be acquired by cloning the repo and building from source.

```
git clone https://github.com/mbenja/tauri-todo-app.git
cd tauri-todo-app/app
npm i
npm run tauri build
```

By default the Tauri CLI uses your machine's architecture to determine which executable to build, but this behavior can be tweaked by providing the `target` argument. See the [Tauri docs](https://tauri.studio/v1/guides/distribution/publishing) for details.

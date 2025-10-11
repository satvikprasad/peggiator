# H-Sharp
A music visualiser written in [Typescript](https://www.typescriptlang.org) and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), powered by [Electron](https://www.electronjs.org).
<img width="912" alt="Screenshot 2025-06-15 at 11 57 20 am" src="https://github.com/user-attachments/assets/3fcd3d61-5130-411c-aff1-838aa817bf5a" />

### What can Peggiator do?
Peggiator is a 3D-capable music visualiser that can run as both a Desktop app, and in the web. It takes an audio file (.wav, .mp3, .flac) as input, processes it into distinct buffers, and generates vertices corresponding to a dynamic 3D object in the workspace. Peggiator can be extended with custom objects using Typescript and an inbuilt code editor powered by Monaco.

#### How does it work?
Peggiator is a simple HTML+JS web app with a sidebar generated using React, and a workspace rendered using WebGL. The bulk of audio processing is done using WebAssembly, which was transpiled from Zig. It can also run under Electron, making it Desktop-compatible.

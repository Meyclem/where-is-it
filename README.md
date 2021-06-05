# ❓❗Where is it ❗❓

## Usage

### Installation

This project uses node `14.15.1` and yarn `1.22.4`.
You can manuall install them or use [asdf](https://github.com/asdf-vm/asdf).

```bash
asdf install
yarn install
```

### Firebase emulator init

```bash
firebase login
firebase init emulators
firebase init functions
```

### Start the app in development environment

```bash
# Development mode
yarn fb:start
yarn dev
```
> - The app will be available on http://localhost:5000/
> - Firebase emulation ui: http://localhost:5001/

### Build the project

```bash
yarn build
```

### Linter

You can use eslint to help you format your code.

```bash
yarn lint
```

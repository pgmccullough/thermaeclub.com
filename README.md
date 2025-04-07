# Remix WebSocket Template

This is a pre-configured Remix application template that includes:

- **Remix** for building fast and dynamic web applications.
- **Socket.io** for WebSockets support.
- **Lefthook** for strict linting and pre-commit hooks.
- **Commitlint** to enforce Conventional Commit messages.
- **Jest** to enforce Conventional Commit messages.

## Features

- 🚀 **Production-ready Remix setup**
- 🔥 **WebSockets integration via Socket.io**
- ✅ **Pre-configured Lefthook for linting and pre-commit hooks**
- 📜 **Commitlint setup to enforce Conventional Commits**
- 🧪 **Unit and Integration tests with Jest**

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)

### Installation

Clone the repository and install dependencies.

### Running the App

Start the development server:

```sh
npm run dev
```

This starts the Remix app along with the WebSocket server.

### Linting and Pre-commit Hooks

Lefthook is pre-configured to run linting and formatting checks before commits.
To manually run the pre-commit checks:

```sh
npm run lint
```

### Commit Message Enforcement

Commitlint is set up to enforce [Conventional Commit messages](https://www.conventionalcommits.org/en/v1.0.0/). For example:

```sh
git commit -m "feat: add websocket support"
```

If your commit message doesn’t follow the format, it will be rejected.

## Testing

This project uses Jest for unit and integration tests. They are run automatically during linting, or when attempting a commit.

To run the tests manually:

```sh
npm run test
```

### Writing Tests

Tests are located in the `__tests__` directory. You can add your own tests following the structure of the existing tests.

 - Use React Testing Library for component tests.
 - Use Jest mocks and spies for integration and unit tests.

## Contributing

Feel free to submit issues or PRs to improve this template!

## License

This project is licensed under the MIT License.


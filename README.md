<h1 align="center">Mebli</h1>

## Table of Content
- [Table of Content](#table-of-content)
- [Getting Started](#getting-started)
  - [Quick Start & Documentation](#quick-start--documentation)
  - [Generate an application](#generate-an-application)
  - [Generate a library](#generate-a-library)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Understand your workspace](#understand-your-workspace)
  - [Further help](#further-help)
- [Contribution Workflow](#contribution-workflow)
- [Team](#team)

## Getting Started

1. Clone this project by running `git clone https://github.com/schulzi66/mebli.git`
2. Make sure you have [node](https://nodejs.dev/) installed
3. Run `npm install -g @angular/cli`
4. Run `npm install` in the new `mebli` folder to install the node modules

### Quick Start & Documentation

> This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mebli/mylib`.

### Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.


## Contribution Workflow

To work on Mebli the following workflow should be followed:

1. Make sure you are on the `main` branch by running `git checkout main` in the terminal
2. Make sure you have the latest source code by running `git pull` and `npm install` in the terminal
3. Create a new branch to develop your changes by running `git checkout -b feat/your-feature-name-or-description` in the terminal
   - For feature implementations or adjustments please use `feat/`
   - For bug fixes please use `fix/`
   - To see the complete list of all branch and commit prefixes checkout [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
4. Develop your changes / features 
5. Stage your changes via VS Code or in the terminal by running `git add <file>...`. You can see your changes either in VS Code or in the terminal by running `git status`
6. To commit your staged changes, write a meaningful commit message starting again with the prefixes `feat:`, `fix:` etc. depending on the type of change with `git commit -m "feat: your-meaningfull-message"`. 
7. Push your changes either via VS Code or by running `git push -u origin feat/your-feature-name-or-description`
8. Go to the github repository and create a [Pull Request](https://github.com/schulzi66/mebli/pulls)
9. The pipeline will run the unit tests and publish a preview page of the changes automatically, where the team can test them
10. As soon as the pull request is approved, the changes will be deployed automatically to the live [Mebli Page](#https://mebli-wbh.web.app/)

## Team

- Ilka Lübben
- Marvin Nolte
- Andreas Schwarzkopf
- Marius Schulze

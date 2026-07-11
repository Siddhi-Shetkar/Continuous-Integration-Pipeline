# GitHub Actions CI/CD Workflow with Security Scanning

## Overview

This project demonstrates the implementation of a GitHub Actions workflow for Continuous Integration (CI) and security scanning. The workflow is configured to automatically run whenever code is pushed to the repository or a pull request is created.

The repository includes automated dependency installation, build steps, validation checks, and CodeQL-based security analysis.

## Features

- Automated GitHub Actions workflow
- Runs on `push` and `pull_request` events
- Installs project dependencies
- Builds the application
- Performs validation checks
- CodeQL security scanning
- Organized workflow configuration using GitHub Actions

## Workflow

### Continuous Integration (CI)

The CI workflow performs the following steps:

1. Checks out the repository
2. Sets up the required runtime environment
3. Installs project dependencies
4. Builds the project
5. Executes validation checks (such as linting, formatting, or tests)

### Security Scanning

The security workflow uses GitHub CodeQL to:

- Analyze the source code
- Detect potential security vulnerabilities
- Identify common coding issues
- Generate security analysis reports

## Workflow Triggers

The workflows are triggered automatically on:

- Push to the repository
- Pull Request creation or updates

## Project Structure

```
.github/
└── workflows/
    ├── ci.yml
    └── codeql.yml

README.md
```

## Setup

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Navigate to the project directory.

```bash
cd <repository-name>
```

3. Install dependencies.

```bash
npm install
```

4. Run the project locally (if applicable).

```bash
npm run dev
```

## Notes

The CodeQL security scanning workflow executes successfully and performs the intended security analysis.

The CI workflow has been implemented with dependency installation, build, and validation steps. However, despite multiple debugging attempts, an unresolved configuration issue prevents the CI workflow from completing successfully in its current state. The repository is submitted to demonstrate the implemented workflow and overall approach.

## Demo

A demo video showing the GitHub Actions workflows has been included with the submission.

## Technologies Used

- GitHub Actions
- GitHub CodeQL
- YAML
- Node.js
- npm
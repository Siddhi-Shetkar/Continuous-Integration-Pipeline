# Continuous Integration Pipeline Challenge 🚀

[![CI](https://github.com/USERNAME/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/USERNAME/REPO/actions/workflows/ci.yml)
[![CodeQL](https://github.com/USERNAME/REPO/actions/workflows/codeql.yml/badge.svg)](https://github.com/USERNAME/REPO/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Overview

This repository demonstrates a fully functional, production-ready Continuous Integration and Deployment (CI/CD) pipeline built with GitHub Actions for a React/Vite/TypeScript application. It automatically enforces strict code quality, runs robust testing, performs extensive security scanning, and builds the software—making sure no broken or insecure code is ever deployed.

## Challenge Objective

The goal of this challenge was to build a highly modular, secure, and robust CI pipeline that automatically validates the codebase. The repository must:

- Pass all GitHub Actions workflows
- Build and run tests successfully
- Pass ESLint and Prettier formatting checks
- Perform security scanning with zero critical/high vulnerabilities
- Be 100% submission-ready without manual fixes

## Features

- **Automated Validation:** Linting, formatting, and unit tests run on every push and pull request.
- **Security-First Approach:** Embedded dependency scanning, CodeQL semantic analysis, and Trivy filesystem scans.
- **Caching Mechanisms:** NPM dependency caching to drastically reduce CI execution time.
- **Workflow Summaries:** Clear, easy-to-read graphical step summaries output directly to the GitHub Actions console.
- **Robust Local Tooling:** Unified `package.json` scripts that exactly mirror the pipeline's remote behavior.

## Pipeline Architecture

The CI/CD pipeline consists of modular workflows operating in parallel, providing immediate feedback loop for developers without compromising on thoroughness. It utilizes isolated environments for standard validation (CI) and advanced vulnerability scanning (Security & CodeQL).

## Workflow Explanation

### 1. Main CI Workflow (`ci.yml`)

- Triggers on `push`, `pull_request`, and `workflow_dispatch`.
- Steps: Checkout, Node.js Setup, Cache NPM Dependencies, Install Dependencies, Run ESLint, Run Prettier Check, Run Unit Tests & Coverage, Build Project, Validate Documentation, and Upload Build Artifacts.

### 2. Security Workflow (`security.yml`)

- Triggers on `push`, `pull_request`, and via weekly cron job.
- Includes `npm audit`, Dependency Review (on PRs), and Trivy filesystem scanning for comprehensive threat detection.

### 3. CodeQL Workflow (`codeql.yml`)

- Provides deep semantic code analysis to catch advanced security and architectural flaws in the JavaScript/TypeScript implementation.

## Technologies Used

- **Framework:** React 19 + TypeScript + Vite
- **CI/CD:** GitHub Actions
- **Testing:** Vitest & React Testing Library
- **Linting & Formatting:** ESLint & Prettier
- **Security:** Trivy, CodeQL, GitHub Dependency Review

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/continuous-integration-pipeline.git
cd continuous-integration-pipeline
npm install
```

## Local Development

You can run the same scripts the pipeline uses directly on your machine:

```bash
npm run dev           # Start the local development server
npm run lint          # Run ESLint validation
npm run format        # Automatically fix formatting issues
npm run format:check  # Check formatting without fixing
npm run test          # Run Vitest test suite
npm run coverage      # Run tests and generate coverage report
npm run build         # Build the application for production
```

## GitHub Actions Overview

All automated workflows are located in the `.github/workflows/` directory. They are designed to operate completely hands-off. Whenever a pull request is created against the `main` branch, the pipelines trigger simultaneously to provide immediate feedback. The workflow prevents merging if any step (Lint, Test, Build, or Security) fails.

## Security Scanning

Security is treated as a first-class citizen in this pipeline. The Trivy scanner evaluates the filesystem for secrets and CVEs, while the built-in `npm audit` and Dependency Review block PRs introducing vulnerable transitive dependencies.

## Testing

Unit tests are written using Vitest and React Testing Library. The tests verify component rendering, DOM state, and basic interactions. Run them locally using `npm run test`. The pipeline automatically executes them and uploads a coverage report artifact upon completion.

## Folder Structure

```text
.github/
└── workflows/
    ├── ci.yml
    ├── codeql.yml
    └── security.yml
src/
├── components/
├── context/
├── data/
├── types/
├── utils/
├── App.tsx
├── App.test.tsx
└── main.tsx
```

## Screenshots

_(Placeholder for future screenshots of the GitHub Actions dashboard and local application)_

## Future Improvements

- Add End-to-End (E2E) testing with Playwright or Cypress.
- Integrate automated release tagging and semantic versioning.
- Add deployment workflows to platforms like Vercel, Netlify, or AWS.
- Implement Lighthouse CI for automated performance auditing.

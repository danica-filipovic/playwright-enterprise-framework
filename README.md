# Playwright Enterprise E-End-to-End Test Automation Framework

A hybrid (UI/API) e-commerce test automation framework built using **Playwright**, **TypeScript**, and **GitHub Actions** CI/CD. Designed with a modular Page Object Model (POM) architecture, robust error handling, and parallel execution capabilities targeting the SauceDemo platform.

---

## 🚀 Key Features

* **Modular Page Object Model (POM):** Clean separation of test logic from page locators and actions.
* **Hybrid Data Management:** Combines static baseline constants with dynamic, runtime data generation to prevent test collisions.
* **Smart CI/CD Integration:** Configured with GitHub Actions for automated regression runs, auto-retries for flaky network states, and artifact retention (traces, screenshots, videos).
* **Advanced Utilities:** Custom helpers for dynamic ID generation and safe e-commerce price parsing.

---

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Test Engine:** Playwright Test Runner
* **CI/CD:** GitHub Actions
* **Target Application:** SauceDemo (`https://www.saucedemo.com`)

---

## 📂 Project Structure

```text
playwright-enterprise-framework/
├── .github/
│   └── workflows/        # CI/CD pipeline configurations
├── data/
│   └── testData.json     # Static test credentials and baseline strings
├── pages/
│   ├── BasePage.ts       # Parent class with shared browser actions
│   └── ProductsPage.ts   # Feature-specific page objects
├── tests/
│   └── checkout.spec.ts  # End-to-end user journey test specs
├── utils/
│   └── helpers.ts        # Reusable utility functions (data generators, parsers)
├── playwright.config.ts  # Global Playwright configuration
├── tsconfig.json         # TypeScript compiler options
└── package.json          # Project dependencies and npm scripts
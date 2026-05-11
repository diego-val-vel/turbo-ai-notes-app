# AI Usage Documentation

This document describes how AI tools were used during the development of this project, in alignment with the challenge requirement to document AI-assisted workflows.

The goal of using AI was to accelerate implementation, improve iteration speed, and validate technical approaches while maintaining full human control over architecture, product decisions, and code validation.

## 1. Scope of AI Assistance

AI tools were used in the following areas.

### Frontend Architecture

- Refining the structure of the Next.js application.
- Reviewing separation between features, shared utilities, and API concerns.
- Validating autosave workflow approaches.
- Reviewing debounce strategies for note persistence.
- Improving defensive state handling.

### Backend Structure

- Reviewing Django REST Framework endpoint organization.
- Validating serializer and API response structures.
- Reviewing authentication flow organization.
- Improving test coverage structure.

### UX and Product Decisions

- Reviewing relative date formatting behavior.
- Validating empty state flows.
- Improving category filtering behavior.
- Reviewing autosave UX behavior and timestamp updates.

### Testing

- Structuring Vitest configuration.
- Drafting frontend unit tests.
- Reviewing API client edge cases.
- Improving test coverage for utility functions and session handling.

### Documentation

- Improving README structure and organization.
- Reviewing setup instructions.
- Structuring AI usage documentation.

---

## 2. Validation Process

All AI-generated suggestions were manually reviewed before integration.

The validation process included:

- Manual code review before applying changes.
- Running frontend tests with Vitest.
- Running backend Django tests.
- Running ESLint validation.
- Running production builds with Next.js.
- Manual end-to-end testing of the application.
- Verifying Docker container execution.
- Validating autosave behavior and category filtering manually.

No AI-generated code was merged without manual inspection and execution validation.

---

## 3. Human-Driven Technical Decisions

The following decisions were intentionally made by the author and not delegated to AI.

- Using autosave instead of a manual save button.
- Creating default categories automatically for each user.
- Keeping the backend intentionally simple and CRUD-focused.
- Centralizing API request handling in a shared API client.
- Using frontend-side filtering for categories.
- Using debounce-based autosave behavior.
- Choosing Vitest for frontend testing.
- Keeping the project fully Dockerized for local execution consistency.
- Avoiding unnecessary architectural complexity or overengineering.

These decisions reflect deliberate trade-offs appropriate for a take-home senior engineering challenge.

---

## 4. What AI Did Not Do

AI was not used to:

- Make architectural decisions autonomously.
- Replace understanding of business logic.
- Generate unreviewed boilerplate blindly.
- Define product behavior independently.
- Make UX decisions without validation.
- Replace manual testing or debugging.

AI was used as a productivity and iteration assistant, not as a decision-maker.

---

## 5. Summary

AI tools were used to improve development speed, iteration cycles, and documentation quality while all critical technical decisions, validations, testing, and trade-offs remained under direct human control.

The final implementation, architecture, validations, and UX behavior were explicitly reviewed and verified by the author.

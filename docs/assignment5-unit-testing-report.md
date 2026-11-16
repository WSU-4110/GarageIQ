# Assignment 5: Unit Testing

## Framework

The frontend maintenance rules use the Node.js built-in test runner (`node:test`) and strict assertions (`node:assert/strict`). It requires no third-party test dependency. From `frontend`, run `npm test`; the configured script discovers the JavaScript test files with `node --test src/lib/*.test.js`.

## Selected code and test coverage

The tests cover the maintenance rules module, which supports the maintenance form and reminder dashboard. They exercise these methods/functions:

1. `monthsDraft` — cleans typed input, preserves a valid in-progress decimal, limits length, and handles null input.
2. `digitsOnly` — removes non-digits, applies the seven-digit limit, and handles missing input.
3. `isOdometer` — checks blank, boundary, negative, fractional, scientific-notation, and over-limit values.
4. `intervalError` — checks missing names/intervals, mileage range and step constraints, month steps, and valid combinations.
5. `maintenanceError` — checks mileage, date format, future dates, reminder errors, and valid records.
6. `plusMonths` — checks leap-year month-end clamping, half-month behavior, and invalid inputs.
7. `MileageReminderStrategy.calculate` — checks case-insensitive matching, latest valid baseline selection, and unrelated/invalid records.
8. `TimeReminderStrategy.calculate` — checks latest matching date selection and computed remaining days.
9. `ReminderCalculator.calculate` — checks strategy result aggregation, injected strategies, and due-soon behavior.

Existing `calculateReminder` tests also cover mileage and time reminders that are due soon, overdue, missing a baseline, or outside the due-soon window.

## Execution screenshots

The assignment asks for six screenshots of test execution for Canvas. Capture the terminal output after running `npm test` in the `frontend` directory and insert six screenshots here before submitting. The current development environment does not include Node.js/npm, so execution screenshots could not be captured in this workspace.

## Commit links

Add the GitHub commit URL(s) for the `Faiyad_unittest` branch here after the changes are committed and pushed. Canvas submission is separate from the repository commit.

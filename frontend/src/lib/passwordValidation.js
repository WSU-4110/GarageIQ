// Password policy: at least 8 characters, with at least one letter and one number.
// To tighten the policy later, add more entries to PASSWORD_RULES (e.g. upper/lower case, symbol).
export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_RULES = [
  {
    id: "length",
    label: `At least ${MIN_PASSWORD_LENGTH} characters`,
    test: (password) => password.length >= MIN_PASSWORD_LENGTH,
  },
  {
    id: "letter",
    label: "At least one letter (A–Z)",
    test: (password) => /[A-Za-z]/.test(password),
  },
  {
    id: "number",
    label: "At least one number (0–9)",
    test: (password) => /\d/.test(password),
  },
];

export function validatePassword(password) {
  const value = String(password ?? "");
  const failed = PASSWORD_RULES.filter((rule) => !rule.test(value));
  return {
    valid: failed.length === 0,
    failed: failed.map((rule) => rule.label),
  };
}

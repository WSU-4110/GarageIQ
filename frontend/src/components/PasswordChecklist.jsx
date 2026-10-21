import { PASSWORD_RULES } from "../lib/passwordValidation.js";

export default function PasswordChecklist({ password }) {
  return (
    <ul className="password-checklist" aria-label="Password requirements">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(password);
        return (
          <li key={rule.id} className={met ? "met" : ""}>
            <span aria-hidden="true">{met ? "✓" : "○"}</span>
            {rule.label}
            <span className="sr-only">{met ? " (met)" : " (not met)"}</span>
          </li>
        );
      })}
    </ul>
  );
}

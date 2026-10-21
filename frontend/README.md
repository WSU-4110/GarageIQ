# GarageIQ frontend

## Firebase setup

The frontend uses the Firebase Web SDK for email/password authentication and the
Firestore database configured by `VITE_FIREBASE_DATABASE_ID`. The current GCP
database shown in the Firebase console is named `garageiq`; new accounts store
their profile at `users/{Firebase Auth UID}`. The existing `users/admin`
document is not read, modified, or migrated.

1. In Firebase project `garageiq-510316`, enable **Authentication → Sign-in
   method → Email/Password**.
2. Register a Web app in **Project settings** and copy its API key, auth domain,
   and app ID.
3. Copy `.env.example` to `.env.local` and fill in those Web app values. Keep
   `VITE_FIREBASE_PROJECT_ID=garageiq-510316` and
   `VITE_FIREBASE_DATABASE_ID=garageiq` for the project/database in the
   provided console link. `.env.local` is ignored by Git.
4. In the Firestore console for database `garageiq`, open **Rules** and publish
   the contents of [`firestore.rules`](./firestore.rules). These rules allow an
   authenticated user to access only the `users/{uid}` document matching their
   own Firebase Auth UID.
5. Add `localhost` and your deployed site domain to Firebase Authentication's
   **Authorized domains** if they are not already listed.
6. Enable **Authentication → Sign-in method → Google** (pick a support email and save).
7. (Recommended) Under **Authentication → Settings → Password policy**, require a minimum
length of 8 with lowercase/uppercase letters and numeric characters, and enforce it, so the
rule also applies server-side and not only in the signup form.
8. (Optional) Under **Authentication → Templates → Email address verification**, customize the
verification email's sender name, subject, and message.
9. Run `npm run dev` from this `frontend` directory.

### Sign-in behavior

- **Email/password sign-up** requires a password of at least 8 characters containing letters and
numbers (`src/lib/passwordValidation.js`). A verification email is sent on sign-up, and the app
routes to `/verify-email` until the address is verified; all protected pages require a verified email.
- **Google sign-in** is available on the login and signup pages. Google accounts arrive already
verified. A `users/{uid}` profile is created on first Google sign-in.

The browser Firebase configuration is public client configuration, not a
service-account credential. Never put a service-account key in this frontend.
Profile and vehicle fields are saved to the signed-in user's `users/{uid}`
document: `name`, `email`, `Car`, `LastOilChange`, `LastTireRotation`,
`LastTransmissionService`, and `Modifications`. Cloud Storage uploads are not
implemented yet; the planner, shop, and build-sheet export panels remain demo UI.

Register Form Example (For Educational Purpose only)

This folder contains a small HTML5/CSS3/JavaScript example of a registration form with client-side validation.

Files:
- index.html — main page
- styles.css — styles and animation for the "Other" reveal
- script.js — form validation and reveal logic

How to open:
1. Open `index.html` in your browser (double-click or right-click -> Open with).
2. Try selecting "Other" in the Proficiency dropdown — a text field will appear with a smooth motion.
3. Submit the form; validation errors show below fields.

Redirect on success:
- On successful submission the page saves the registration to sessionStorage and redirects to `success.html` which displays the registered information.

Notes:
- If you want the registration to persist between browser sessions, replace sessionStorage with localStorage or send the data to a server.

Notes:
- Validation is client-side only (for demo). Add server-side validation before using in production.
- The animation uses max-height transitions for simplicity and accessibility.

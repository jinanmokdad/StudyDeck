import * as z from "zod";

// Rules for the login form. Zod checks the shape of the input
// (is it a valid email? is the password long enough?).
// Whether the credentials are correct is checked separately in login.jsx.
const loginSchema = z.object({
    email: z.string().trim().min(1, "Email is required.").pipe(z.email("Enter a valid email address.")),
    password: z.string().min(1, "Password is required.").min(6, "Password must be at least 6 characters."),
});

export default loginSchema;

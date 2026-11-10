// Turns a failed Zod result into { fieldName: "first error message" }
// so each form field can show its own message.
export default function getFieldErrors(zodError) {
    const errors = {};
    for (const issue of zodError.issues) {
        const fieldName = issue.path[0];
        // Keep only the first message for each field.
        if (fieldName !== undefined && errors[fieldName] === undefined) {
            errors[fieldName] = issue.message;
        }
    }
    return errors;
}

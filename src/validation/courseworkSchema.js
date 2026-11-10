import * as z from "zod";
import { COURSEWORK_TYPES, STATUSES } from "../constants/coursework";
import { isValidDate } from "../utils/dates";

// Rules for the Add and Edit forms. Every field arrives from a TextInput
// as a string; the weight is checked and then converted to a number.
const courseworkSchema = z.object({
    title: z.string().trim()
        .min(1, "Title is required.")
        .max(80, "Keep the title under 80 characters."),

    course: z.string().trim()
        .min(1, "Course is required.")
        .max(80, "Keep the course name under 80 characters."),

    type: z.enum(COURSEWORK_TYPES, { error: "Choose a type." }),

    dueDate: z.string().trim()
        .min(1, "Due date is required.")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD, for example 2026-11-24.")
        .refine(isValidDate, "This is not a real calendar date."),

    weight: z.string().trim()
        .min(1, "Weight is required.")
        .regex(/^\d+(\.\d+)?$/, "Weight must be a number, for example 15.")
        .transform((text) => Number(text))
        .pipe(z.number()
            .min(0, "Weight must be between 0 and 100.")
            .max(100, "Weight must be between 0 and 100.")),

    status: z.enum(STATUSES, { error: "Choose a status." }),

    notes: z.string().trim().max(300, "Keep notes under 300 characters."),
});

export default courseworkSchema;

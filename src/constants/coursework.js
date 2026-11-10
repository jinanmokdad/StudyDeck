import colors from "./colors";

// Allowed values, shared by the form, the filters and the Zod schema.
export const COURSEWORK_TYPES = ["Assignment", "Quiz", "Project", "Exam"];
export const STATUSES = ["To do", "In progress", "Done"];

// Colours for each status badge.
export const STATUS_COLORS = {
    "To do": { background: colors.warningLight, text: colors.warning },
    "In progress": { background: colors.primaryLight, text: colors.primary },
    "Done": { background: colors.successLight, text: colors.success },
};

// Icon shown for each type of coursework.
export const TYPE_ICONS = {
    Assignment: "document-text-outline",
    Quiz: "help-circle-outline",
    Project: "construct-outline",
    Exam: "school-outline",
};

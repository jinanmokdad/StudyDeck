// Date helpers. Due dates are stored as "YYYY-MM-DD" strings.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// "2026-11-24" -> a Date at local midnight, or null if it is not a real date.
export function parseDate(text) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    // new Date(2026, 1, 31) silently becomes March 3, so check it did not roll over.
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    return date;
}

export function isValidDate(text) {
    return parseDate(text) !== null;
}

// Whole days from today until the due date (negative when overdue).
export function daysUntil(dueDate) {
    const due = parseDate(dueDate);
    if (!due) return 0;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((due - today) / (1000 * 60 * 60 * 24));
}

// "2026-11-24" -> "Tue, Nov 24, 2026"
export function formatDate(dueDate) {
    const date = parseDate(dueDate);
    if (!date) return dueDate;
    return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// A short human label, e.g. "Due today", "3 days left", "Overdue by 2 days".
export function getDueLabel(dueDate, status) {
    if (status === "Done") return "Completed";

    const days = daysUntil(dueDate);
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    if (days > 1) return `${days} days left`;
    if (days === -1) return "Overdue by 1 day";
    return `Overdue by ${Math.abs(days)} days`;
}

// true when the work is not done and is due within 3 days (or overdue).
export function isUrgent(dueDate, status) {
    return status !== "Done" && daysUntil(dueDate) <= 3;
}

// Today's date as "YYYY-MM-DD" (used as a default in the add form).
export function todayString() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
}

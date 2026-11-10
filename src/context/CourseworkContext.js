import { createContext, useContext } from "react";

// The coursework list and the functions that change it live in the
// root layout (src/app/_layout.jsx). This context passes them down so the
// list, details, add, edit and profile screens all use the same data.
const CourseworkContext = createContext(null);

export const CourseworkProvider = CourseworkContext.Provider;

export function useCoursework() {
    const value = useContext(CourseworkContext);
    if (value === null) {
        throw new Error("useCoursework must be used inside CourseworkProvider");
    }
    return value;
}

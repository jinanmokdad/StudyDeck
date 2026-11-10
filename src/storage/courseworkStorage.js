import AsyncStorage from "@react-native-async-storage/async-storage";

// All coursework is saved under one key as a JSON string.
const STORAGE_KEY = "studydeck:coursework";

// Returns the saved array, or null if nothing has ever been saved
// (first launch). An empty array [] is a valid saved value: it means
// the user deleted everything, and it must stay empty after a restart.
export async function loadCoursework() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) {
        return null;
    }

    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
        throw new Error("Saved coursework is not a list");
    }
    return data;
}

// Saves the whole list. Throws if the write fails, so the caller can
// show an error and keep the previous state.
export async function saveCoursework(courseworkList) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(courseworkList));
}

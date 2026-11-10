import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import FeedbackBanner from "../components/FeedbackBanner";
import colors from "../constants/colors";
import { CourseworkProvider } from "../context/CourseworkContext";
import mockCoursework from "../data/mockCoursework";
import { loadCoursework, saveCoursework } from "../storage/courseworkStorage";

export default function RootLayout() {
    // The coursework list is kept here, in the parent of every screen,
    // so all screens read and change the same data.
    const [coursework, setCoursework] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    // Feedback banner shown after an action, e.g. "Coursework added".
    const [feedback, setFeedback] = useState({ message: "", type: "success" });

    function showMessage(message, type = "success") {
        setFeedback({ message, type });
    }

    function hideMessage() {
        setFeedback({ message: "", type: "success" });
    }

    // Hide the banner automatically after 3 seconds.
    useEffect(() => {
        if (!feedback.message) return;
        const timer = setTimeout(hideMessage, 3000);
        return () => clearTimeout(timer);
    }, [feedback]);

    // Load the saved list once, when the app starts.
    useEffect(() => {
        loadSavedCoursework();
    }, []);

    async function loadSavedCoursework() {
        setIsLoading(true);
        setLoadError("");
        try {
            const saved = await loadCoursework();
            if (saved === null) {
                // First launch: start with the sample data and save it.
                setCoursework(mockCoursework);
                await saveCoursework(mockCoursework);
            } else {
                // Includes [] when the user has deleted everything.
                setCoursework(saved);
            }
        } catch (error) {
            console.warn("Loading coursework failed", error);
            setLoadError("Your saved coursework could not be loaded.");
        } finally {
            setIsLoading(false);
        }
    }

    // Save first, then update state. If saving fails, the screen keeps
    // the old data and shows an error, so state and storage never disagree.
    async function saveList(nextList) {
        try {
            await saveCoursework(nextList);
            setCoursework(nextList);
            return true;
        } catch (error) {
            console.warn("Saving coursework failed", error);
            return false;
        }
    }

    // ids from the URL are strings, so compare as strings.
    function getCourseworkById(id) {
        return coursework.find((item) => String(item.id) === String(id));
    }

    // Add a new item with the next free id.
    async function addCoursework(data) {
        const nextId = Math.max(0, ...coursework.map((item) => item.id)) + 1;
        return saveList([...coursework, { id: nextId, ...data }]);
    }

    // Replace the fields of one item, keep its id.
    async function updateCoursework(id, data) {
        return saveList(coursework.map((item) => (item.id === id ? { ...item, ...data } : item)));
    }

    // Remove one item (the confirmation is shown on the Details screen).
    async function deleteCoursework(id) {
        return saveList(coursework.filter((item) => item.id !== id));
    }

    // Unique course names, offered as quick picks in the form.
    const courseNames = [...new Set(coursework.map((item) => item.course))].sort();

    const contextValue = {
        coursework,
        courseNames,
        isLoading,
        loadError,
        retryLoading: loadSavedCoursework,
        getCourseworkById,
        addCoursework,
        updateCoursework,
        deleteCoursework,
        showMessage,
    };

    return (
        <CourseworkProvider value={contextValue}>
            <StatusBar style="light" />
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: colors.primary },
                        headerTintColor: colors.white,
                        headerTitleStyle: { fontWeight: "700" },
                        contentStyle: { backgroundColor: colors.background },
                    }}
                >
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ title: "Log in" }} />
                    <Stack.Screen name="coursework" options={{ title: "My Coursework" }} />
                    <Stack.Screen name="details/[id]" options={{ title: "Details" }} />
                    <Stack.Screen name="add" options={{ title: "Add coursework" }} />
                    <Stack.Screen name="edit/[id]" options={{ title: "Edit coursework" }} />
                </Stack>
                <FeedbackBanner message={feedback.message} type={feedback.type} onDismiss={hideMessage} />
            </View>
        </CourseworkProvider>
    );
}

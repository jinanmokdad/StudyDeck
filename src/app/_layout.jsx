import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import colors from "../constants/colors";
import { CourseworkProvider } from "../context/CourseworkContext";
import mockCoursework from "../data/mockCoursework";

export default function RootLayout() {
    // The coursework list is kept here, in the parent of every screen,
    // so all screens read and change the same data.
    const [coursework, setCoursework] = useState(mockCoursework);

    // ids from the URL are strings, so compare as strings.
    function getCourseworkById(id) {
        return coursework.find((item) => String(item.id) === String(id));
    }

    // Add a new item with the next free id.
    async function addCoursework(data) {
        const nextId = Math.max(0, ...coursework.map((item) => item.id)) + 1;
        setCoursework([...coursework, { id: nextId, ...data }]);
        return true;
    }

    // Replace the fields of one item, keep its id.
    async function updateCoursework(id, data) {
        setCoursework(coursework.map((item) => (item.id === id ? { ...item, ...data } : item)));
        return true;
    }

    // Unique course names, offered as quick picks in the form.
    const courseNames = [...new Set(coursework.map((item) => item.course))].sort();

    const contextValue = { coursework, courseNames, getCourseworkById, addCoursework, updateCoursework };

    return (
        <CourseworkProvider value={contextValue}>
            <StatusBar style="light" />
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
        </CourseworkProvider>
    );
}

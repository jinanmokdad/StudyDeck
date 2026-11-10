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

    const contextValue = { coursework };

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
            </Stack>
        </CourseworkProvider>
    );
}

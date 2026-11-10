import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import colors from "../constants/colors";

export default function RootLayout() {
    return (
        <>
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
            </Stack>
        </>
    );
}

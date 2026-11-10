import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import colors from "../constants/colors";

// Wraps every screen: background colour, padding, scrolling,
// and keeps form fields visible above the keyboard on iOS.
// Set the "centered" prop to centre the content vertically (welcome screen).
export default function AppScreen({ children, centered = false, contentStyle }) {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={[styles.content, centered && styles.centered, contentStyle]}
                keyboardShouldPersistTaps="handled"
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, padding: 20, paddingBottom: 48 },
    centered: { justifyContent: "center", padding: 28 },
});

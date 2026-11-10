import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../constants/colors";

// A short message shown at the bottom of the screen after an action,
// e.g. "Coursework added". The parent decides when to show and hide it.
//   message   - text to show (nothing is rendered when it is empty)
//   type      - "success" or "error"
//   onDismiss - callback when the user taps the banner
export default function FeedbackBanner({ message, type = "success", onDismiss }) {
    const insets = useSafeAreaInsets();
    if (!message) return null;

    const isError = type === "error";

    return (
        <Pressable
            onPress={onDismiss}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            style={[styles.banner, isError ? styles.error : styles.success, { bottom: insets.bottom + 16 }]}
        >
            <Ionicons name={isError ? "alert-circle" : "checkmark-circle"} size={22} color={colors.white} />
            <Text style={styles.text}>{message}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    banner: {
        position: "absolute", left: 16, right: 16,
        flexDirection: "row", alignItems: "center", gap: 10,
        paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14,
        shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 6,
    },
    success: { backgroundColor: colors.success },
    error: { backgroundColor: colors.danger },
    text: { flex: 1, color: colors.white, fontSize: 15, fontWeight: "600" },
});

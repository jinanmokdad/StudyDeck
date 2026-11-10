import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

// A form row: label on top, the input (children) in the middle,
// and an optional hint or validation error underneath.
export default function FormField({ label, error, hint, children }) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            {children}
            {error
                ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
                : hint ? <Text style={styles.hint}>{hint}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    field: { marginBottom: 16 },
    label: { fontSize: 15, fontWeight: "600", color: colors.text, marginBottom: 6 },
    error: { color: colors.danger, fontSize: 14, marginTop: 6 },
    hint: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
});

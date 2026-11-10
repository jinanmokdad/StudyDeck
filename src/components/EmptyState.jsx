import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import AppButton from "./AppButton";

// Friendly message for an empty list, no search results, or a load error.
// If actionText and onAction are given, a button is shown too.
export default function EmptyState({ icon = "file-tray-outline", title, message, actionText, onAction }) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={48} color={colors.textMuted} />
            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            {actionText && onAction ? <AppButton text={actionText} onPress={onAction} variant="secondary" style={styles.button} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 16 },
    title: { fontSize: 19, fontWeight: "700", color: colors.text, marginTop: 12, textAlign: "center" },
    message: { fontSize: 15, color: colors.textMuted, marginTop: 6, textAlign: "center", lineHeight: 22 },
    button: { marginTop: 16, alignSelf: "stretch" },
});

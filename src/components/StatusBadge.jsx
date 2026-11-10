import { StyleSheet, Text, View } from "react-native";
import { STATUS_COLORS } from "../constants/coursework";

// A small coloured pill showing an item's status ("To do", "In progress", "Done").
export default function StatusBadge({ status }) {
    const palette = STATUS_COLORS[status] ?? STATUS_COLORS["To do"];
    return (
        <View style={[styles.badge, { backgroundColor: palette.background }]}>
            <Text style={[styles.text, { color: palette.text }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: "flex-start" },
    text: { fontSize: 13, fontWeight: "700" },
});

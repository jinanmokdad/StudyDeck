import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { TYPE_ICONS } from "../constants/coursework";
import { formatDate, getDueLabel, isUrgent } from "../utils/dates";
import StatusBadge from "./StatusBadge";

// One coursework item in the list.
// Props:
//   item    - the coursework object to display
//   onPress - callback; the card calls onPress(item) when tapped,
//             and the parent screen decides what to do (open details).
export default function CourseworkCard({ item, onPress }) {
    const urgent = isUrgent(item.dueDate, item.status);
    const isDone = item.status === "Done";

    return (
        <Pressable
            onPress={() => onPress(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.course}, ${getDueLabel(item.dueDate, item.status)}`}
            style={({ pressed }) => [styles.card, urgent && styles.urgentCard, pressed && styles.pressed]}
        >
            <View style={styles.topRow}>
                <View style={styles.typeRow}>
                    <Ionicons name={TYPE_ICONS[item.type] ?? "document-outline"} size={16} color={colors.textMuted} />
                    <Text style={styles.type}>{item.type} · {item.weight}%</Text>
                </View>
                <StatusBadge status={item.status} />
            </View>

            <Text style={[styles.title, isDone && styles.doneTitle]} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.course} numberOfLines={1}>{item.course}</Text>

            <View style={styles.bottomRow}>
                <Text style={styles.date}>{formatDate(item.dueDate)}</Text>
                <Text style={[styles.dueLabel, urgent && styles.urgentLabel, isDone && styles.doneLabel]}>
                    {getDueLabel(item.dueDate, item.status)}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
    },
    urgentCard: { borderLeftColor: colors.danger },
    pressed: { opacity: 0.75 },
    topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    typeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    type: { fontSize: 13, color: colors.textMuted, fontWeight: "600" },
    title: { fontSize: 18, fontWeight: "700", color: colors.text },
    doneTitle: { color: colors.textMuted, textDecorationLine: "line-through" },
    course: { fontSize: 14, color: colors.textMuted, marginTop: 2 },
    bottomRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
    date: { fontSize: 14, color: colors.text },
    dueLabel: { fontSize: 14, fontWeight: "700", color: colors.primary },
    urgentLabel: { color: colors.danger },
    doneLabel: { color: colors.success },
});

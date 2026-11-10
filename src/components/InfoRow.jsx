import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

// One labelled line on the details screen, e.g. [icon] Course: CSC 0279 ...
export default function InfoRow({ icon, label, value, isLast = false }) {
    return (
        <View style={[styles.row, !isLast && styles.divider]}>
            <Ionicons name={icon} size={20} color={colors.primary} style={styles.icon} />
            <View style={styles.textBox}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 12 },
    divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
    icon: { marginTop: 2, marginRight: 12 },
    textBox: { flex: 1 },
    label: { fontSize: 13, color: colors.textMuted },
    value: { fontSize: 16, color: colors.text, marginTop: 2 },
});

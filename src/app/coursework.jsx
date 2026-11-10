import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppScreen from "../components/AppScreen";
import CourseworkCard from "../components/CourseworkCard";
import colors from "../constants/colors";
import { useCoursework } from "../context/CourseworkContext";

// Home screen: the list of all coursework.
export default function CourseworkScreen() {
    const { coursework } = useCoursework();

    const todoCount = coursework.filter((item) => item.status === "To do").length;
    const inProgressCount = coursework.filter((item) => item.status === "In progress").length;
    const doneCount = coursework.filter((item) => item.status === "Done").length;

    // Earliest due date first, so the most urgent work is on top.
    const sortedItems = [...coursework].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    function openDetails(item) {
        router.push({ pathname: "/details/[id]", params: { id: item.id } });
    }

    return (
        <AppScreen>
            <View style={styles.summary}>
                <SummaryBox label="To do" count={todoCount} />
                <SummaryBox label="In progress" count={inProgressCount} />
                <SummaryBox label="Done" count={doneCount} />
            </View>

            {sortedItems.map((item) => (
                <CourseworkCard key={item.id} item={item} onPress={openDetails} />
            ))}
        </AppScreen>
    );
}

function SummaryBox({ label, count }) {
    return (
        <View style={styles.summaryBox}>
            <Text style={styles.summaryCount}>{count}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    summary: { flexDirection: "row", gap: 10, marginBottom: 16 },
    summaryBox: { flex: 1, backgroundColor: colors.card, borderRadius: 14, paddingVertical: 12, alignItems: "center", borderWidth: 1, borderColor: colors.border },
    summaryCount: { fontSize: 24, fontWeight: "800", color: colors.primaryDark },
    summaryLabel: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
});

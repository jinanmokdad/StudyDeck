import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import EmptyState from "../../components/EmptyState";
import InfoRow from "../../components/InfoRow";
import StatusBadge from "../../components/StatusBadge";
import colors from "../../constants/colors";
import { TYPE_ICONS } from "../../constants/coursework";
import { useCoursework } from "../../context/CourseworkContext";
import { daysUntil, formatDate, getDueLabel } from "../../utils/dates";

// Details of one coursework item. Only the id is passed in the URL;
// the item itself is read from shared state, so edits show up here too.
export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const { getCourseworkById } = useCoursework();
    const item = getCourseworkById(id);

    function goBackToList() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/coursework");
        }
    }

    if (!item) {
        return (
            <AppScreen>
                <EmptyState
                    icon="alert-circle-outline"
                    title="Coursework not found"
                    message="This item may have been deleted."
                    actionText="Back to my coursework"
                    onAction={goBackToList}
                />
            </AppScreen>
        );
    }

    const days = daysUntil(item.dueDate);
    const isDone = item.status === "Done";
    let countdownStyle = styles.countdownNormal;
    if (isDone) countdownStyle = styles.countdownDone;
    else if (days <= 3) countdownStyle = styles.countdownUrgent;

    return (
        <AppScreen>
            <StatusBadge status={item.status} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.course}>{item.course}</Text>

            <View style={[styles.countdown, countdownStyle]}>
                <Text style={styles.countdownText}>{getDueLabel(item.dueDate, item.status)}</Text>
                {!isDone && <Text style={styles.countdownSub}>Due {formatDate(item.dueDate)}</Text>}
            </View>

            <View style={styles.card}>
                <InfoRow icon={TYPE_ICONS[item.type] ?? "document-outline"} label="Type" value={item.type} />
                <InfoRow icon="calendar-outline" label="Due date" value={formatDate(item.dueDate)} />
                <InfoRow icon="pie-chart-outline" label="Weight" value={`${item.weight}% of the final grade`} />
                <InfoRow icon="flag-outline" label="Status" value={item.status} />
                <InfoRow icon="create-outline" label="Notes" value={item.notes ? item.notes : "No notes"} isLast />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 26, fontWeight: "800", color: colors.text, marginTop: 10 },
    course: { fontSize: 16, color: colors.textMuted, marginTop: 4 },
    countdown: { borderRadius: 14, padding: 16, marginTop: 18 },
    countdownNormal: { backgroundColor: colors.primary },
    countdownUrgent: { backgroundColor: colors.danger },
    countdownDone: { backgroundColor: colors.success },
    countdownText: { color: colors.white, fontSize: 22, fontWeight: "800" },
    countdownSub: { color: colors.white, fontSize: 15, marginTop: 4, opacity: 0.9 },
    card: { backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 16, marginTop: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
});

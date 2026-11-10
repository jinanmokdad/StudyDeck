import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import colors from "../constants/colors";
import { useCoursework } from "../context/CourseworkContext";
import MOCK_USER from "../data/mockUser";
import { formatDate, getDueLabel } from "../utils/dates";

export default function ProfileScreen() {
    const { coursework } = useCoursework();

    const total = coursework.length;
    const doneCount = coursework.filter((item) => item.status === "Done").length;
    const inProgressCount = coursework.filter((item) => item.status === "In progress").length;
    const todoCount = coursework.filter((item) => item.status === "To do").length;
    const percentDone = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    // The earliest item that is not done yet.
    const nextDeadline = coursework
        .filter((item) => item.status !== "Done")
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];

    function logOut() {
        // Close every screen above the first one, then replace it with Login,
        // so Back cannot return to the app after logging out.
        if (router.canDismiss()) {
            router.dismissAll();
        }
        router.replace("/login");
    }

    return (
        <AppScreen>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{MOCK_USER.name.charAt(0)}</Text>
                </View>
                <Text style={styles.name}>{MOCK_USER.name}</Text>
                <Text style={styles.detail}>{MOCK_USER.email}</Text>
                <Text style={styles.detail}>{MOCK_USER.university}</Text>
            </View>

            <Text style={styles.section}>Progress</Text>
            <View style={styles.card}>
                <Text style={styles.progressText}>{doneCount} of {total} items completed ({percentDone}%)</Text>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${percentDone}%` }]} />
                </View>

                <View style={styles.stats}>
                    <Stat label="Total" value={total} />
                    <Stat label="To do" value={todoCount} />
                    <Stat label="In progress" value={inProgressCount} />
                    <Stat label="Done" value={doneCount} />
                </View>
            </View>

            <Text style={styles.section}>Next deadline</Text>
            <View style={styles.card}>
                {nextDeadline ? (
                    <>
                        <Text style={styles.nextTitle}>{nextDeadline.title}</Text>
                        <Text style={styles.detail}>{nextDeadline.course}</Text>
                        <Text style={styles.nextDue}>
                            {formatDate(nextDeadline.dueDate)} · {getDueLabel(nextDeadline.dueDate, nextDeadline.status)}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.detail}>Nothing left to do. Well done!</Text>
                )}
            </View>

            <AppButton text="Log out" onPress={logOut} variant="danger" style={styles.logout} />
        </AppScreen>
    );
}

function Stat({ label, value }) {
    return (
        <View style={styles.stat}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { alignItems: "center", marginBottom: 8 },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginBottom: 12 },
    avatarText: { color: colors.white, fontSize: 34, fontWeight: "800" },
    name: { fontSize: 24, fontWeight: "800", color: colors.text },
    detail: { fontSize: 15, color: colors.textMuted, marginTop: 2 },
    section: { fontSize: 18, fontWeight: "700", color: colors.text, marginTop: 20, marginBottom: 8 },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border },
    progressText: { fontSize: 15, color: colors.text, marginBottom: 10 },
    progressTrack: { height: 10, borderRadius: 5, backgroundColor: colors.primaryLight, overflow: "hidden" },
    progressFill: { height: 10, backgroundColor: colors.success },
    stats: { flexDirection: "row", marginTop: 16 },
    stat: { flex: 1, alignItems: "center" },
    statValue: { fontSize: 22, fontWeight: "800", color: colors.primaryDark },
    statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2, textAlign: "center" },
    nextTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
    nextDue: { fontSize: 15, color: colors.primary, fontWeight: "600", marginTop: 8 },
    logout: { marginTop: 28 },
});

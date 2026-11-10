import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import colors from "../constants/colors";

// Welcome (entry) screen.
export default function WelcomeScreen() {

    function openLogin() {
        // replace (not push) so Back cannot return to the welcome screen.
        router.replace("/login");
    }

    return (
        <AppScreen centered>
            <View style={styles.logo}>
                <Ionicons name="layers" size={56} color={colors.white} />
            </View>

            <Text style={styles.heading}>StudyDeck</Text>
            <Text style={styles.tagline}>
                All your assignments, quizzes, projects and exams in one place, with the most urgent work always on top.
            </Text>

            <View style={styles.points}>
                <Point icon="calendar-outline" text="See what is due and how many days are left" />
                <Point icon="pie-chart-outline" text="Know how much each piece of work is worth" />
                <Point icon="checkmark-done-outline" text="Track work from To do to Done" />
            </View>

            <AppButton text="Get started" onPress={openLogin} />
        </AppScreen>
    );
}

// Small presentational component used only on this screen.
function Point({ icon, text }) {
    return (
        <View style={styles.point}>
            <Ionicons name={icon} size={22} color={colors.primary} />
            <Text style={styles.pointText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 96, height: 96, borderRadius: 28, backgroundColor: colors.primary,
        alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 24,
    },
    heading: { fontSize: 36, fontWeight: "800", color: colors.primaryDark, textAlign: "center" },
    tagline: { fontSize: 17, lineHeight: 25, color: colors.textMuted, textAlign: "center", marginTop: 12, marginBottom: 28 },
    points: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 28, gap: 14 },
    point: { flexDirection: "row", alignItems: "center", gap: 12 },
    pointText: { flex: 1, fontSize: 15, color: colors.text, lineHeight: 21 },
});

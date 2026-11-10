import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

// Spinner with a short message. Shown only while saved data is being read.
export default function LoadingView({ message = "Loading..." }) {
    return (
        <View style={styles.container} accessibilityRole="progressbar">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", justifyContent: "center", paddingVertical: 60 },
    text: { marginTop: 12, fontSize: 15, color: colors.textMuted },
});

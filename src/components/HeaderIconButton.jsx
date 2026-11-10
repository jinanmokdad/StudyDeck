import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet } from "react-native";
import colors from "../constants/colors";

// An icon button for the navigation header (e.g. the Profile button).
export default function HeaderIconButton({ icon, label, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={label}
            hitSlop={8}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons name={icon} size={26} color={colors.white} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
    pressed: { opacity: 0.6 },
});

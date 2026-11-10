import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

// A reusable button.
// Props:
//   text      - the label shown on the button
//   onPress   - callback run when the button is pressed
//   variant   - "primary" (default), "secondary" or "danger"
//   disabled  - when true the button is faded and cannot be pressed
//   loading   - when true a spinner replaces the label (used while saving)
export default function AppButton({ text, onPress, variant = "primary", disabled = false, loading = false, style }) {
    const isDisabled = disabled || loading;

    function getButtonStyle({ pressed }) {
        return [
            styles.button,
            styles[variant],
            pressed && !isDisabled && styles.pressed,
            isDisabled && styles.disabled,
            style,
        ];
    }

    let spinnerColor = colors.white;
    if (variant === "secondary") spinnerColor = colors.primary;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityLabel={text}
            style={getButtonStyle}
        >
            {loading
                ? <ActivityIndicator color={spinnerColor} />
                : <Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>{text}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.primary },
    danger: { backgroundColor: colors.danger },
    pressed: { opacity: 0.8 },
    disabled: { opacity: 0.5 },
    text: { color: colors.white, fontSize: 16, fontWeight: "600" },
    secondaryText: { color: colors.primary },
});

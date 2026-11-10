import { StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

// A styled TextInput. Any extra props (keyboardType, secureTextEntry,
// autoCapitalize, multiline, ...) are passed straight through.
// "hasError" draws a red border so the user can see which field is wrong.
export default function AppTextInput({ hasError = false, style, ...otherProps }) {
    return (
        <TextInput
            placeholderTextColor={colors.textMuted}
            style={[styles.input, otherProps.multiline && styles.multiline, hasError && styles.inputError, style]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text,
        minHeight: 48,
    },
    multiline: { minHeight: 96, textAlignVertical: "top" },
    inputError: { borderColor: colors.danger, borderWidth: 1.5 },
});

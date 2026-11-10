import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import colors from "../constants/colors";

// Search input with a clear (x) button.
//   value        - current search text (owned by the parent)
//   onChangeText - callback with the new text
export default function SearchBar({ value, onChangeText, placeholder = "Search" }) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                style={styles.input}
                accessibilityLabel="Search coursework"
            />
            {value.length > 0 && (
                <Pressable onPress={() => onChangeText("")} accessibilityLabel="Clear search" style={styles.clear}>
                    <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", alignItems: "center", gap: 8,
        backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
        borderRadius: 12, paddingHorizontal: 12, minHeight: 48, marginBottom: 12,
    },
    input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 10 },
    clear: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
});

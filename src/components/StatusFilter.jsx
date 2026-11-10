import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

// A row of filter chips. The parent owns the selected value:
//   options  - list of labels, e.g. ["All", "To do", "In progress", "Done"]
//   selected - the label that is currently active
//   onChange - callback; called with the label the user tapped
export default function StatusFilter({ options, selected, onChange }) {
    return (
        <View style={styles.row}>
            {options.map((option) => {
                const isSelected = option === selected;
                return (
                    <Pressable
                        key={option}
                        onPress={() => onChange(option)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                    >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{option}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingVertical: 4 },
    chip: {
        paddingHorizontal: 16, minHeight: 40, justifyContent: "center", borderRadius: 999,
        backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    },
    chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { fontSize: 15, color: colors.text, fontWeight: "600" },
    chipTextSelected: { color: colors.white },
});

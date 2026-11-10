import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

// Lets the user pick exactly one value from a short list (used for Type and Status).
//   options  - list of labels
//   selected - the current value
//   onSelect - callback with the chosen label
export default function OptionPicker({ options, selected, onSelect }) {
    return (
        <View style={styles.row}>
            {options.map((option) => {
                const isSelected = option === selected;
                return (
                    <Pressable
                        key={option}
                        onPress={() => onSelect(option)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isSelected }}
                        style={[styles.option, isSelected && styles.optionSelected]}
                    >
                        <Text style={[styles.text, isSelected && styles.textSelected]}>{option}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    option: {
        paddingHorizontal: 14, minHeight: 40, justifyContent: "center", borderRadius: 10,
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white,
    },
    optionSelected: { backgroundColor: colors.primaryLight, borderColor: colors.primary, borderWidth: 1.5 },
    text: { fontSize: 15, color: colors.text },
    textSelected: { color: colors.primaryDark, fontWeight: "700" },
});

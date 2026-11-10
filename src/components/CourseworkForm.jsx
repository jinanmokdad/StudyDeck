import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { COURSEWORK_TYPES, STATUSES } from "../constants/coursework";
import courseworkSchema from "../validation/courseworkSchema";
import getFieldErrors from "../validation/getFieldErrors";
import AppButton from "./AppButton";
import AppTextInput from "./AppTextInput";
import FormField from "./FormField";
import OptionPicker from "./OptionPicker";

// The form used by both the Add and the Edit screens.
// Props:
//   initialValues     - starting values for every field (strings)
//   submitText        - label of the save button ("Add coursework" / "Save changes")
//   courseSuggestions - existing course names the user can tap to fill the Course field
//   onSubmit          - async callback; receives the validated data and
//                       returns true if it was saved, false if saving failed
//   onCancel          - callback for the Cancel button
export default function CourseworkForm({ initialValues, submitText, courseSuggestions = [], onSubmit, onCancel }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [saveError, setSaveError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Update one field and clear its error while the user corrects it.
    function setField(name, value) {
        setValues((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
    }

    async function handleSubmit() {
        setSaveError("");

        const result = courseworkSchema.safeParse(values);
        if (!result.success) {
            setErrors(getFieldErrors(result.error));
            setSaveError("Please fix the highlighted fields.");
            return; // invalid data is never saved
        }

        setErrors({});
        setIsSaving(true);
        const saved = await onSubmit(result.data);
        setIsSaving(false);

        if (!saved) {
            setSaveError("Could not save your changes. Please try again.");
        }
    }

    const otherCourses = courseSuggestions.filter((name) => name !== values.course);

    return (
        <View>
            <FormField label="Title" error={errors.title}>
                <AppTextInput
                    value={values.title}
                    onChangeText={(text) => setField("title", text)}
                    placeholder="e.g. Lab 8: Navigation"
                    hasError={Boolean(errors.title)}
                />
            </FormField>

            <FormField label="Course" error={errors.course}>
                <AppTextInput
                    value={values.course}
                    onChangeText={(text) => setField("course", text)}
                    placeholder="e.g. CSC 0279 Mobile Application Development"
                    hasError={Boolean(errors.course)}
                />
                {otherCourses.length > 0 && (
                    <View style={styles.suggestions}>
                        {otherCourses.map((name) => (
                            <Pressable key={name} onPress={() => setField("course", name)} style={styles.suggestion}>
                                <Text style={styles.suggestionText} numberOfLines={1}>{name}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </FormField>

            <FormField label="Type" error={errors.type}>
                <OptionPicker options={COURSEWORK_TYPES} selected={values.type} onSelect={(value) => setField("type", value)} />
            </FormField>

            <FormField label="Due date" error={errors.dueDate} hint="Format: YYYY-MM-DD">
                <AppTextInput
                    value={values.dueDate}
                    onChangeText={(text) => setField("dueDate", text)}
                    placeholder="2026-11-24"
                    keyboardType="numbers-and-punctuation"
                    autoCorrect={false}
                    maxLength={10}
                    hasError={Boolean(errors.dueDate)}
                />
            </FormField>

            <FormField label="Weight (% of final grade)" error={errors.weight} hint="A number from 0 to 100">
                <AppTextInput
                    value={values.weight}
                    onChangeText={(text) => setField("weight", text)}
                    placeholder="15"
                    keyboardType="decimal-pad"
                    maxLength={5}
                    hasError={Boolean(errors.weight)}
                />
            </FormField>

            <FormField label="Status" error={errors.status}>
                <OptionPicker options={STATUSES} selected={values.status} onSelect={(value) => setField("status", value)} />
            </FormField>

            <FormField label="Notes (optional)" error={errors.notes}>
                <AppTextInput
                    value={values.notes}
                    onChangeText={(text) => setField("notes", text)}
                    placeholder="Chapters, room, group members..."
                    multiline
                    hasError={Boolean(errors.notes)}
                />
            </FormField>

            {saveError.length > 0 && (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{saveError}</Text>
                </View>
            )}

            <AppButton text={submitText} onPress={handleSubmit} loading={isSaving} />
            <AppButton text="Cancel" onPress={onCancel} variant="secondary" disabled={isSaving} />
        </View>
    );
}

const styles = StyleSheet.create({
    suggestions: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
    suggestion: { backgroundColor: colors.primaryLight, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, maxWidth: "100%" },
    suggestionText: { color: colors.primaryDark, fontSize: 13 },
    errorBox: { backgroundColor: colors.dangerLight, borderRadius: 10, padding: 12, marginBottom: 8 },
    errorText: { color: colors.danger, fontSize: 15 },
});

import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import AppButton from "./AppButton";

// A confirmation pop-up (used before deleting).
// Props:
//   visible      - show or hide the dialog
//   title        - heading, e.g. "Delete coursework?"
//   message      - explanation shown under the heading
//   confirmText  - label of the destructive button
//   onConfirm    - callback when the user confirms
//   onCancel     - callback when the user cancels or taps outside
//   busy         - shows a spinner on the confirm button while working
export default function ConfirmDialog({ visible, title, message, confirmText = "Delete", onConfirm, onCancel, busy = false }) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <Pressable style={styles.backdrop} onPress={busy ? undefined : onCancel} accessibilityLabel="Close dialog">
                {/* Pressing inside the box should not close it */}
                <Pressable style={styles.box} onPress={() => { }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttons}>
                        <AppButton text="Cancel" variant="secondary" onPress={onCancel} disabled={busy} style={styles.button} />
                        <AppButton text={confirmText} variant="danger" onPress={onConfirm} loading={busy} style={styles.button} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: "rgba(20, 24, 40, 0.5)", justifyContent: "center", padding: 24 },
    box: { backgroundColor: colors.white, borderRadius: 18, padding: 20 },
    title: { fontSize: 20, fontWeight: "800", color: colors.text },
    message: { fontSize: 16, color: colors.textMuted, marginTop: 8, lineHeight: 23 },
    buttons: { flexDirection: "row", gap: 10, marginTop: 20 },
    button: { flex: 1 },
});

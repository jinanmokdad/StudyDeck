import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import ConfirmDialog from "../../components/ConfirmDialog";
import EmptyState from "../../components/EmptyState";
import InfoRow from "../../components/InfoRow";
import LoadingView from "../../components/LoadingView";
import StatusBadge from "../../components/StatusBadge";
import colors from "../../constants/colors";
import { TYPE_ICONS } from "../../constants/coursework";
import { useCoursework } from "../../context/CourseworkContext";
import { daysUntil, formatDate, getDueLabel } from "../../utils/dates";

// Details of one coursework item. Only the id is passed in the URL;
// the item itself is read from shared state, so edits show up here too.
export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const { getCourseworkById, updateCoursework, deleteCoursework, isLoading, showMessage } = useCoursework();
    const item = getCourseworkById(id);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    function goBackToList() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/coursework");
        }
    }

    function openEdit() {
        router.push({ pathname: "/edit/[id]", params: { id: item.id } });
    }

    // Quick action: move the item to the next status without opening the form.
    async function moveToNextStatus() {
        const nextStatus = item.status === "To do" ? "In progress" : item.status === "In progress" ? "Done" : "To do";
        setIsUpdatingStatus(true);
        const saved = await updateCoursework(item.id, { status: nextStatus });
        setIsUpdatingStatus(false);
        if (saved) {
            showMessage(`Status changed to ${nextStatus}`);
        } else {
            showMessage("Could not change the status. Please try again.", "error");
        }
    }

    function askToDelete() {
        setDeleteError("");
        setShowDeleteDialog(true);
    }

    async function confirmDelete() {
        setIsDeleting(true);
        const deleted = await deleteCoursework(item.id);
        setIsDeleting(false);
        setShowDeleteDialog(false);

        if (deleted) {
            showMessage(`"${item.title}" deleted`);
            goBackToList();
        } else {
            setDeleteError("Could not delete this item. Please try again.");
        }
    }

    if (isLoading) {
        return <AppScreen><LoadingView /></AppScreen>;
    }

    if (!item) {
        return (
            <AppScreen>
                <EmptyState
                    icon="alert-circle-outline"
                    title="Coursework not found"
                    message="This item may have been deleted."
                    actionText="Back to my coursework"
                    onAction={goBackToList}
                />
            </AppScreen>
        );
    }

    const days = daysUntil(item.dueDate);
    const isDone = item.status === "Done";
    let countdownStyle = styles.countdownNormal;
    if (isDone) countdownStyle = styles.countdownDone;
    else if (days <= 3) countdownStyle = styles.countdownUrgent;

    return (
        <AppScreen>
            <StatusBadge status={item.status} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.course}>{item.course}</Text>

            <View style={[styles.countdown, countdownStyle]}>
                <Text style={styles.countdownText}>{getDueLabel(item.dueDate, item.status)}</Text>
                {!isDone && <Text style={styles.countdownSub}>Due {formatDate(item.dueDate)}</Text>}
            </View>

            <View style={styles.card}>
                <InfoRow icon={TYPE_ICONS[item.type] ?? "document-outline"} label="Type" value={item.type} />
                <InfoRow icon="calendar-outline" label="Due date" value={formatDate(item.dueDate)} />
                <InfoRow icon="pie-chart-outline" label="Weight" value={`${item.weight}% of the final grade`} />
                <InfoRow icon="flag-outline" label="Status" value={item.status} />
                <InfoRow icon="create-outline" label="Notes" value={item.notes ? item.notes : "No notes"} isLast />
            </View>

            {deleteError.length > 0 && <Text style={styles.error}>{deleteError}</Text>}

            <AppButton text={getStatusButtonText(item.status)} onPress={moveToNextStatus} loading={isUpdatingStatus} />
            <AppButton text="Edit" onPress={openEdit} variant="secondary" />
            <AppButton text="Delete" onPress={askToDelete} variant="danger" />

            <ConfirmDialog
                visible={showDeleteDialog}
                title="Delete coursework?"
                message={`"${item.title}" will be removed permanently. This cannot be undone.`}
                confirmText="Delete"
                busy={isDeleting}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteDialog(false)}
            />
        </AppScreen>
    );
}

function getStatusButtonText(status) {
    if (status === "To do") return "Start working (In progress)";
    if (status === "In progress") return "Mark as done";
    return "Reopen (back to To do)";
}

const styles = StyleSheet.create({
    title: { fontSize: 26, fontWeight: "800", color: colors.text, marginTop: 10 },
    course: { fontSize: 16, color: colors.textMuted, marginTop: 4 },
    countdown: { borderRadius: 14, padding: 16, marginTop: 18 },
    countdownNormal: { backgroundColor: colors.primary },
    countdownUrgent: { backgroundColor: colors.danger },
    countdownDone: { backgroundColor: colors.success },
    countdownText: { color: colors.white, fontSize: 22, fontWeight: "800" },
    countdownSub: { color: colors.white, fontSize: 15, marginTop: 4, opacity: 0.9 },
    error: { color: colors.danger, fontSize: 15, marginBottom: 8 },
    card: { backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 16, marginTop: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
});

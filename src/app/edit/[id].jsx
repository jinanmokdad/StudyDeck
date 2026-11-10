import { router, useLocalSearchParams } from "expo-router";
import AppScreen from "../../components/AppScreen";
import CourseworkForm from "../../components/CourseworkForm";
import EmptyState from "../../components/EmptyState";
import { useCoursework } from "../../context/CourseworkContext";

export default function EditCourseworkScreen() {
    const { id } = useLocalSearchParams();
    const { getCourseworkById, updateCoursework, courseNames } = useCoursework();
    const item = getCourseworkById(id);

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/coursework");
        }
    }

    if (!item) {
        return (
            <AppScreen>
                <EmptyState
                    icon="alert-circle-outline"
                    title="Coursework not found"
                    message="This item may have been deleted."
                    actionText="Back to my coursework"
                    onAction={() => router.replace("/coursework")}
                />
            </AppScreen>
        );
    }

    // The form works with text, so the weight number becomes a string.
    const startingValues = {
        title: item.title,
        course: item.course,
        type: item.type,
        dueDate: item.dueDate,
        weight: String(item.weight),
        status: item.status,
        notes: item.notes ?? "",
    };

    async function handleSave(data) {
        const saved = await updateCoursework(item.id, data);
        if (saved) {
            goBack(); // back to Details, which shows the updated values
        }
        return saved;
    }

    return (
        <AppScreen>
            <CourseworkForm
                initialValues={startingValues}
                submitText="Save changes"
                courseSuggestions={courseNames}
                onSubmit={handleSave}
                onCancel={goBack}
            />
        </AppScreen>
    );
}

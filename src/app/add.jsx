import { router } from "expo-router";
import AppScreen from "../components/AppScreen";
import CourseworkForm from "../components/CourseworkForm";
import { useCoursework } from "../context/CourseworkContext";
import { todayString } from "../utils/dates";

export default function AddCourseworkScreen() {
    const { addCoursework, courseNames, showMessage } = useCoursework();

    const emptyValues = {
        title: "",
        course: "",
        type: "Assignment",
        dueDate: todayString(),
        weight: "",
        status: "To do",
        notes: "",
    };

    async function handleAdd(data) {
        const saved = await addCoursework(data);
        if (saved) {
            showMessage(`"${data.title}" added`);
            router.back(); // back to the list, which now shows the new item
        }
        return saved;
    }

    function cancel() {
        router.back();
    }

    return (
        <AppScreen>
            <CourseworkForm
                initialValues={emptyValues}
                submitText="Add coursework"
                courseSuggestions={courseNames}
                onSubmit={handleAdd}
                onCancel={cancel}
            />
        </AppScreen>
    );
}

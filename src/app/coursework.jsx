import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import CourseworkCard from "../components/CourseworkCard";
import EmptyState from "../components/EmptyState";
import LoadingView from "../components/LoadingView";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import colors from "../constants/colors";
import { STATUSES } from "../constants/coursework";
import { useCoursework } from "../context/CourseworkContext";

const FILTER_OPTIONS = ["All", ...STATUSES];

// Home screen: the list of all coursework, with search and status filter.
export default function CourseworkScreen() {
    const { coursework, isLoading, loadError, retryLoading } = useCoursework();

    const isReady = !isLoading && !loadError;

    // Search text and selected filter belong only to this screen.
    const [searchText, setSearchText] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const todoCount = coursework.filter((item) => item.status === "To do").length;
    const inProgressCount = coursework.filter((item) => item.status === "In progress").length;
    const doneCount = coursework.filter((item) => item.status === "Done").length;

    function matchesSearch(item) {
        const query = searchText.trim().toLowerCase();
        if (query.length === 0) return true;
        return item.title.toLowerCase().includes(query) || item.course.toLowerCase().includes(query);
    }

    function matchesStatus(item) {
        return selectedStatus === "All" || item.status === selectedStatus;
    }

    // Earliest due date first, so the most urgent work is on top.
    const visibleItems = coursework
        .filter(matchesSearch)
        .filter(matchesStatus)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    function openDetails(item) {
        router.push({ pathname: "/details/[id]", params: { id: item.id } });
    }

    function openAdd() {
        router.push("/add");
    }

    function clearSearchAndFilter() {
        setSearchText("");
        setSelectedStatus("All");
    }

    function renderList() {
        if (isLoading) {
            return <LoadingView message="Loading your coursework..." />;
        }

        if (loadError) {
            return (
                <EmptyState
                    icon="cloud-offline-outline"
                    title="Something went wrong"
                    message={loadError}
                    actionText="Try again"
                    onAction={retryLoading}
                />
            );
        }

        // Nothing saved at all.
        if (coursework.length === 0) {
            return (
                <EmptyState
                    icon="sparkles-outline"
                    title="No coursework yet"
                    message="Add your first assignment, quiz, project or exam to start tracking it."
                    actionText="Add coursework"
                    onAction={openAdd}
                />
            );
        }

        // Items exist, but none match the search or filter.
        if (visibleItems.length === 0) {
            return (
                <EmptyState
                    icon="search-outline"
                    title="No matching coursework"
                    message="Try a different title or course name, or choose another status."
                    actionText="Clear search and filter"
                    onAction={clearSearchAndFilter}
                />
            );
        }

        return visibleItems.map((item) => (
            <CourseworkCard key={item.id} item={item} onPress={openDetails} />
        ));
    }

    return (
        <AppScreen>
            <View style={styles.summary}>
                <SummaryBox label="To do" count={todoCount} />
                <SummaryBox label="In progress" count={inProgressCount} />
                <SummaryBox label="Done" count={doneCount} />
            </View>

            {/* Adding is disabled until saved data has loaded, so it cannot be overwritten. */}
            <AppButton text="+ Add coursework" onPress={openAdd} disabled={!isReady} style={styles.addButton} />

            <SearchBar value={searchText} onChangeText={setSearchText} placeholder="Search by title or course" />
            <StatusFilter options={FILTER_OPTIONS} selected={selectedStatus} onChange={setSelectedStatus} />

            {isReady && coursework.length > 0 && (
                <Text style={styles.resultCount}>
                    Showing {visibleItems.length} of {coursework.length}
                </Text>
            )}

            {renderList()}
        </AppScreen>
    );
}

function SummaryBox({ label, count }) {
    return (
        <View style={styles.summaryBox}>
            <Text style={styles.summaryCount}>{count}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    summary: { flexDirection: "row", gap: 10, marginBottom: 16 },
    summaryBox: { flex: 1, backgroundColor: colors.card, borderRadius: 14, paddingVertical: 12, alignItems: "center", borderWidth: 1, borderColor: colors.border },
    summaryCount: { fontSize: 24, fontWeight: "800", color: colors.primaryDark },
    summaryLabel: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
    addButton: { marginTop: 0, marginBottom: 14 },
    resultCount: { fontSize: 14, color: colors.textMuted, marginTop: 12, marginBottom: 10 },
});

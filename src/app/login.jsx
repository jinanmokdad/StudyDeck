import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import FormField from "../components/FormField";
import colors from "../constants/colors";
import MOCK_USER from "../data/mockUser";
import getFieldErrors from "../validation/getFieldErrors";
import loginSchema from "../validation/loginSchema";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loginError, setLoginError] = useState("");

    function handleLogin() {
        setFieldErrors({});
        setLoginError("");

        // 1. Validate the form with Zod.
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            setFieldErrors(getFieldErrors(result.error));
            return;
        }

        // 2. Compare with the predefined mock credentials.
        const enteredEmail = result.data.email.toLowerCase();
        if (enteredEmail !== MOCK_USER.email || result.data.password !== MOCK_USER.password) {
            setLoginError("Email or password is incorrect. Please try again.");
            return;
        }

        // 3. Success: replace so Back cannot return to the login screen.
        router.replace("/coursework");
    }

    return (
        <AppScreen>
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in to see your coursework.</Text>

            <FormField label="Email" error={fieldErrors.email}>
                <AppTextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    hasError={Boolean(fieldErrors.email)}
                />
            </FormField>

            <FormField label="Password" error={fieldErrors.password}>
                <AppTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Your password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="current-password"
                    onSubmitEditing={handleLogin}
                    hasError={Boolean(fieldErrors.password)}
                />
            </FormField>

            {loginError.length > 0 && (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{loginError}</Text>
                </View>
            )}

            <AppButton text="Log in" onPress={handleLogin} />

            <View style={styles.demoBox}>
                <Text style={styles.demoTitle}>Demo account</Text>
                <Text style={styles.demoText}>Email: {MOCK_USER.email}</Text>
                <Text style={styles.demoText}>Password: {MOCK_USER.password}</Text>
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    heading: { fontSize: 28, fontWeight: "800", color: colors.primaryDark },
    subtitle: { fontSize: 16, color: colors.textMuted, marginTop: 4, marginBottom: 24 },
    errorBox: { backgroundColor: colors.dangerLight, borderRadius: 10, padding: 12, marginBottom: 8 },
    errorText: { color: colors.danger, fontSize: 15 },
    demoBox: { marginTop: 24, padding: 14, borderRadius: 12, backgroundColor: colors.primaryLight },
    demoTitle: { fontWeight: "700", color: colors.primaryDark, marginBottom: 4 },
    demoText: { color: colors.text, fontSize: 14 },
});

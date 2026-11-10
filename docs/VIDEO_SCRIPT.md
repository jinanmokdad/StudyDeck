# StudyDeck: narrated demo plan (about 5 minutes)

Record the phone screen (Expo Go) for Part A and your code editor for Part B. **Explain things in your own words.** The lines below are prompts, not a script to read aloud.

Before recording, reset to the sample data: clear Expo Go's storage, or delete the saved key, so the video starts at the first launch.

## Part A: App walkthrough (about 3 min 15 s)

| Time | Do | Say (in your own words) |
|---|---|---|
| 0:00 | Show the Welcome screen | The app's name, who it is for, the problem it solves |
| 0:15 | Tap **Get started** | Welcome uses `replace`, so Back won't return here |
| 0:20 | Tap **Log in** with empty fields | Zod checks the form: "Email is required", "Password is required" |
| 0:30 | Type `student@studydeck` / `123`, then Log in | Invalid email format, password too short |
| 0:40 | Type the correct email and a wrong password | Valid format but wrong credentials, compared against the mock account |
| 0:50 | Log in with `student@studydeck.com` / `study2026` | Arrive at My Coursework; status counts; urgent items in red; sorted by due date |
| 1:05 | Search "STA", then search "zzz" | Search by title or course; the **no results** message and the Clear button |
| 1:20 | Tap the **Done** filter, then **All** | Status filter chips |
| 1:30 | Open **Midterm exam** | Details: countdown, weight, notes. Only the id is passed in the URL |
| 1:40 | Tap **Edit**, enter date `2026-13-40` and weight `150`, then Save | Field errors from Zod; nothing is saved |
| 1:55 | Fix to `2026-11-19` and `30`, then Save | "Changes saved"; back on Details with the new values |
| 2:05 | Back, tap **+ Add coursework**, Save with the form empty | Required-field errors |
| 2:15 | Fill in "Lab 8: Navigation", tap a course chip, pick Quiz, date, weight, then Add | Success banner; the new item appears in the list and the counts update |
| 2:35 | Open the new item, tap **Delete**, tap **Cancel**, then tap Delete again and confirm | Confirmation dialog; item removed; "deleted" banner |
| 2:50 | **Fully close the app** (swipe it away in the app switcher), reopen Expo Go and the project, log in | **Persistence:** the edit is still there and the deleted item is still gone (not Fast Refresh) |
| 3:05 | Profile icon → Profile → **Log out** → try Back | Progress stats; logout returns to Login and Back can't go back into the app |
| *(optional)* | Delete every item, restart the app | The empty state "No coursework yet" stays after a restart |

## Part B: Code explanation (about 1 min 45 s)

1. **A reusable component and its props:** `src/components/CourseworkCard.jsx`
   - The card receives `item` and `onPress` as props (line ~13) and calls `onPress(item)` when tapped (line ~19).
   - In `src/app/coursework.jsx` (line ~116) the list passes `onPress={openDetails}`, so the *screen* decides what a tap does. The card only displays the data.
   - You can also mention `CourseworkForm`, which is used by both Add and Edit with different `initialValues` and `onSubmit` props.

2. **A state update:** `src/app/_layout.jsx`
   - `addCoursework` (line ~85) builds the next id and creates a *new* array with `[...coursework, newItem]`.
   - `deleteCoursework` (line ~96) uses `filter` to keep every item except the deleted one.
   - Both go through `saveList` (line ~68), which saves first and then calls `setCoursework`. Every screen reads the same state through `CourseworkContext`, which is why the list, the details and the counts all update together.

3. **AsyncStorage save and restore:** `src/storage/courseworkStorage.js` plus `_layout.jsx`
   - `saveCoursework` turns the array into JSON and writes it under the key `studydeck:coursework`.
   - `loadCoursework` reads it back. `null` means first launch, which loads the sample data; `[]` is a real saved empty list.
   - In the layout, `useEffect` runs `loadSavedCoursework` once at startup. `isLoading` shows the spinner, and `loadError` shows the "Try again" message.

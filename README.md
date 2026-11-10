# StudyDeck

StudyDeck is a small mobile app I built for keeping track of coursework: assignments, quizzes, projects and exams. It's made with React Native, Expo and Expo Router for CSC 0279 Mobile Application Development (Project 1, individual).

## Why I made it

Every semester my deadlines end up spread over Moodle, the course syllabi, WhatsApp groups and whatever the instructor says at the end of class. It's easy to forget something, or to notice too late that an exam worth 25% is next week.

StudyDeck puts everything in one list. For each item I save the course, the due date, how much it counts toward the final grade, and where I am with it (To do, In progress or Done). The list is sorted so the most urgent work is always at the top, and everything stays saved on the phone after the app is closed.

It's meant for university students juggling several courses at once, like a Haigazian student with five courses in one semester.

## Logging in

The login is a mock, so there's only one account:

- **Email:** `student@studydeck.com`
- **Password:** `study2026`

These are also shown in a small "Demo account" box on the login screen.

## How to run it

You need Node.js (version 20 or newer) and the **Expo Go** app on your phone.

```bash
npm install
npx expo start
```

Scan the QR code. On iPhone, use the Camera app; on Android, scan it from inside Expo Go. The phone and the computer need to be on the same Wi-Fi.

If the phone can't connect (this happened to me), use a tunnel instead. It needs a free Expo account:

```bash
npx expo login
npx expo start --tunnel
```

**Tested on:** Expo Go on an **iPhone 13 (iOS 26.6.1)**. I used Expo Go, not a development build. The project uses **Expo SDK 58**, which matches the current version of Expo Go. Everything the app uses, including AsyncStorage, already comes with Expo Go.

The first time the app opens, it loads 8 sample items. After that it always loads whatever was saved last.

## What the app does

**Screens and navigation**

There are 7 screens: Welcome, Login, My Coursework, Details, Add, Edit and Profile.

- Welcome and Login use `router.replace`, so after logging in you can't go Back to them.
- From My Coursework you can open an item's details, add a new item, or open your profile with the person icon at the top.
- Saving an edit takes you back to Details. Deleting takes you back to the list.
- Logging out from Profile clears the navigation history and goes to Login. The main screens are inside `Stack.Protected`, so they can't be opened again until you log in.

**Working with coursework**

- The list shows each item's title, course, type, weight, due date and status, plus how many days are left. Anything due within 3 days (or overdue) is marked in red.
- At the top there are counts for To do, In progress and Done.
- You can search by title or course name, and filter by status.
- The Details screen shows everything about one item, with a countdown to the due date.
- Adding and editing use the same form. When editing, the form is already filled in with the current values.
- Deleting asks for confirmation first.
- There's a quick button on Details to move an item along: To do → In progress → Done.
- Profile shows overall progress, counts for each status, and the next deadline.

**Validation**

I used Zod for the forms:

- **Login:** the email has to be valid, and the password has to be at least 6 characters. If the format is fine but the details don't match the mock account, it says the email or password is incorrect.
- **Add/Edit:**
  - Title and course are required.
  - The due date has to be a real date in `YYYY-MM-DD` format, so `2026-02-30` won't pass.
  - The weight has to be a number from 0 to 100.

Each error shows up under its own field, and nothing is saved until the form is valid.

**Saving data**

The whole list is saved with AsyncStorage under the key `studydeck:coursework`.

- When the app starts, it loads the saved list and shows a spinner while it waits.
- The sample data is only used if nothing has ever been saved. If you delete everything, the list stays empty after a restart.
- Every change is saved first and only then shown on screen. So if saving fails, the app keeps the old data and shows an error message instead of pretending it worked.

**Messages and empty states**

- Different messages for "you have no coursework yet" and "nothing matches your search".
- A loading spinner while saved data is being read.
- A green message after adding, saving, deleting or changing status.
- An error message (with a "Try again" button where it makes sense) if loading or saving fails.

## How the code is organised

```
src/
  app/            the screens (Expo Router routes only)
    _layout.jsx   root Stack, shared state, loading and saving, login flag
    index.jsx     Welcome
    login.jsx     Login
    coursework.jsx  My Coursework
    details/[id].jsx  Details
    add.jsx       Add
    edit/[id].jsx Edit
    profile.jsx   Profile and Log out
  components/     reusable pieces (buttons, inputs, cards, the form, dialogs...)
  constants/      colours, coursework types and statuses
  context/        passes the shared state from the layout to the screens
  data/           mock coursework and the mock user
  storage/        AsyncStorage load and save
  utils/          date helpers (days left, formatting)
  validation/     Zod schemas
docs/
  screen-flow.png
  screenshots/
```

The coursework list lives in `src/app/_layout.jsx`, the parent of all the screens. The add, edit and delete functions live there too, and are passed down to the screens through a context. So when I add or edit something, the list, the details and the counts all update together.

Smaller pieces get their data through props. For example, `CourseworkCard` receives an `item` and an `onPress` callback, and the list screen decides what happens when a card is tapped. Things that only matter to one screen, like the search text, stay in that screen.

## Screen flow

![Screen flow](docs/screen-flow.png)

## Screenshots

| Welcome | Login validation | Wrong credentials | My Coursework |
|---|---|---|---|
| ![](docs/screenshots/01-welcome.png) | ![](docs/screenshots/03-login-invalid.png) | ![](docs/screenshots/04-login-wrong-creds.png) | ![](docs/screenshots/05-list.png) |

| Search | No results | Filter: Done | Details |
|---|---|---|---|
| ![](docs/screenshots/06-search.png) | ![](docs/screenshots/07-no-results.png) | ![](docs/screenshots/08-filter-done.png) | ![](docs/screenshots/09-details.png) |

| Edit errors | After edit | Add item | After add |
|---|---|---|---|
| ![](docs/screenshots/11-edit-errors.png) | ![](docs/screenshots/12-details-after-edit.png) | ![](docs/screenshots/14-add-filled.png) | ![](docs/screenshots/15-list-after-add.png) |

| Delete confirmation | After delete | Profile | Empty list |
|---|---|---|---|
| ![](docs/screenshots/16-delete-confirm.png) | ![](docs/screenshots/17-list-after-delete.png) | ![](docs/screenshots/18-profile.png) | ![](docs/screenshots/21-empty-list.png) |

## Known limitations

- **Mock login only.** There's one hard-coded account and no real security. You also have to log in again every time the app restarts; your coursework stays saved.
- **Typed due dates.** The date is typed in as `YYYY-MM-DD` instead of being picked from a calendar.
- **No reminders or notifications** before deadlines.
- **One phone only.** Everything is stored on the device itself, with no account sync. Connecting a backend is planned for the final project.
- **No undo** after deleting. The confirmation dialog is the only safety net.
- Course names are typed freely. The form suggests existing ones to keep them consistent.

## How I used AI

I completed the project using my own understanding and implementation of the concepts learned in class. I used AI as a supporting tool to help me understand certain concepts, clarify how specific parts of the code work, and troubleshoot error messages I encountered during development.

I personally worked on running and testing the application using Expo Go on my iPhone. During this process, I faced several technical issues, including Expo SDK compatibility, network connection problems, and difficulties logging in through the terminal. I worked through these issues to get the application running successfully.

I also reviewed the code carefully to understand how everything works, particularly the reusable components and their props, how tasks are added, edited, and deleted from the list, and how data is stored and retrieved using AsyncStorage.

## Submitted version

Final submitted commit: **`<paste the commit hash here>`** (tagged `v1.0-submission`)

To get the hash after your last commit, run `git log -1 --format=%H`. The ZIP I submitted is made from this commit, without `node_modules` or `.expo`.
# Good Tape Code Test 🧪: Voice Joke Teller

A React and TypeScript application that uses the Web Speech API to provide a voice-activated joke-telling experience. Users can speak commands to hear random jokes or jokes about specific topics. Built with Vite for fast development and styled using Tailwind CSS.


## Features

- **Voice Commands**: Say "Tell me a joke" or "Tell me a joke about [topic]" to receive jokes.
- **Speech Recognition**: Utilizes the Web Speech API for real-time voice input.
- **Text-to-Speech**: Jokes are read aloud using the Speech Synthesis API.
- **Transcripts Sidebar**: View a history of your voice interactions.
- **Responsive Design**: Styled with Tailwind CSS for a clean and responsive UI.


## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **APIs**:
  - [icanhazdadjoke](https://icanhazdadjoke.com/) for fetching jokes.
  - [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for voice interactions.



## Key Features
- **Voice Commands:** Speak to search for jokes with commands like "Tell me a joke" or "Tell me a joke about cats."
- **Verbal Feedback:** The application reads the jokes aloud for a more interactive experience.
- **Transcription History Sidebar:** Keeps a record of all interactions, allowing users to track the conversation.
- **Minimalist UI:** A clean, functional design ensures ease of use and accessibility.


### Side Quest

#### 1. Styling Challenge
- Design Choices:
  - Focused on a minimalistic and clean design using Tailwind CSS.
  - Aimed for functional simplicity with bold typography, ensuring the UI is intuitive and uncluttered.
  - Responsive layout adapts seamlessly to all devices.
  - Accessibility considerations include proper contrast, and responsive design principles.

#### 2. Voice Output
- Implementation:
  - Jokes are spoken aloud using the Web Speech API, creating an interactive experience.
  - For unsupported browsers, users receive fallback text explaining the limitation.
    - Ensured that unsupported browsers provide clear feedback instead of failing silently.
    - Handled errors in joke output gracefully, giving users meaningful error messages.
   
#### 3. Custom Feature: Transcription History Sidebar
- Why This Feature:
  -  Instead of displaying only the current transcription, I added a sidebar to store the entire interaction history.
  -  This enhances the user experience by allowing users to track and review the conversation flow.
      - Implementation:
        -  Each user command and corresponding joke response is logged in a transcript array.
        -  A responsive sidebar displays the conversation history and can be toggled on or off.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn


## Installation

#### 1. Clone the Repository
```
git clone https://github.com/lucasjolibois54/code-test.git
cd my-app
```

#### 2. Install Dependencies

Using npm:
```
npm install
```
Or using yarn:
```
yarn install
```

#### 3. Run the server
```
npm run dev
```

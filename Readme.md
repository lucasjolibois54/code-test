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


## Installation - how to run the project

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





## My setup process

#### 1. Initialize the Project

I started by creating a Vite project configured for React and TypeScript:

```bash
npm create vite@latest my-app --template react-ts
cd my-app
```

---

#### 2. Install Dependencies

Once the project was initialized, I installed the necessary dependencies:

```bash
npm install
```

---

#### 3. Set Up Tailwind CSS

To style the application, I added and configured **Tailwind CSS** as follows:

1. **Install Tailwind CSS and its dependencies:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **Initialize Tailwind CSS configuration:**
   ```bash
   npx tailwindcss init
   ```

3. **Update the `tailwind.config.cjs` file:**
   This step ensures Tailwind processes all the relevant files for styling:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. **Add Tailwind directives to the CSS file:**
   In the `src/index.css` file, I added the following lines:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

---

#### 4. Add Routing

To enable navigation between pages, I installed `react-router-dom`:

```bash
npm install react-router-dom
```

Then, I created a simple routing structure:

1. **Created the `src/pages` directory** with the following file:
   `src/pages/Home.tsx`:
     ```tsx
     export default function Home() {
       return <h1 className="text-2xl font-bold">Home Page!</h1>;
     }
     ```

2. **Updated the `src/app.tsx` file** to include routing:
   ```tsx
   import {Routes, Route} from 'react-router-dom'
   import Home from './pages/Home';
   import './App.css';

   function App() {
   return (
    <>
    <Routes>
        <Route index element={<Home/>}/>
    </Routes>
    </>
   );
   }

   export default App;
   ```

3. **Updated the `src/main.tsx` file** to include routing:
    ```tsx
   import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './index.css'
    import App from './App.tsx'
    import { BrowserRouter } from 'react-router-dom'

    createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </StrictMode>,
    )


---

#### 5. Run the Project

Finally, I started the development server to test the project:

```bash
npm run dev
```

The app is accessible at [http://localhost:5173](http://localhost:5173).

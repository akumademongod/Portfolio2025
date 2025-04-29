import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// Ensure you have installed remark-gfm: npm install remark-gfm
import remarkGfm from 'remark-gfm'; // Plugin for GitHub Flavored Markdown (tables, strikethrough, etc.)

// Mock user data for simulation purposes
const MOCK_USERS = [
  { id: 'user1', name: 'Alice', color: 'bg-blue-500' },
  { id: 'user2', name: 'Bob', color: 'bg-green-500' },
  { id: 'user3', name: 'Charlie', color: 'bg-yellow-500' },
];

// Main Application Component
function App() {
  // State for the markdown content in the editor
  const [markdown, setMarkdown] = useState(`# Welcome to the Collaborative Editor!

This is a **real-time** _(simulated)_ Markdown editor.

- Edit the text on the left.
- See the rendered output on the right.

![Placeholder](https://placehold.co/600x100/eee/aaa?text=Live+Preview+Area)

\`\`\`javascript
// Example code block
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

| Feature         | Status      |
|-----------------|-------------|
| Editor          | Implemented |
| Live Preview    | Implemented |
| Collaboration   | Simulated   |
`);

  // State to simulate presence of other users
  const [presentUsers, setPresentUsers] = useState([MOCK_USERS[0], MOCK_USERS[1]]);

  // --- Real-time Simulation Logic ---
  // In a real application, you would use WebSockets (e.g., Socket.IO)
  // or a service like Firebase/Supabase here to:
  // 1. Send local changes to the server.
  // 2. Receive changes from other users and update the 'markdown' state.
  // 3. Manage user presence (joining/leaving).

  useEffect(() => {
    // Simulate a user joining after a delay
    const joinTimer = setTimeout(() => {
      setPresentUsers((prev) => [...prev, MOCK_USERS[2]]);
    }, 5000); // User joins after 5 seconds

    // Simulate receiving an update from another user (e.g., appending text)
    const updateTimer = setTimeout(() => {
      // --- WebSocket 'receive update' handler would go here ---
      // This function would typically receive the new content from the server
      // and update the state. We simulate this by appending text locally.
      // IMPORTANT: In a real app, you'd need conflict resolution logic!
      // setMarkdown((prev) => prev + "\n\n*Update from another user!*");
      // console.log("Simulated update received");
      // --- End WebSocket handler ---
    }, 8000); // Simulate update after 8 seconds

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(joinTimer);
      clearTimeout(updateTimer);
    };
  }, []); // Run only once on mount

  // Handler for local textarea changes
  const handleEditorChange = (event) => {
    const newContent = event.target.value;
    setMarkdown(newContent);
    // --- WebSocket 'send update' logic would go here ---
    // Send the 'newContent' to the server/other clients.
    // console.log("Simulated sending update:", newContent.substring(0, 50) + "...");
    // --- End WebSocket send ---
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50">
      {/* Header Section */}
      <header className="p-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Collaborative Markdown Editor</h1>
        {/* Presence Indicators */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 mr-2">Present:</span>
          {presentUsers.map(user => (
            <div key={user.id} className="flex items-center" title={user.name}>
              <span className={`w-3 h-3 ${user.color} rounded-full mr-1`}></span>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>
            </div>
          ))}
          {/* Placeholder for more users */}
          {presentUsers.length < MOCK_USERS.length && (
             <div className="text-sm text-gray-400" title="More users might be present">...</div>
          )}
        </div>
      </header>

      {/* Main Content Area (Editor + Preview) */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Editor Pane */}
        <section className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-r border-gray-200">
          <h2 className="text-lg font-medium p-3 bg-gray-100 border-b border-gray-200 text-gray-700">
            Markdown Input
          </h2>
          <textarea
            value={markdown}
            onChange={handleEditorChange}
            className="flex-grow p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-full overflow-y-auto bg-white"
            placeholder="Start typing your Markdown here..."
            aria-label="Markdown Editor"
            spellCheck="false"
          />
        </section>

        {/* Preview Pane */}
        <section className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col overflow-hidden">
           <h2 className="text-lg font-medium p-3 bg-gray-100 border-b border-gray-200 text-gray-700">
            Live Preview
          </h2>
          <div className="flex-grow p-4 overflow-y-auto bg-white prose prose-sm max-w-none">
            {/* prose-sm applies nice typography defaults, max-w-none prevents width constraints */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

// === Dependencies needed ===
// Make sure you have installed these packages in your project:
//
// For React & Markdown rendering:
// npm install react react-dom react-markdown remark-gfm
// or
// yarn add react react-dom react-markdown remark-gfm
//
// For Tailwind CSS styling (install as dev dependencies):
// npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
// or
// yarn add -D tailwindcss postcss autoprefixer @tailwindcss/typography
//
// Then, initialize Tailwind:
// npx tailwindcss init -p
//
// Configure tailwind.config.js:
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust this path based on your project structure
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@tailwindcss/typography'), // Add the typography plugin here
//   ],
// }
//
// Configure your main CSS file (e.g., index.css or App.css) to include Tailwind directives:
// @tailwind base;
// @tailwind components;
// @tailwind utilities;


import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error("Error rendering the application:", error);
  
  // Display a fallback UI instead of white screen
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h2>Something went wrong</h2>
      <p>We're sorry, but the application couldn't load properly. Please try refreshing the page.</p>
      <p>If the problem persists, please contact support.</p>
    </div>
  `;
}

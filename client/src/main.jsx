import './index.css';
import { StrictMode } from 'react';
import "@/assets/styles/global.css";
import Router from '@/routes/Router';
import "@/assets/styles/loaders.css";
import "@/assets/styles/scrollbars.css";
import "@/assets/styles/animations.css";
import "@/assets/styles/text-editor.css";
import "@/assets/styles/media-query.css";
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)

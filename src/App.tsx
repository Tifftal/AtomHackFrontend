import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './App.css';
import { MantineProvider } from '@mantine/core';
import DraftReport from './pages/DraftReport';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reports } from './pages/Reports';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reports />} />
          <Route path="/draft" element={<DraftReport />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './App.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reports } from './pages/Reports';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App

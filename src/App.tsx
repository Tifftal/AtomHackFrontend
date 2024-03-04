import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './App.css';
import { MantineProvider } from '@mantine/core';
import DraftReport from './pages/draft_report';

function App() {
  return (
    <MantineProvider>
      <DraftReport />
    </MantineProvider>
  )
}

export default App

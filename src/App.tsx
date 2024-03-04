import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import './App.css';
import TextEditor from './pages/text_editor'
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <TextEditor />
    </MantineProvider>
  )
}

export default App

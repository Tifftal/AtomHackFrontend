import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reports } from "./pages/Reports";
import { ReportDetailed } from "./pages/ReportDetailed";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetailed />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { realRoutes } from "./AppRoutes";
import { AuthProvider } from "./shared/auth";

function App() {
  const router = createBrowserRouter(realRoutes);
  return (
    <AuthProvider>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;

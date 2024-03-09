import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { realRoutes } from "./AppRoutes";

function App() {
  const router = createBrowserRouter(realRoutes);

  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;

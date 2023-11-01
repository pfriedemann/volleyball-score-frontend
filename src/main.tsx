import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DefaultPage } from "./components/DefaultPage.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { GameView } from "./views/GameView.tsx";
import { TestView } from "./views/test-view/TestView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "game/:gameId/:position?",
        index: true,
        element: <GameView />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "test",
        index: true,
        element: <TestView />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);

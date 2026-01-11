import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import DashBoard from "./page/dashboard/dashBoard";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DashBoard />
    </QueryClientProvider>
  );
}

export default App;

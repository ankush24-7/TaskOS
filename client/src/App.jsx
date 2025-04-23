import { UserProvider } from "@/contexts/UserContext";
import ActivityBar from "@/components/activity-bar/ActivityBar";

function App() {
  return (
    <div className="max-h-dvh h-dvh flex flex-col antialiased justify-between overflow-y- bg-gradient-to-r from-grad-l to-grad-r md:flex-row-reverse">
      <UserProvider />
      <ActivityBar />
    </div>
  );
}

export default App;

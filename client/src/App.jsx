import { UserProvider } from "@/contexts/UserContext";
import ActivityBar from "@/components/activity-bar/ActivityBar";

function App() {
  return (
    <div className="max-h-dvh h-dvh flex flex-col-reverse antialiased overflow-y-hidden bg-gradient-to-r from-grad-l to-grad-r sm:flex-row">
      <ActivityBar />
      <UserProvider />
    </div>
  );
}

export default App;

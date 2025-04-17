import { UserProvider } from "@/contexts/UserContext";
import ActivityBar from "@/components/activity-bar/ActivityBar";

function App() {
  return (
    <div className="h-dvh flex flex-col-reverse antialiased sm:flex-row">
      <ActivityBar />
      <UserProvider />
    </div>
  );
}

export default App;

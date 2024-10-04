import CreateNavbar from "@/components/CreateNavbar";
import { SurveyorProvider } from "@/context/SurveyorProvider";

export default function RootLayout({ children }) {
  return (
    <SurveyorProvider>
      <div className="w-90 mx-auto">
        <CreateNavbar />
        <div>{children}</div>
      </div>
    </SurveyorProvider>
  );
}

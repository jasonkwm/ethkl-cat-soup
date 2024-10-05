import ParticipantNavbar from "@/components/participate/ParticipateNavbar";
import { ParticipantProvider } from "@/context/ParticipantProvider";

export default function RootLayout({ children }: { children: any }) {
  return (
    <ParticipantProvider>
      <div className="w-70 mx-auto">
		<ParticipantNavbar/>
        <div style={{ padding: "10px 30px", border: "solid 0.5px", borderTop: "0px" }}>
          {children}
        </div>
      </div>
    </ParticipantProvider>
  );
}

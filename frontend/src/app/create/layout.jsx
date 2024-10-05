import CreateNavbar from "@/components/CreateNavbar";

export default function RootLayout({ children }) {
  return (
    <div className="w-70 mx-auto">
      <CreateNavbar />
      <div style={{padding: "10px 30px", border: "solid 0.5px", borderTop: "0px"}}>
		{children}
	  </div>
    </div>
  );
}

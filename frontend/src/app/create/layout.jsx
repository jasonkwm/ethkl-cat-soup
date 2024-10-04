import CreateNavbar from "@/components/CreateNavbar";

export default function RootLayout({ children }) {
  return (
    <div className="w-90 mx-auto">
      <CreateNavbar />
      <div>{children}</div>
    </div>
  );
}

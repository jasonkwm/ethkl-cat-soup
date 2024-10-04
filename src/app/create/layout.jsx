import CreateNavbar from "@/components/CreateNavbar";

export default function RootLayout({ children }) {
  return (
    <>
      <CreateNavbar />
      <div>{children}</div>
    </>
  );
}

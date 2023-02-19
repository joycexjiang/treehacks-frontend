import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: `url('Background.jpg')`,
        backgroundSize: "cover",
      }}
      className="h-screen"
    >
      <Header />
      {children}
    </div>
  );
}

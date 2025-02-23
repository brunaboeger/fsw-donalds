import NavigationHeader from "./components/navigation-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <NavigationHeader />
      <div>{children}</div>
    </div>
  );
}
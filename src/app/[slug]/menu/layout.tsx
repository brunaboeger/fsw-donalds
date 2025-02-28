import NavigationHeader from "./components/navigation-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full">
      <NavigationHeader />
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
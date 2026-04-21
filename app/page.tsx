export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
          Welcome to Your App
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          This is a demo page showcasing the responsive header component with
          theme toggle, language switcher (AR/EN with RTL support), favorites
          badge, and login button.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="font-semibold mb-2">Toggle Theme</h3>
            <p className="text-sm text-muted-foreground">
              Click the sun/moon icon to switch between light and dark mode
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="font-semibold mb-2">Switch Language</h3>
            <p className="text-sm text-muted-foreground">
              Click EN/AR to toggle RTL layout support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

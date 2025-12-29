export function Footer() {
  return (
    <footer className="py-6 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Abdullah Abu Sghaira. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

import { SignIn } from "@clerk/nextjs";

export function generateStaticParams() {
  return [{}];
}

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <SignIn />
    </div>
  );
}

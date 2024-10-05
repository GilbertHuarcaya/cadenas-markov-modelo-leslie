import Manual from "@/components/manual/Manual";
import Link from "next/link";

export default function ManualView() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <Manual />
      <Link href="/" className="button-primary">
        Volver al inicio
      </Link>
    </main>
  );
}

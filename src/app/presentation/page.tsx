import Presentation from "@/components/presentation/Presentation";
import Link from "next/link";

export default function PresentationView() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <Presentation />
      <Link href="/" className="button-primary">
        Volver al inicio
      </Link>
    </main>
  );
}

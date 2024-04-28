import Inputs from "@/components/inputs";
import RevolveGame from "@/components/revolve";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RevolveGame />
      <Inputs />
    </main>
  );
}

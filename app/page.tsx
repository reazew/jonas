import { Header } from "@/components/globals/header";
import Line from "@/components/globals/line";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col gap-4">
        <Line audioSrc="/sounds/3-oct-e.wav" />
      </div>
    </main>
    );
  }

import AIAssistant from '@/components/workspace/AIAssistant';
// Falls deine AIAssistant woanders liegt, Pfad anpassen, z.B. '../components/AIAssistant' oder '@/app/components/AIAssistant'

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-white mb-8 tracking-tight">
        Mastermind Agent Workspace
      </h1>
      <div className="w-full max-w-3xl">
        <AIAssistant />
      </div>
      <footer className="mt-8 text-white/50 text-foreground text-sm">
        Emergent Agent Core v0.1 – We're building gods.
      </footer>
    </main>
  );
}

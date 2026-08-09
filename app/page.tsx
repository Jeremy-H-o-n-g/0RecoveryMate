export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-accent">
        RecoverMate
      </h1>
      <p className="max-w-md text-lg text-muted">
        Interactive body-map recovery and warm-up guidance.
      </p>
      <p className="max-w-sm text-sm text-muted">
        General educational guidance only. The interactive body map arrives in
        a later session.
      </p>
    </main>
  );
}

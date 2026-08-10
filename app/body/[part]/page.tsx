import Link from "next/link";
import { notFound } from "next/navigation";
import ExerciseCard from "../../../components/ExerciseCard";
import { getBodyPart, getBodyParts, getPartExercises } from "../../../lib/content";

export function generateStaticParams() {
  return getBodyParts().map((p) => ({ part: p.id }));
}

export default async function BodyPartPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;
  const bodyPart = getBodyPart(part);
  if (!bodyPart) {
    // Invalid id -> safe error page (Next 404). No health/diagnostic content.
    notFound();
  }

  const exercises = getPartExercises(bodyPart.id);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-muted">
        <Link href="/" className="underline hover:text-accent">
          Home
        </Link>{" "}
        / Body
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-accent">
        {bodyPart.nameZh}
      </h1>
      <p className="mt-1 text-muted">
        {bodyPart.nameEn} · view: {bodyPart.view}
      </p>

      {exercises.length === 0 ? (
        <p className="mt-6 text-muted">No demo placeholder yet.</p>
      ) : (
        <div className="mt-6 grid gap-3">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}
    </main>
  );
}

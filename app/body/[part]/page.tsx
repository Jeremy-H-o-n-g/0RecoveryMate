import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getApprovedExerciseIds,
  getBodyPart,
  getBodyParts,
} from "../../../lib/content";

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

  const exerciseIds = getApprovedExerciseIds(bodyPart.id);

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

      {exerciseIds.length === 0 ? (
        <p className="mt-6 text-muted">No reviewed guidance yet.</p>
      ) : (
        <ul className="mt-6 list-disc pl-6 text-foreground">
          {exerciseIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

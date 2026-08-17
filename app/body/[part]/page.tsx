import Link from "next/link";
import { notFound } from "next/navigation";
import ExercisePanel from "../../../components/ExercisePanel";
import { getBodyPart, getBodyParts } from "../../../lib/content";

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

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="plate-caption">
        <Link href="/" className="underline decoration-border underline-offset-4 hover:text-accent">
          Home
        </Link>{" "}
        / Body
      </p>
      <h1 className="font-display mt-1 break-words text-3xl font-semibold text-foreground sm:text-4xl">
        {bodyPart.nameZh}
        <span className="ml-3 align-middle text-lg font-normal text-muted">
          {bodyPart.nameEn}
        </span>
      </h1>
      <p className="mt-1 text-muted">
        {bodyPart.nameEn} · view: {bodyPart.view}
      </p>

      <div className="mt-6">
        {/*
          statusFilter="all" surfaces the clearly-marked draft placeholder so the
          ankle vertical slice (S09) keeps working. Switch to "approved" (the
          ExercisePanel default) for production once S11 locks reviewed content.
        */}
        <ExercisePanel partId={bodyPart.id} statusFilter="all" />
      </div>
    </main>
  );
}

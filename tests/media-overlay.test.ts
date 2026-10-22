import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Exercise } from "../schemas/exercise";
import {
  EMPTY_MANIFEST,
  MANIFEST_PATHNAME,
  applyMediaOverlay,
  blobPathnameFor,
  clearManifestEntry,
  getMediaManifest,
  setManifestEntry,
  type MediaManifest,
} from "../lib/media-overlay";

vi.mock("@vercel/blob", () => ({
  get: vi.fn(),
  put: vi.fn(),
}));

const baseExercise: Exercise = {
  id: "ankle-circles",
  nameZh: "踝关节绕环",
  nameEn: "Ankle Circles",
  durationSeconds: 30,
  difficulty: "beginner",
  muscles: ["ankle"],
  videoUrl: "",
  previewUrl: "",
  posterUrl: "",
  captionUrl: "",
  transcriptUrl: "",
  steps: ["rotate"],
  tips: [],
  stopSignals: ["stop if painful"],
  sourceTitle: "",
  sourceUrl: "",
  licenseId: "",
  reviewedBy: "",
  reviewedAt: "",
  reviewStatus: "draft",
};

const manifest: MediaManifest = {
  version: 1,
  updatedAt: "2026-10-22T09:00:00.000Z",
  exercises: {
    "ankle-circles": {
      videoUrl: {
        url: "https://store.public.blob.vercel-storage.com/videos/ankle-circles.mp4",
        uploadedAt: "2026-10-22T09:00:00.000Z",
        contentType: "video/mp4",
        sizeBytes: 1024,
      },
      captionUrl: {
        url: "https://store.public.blob.vercel-storage.com/captions/ankle-circles.vtt",
        uploadedAt: "2026-10-22T09:05:00.000Z",
      },
    },
  },
};

function blobGetResult(m: unknown) {
  return {
    statusCode: 200 as const,
    stream: new Response(JSON.stringify(m)).body!,
    headers: new Headers(),
    blob: {
      url: `https://store.public.blob.vercel-storage.com/${MANIFEST_PATHNAME}`,
      downloadUrl: `https://store.public.blob.vercel-storage.com/${MANIFEST_PATHNAME}?download=1`,
      pathname: MANIFEST_PATHNAME,
      contentDisposition: "inline",
      cacheControl: "max-age=60",
      uploadedAt: new Date("2026-10-22T09:00:00.000Z"),
      etag: "test-etag",
      contentType: "application/json",
      size: 1,
    },
  };
}

async function mockedBlob() {
  const blob = await import("@vercel/blob");
  return { get: vi.mocked(blob.get), put: vi.mocked(blob.put) };
}

beforeEach(() => {
  vi.stubEnv("BLOB_READ_WRITE_TOKEN", "vercel_blob_rw_test_token");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("blobPathnameFor", () => {
  it("follows the media convention for every kind", () => {
    expect(blobPathnameFor("knee-x", "video")).toBe("videos/knee-x.mp4");
    expect(blobPathnameFor("knee-x", "preview")).toBe("videos/knee-x-preview.mp4");
    expect(blobPathnameFor("knee-x", "poster")).toBe("videos/knee-x-poster.jpg");
    expect(blobPathnameFor("knee-x", "captions")).toBe("captions/knee-x.vtt");
    expect(blobPathnameFor("knee-x", "transcript")).toBe("transcripts/knee-x.md");
  });
});

describe("applyMediaOverlay (pure merge)", () => {
  it("overlay URLs win per field; other fields untouched", () => {
    const merged = applyMediaOverlay(baseExercise, manifest);
    expect(merged.videoUrl).toBe(manifest.exercises["ankle-circles"]!.videoUrl!.url);
    expect(merged.captionUrl).toBe(manifest.exercises["ankle-circles"]!.captionUrl!.url);
    // kinds without overlay entries keep the base value
    expect(merged.posterUrl).toBe("");
    expect(merged.previewUrl).toBe("");
    expect(merged.transcriptUrl).toBe("");
    // non-media fields (incl. reviewStatus) are NEVER touched
    expect(merged.reviewStatus).toBe("draft");
    expect(merged.nameZh).toBe(baseExercise.nameZh);
  });

  it("does not mutate the input record", () => {
    const before = { ...baseExercise };
    applyMediaOverlay(baseExercise, manifest);
    expect(baseExercise).toEqual(before);
  });

  it("returns the same object for unknown exercise ids and empty manifest", () => {
    expect(applyMediaOverlay(baseExercise, EMPTY_MANIFEST)).toBe(baseExercise);
    expect(applyMediaOverlay({ ...baseExercise, id: "other" }, manifest).videoUrl).toBe("");
  });

  it("ignores entries with empty urls", () => {
    const m: MediaManifest = {
      version: 1,
      updatedAt: "",
      exercises: { "ankle-circles": { videoUrl: { url: "", uploadedAt: "" } as never } },
    };
    // url:"" fails the entry schema in production, but the merge must be safe
    // against it anyway — the base value stays.
    expect(applyMediaOverlay(baseExercise, m).videoUrl).toBe("");
  });
});

describe("getMediaManifest (never-throw degradation contract)", () => {
  it("returns EMPTY without a token (tests / tokenless builds / offline demo)", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    const { get } = await mockedBlob();
    expect(await getMediaManifest()).toEqual(EMPTY_MANIFEST);
    expect(get).not.toHaveBeenCalled();
  });

  it("returns EMPTY when the manifest does not exist yet (get -> null)", async () => {
    const { get } = await mockedBlob();
    get.mockResolvedValue(null);
    expect(await getMediaManifest()).toEqual(EMPTY_MANIFEST);
  });

  it("returns EMPTY when the SDK call throws (network down)", async () => {
    const { get } = await mockedBlob();
    get.mockRejectedValue(new Error("offline"));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await getMediaManifest()).toEqual(EMPTY_MANIFEST);
  });

  it("returns EMPTY on corrupt/invalid manifest JSON", async () => {
    const { get } = await mockedBlob();
    get.mockResolvedValue(blobGetResult({ version: 99, nope: true }));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await getMediaManifest()).toEqual(EMPTY_MANIFEST);
  });

  it("returns the parsed manifest on success", async () => {
    const { get } = await mockedBlob();
    get.mockResolvedValue(blobGetResult(manifest));
    expect(await getMediaManifest()).toEqual(manifest);
    expect(get).toHaveBeenCalledWith(MANIFEST_PATHNAME, {
      token: "vercel_blob_rw_test_token",
      access: "public",
    });
  });
});

describe("setManifestEntry / clearManifestEntry (admin writes)", () => {
  it("throws when the token is missing (fail loudly for admins)", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    await expect(
      setManifestEntry("ankle-circles", "video", { url: "https://x/y.mp4", uploadedAt: "" })
    ).rejects.toThrow(/BLOB_READ_WRITE_TOKEN/);
  });

  it("creates the manifest on first write and put()s the merged JSON", async () => {
    const { get, put } = await mockedBlob();
    get.mockResolvedValue(null); // not created yet
    put.mockResolvedValue({} as never);
    await setManifestEntry("ankle-circles", "video", {
      url: "https://store.public.blob.vercel-storage.com/videos/ankle-circles.mp4",
      uploadedAt: "2026-10-22T10:00:00.000Z",
      contentType: "video/mp4",
      sizeBytes: 2048,
    });
    expect(put).toHaveBeenCalledTimes(1);
    const [pathname, body, options] = put.mock.calls[0] as unknown as [
      string,
      string,
      Record<string, unknown>,
    ];
    expect(pathname).toBe(MANIFEST_PATHNAME);
    expect(options).toMatchObject({
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    const written = JSON.parse(body) as MediaManifest;
    expect(written.exercises["ankle-circles"]!.videoUrl!.url).toContain("ankle-circles.mp4");
  });

  it("merges into an existing manifest without dropping other entries", async () => {
    const { get, put } = await mockedBlob();
    get.mockResolvedValue(blobGetResult(manifest));
    put.mockResolvedValue({} as never);
    await setManifestEntry("ankle-circles", "poster", {
      url: "https://store.public.blob.vercel-storage.com/videos/ankle-circles-poster.jpg",
      uploadedAt: "2026-10-22T11:00:00.000Z",
    });
    const written = JSON.parse(put.mock.calls[0]![1] as string) as MediaManifest;
    const entry = written.exercises["ankle-circles"]!;
    expect(entry.posterUrl).toBeDefined(); // new kind added
    expect(entry.videoUrl!.url).toBe(manifest.exercises["ankle-circles"]!.videoUrl!.url); // kept
    expect(entry.captionUrl).toBeDefined(); // kept
  });

  it("clearManifestEntry removes one kind and returns the removed URL", async () => {
    const { get, put } = await mockedBlob();
    get.mockResolvedValue(blobGetResult(manifest));
    put.mockResolvedValue({} as never);
    const { removedUrl } = await clearManifestEntry("ankle-circles", "video");
    expect(removedUrl).toBe(manifest.exercises["ankle-circles"]!.videoUrl!.url);
    const written = JSON.parse(put.mock.calls[0]![1] as string) as MediaManifest;
    expect(written.exercises["ankle-circles"]!.videoUrl).toBeUndefined();
    expect(written.exercises["ankle-circles"]!.captionUrl).toBeDefined();
  });

  it("clearManifestEntry drops the exercise key when its last kind is removed", async () => {
    const single: MediaManifest = {
      version: 1,
      updatedAt: "",
      exercises: {
        "ankle-circles": {
          videoUrl: { url: "https://x/videos/ankle-circles.mp4", uploadedAt: "" },
        },
      },
    };
    const { get, put } = await mockedBlob();
    get.mockResolvedValue(blobGetResult(single));
    put.mockResolvedValue({} as never);
    await clearManifestEntry("ankle-circles", "video");
    const written = JSON.parse(put.mock.calls[0]![1] as string) as MediaManifest;
    expect(written.exercises["ankle-circles"]).toBeUndefined();
  });

  it("clearManifestEntry is a no-op (no put) for an unset kind", async () => {
    const { get, put } = await mockedBlob();
    get.mockResolvedValue(blobGetResult(manifest));
    const { removedUrl } = await clearManifestEntry("ankle-circles", "poster");
    expect(removedUrl).toBeUndefined();
    expect(put).not.toHaveBeenCalled();
  });
});

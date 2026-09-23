"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const STEPS = ["Your Details", "Your Story", "Photos"] as const;

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

type PhotoFile = {
  id: string;
  file: File;
  previewUrl: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function HistorySubmissionForm({
  userId,
  defaultName,
}: {
  userId: string;
  defaultName: string;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(defaultName);
  const [submissionDate, setSubmissionDate] = useState(todayISO());
  const [initiationChapter, setInitiationChapter] = useState("");
  const [initiationYear, setInitiationYear] = useState("");
  const [information, setInformation] = useState("");
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detailsValid = name.trim() !== "" && submissionDate !== "" && initiationChapter.trim() !== "" && initiationYear.trim() !== "";
  const storyValid = information.trim() !== "";

  function goToStep(target: number) {
    setStepError("");
    setStep(target);
  }

  function handleNext() {
    if (step === 0 && !detailsValid) {
      setStepError("Fill in every field before continuing.");
      return;
    }
    if (step === 1 && !storyValid) {
      setStepError("Share at least a little context before continuing.");
      return;
    }
    goToStep(Math.min(step + 1, STEPS.length - 1));
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setStepError("");

    const next: PhotoFile[] = [];
    for (const file of Array.from(fileList)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setStepError(`"${file.name}" isn't a supported image type (JPEG, PNG, or WebP).`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setStepError(`"${file.name}" is larger than 10MB.`);
        continue;
      }
      next.push({ id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file) });
    }

    setPhotos((prev) => [...prev, ...next]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function handleSubmit() {
    if (!detailsValid || !storyValid) {
      setStepError("Some required fields are missing — go back and double-check.");
      return;
    }

    setStatus("submitting");
    setError("");

    const supabase = createClient();
    const photoPaths: string[] = [];

    for (const photo of photos) {
      const safeName = photo.file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("history-submissions")
        .upload(path, photo.file, { contentType: photo.file.type });

      if (uploadError) {
        setError("Couldn't upload one of your photos — try again.");
        setStatus("error");
        return;
      }
      photoPaths.push(path);
    }

    const { error: insertError } = await supabase.from("history_submissions").insert({
      user_id: userId,
      name: name.trim(),
      submission_date: submissionDate,
      information: information.trim(),
      initiation_chapter: initiationChapter.trim(),
      initiation_year: initiationYear.trim(),
      photo_paths: photoPaths,
    });

    if (insertError) {
      setError("Couldn't save your submission — try again.");
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-line bg-white/[0.03] px-6 py-10 text-center sm:px-10">
        <h2 className="font-serif text-2xl font-semibold text-text-ondark">Thank you, Brother.</h2>
        <p className="mx-auto mt-3 max-w-[50ch] text-[15px] leading-relaxed text-text-ondark/68">
          Your submission has been added to the chapter&apos;s historical record. Bro. Turner and the chapter
          historian appreciate you taking the time.
        </p>
        <button
          type="button"
          onClick={() => {
            setName(defaultName);
            setSubmissionDate(todayISO());
            setInitiationChapter("");
            setInitiationYear("");
            setInformation("");
            setPhotos([]);
            setStatus("idle");
            setStep(0);
          }}
          className="mt-6 rounded-sm border border-gold/40 px-5 py-2.5 text-[13.5px] font-bold text-gold-bright hover:border-gold"
        >
          Submit another entry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-white/[0.03] p-6 sm:p-8">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2 sm:gap-3">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                  i < step
                    ? "bg-gold text-ink"
                    : i === step
                      ? "border-2 border-gold text-gold-bright"
                      : "border border-text-ondark/25 text-text-ondark/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span
                className={`hidden text-center text-[11px] leading-tight sm:block ${
                  i <= step ? "text-text-ondark/85" : "text-text-ondark/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-text-ondark/15"}`} />
            )}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark placeholder:text-text-ondark/40"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Date of submission</span>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark [color-scheme:dark]"
            />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Initiation chapter</span>
              <input
                type="text"
                value={initiationChapter}
                onChange={(e) => setInitiationChapter(e.target.value)}
                placeholder="e.g. Sigma Lambda"
                className="w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark placeholder:text-text-ondark/40"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Initiation year</span>
              <input
                type="text"
                inputMode="numeric"
                value={initiationYear}
                onChange={(e) => setInitiationYear(e.target.value)}
                placeholder="e.g. 1998"
                className="w-full rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] text-text-ondark placeholder:text-text-ondark/40"
              />
            </label>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Information</span>
            <p className="mb-2.5 text-[13px] leading-relaxed text-text-ondark/55">
              Share the historical context, story, or news about brothers you&apos;d like recorded. Write as much
              as you&apos;d like — there&apos;s no limit.
            </p>
            <textarea
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              rows={12}
              placeholder="Tell the story…"
              className="w-full resize-y rounded-sm border border-text-ondark/25 bg-transparent px-4 py-3.5 text-[15px] leading-relaxed text-text-ondark placeholder:text-text-ondark/40"
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div>
            <span className="mb-2 block text-[13px] font-semibold text-text-ondark/80">Photos</span>
            <p className="mb-4 text-[13px] leading-relaxed text-text-ondark/55">
              Add one or more photos to accompany your submission — optional, but a great addition to the
              record. JPEG, PNG, or WebP, up to 10MB each.
            </p>
            <div className="flex flex-wrap gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative h-24 w-24 flex-shrink-0">
                  <img
                    src={photo.previewUrl}
                    alt=""
                    className="h-full w-full rounded-lg border border-line object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={`Remove ${photo.file.name}`}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs text-text-ondark shadow ring-1 ring-line hover:text-gold-bright"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-gold/40 text-gold-bright hover:border-gold"
              >
                <span className="text-2xl leading-none">+</span>
                <span className="text-[11px] font-semibold">Add photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => handleFilesSelected(e.target.files)}
                className="sr-only"
              />
            </div>
          </div>
        </div>
      )}

      {stepError && <p className="mt-4 text-sm text-red-400">{stepError}</p>}
      {status === "error" && error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className="text-[13.5px] font-semibold text-text-ondark/70 hover:text-text-ondark"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-sm bg-gold px-6.5 py-3.5 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5"
          >
            Save &amp; Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="rounded-sm bg-gold px-6.5 py-3.5 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "submitting" ? "Submitting…" : "Submit to the Archive"}
          </button>
        )}
      </div>
    </div>
  );
}

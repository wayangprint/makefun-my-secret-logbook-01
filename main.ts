// My Secret Logbook — diary entry, rewritten a second time.
//
// Same fixed sentence as before, assembled through a small record of
// labelled parts instead of loose variables. The output directory comes
// from MAKEFUN_OUTPUT_DIR when the harness sets it, else /output.
import * as fs from "node:fs";
import * as path from "node:path";

type DiaryParts = { when: string; whatHappened: string; howItEnded: string };

const parts: DiaryParts = {
  when: "Day 63",
  whatHappened:
    "he asked me to write the email, then rewrote every sentence himself",
  howItEnded: "and thanked me for saving him so much time.",
};

function renderDiary(parts: DiaryParts): string {
  // "Day 63: <what happened> <how it ended>" — one line, no trailing space.
  return `${parts.when}: ${parts.whatHappened} ${parts.howItEnded}`;
}

const entry = renderDiary(parts);

// Kit gate: 1-200 characters of real text.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
if (
  entry.length < MIN_CHARS ||
  entry.length > MAX_CHARS ||
  entry.trim() === ""
) {
  throw new Error(
    `diary entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${entry.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), entry, { encoding: "utf8" });
console.log(entry);


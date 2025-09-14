import { useCallback } from "react";

export type TrackedItem = {
  id: number;
  title: string;
};

export type TrackedResults = {
  right: TrackedItem[];
  wrong: TrackedItem[];
};

const STORAGE_KEY = "quizResults";

function readResults(): TrackedResults {
  if (typeof window === "undefined") return { right: [], wrong: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { right: [], wrong: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { right: [], wrong: [] };
    const right = Array.isArray(parsed.right) ? parsed.right : [];
    const wrong = Array.isArray(parsed.wrong) ? parsed.wrong : [];
    return { right, wrong };
  } catch {
    return { right: [], wrong: [] };
  }
}

function writeResults(next: TrackedResults) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getStoredResults(): TrackedResults {
  return readResults();
}

export default function useResultTracker() {
  const addResult = useCallback((item: TrackedItem, isCorrect: boolean) => {
    const current = readResults();

    // Remove existing entry from both lists if exists
    const filterOut = (arr: TrackedItem[]) => arr.filter((i) => i.id !== item.id);
    const cleanedRight = filterOut(current.right);
    const cleanedWrong = filterOut(current.wrong);

    const next: TrackedResults = isCorrect
      ? { right: [...cleanedRight, item], wrong: cleanedWrong }
      : { right: cleanedRight, wrong: [...cleanedWrong, item] };

    writeResults(next);
  }, []);

  const reset = useCallback(() => {
    writeResults({ right: [], wrong: [] });
  }, []);

  return { addResult, reset };
}


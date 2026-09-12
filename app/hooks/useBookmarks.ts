"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "matchmaking:bookmarks";

function readStoredBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(readStoredBookmarks());
  }, []);

  const toggle = useCallback((talentId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(talentId)
        ? prev.filter((id) => id !== talentId)
        : [...prev, talentId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable (private browsing, etc.) — bookmark stays session-only
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback((talentId: string) => bookmarks.includes(talentId), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}

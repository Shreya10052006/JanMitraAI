/**
 * hooks/useBookmarks.ts
 *
 * React hook for managing saved services and schemes.
 *
 * Provides a unified interface for two types of bookmarks:
 * - savedServiceIds: IDs of bookmarked government services
 * - savedSchemeIds: IDs of bookmarked welfare schemes
 * - bookmarks: General-purpose bookmark list (type + title + href)
 *
 * State is kept in sync with localStorage and reacts to cross-tab
 * storage events for consistency across browser windows.
 *
 * Smart Bharat alignment: enables citizens to save and revisit
 * government services and welfare schemes they care about.
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  getSavedServices,
  getSavedSchemes,
  toggleSavedService,
  toggleSavedScheme,
  addBookmark,
  removeBookmark,
  getBookmarks,
  isBookmarked as checkIsBookmarked,
  type BookmarkItem,
} from "@/services/storage";

/** Return type of the useBookmarks hook. */
export interface UseBookmarksReturn {
  /** IDs of all currently saved government services. */
  savedServiceIds: string[];
  /** IDs of all currently saved welfare schemes. */
  savedSchemeIds: string[];
  /** Full bookmark list with type, title, and href. */
  bookmarks: BookmarkItem[];
  /** Toggle a service bookmark. Returns true if now saved. */
  toggleService: (id: string) => boolean;
  /** Toggle a scheme bookmark. Returns true if now saved. */
  toggleScheme: (id: string) => boolean;
  /** Add a generic bookmark item. */
  addItem: (item: Omit<BookmarkItem, "savedAt">) => void;
  /** Remove a bookmark by ID. */
  removeItem: (id: string) => void;
  /** Check if an item ID is currently bookmarked. */
  isBookmarked: (id: string) => boolean;
  /** Check if a specific service ID is saved. */
  isServiceSaved: (id: string) => boolean;
  /** Check if a specific scheme ID is saved. */
  isSchemeSaved: (id: string) => boolean;
}

/**
 * Custom hook for managing government service and scheme bookmarks.
 * Syncs across browser tabs via the window storage event.
 *
 * @returns Bookmark state and toggle/query actions
 */
export function useBookmarks(): UseBookmarksReturn {
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(getSavedServices);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getSavedSchemes);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getBookmarks);

  // Sync state if localStorage changes in another tab
  useEffect(() => {
    const handleStorage = () => {
      setSavedServiceIds(getSavedServices());
      setSavedSchemeIds(getSavedSchemes());
      setBookmarks(getBookmarks());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleService = useCallback((id: string): boolean => {
    const isNowSaved = toggleSavedService(id);
    setSavedServiceIds(getSavedServices());
    return isNowSaved;
  }, []);

  const toggleScheme = useCallback((id: string): boolean => {
    const isNowSaved = toggleSavedScheme(id);
    setSavedSchemeIds(getSavedSchemes());
    return isNowSaved;
  }, []);

  const addItem = useCallback((item: Omit<BookmarkItem, "savedAt">) => {
    addBookmark(item);
    setBookmarks(getBookmarks());
  }, []);

  const removeItem = useCallback((id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
    setSavedServiceIds(getSavedServices());
    setSavedSchemeIds(getSavedSchemes());
  }, []);

  const isBookmarked = useCallback((id: string): boolean => {
    return checkIsBookmarked(id);
  }, []);

  const isServiceSaved = useCallback((id: string): boolean => {
    return savedServiceIds.includes(id);
  }, [savedServiceIds]);

  const isSchemeSaved = useCallback((id: string): boolean => {
    return savedSchemeIds.includes(id);
  }, [savedSchemeIds]);

  return {
    savedServiceIds,
    savedSchemeIds,
    bookmarks,
    toggleService,
    toggleScheme,
    addItem,
    removeItem,
    isBookmarked,
    isServiceSaved,
    isSchemeSaved,
  };
}

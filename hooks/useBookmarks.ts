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

export interface UseBookmarksReturn {
  savedServiceIds: string[];
  savedSchemeIds: string[];
  bookmarks: BookmarkItem[];
  toggleService: (id: string) => boolean;
  toggleScheme: (id: string) => boolean;
  addItem: (item: Omit<BookmarkItem, "savedAt">) => void;
  removeItem: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  isServiceSaved: (id: string) => boolean;
  isSchemeSaved: (id: string) => boolean;
}

export function useBookmarks(): UseBookmarksReturn {
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(getSavedServices);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getSavedSchemes);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(getBookmarks);

  // Keep state fresh if storage changes externally (e.g., another tab)
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

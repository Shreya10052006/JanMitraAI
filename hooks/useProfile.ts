/**
 * hooks/useProfile.ts
 *
 * React hook for managing the citizen user profile.
 *
 * Profile data includes name, contact, location, occupation, income,
 * social category, and notification preferences. It is validated
 * server-side via /api/profile before being persisted to localStorage.
 *
 * Also exposes derived statistics (complaints filed, services accessed,
 * schemes applied, XP level) computed from the full activity history.
 *
 * Smart Bharat alignment: a complete profile unlocks personalized
 * scheme recommendations and tailored government service guidance.
 */

"use client";

import { useState, useCallback } from "react";
import {
  getProfile,
  saveProfile,
  getUserStats,
  type UserProfile,
} from "@/services/storage";

/** Return type of the useProfile hook. */
export interface UseProfileReturn {
  /** Current citizen profile loaded from localStorage. */
  profile: UserProfile;
  /** Derived activity statistics (XP, complaints, services, schemes). */
  stats: ReturnType<typeof getUserStats>;
  /** Validate and persist profile changes. Always saves locally even if API fails. */
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  /** True while the profile update API call is in progress. */
  isSaving: boolean;
}

/**
 * Custom hook for citizen profile management.
 *
 * Validation strategy: sends updates to /api/profile for server-side
 * validation, then always persists to localStorage regardless of
 * API response — ensuring the app works offline.
 *
 * @returns Profile state, derived stats, and the updateProfile action
 */
export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile>(getProfile);
  const [stats, setStats] = useState(getUserStats);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Validates profile updates server-side, then persists them locally.
   * Stats are recomputed after every successful save.
   *
   * @param updates - Partial profile object with fields to update
   */
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    setIsSaving(true);
    try {
      // Server-side validation (non-blocking — we persist locally regardless)
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      saveProfile(updates);
      setProfile(getProfile());
      setStats(getUserStats());
    } catch {
      // Persist locally even if API is unreachable (offline support)
      saveProfile(updates);
      setProfile(getProfile());
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { profile, stats, updateProfile, isSaving };
}

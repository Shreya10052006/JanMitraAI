"use client";

import { useState, useCallback } from "react";
import {
  getProfile,
  saveProfile,
  getUserStats,
  type UserProfile,
} from "@/services/storage";

export interface UseProfileReturn {
  profile: UserProfile;
  stats: ReturnType<typeof getUserStats>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isSaving: boolean;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile>(getProfile);
  const [stats, setStats] = useState(getUserStats);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    setIsSaving(true);
    try {
      // Validate via API
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      // Save to localStorage regardless of API response
      saveProfile(updates);
      setProfile(getProfile());
      setStats(getUserStats());
    } catch {
      // Persist locally even if API fails
      saveProfile(updates);
      setProfile(getProfile());
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { profile, stats, updateProfile, isSaving };
}

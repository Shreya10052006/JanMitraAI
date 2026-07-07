/**
 * hooks/useVoiceAssistant.ts
 *
 * React hook wrapping the browser's Web Speech API to power JanMitra AI's
 * voice assistant: speech-to-text for input, text-to-speech for AI replies.
 *
 * Fully gated behind the user's Voice Assistance accessibility setting —
 * when off, both recognition and synthesis are no-ops.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAccessibility } from "./useAccessibility";

export type VoiceErrorReason =
  | "not-supported"
  | "permission-denied"
  | "no-speech"
  | "network"
  | "unknown";

export interface UseVoiceAssistantReturn {
  /** True when both SpeechRecognition and speechSynthesis exist in this browser. */
  isSupported: boolean;
  /** True while the microphone is actively listening. */
  isListening: boolean;
  /** True while a spoken response is being played back. */
  isSpeaking: boolean;
  /** Live interim (not-yet-final) transcript while listening. */
  interimTranscript: string;
  /** Last error encountered, if any. */
  error: VoiceErrorReason | null;
  /** Begin listening; calls onFinalResult once a final transcript is captured. */
  startListening: (onFinalResult: (text: string) => void) => void;
  /** Stop listening early (manual interruption). */
  stopListening: () => void;
  /** Speak the given text aloud. No-ops if voice assistance is off or unsupported. */
  speak: (text: string, onEnd?: () => void) => void;
  /** Stop any in-progress speech playback. */
  stopSpeaking: () => void;
}

function toSpeechLang(languageCode: string): string {
  if (languageCode === "en") return "en-IN";
  return `${languageCode}-IN`;
}

/**
 * @param languageCode BCP-47-ish language code from useLanguage (e.g. "en", "hi").
 */
export function useVoiceAssistant(languageCode = "en"): UseVoiceAssistantReturn {
  const { settings } = useAccessibility();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<VoiceErrorReason | null>(null);
  // Starts false on both server and first client render, then flips after
  // mount — reading `window` synchronously during render would otherwise
  // cause a hydration mismatch (server never has SpeechRecognition/speechSynthesis).
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const langTag = toSpeechLang(languageCode);

  useEffect(() => {
    const recognitionSupported = !!(window.SpeechRecognition ?? window.webkitSpeechRecognition);
    const synthesisSupported = "speechSynthesis" in window;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(recognitionSupported && synthesisSupported);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (onFinalResult: (text: string) => void) => {
      if (!settings.voiceAssistance) return;
      const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      if (!SR) {
        setError("not-supported");
        return;
      }

      recognitionRef.current?.abort();

      const recognition = new SR();
      recognition.lang = langTag;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) final += result[0].transcript;
          else interim += result[0].transcript;
        }
        if (interim) setInterimTranscript(interim);
        if (final.trim()) {
          setInterimTranscript("");
          onFinalResult(final.trim());
        }
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setError("permission-denied");
        } else if (event.error === "no-speech") {
          setError("no-speech");
        } else if (event.error === "network") {
          setError("network");
        } else if (event.error !== "aborted") {
          setError("unknown");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setError(null);
      setInterimTranscript("");

      try {
        recognition.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
        setError("unknown");
      }
    },
    [settings.voiceAssistance, langTag]
  );

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!settings.voiceAssistance || !("speechSynthesis" in window) || !text.trim()) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langTag;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [settings.voiceAssistance, langTag]
  );

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Stop everything if voice assistance is turned off mid-use.
  useEffect(() => {
    if (!settings.voiceAssistance) {
      recognitionRef.current?.abort();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsListening(false);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [settings.voiceAssistance]);

  // Clean up on unmount.
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  return {
    isSupported,
    isListening,
    isSpeaking,
    interimTranscript,
    error,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}

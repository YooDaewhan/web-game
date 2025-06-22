// src/store/sectionStore.js
import { create } from "zustand";

export const useSectionStore = create((set) => ({
  currentSection: "Town", // 임시 초기값
  setSection: (section) => set({ currentSection: section }),
  initializeSection: (section) => set({ currentSection: section }),
}));

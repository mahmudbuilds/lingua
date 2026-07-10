export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string; // Emoji
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

export type ActivityType = "video" | "audio" | "chat" | "vocabulary" | "phrase";

export interface Activity {
  id: string;
  type: ActivityType;
  order: number;
  
  // For vocabulary/phrase types
  vocabularyId?: string;
  phraseId?: string;
  
  // For AI-driven lessons (audio, video, chat)
  aiTeacherPrompt?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  goals: string[];
  activities: Activity[];
  xpReward: number;
  order: number;
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
}

import { Lesson, Vocabulary, Phrase } from "@/types/learning";

export const SAMPLE_VOCABULARY: Record<string, Vocabulary> = {
  "vocab_hola": {
    id: "vocab_hola",
    word: "Hola",
    translation: "Hello",
    pronunciation: "OH-lah",
  },
  "vocab_gracias": {
    id: "vocab_gracias",
    word: "Gracias",
    translation: "Thank you",
    pronunciation: "GRAH-see-ahs",
  },
  "vocab_bonjour": {
    id: "vocab_bonjour",
    word: "Bonjour",
    translation: "Hello / Good morning",
    pronunciation: "bohn-ZHOOR",
  },
  "vocab_arigato": {
    id: "vocab_arigato",
    word: "ありがとう",
    translation: "Thank you",
    pronunciation: "ah-ree-GAH-toh",
  }
};

export const SAMPLE_PHRASES: Record<string, Phrase> = {
  "phrase_como_estas": {
    id: "phrase_como_estas",
    text: "¿Cómo estás?",
    translation: "How are you?",
    pronunciation: "KOH-moh ehs-TAHS",
  },
  "phrase_comment_allez_vous": {
    id: "phrase_comment_allez_vous",
    text: "Comment allez-vous?",
    translation: "How are you? (Formal)",
    pronunciation: "koh-mahn tah-lay VOO",
  }
};

export const LESSONS: Lesson[] = [
  {
    id: "lesson_es_1_1",
    unitId: "unit_es_1",
    title: "Say Hello in Spanish",
    description: "Learn your first Spanish words and greetings.",
    goals: ["Say hello", "Express gratitude", "Ask how someone is doing"],
    xpReward: 15,
    order: 1,
    activities: [
      {
        id: "act_es_1_1_1",
        type: "vocabulary",
        order: 1,
        vocabularyId: "vocab_hola",
      },
      {
        id: "act_es_1_1_2",
        type: "audio",
        order: 2,
        aiTeacherPrompt: "You are a friendly Spanish AI teacher. The student is learning the word 'Hola'. Encourage them to pronounce it correctly and explain that it means 'Hello'. Keep your response under 20 seconds.",
      },
      {
        id: "act_es_1_1_3",
        type: "phrase",
        order: 3,
        phraseId: "phrase_como_estas",
      },
      {
        id: "act_es_1_1_4",
        type: "video",
        order: 4,
        aiTeacherPrompt: "You are a friendly Spanish teacher doing a video call. Smile, say 'Hola', and ask the student how they are doing in Spanish ('¿Cómo estás?'). Wait for their response and give them a short positive feedback.",
      }
    ],
  },
  {
    id: "lesson_fr_1_1",
    unitId: "unit_fr_1",
    title: "Say Bonjour",
    description: "Learn to greet people in French.",
    goals: ["Say hello in French", "Ask how someone is doing"],
    xpReward: 10,
    order: 1,
    activities: [
      {
        id: "act_fr_1_1_1",
        type: "vocabulary",
        order: 1,
        vocabularyId: "vocab_bonjour",
      },
      {
        id: "act_fr_1_1_2",
        type: "chat",
        order: 2,
        aiTeacherPrompt: "You are a French tutor chatting via text. Start by saying 'Bonjour!'. If the user replies back in French, congratulate them. If not, gently correct them.",
      }
    ],
  },
  {
    id: "lesson_ja_1_1",
    unitId: "unit_ja_1",
    title: "Express Gratitude",
    description: "Learn how to say thank you in Japanese.",
    goals: ["Say thank you in Japanese"],
    xpReward: 10,
    order: 1,
    activities: [
      {
        id: "act_ja_1_1_1",
        type: "vocabulary",
        order: 1,
        vocabularyId: "vocab_arigato",
      },
      {
        id: "act_ja_1_1_2",
        type: "audio",
        order: 2,
        aiTeacherPrompt: "You are a polite Japanese teacher. Teach the student to say 'Arigato' (Thank you) with proper intonation.",
      }
    ],
  }
];

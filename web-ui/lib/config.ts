// Runtime configuration to ensure API key is always available
// This file is loaded at runtime, not build time

export const config = {
  runtime: {
    openaiApiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
};

export function getOpenAIKey(): string {
  // Try multiple sources for the API key
  const key = 
    process.env.OPENAI_API_KEY || 
    process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
    '';
  
  if (!key) {
    console.error('❌ OPENAI_API_KEY not found! Check .env.local');
  }
  
  return key;
}


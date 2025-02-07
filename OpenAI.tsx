
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
  dangerouslyAllowBrowser: true // Required for React Native
});

export default openai;

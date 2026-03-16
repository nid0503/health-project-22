export const sections = [
  {
    id: 'memory',
    title: 'Memory & Focus',
    description: 'Think about your experiences over the past few weeks',
    icon: '🧠',
    iconClass: 'memory',
    type: 'likert',
    scaleLabels: ['No difficulty', 'A lot of difficulty'],
    questions: [
      { id: 'm1', text: 'How often do you forget the names of people you know well?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm2', text: 'Do you find it hard to remember where you placed everyday items (keys, glasses, phone)?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm3', text: 'How often do you walk into a room and forget why you went there?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm4', text: 'Do you have difficulty concentrating when reading a book, newspaper, or watching a programme?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm5', text: 'How easily can you recall a recent conversation you had with a friend or family member?', labels: ['Very Easily','Easily','With Some Effort','With Difficulty','Very Hard'] },
      { id: 'm6', text: 'Do you sometimes forget appointments, medications, or important tasks?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm7', text: 'How often do words "escape" you mid-sentence when speaking?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm8', text: 'Do you have difficulty learning how to use new devices or following new instructions?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm9', text: 'How often do you repeat yourself in conversations without realising it?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'm10', text: 'Overall, how would you rate your memory compared to a few years ago?', labels: ['Much Better','About the Same','Somewhat Worse','Worse','Much Worse'] },
    ],
  },
  {
    id: 'anxiety',
    title: 'Mood & Anxiety',
    description: 'Reflect on how you have been feeling recently',
    icon: '🌸',
    iconClass: 'anxiety',
    type: 'likert',
    scaleLabels: ['Not at all', 'Very frequently'],
    questions: [
      { id: 'a1', text: 'How often do you feel worried or anxious about things that might go wrong?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a2', text: 'Do you feel restless, tense, or on edge without a clear reason?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a3', text: 'How often do you feel sad or lose interest in things you normally enjoy?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a4', text: 'Do you find it hard to sleep because your mind is busy or racing with thoughts?', labels: ['Never','Rarely','Sometimes','Often','Every Night'] },
      { id: 'a5', text: 'How often do you feel lonely or isolated from friends and family?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a6', text: 'Do you feel irritable or easily frustrated by small things?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a7', text: 'How often do you feel confident and positive about your daily life?', labels: ['Always','Often','Sometimes','Rarely','Never'] },
      { id: 'a8', text: 'Do you experience physical symptoms of stress like a tight chest, headaches, or stomach upset?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a9', text: 'Do you avoid going out or socialising because of worry or fear?', labels: ['Never','Rarely','Sometimes','Often','Always'] },
      { id: 'a10', text: 'Overall, how would you describe your emotional wellbeing lately?', labels: ['Very Good','Good','Fair','Poor','Very Poor'] },
    ],
  },
  {
    id: 'habits',
    title: 'Daily Habits & Lifestyle',
    description: 'Your daily routines play a big role in brain health',
    icon: '☀️',
    iconClass: 'habits',
    type: 'choice',
    questions: [
      {
        id: 'h1',
        text: 'How much physical activity do you get each week? (walking, gardening, swimming, etc.)',
        options: ['Every day', '3–5 times a week', '1–2 times a week', 'Rarely or never'],
      },
      {
        id: 'h2',
        text: 'How would you describe your sleep on most nights?',
        options: ['7–9 hours, restful', '6–7 hours, mostly OK', 'Broken or poor quality', 'Less than 5 hours'],
      },
      {
        id: 'h3',
        text: 'How often do you engage in mentally stimulating activities? (reading, puzzles, crafts, learning)',
        options: ['Every day', 'A few times a week', 'Occasionally', 'Rarely'],
      },
      {
        id: 'h4',
        text: 'How often do you socialise or spend meaningful time with others?',
        options: ['Daily', 'Several times a week', 'Once a week or less', 'Rarely or never'],
      },
      {
        id: 'h5',
        text: 'Would you say your diet includes plenty of fruits, vegetables, and water each day?',
        options: ['Yes, mostly', 'Sometimes', 'Not really'],
      },
    ],
  },
];

export const tips = {
  memory: {
    low: [
      'Your memory is in great shape! Keep engaging in activities you enjoy — this is the best way to maintain it.',
      'Try learning something new occasionally — a recipe, a song, or a language phrase — to build new neural connections.',
      'Daily crosswords or word puzzles can help maintain your strong recall skills.',
    ],
    moderate: [
      'Use a daily planner or notepad to write down appointments, tasks, and names. Externalising memory reduces mental load.',
      'Try the "name + face" technique: when meeting someone, silently repeat their name 3 times and link it to a feature of their face.',
      'Keep a consistent routine — doing things at the same time each day reduces the chance of forgetting.',
      'Puzzles, reading, and mentally stimulating hobbies for even 15 minutes a day make a measurable difference over time.',
    ],
    high: [
      'Consider speaking with your doctor about your memory concerns — many memory issues are very treatable.',
      'Keep a memory diary: writing down what you notice is very helpful information for a healthcare professional.',
      'Use reminder apps, sticky notes, or pill organisers to help with daily tasks. There is no shame in using helpful tools.',
      'Ensure you are getting enough sleep — poor sleep is one of the biggest contributors to memory difficulties at any age.',
    ],
  },
  anxiety: {
    low: [
      'Your emotional wellbeing looks positive! Continue doing whatever brings you joy and connection.',
      'Maintaining social connections is one of the strongest protectors of mental health — keep nurturing your relationships.',
      'A brief daily gratitude practice (writing 3 good things) helps maintain a positive outlook over time.',
    ],
    moderate: [
      'Try the 4-7-8 breathing technique daily: inhale for 4 counts, hold for 7, exhale for 8. This activates your body\'s natural calm response.',
      'When worried thoughts arise, write them down and ask yourself: "Is this likely? What could I do?" Writing externalises worry.',
      'Limit news to a set time each day. Constant updates can amplify anxiety without adding useful information.',
      'Connect with someone you trust once a day, even briefly. A short phone call can significantly reduce feelings of loneliness.',
    ],
    high: [
      'You are not alone — anxiety and low mood are very common and very treatable. Please speak with your doctor or a counsellor.',
      'If you are feeling very low, consider contacting a helpline or support service in your area. Asking for help is a sign of strength.',
      'Start very small: a 5-minute walk outside, one phone call, or one cup of tea with someone. Small steps create momentum.',
      'A body scan relaxation before sleep can significantly improve sleep quality and reduce nighttime anxiety.',
    ],
  },
};

export const exercises = [
  { icon: '🧩', title: 'Brain Games', desc: 'Crosswords, Sudoku, or word searches for 15–20 minutes each morning to sharpen recall.', theme: 'green' },
  { icon: '🚶', title: 'Gentle Walk', desc: 'A 20–30 minute walk outdoors improves blood flow to the brain and lifts mood naturally.', theme: 'terra' },
  { icon: '🌬️', title: '4-7-8 Breathing', desc: 'Inhale 4 counts, hold 7, exhale 8. Repeat 4 times to calm anxiety instantly.', theme: 'rose' },
  { icon: '📔', title: 'Gratitude Journal', desc: 'Write 3 good things from your day each evening. Builds positive memory pathways over time.', theme: 'blue' },
  { icon: '🎵', title: 'Music & Singing', desc: 'Listening to or singing favourite songs from memory is a wonderful brain exercise.', theme: 'green' },
  { icon: '🧘', title: 'Body Scan Relaxation', desc: 'Lie down, close eyes, and slowly relax each body part from feet to head. 10 minutes before bed.', theme: 'terra' },
];

export const schedule = [
  { time: 'Morning',       activity: 'Glass of water + gentle stretch or short walk' },
  { time: 'Mid-Morning',   activity: 'Brain game: crossword, puzzle, or reading for 20 minutes' },
  { time: 'Afternoon',     activity: 'Connect with someone — a phone call, visit, or letter' },
  { time: 'Late Afternoon',activity: 'Creative activity: drawing, gardening, knitting, or cooking' },
  { time: 'Evening',       activity: 'Write 3 things you are grateful for today' },
  { time: 'Bedtime',       activity: '4-7-8 breathing + body scan relaxation to sleep well' },
];

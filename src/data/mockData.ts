import type { GameItem } from '../types';

const data: GameItem[] = [];
let id = 1;

const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

// 1. Texts
const textHuman = [
  "I remember the summer of '99 perfectly. We spent every afternoon down by the creek, catching frogs and pretending we were explorers mapping unknown territories. Those simple days felt like they lasted forever.",
  "Just tried baking sourdough for the third time this week and it's finally not a brick! The crust is so crispy and it smells heavenly in my apartment right now.",
  "Traffic was an absolute nightmare today. I swear I spent more time staring at the bumper of that red Honda Civic than I did actually driving.",
  "Nothing beats the feeling of crawling into a freshly made bed after a long, exhausting day at work. It's the little things that keep me sane.",
  "We found this tiny, hole-in-the-wall diner on our road trip. The waitress called everyone 'hon' and the cherry pie was out of this world.",
  "My cat has this weird habit of staring at the blank wall for hours. Sometimes I wonder if she sees a ghost or if she's just buffering.",
  "I don't care what anyone says, pineapple on pizza is a culinary masterpiece and I will die on this hill.",
  "Just finished reading that mystery novel everyone's talking about. I did NOT see that plot twist coming at all!",
  "Does anyone else get sudden bursts of motivation to reorganize their entire life at 2 AM, or is that just me?",
  "Spent the whole weekend building IKEA furniture and I only have one random screw left over. I'm calling that a massive success."
];

const textAI = [
  "In recent years, the advancement of technology has profoundly impacted various sectors, including education and healthcare, leading to significant improvements in efficiency and overall outcomes.",
  "Coffee is a popular beverage enjoyed worldwide. It is typically brewed from roasted coffee beans, which are the seeds of berries from certain Coffea species, originating in tropical Africa.",
  "Regular exercise is crucial for maintaining physical and mental health. It can reduce the risk of chronic diseases, improve mood, and enhance overall quality of life.",
  "The majestic bald eagle, known for its distinctive white head and brown body, serves as the national bird and symbol of the United States of America.",
  "Effective time management involves prioritizing tasks, setting achievable goals, and minimizing distractions to maximize productivity throughout the workday.",
  "A balanced diet should include a variety of nutrients such as carbohydrates, proteins, fats, vitamins, and minerals to support optimal bodily functions.",
  "Photosynthesis is the process by which green plants and certain other organisms transform light energy into chemical energy to fuel their activities.",
  "Artificial intelligence refers to the simulation of human intelligence processes by machines, especially computer systems, including learning, reasoning, and self-correction.",
  "Climate change, characterized by global warming and extreme weather events, poses a significant threat to ecosystems and human societies across the globe.",
  "Reading books can significantly expand one's vocabulary, improve focus, and provide profound insights into diverse cultures and historical periods."
];

textHuman.forEach((text, i) => {
  data.push({
    id: id++, type: 'text', answer: 'Human', difficulty: difficulties[i % 3],
    content: text,
    explanation: 'Contains personal anecdotes, colloquialisms, and genuine emotion typical of human writing.'
  });
});

textAI.forEach((text, i) => {
  data.push({
    id: id++, type: 'text', answer: 'AI', difficulty: difficulties[i % 3],
    content: text,
    explanation: 'Highly objective, perfectly structured, and overly generic tone points to AI generation.'
  });
});

// 2. Codes
const codeHuman = [
  "// ugh why does this keep crashing\nfunction getStuff() {\n  let stuff = [1,2,3];\n  // stuff.push(4); temp disable\n  return stuff;\n}",
  "const doTheThing = (val) => {\n  if (val === 42) return true; // magic number lol\n  return false;\n};",
  "function calc(a, b) {\n  let res = a + b;\n  console.log('HERE:', res); // remember to remove this later\n  return res;\n}",
  "let x = 0;\nfor (let i = 0; i < 10; i++) {\n  x = x + i; // i should probably use reduce but whatever\n}\nconsole.log(x);",
  "// fix for issue #402 - don't ask why it works\nconst hackyFix = (arr) => arr.filter(x => x !== undefined && x !== null);",
  "function getUser() {\n  return { name: 'bob', age: 99 }; // test user\n}",
  "const delay = ms => new Promise(res => setTimeout(res, ms));\n// wait 2 secs because the API is slow as hell\nawait delay(2000);",
  "let attempts = 0;\nwhile(attempts < 3) {\n  try {\n    fetchData(); break;\n  } catch(e) {\n    attempts++;\n  }\n}",
  "// I wrote this at 3AM, sorry to whoever has to maintain it\nconst parse = (str) => str.split('_').reverse().join('-');",
  "function add(a, b) {\n  if (!a || !b) return 0; // handle stupid edge case\n  return a + b;\n}"
];

const codeAI = [
  "/**\n * Calculates the sum of an array of numbers.\n * @param {number[]} numbers - The array of numbers.\n * @returns {number} The sum of the numbers.\n */\nfunction calculateSum(numbers) {\n  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);\n}",
  "const filterEvenNumbers = (array) => {\n  if (!Array.isArray(array)) {\n    throw new TypeError('Input must be an array');\n  }\n  return array.filter(number => number % 2 === 0);\n};",
  "/**\n * Capitalizes the first letter of a string.\n * @param {string} str - The input string.\n * @returns {string} The capitalized string.\n */\nconst capitalizeFirstLetter = (str) => {\n  if (typeof str !== 'string' || str.length === 0) return '';\n  return str.charAt(0).toUpperCase() + str.slice(1);\n};",
  "function debounce(func, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n    }, delay);\n  };\n}",
  "const findMax = (numbers) => {\n  if (numbers.length === 0) return null;\n  return Math.max(...numbers);\n};",
  "/**\n * Reverses a given string.\n * @param {string} str - The string to reverse.\n * @returns {string} The reversed string.\n */\nfunction reverseString(str) {\n  return str.split('').reverse().join('');\n}",
  "const generateRandomHexColor = () => {\n  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');\n};",
  "function isPalindrome(str) {\n  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  return cleanStr === cleanStr.split('').reverse().join('');\n}",
  "const flattenArray = (arr) => {\n  return arr.reduce((flat, toFlatten) => \n    flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);\n};",
  "/**\n * Fetches user data from the API.\n * @param {number} userId - The user's ID.\n * @returns {Promise<Object>} The user data.\n */\nasync function fetchUserData(userId) {\n  const response = await fetch(`/api/users/${userId}`);\n  if (!response.ok) throw new Error('Network response was not ok');\n  return response.json();\n}"
];

codeHuman.forEach((code, i) => {
  data.push({
    id: id++, type: 'code', answer: 'Human', difficulty: difficulties[(i+1) % 3],
    content: code,
    explanation: 'Quirky comments, slightly messy logic, and humorous notes are classic human traits.'
  });
});

codeAI.forEach((code, i) => {
  data.push({
    id: id++, type: 'code', answer: 'AI', difficulty: difficulties[(i+1) % 3],
    content: code,
    explanation: 'Perfect JSDoc comments, rigorous error checking, and sterile naming conventions.'
  });
});

// Images & Artwork & Voice using distinct random seed variables so they don't look identical
for (let i = 0; i < 20; i++) {
  data.push({
    id: id++, type: 'image', answer: i % 2 === 0 ? 'Human' : 'AI', difficulty: difficulties[i % 3],
    content: `https://picsum.photos/seed/${i + 100}/500/300`,
    explanation: i % 2 === 0 ? 'Natural lighting and cohesive physics.' : 'Slight inconsistencies in the background elements.'
  });
}

for (let i = 0; i < 20; i++) {
  data.push({
    id: id++, type: 'artwork', answer: i % 2 === 0 ? 'Human' : 'AI', difficulty: difficulties[i % 3],
    content: `https://picsum.photos/seed/${i + 200}/500/400`,
    explanation: i % 2 === 0 ? 'Intentional brushstrokes and emotion.' : 'Overly smooth blending and slightly illogical geometry.'
  });
}

for (let i = 0; i < 20; i++) {
  data.push({
    id: id++, type: 'voice', answer: i % 2 === 0 ? 'Human' : 'AI', difficulty: difficulties[i % 3],
    content: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
    explanation: i % 2 === 0 ? 'Natural pauses and breathing.' : 'Consistent tone without natural variations.'
  });
}

export const mockData = data;

import fs from 'fs';

const generateData = () => {
  const data = [];
  let id = 1;

  for (let i = 0; i < 10; i++) {
    data.push({
      id: id++, type: 'text', answer: 'Human', difficulty: 'Easy',
      content: `The aroma of freshly ground coffee beans always takes me back to my grandmother's kitchen, where mornings began with a warm brew and the gentle hum of the radio. Nothing quite beats that nostalgic comfort. (Variation ${i+1})`,
      explanation: 'Personal anecdotes, sensory details, and nostalgic elements are highly typical of human writing.'
    });
    data.push({
      id: id++, type: 'text', answer: 'AI', difficulty: 'Easy',
      content: `Coffee is a brewed drink prepared from roasted coffee beans. The seeds of the Coffea plant are separated to produce unroasted green coffee beans, which are then roasted to varying degrees depending on the desired flavor profile. (Variation ${i+1})`,
      explanation: 'Overly encyclopedic, perfectly structured, generic facts often indicate AI generation.'
    });
  }

  for (let i = 0; i < 10; i++) {
    data.push({
      id: id++, type: 'code', answer: 'Human', difficulty: 'Medium',
      content: `// I'm not really sure why this works, but it fixes the off-by-one error \nfunction calculateTotal(items) {\n  let sum = 0;\n  for(let i=0; i <= items.length - 1; i++) {\n    sum += items[i].price;\n  }\n  return sum;\n} // Var ${i+1}`,
      explanation: 'Quirky comments, slightly non-idiomatic logic (<= items.length - 1) reflect human quirks.'
    });
    data.push({
      id: id++, type: 'code', answer: 'AI', difficulty: 'Medium',
      content: `/**\n * Calculates the total price of an array of items.\n * @param {Array} items - The items array.\n * @returns {number} The total sum.\n */\nconst calculateTotal = (items) => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}; // Var ${i+1}`,
      explanation: 'Perfect JSDoc comments, hyper-optimized functional approach, and sterile naming often point to AI.'
    });
  }

  for (let i = 0; i < 10; i++) {
    data.push({
      id: id++, type: 'image', answer: 'Human', difficulty: 'Hard',
      content: `https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&q=80&v=${i}`,
      explanation: 'Realistic lighting, natural imperfections, and sensible physics indicate a real photo.'
    });
    data.push({
      id: id++, type: 'image', answer: 'AI', difficulty: 'Hard',
      content: `https://images.unsplash.com/photo-1698224536671-558e8b0a996b?w=500&q=80&v=${i}`,
      explanation: 'Odd background artifacts, overly smooth textures, and hyper-stylized lighting.'
    });
  }

  for (let i = 0; i < 10; i++) {
    data.push({
      id: id++, type: 'artwork', answer: 'Human', difficulty: 'Medium',
      content: `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80&v=${i}`,
      explanation: 'Visible brush strokes, emotional depth, and slight anatomical quirks.'
    });
    data.push({
      id: id++, type: 'artwork', answer: 'AI', difficulty: 'Medium',
      content: `https://images.unsplash.com/photo-1678129202573-030daae9103e?w=500&q=80&v=${i}`, 
      explanation: 'Excessively polished details, bizarre hand/finger structures, generic fantasy aesthetic.'
    });
  }

  for (let i = 0; i < 10; i++) {
    data.push({
      id: id++, type: 'voice', answer: 'Human', difficulty: 'Hard',
      content: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i%5)+1}.mp3`,
      explanation: 'Natural breathing sounds, subtle emotional cadence, varying pace.'
    });
    data.push({
      id: id++, type: 'voice', answer: 'AI', difficulty: 'Hard',
      content: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i%5)+6}.mp3`,
      explanation: 'Monotone delivery, lack of breathing pauses, overly consistent pronunciation.'
    });
  }

  const fileContent = "import { GameItem } from '../types';\n\nexport const mockData: GameItem[] = " + JSON.stringify(data, null, 2) + ";\n";

  fs.mkdirSync('./src/data', { recursive: true });
  fs.writeFileSync('./src/data/mockData.ts', fileContent);
  console.log('Mock data generated! Total items:', data.length);
};

generateData();

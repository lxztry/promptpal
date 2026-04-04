/**
 * PromptPal - Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const descriptionInput = document.getElementById('description');
  const categorySelect = document.getElementById('category');
  const outputArea = document.getElementById('output');
  const resultDiv = document.getElementById('result');
  
  generateBtn.addEventListener('click', async () => {
    const description = descriptionInput.value.trim();
    if (!description) {
      alert('Please enter a description');
      return;
    }
    
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    try {
      const prompt = await generatePrompt(description, categorySelect.value);
      outputArea.value = prompt;
      resultDiv.classList.add('show');
    } catch (error) {
      alert('Error generating prompt: ' + error.message);
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Prompt';
    }
  });
  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputArea.value);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy to Clipboard';
    }, 2000);
  });
});

/**
 * Generate prompt based on description and category
 */
async function generatePrompt(description, category) {
  // Template mappings
  const templates = {
    portrait: {
      prompt: 'professional portrait photography, {description}, soft lighting, natural skin tones, shallow depth of field, high quality, detailed',
      negative: 'blurry, low quality, distorted features'
    },
    landscape: {
      prompt: 'breathtaking landscape photography, {description}, golden hour lighting, dramatic clouds, panoramic view, high quality, 4K',
      negative: 'overcast, dull, flat lighting'
    },
    anime: {
      prompt: 'anime style illustration, {description}, vibrant colors, detailed anime eyes, Studio Ghibli inspired, high quality anime art',
      negative: 'realistic, photographic, western cartoon'
    },
    product: {
      prompt: 'professional product photography, {description}, clean background, studio lighting, commercial quality, high detail',
      negative: 'cluttered background, amateur, unprofessional'
    },
    art: {
      prompt: 'digital art illustration, {description}, vibrant colors, detailed, artistic style, masterpiece quality',
      negative: 'photographic, low quality'
    }
  };
  
  const template = templates[category] || templates.portrait;
  
  // Replace placeholder
  let prompt = template.prompt.replace('{description}', description);
  
  // Add some variety
  const modifiers = [
    ', professional photography',
    ', cinematic lighting',
    ', detailed composition'
  ];
  
  // Add random modifier for variety
  if (Math.random() > 0.5) {
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    prompt += modifier;
  }
  
  return prompt;
}

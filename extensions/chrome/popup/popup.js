// PromptPal Extension - Popup Script

let selectedText = '';
let selectedImage = null;
let outputType = 'image';
let selectedStyle = 'photorealistic';

// DOM Elements
const selectionPreview = document.getElementById('selection-preview');
const generateBtn = document.getElementById('generate-btn');
const resultDiv = document.getElementById('result');
const promptOutput = document.getElementById('prompt-output');
const copyBtn = document.getElementById('copy-btn');
const openWebBtn = document.getElementById('open-web-btn');
const openWebLink = document.getElementById('open-web');
const loadingDiv = document.getElementById('loading');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Get selection from current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' });
    if (response) {
      if (response.text) {
        selectedText = response.text;
        selectionPreview.textContent = selectedText.substring(0, 200);
      }
      if (response.imageUrl) {
        selectedImage = response.imageUrl;
        selectionPreview.innerHTML = `<img src="${selectedImage}" class="image-preview" alt="Selected Image">`;
      }
    }
  } catch (e) {
    console.log('Could not get selection from page');
  }
  
  // Output type buttons
  document.querySelectorAll('.output-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.output-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      outputType = btn.dataset.type;
    });
  });
  
  // Style buttons
  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedStyle = btn.dataset.style;
    });
  });
  
  // Generate button
  generateBtn.addEventListener('click', generatePrompt);
  
  // Copy button
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptOutput.textContent);
    copyBtn.textContent = '已复制!';
    setTimeout(() => {
      copyBtn.textContent = '复制';
    }, 2000);
  });
  
  // Open web button
  openWebBtn.addEventListener('click', () => {
    const url = new URL('https://promptpal.cn/create');
    url.searchParams.set('prompt', promptOutput.textContent);
    url.searchParams.set('type', outputType);
    url.searchParams.set('style', selectedStyle);
    chrome.tabs.create({ url: url.toString() });
  });
  
  // Open web link
  openWebLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://promptpal.cn' });
  });
});

async function generatePrompt() {
  if (!selectedText && !selectedImage) {
    alert('请先选中网页中的文本或图片');
    return;
  }
  
  loadingDiv.style.display = 'flex';
  resultDiv.style.display = 'none';
  generateBtn.disabled = true;
  
  try {
    const response = await fetch('https://api.promptpal.cn/api/prompt/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: selectedImage ? 'image' : 'text',
        input: selectedImage || selectedText,
        style: selectedStyle,
        outputType: outputType,
      }),
    });
    
    const data = await response.json();
    
    if (data.prompt) {
      promptOutput.textContent = data.prompt;
      resultDiv.style.display = 'block';
      
      // Save to local storage
      chrome.storage.local.set({
        lastPrompt: data.prompt,
        lastStyle: selectedStyle,
        lastOutputType: outputType,
      });
    }
  } catch (error) {
    console.error('Generate error:', error);
    
    // Fallback: Use local prompt generation
    const fallbackPrompt = generateLocalPrompt();
    promptOutput.textContent = fallbackPrompt;
    resultDiv.style.display = 'block';
  } finally {
    loadingDiv.style.display = 'none';
    generateBtn.disabled = false;
  }
}

function generateLocalPrompt() {
  const stylePrompts = {
    photorealistic: 'photorealistic, natural lighting, Canon EOS R5, 85mm lens, shallow depth of field, 8K, hyperrealistic',
    anime: 'anime style, Studio Ghibli, hand-drawn, warm colors, soft lighting, high quality animation',
    '3d-render': '3D render, Octane renderer, cinematic lighting, detailed, next-gen quality',
    portrait: 'portrait photography, soft lighting, studio lighting, creamy bokeh, professional retouching',
    cyberpunk: 'cyberpunk, neon lights, Blade Runner, dark tones, futuristic',
    illustration: 'digital illustration, vector art, flat design, modern style',
  };
  
  const stylePrompt = stylePrompts[selectedStyle] || stylePrompts.photorealistic;
  
  if (selectedImage) {
    return `Reference image style: ${stylePrompt}. Analyze and recreate the visual style of the provided image.`;
  } else {
    return `${selectedText.substring(0, 100)}... ${stylePrompt}`;
  }
}

/**
 * PromptPal - Browser Extension Content Script
 */

// 监听来自background的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_PROMPT') {
    generatePromptFromSelection(message.text);
  }
  
  if (message.type === 'GET_SELECTION') {
    const selection = window.getSelection().toString();
    if (selection) {
      generatePromptFromSelection(selection);
    }
  }
  
  return true;
});

/**
 * 从选中的文本生成提示词
 */
function generatePromptFromSelection(text) {
  // 创建提示词生成面板
  const panel = createPromptPanel(text);
  document.body.appendChild(panel);
}

/**
 * 创建提示词面板
 */
function createPromptPanel(selectedText) {
  const panel = document.createElement('div');
  panel.id = 'promptpal-panel';
  panel.innerHTML = `
    <div class="promptpal-header">
      <span>✨ PromptPal</span>
      <button class="close-btn">&times;</button>
    </div>
    <div class="promptpal-content">
      <div class="selected-text">
        <label>Selected:</label>
        <p>${selectedText}</p>
      </div>
      <div class="category-select">
        <label>Category:</label>
        <select id="promptpal-category">
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="anime">Anime</option>
          <option value="product">Product</option>
          <option value="art">Art</option>
        </select>
      </div>
      <div class="generated-prompt">
        <label>Generated Prompt:</label>
        <textarea id="promptpal-output" readonly></textarea>
        <button id="promptpal-copy">Copy</button>
      </div>
      <div class="loading" style="display: none;">
        <span>Generating...</span>
      </div>
    </div>
  `;
  
  // 添加样式
  addStyles();
  
  // 添加事件监听
  const categorySelect = panel.querySelector('#promptpal-category');
  const outputArea = panel.querySelector('#promptpal-output');
  const copyBtn = panel.querySelector('#promptpal-copy');
  const closeBtn = panel.querySelector('.close-btn');
  
  categorySelect.addEventListener('change', () => {
    generatePrompt(selectedText, categorySelect.value, outputArea);
  });
  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputArea.value);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
  });
  
  closeBtn.addEventListener('click', () => {
    panel.remove();
  });
  
  // 初始生成
  generatePrompt(selectedText, categorySelect.value, outputArea);
  
  return panel;
}

/**
 * 生成提示词
 */
async function generatePrompt(text, category, outputArea) {
  const loading = document.querySelector('#promptpal-panel .loading');
  loading.style.display = 'block';
  
  // 模拟API调用（实际应该调用后端服务）
  setTimeout(() => {
    const prompt = buildPrompt(text, category);
    outputArea.value = prompt;
    loading.style.display = 'none';
  }, 500);
}

/**
 * 构建提示词
 */
function buildPrompt(text, category) {
  const categoryTemplates = {
    portrait: 'professional portrait photography, {text}, soft lighting, natural skin tones, high quality',
    landscape: 'breathtaking landscape, {text}, golden hour lighting, dramatic clouds, national geographic style',
    anime: 'anime style illustration, {text}, vibrant colors, detailed anime eyes, Studio Ghibli inspired',
    product: 'professional product photography, {text}, clean background, studio lighting, commercial quality',
    art: 'digital art illustration, {text}, vibrant colors, detailed, artistic style'
  };
  
  const template = categoryTemplates[category] || categoryTemplates.portrait;
  return template.replace('{text}', text);
}

/**
 * 添加样式
 */
function addStyles() {
  if (document.getElementById('promptpal-styles')) return;
  
  const styles = document.createElement('style');
  styles.id = 'promptpal-styles';
  styles.textContent = `
    #promptpal-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
    
    .promptpal-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    
    .promptpal-content {
      padding: 16px;
    }
    
    .promptpal-content label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: #333;
      font-size: 13px;
    }
    
    .selected-text p {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 6px;
      margin: 0 0 16px;
      font-size: 13px;
      color: #666;
    }
    
    .category-select {
      margin-bottom: 16px;
    }
    
    .category-select select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }
    
    .generated-prompt textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 13px;
      resize: vertical;
      margin-bottom: 10px;
    }
    
    #promptpal-copy {
      background: #667eea;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    
    #promptpal-copy:hover {
      background: #5a6fd6;
    }
    
    .loading {
      text-align: center;
      padding: 10px;
      color: #667eea;
    }
  `;
  
  document.head.appendChild(styles);
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + P 打开PromptPal
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    const selection = window.getSelection().toString();
    if (selection) {
      generatePromptFromSelection(selection);
    }
  }
});

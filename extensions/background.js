/**
 * PromptPal - Browser Extension Background Script
 */

// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generatePrompt',
    title: '✨ Generate AI Prompt with PromptPal',
    contexts: ['selection']
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'generatePrompt' && info.selectionText) {
    // 发送消息到内容脚本
    chrome.tabs.sendMessage(tab.id, {
      type: 'GENERATE_PROMPT',
      text: info.selectionText
    });
  }
});

// 监听来自popup或content script的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SELECTED_TEXT') {
    // 获取选中的文本
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_SELECTION' });
    });
  }
  
  if (message.type === 'PROMPT_GENERATED') {
    // 保存到历史记录
    saveToHistory(message.prompt);
  }
  
  return true;
});

// 保存到历史记录
function saveToHistory(prompt) {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    history.unshift({
      id: Date.now(),
      prompt: prompt,
      timestamp: Date.now()
    });
    
    // 只保留最近100条
    if (history.length > 100) {
      history.pop();
    }
    
    chrome.storage.local.set({ history });
  });
}

// 获取历史记录
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_HISTORY') {
    chrome.storage.local.get(['history'], (result) => {
      sendResponse(result.history || []);
    });
    return true;
  }
});

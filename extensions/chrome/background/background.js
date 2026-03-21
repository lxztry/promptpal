// PromptPal Extension - Background Script

// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  // 文本右键菜单
  chrome.contextMenus.create({
    id: 'generate-prompt-text',
    title: '🎨 生成图片提示词',
    contexts: ['selection'],
  });
  
  chrome.contextMenus.create({
    id: 'generate-video-prompt',
    title: '🎬 生成视频提示词',
    contexts: ['selection'],
  });
  
  // 图片右键菜单
  chrome.contextMenus.create({
    id: 'analyze-image',
    title: '🔍 分析图片生成提示词',
    contexts: ['image'],
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'generate-prompt-text') {
    const selectedText = info.selectionText;
    openPopupWithText(selectedText, 'image');
  } else if (info.menuItemId === 'generate-video-prompt') {
    const selectedText = info.selectionText;
    openPopupWithText(selectedText, 'video');
  } else if (info.menuItemId === 'analyze-image') {
    const imageUrl = info.srcUrl;
    openPopupWithImage(imageUrl);
  }
});

// 打开 popup 并传递数据
function openPopupWithText(text, type) {
  chrome.storage.local.set({ 
    selectedText: text,
    selectedType: type,
    selectedImage: null,
  });
  chrome.action.openPopup();
}

function openPopupWithImage(imageUrl) {
  chrome.storage.local.set({ 
    selectedImage: imageUrl,
    selectedText: '',
  });
  chrome.action.openPopup();
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_TAB_INFO') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true;
  }
});

// 处理键盘快捷键
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-promptpal') {
    chrome.action.openPopup();
  }
});

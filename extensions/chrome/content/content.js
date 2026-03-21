// PromptPal Extension - Content Script

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SELECTION') {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';
    
    // 检查是否有图片被选中
    const selectedImage = getSelectedImage();
    
    sendResponse({
      text: text,
      imageUrl: selectedImage,
    });
  }
  return true;
});

// 获取选中的图片
function getSelectedImage() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  
  // 检查是否是 img 元素
  if (container.nodeName === 'IMG') {
    return container.src;
  }
  
  // 检查选中区域是否包含 img
  const images = range.cloneContents().querySelectorAll('img');
  if (images.length > 0) {
    return images[0].src;
  }
  
  return null;
}

// 可选：添加快捷键支持
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + P: 打开 PromptPal
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
    e.preventDefault();
    chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
  }
});

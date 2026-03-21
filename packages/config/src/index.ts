// 模型配置
export * from './models';

// 提示词模板
export * from './prompts';

// 应用配置
export const APP_CONFIG = {
  name: 'PromptPal',
  nameCn: '提示伙伴',
  tagline: 'AI Content to Image/Video',
  taglineCn: '智能生成图像和视频',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@promptpal.cn',
  description: 'AI驱动的创意工具，支持浏览器扩展选区内容转图像/视频提示词',
};

// 免费额度配置
export const FREE_QUOTAS = {
  // 未登录用户
  anonymous: {
    promptGeneration: 10,      // 次/天
    imageToPrompt: 5,          // 次/天
  },
  // 登录用户（每日）
  daily: {
    promptGeneration: 30,
    imageToPrompt: 15,
    imageGeneration: 10,
    videoGeneration: 2,
  },
  // 订阅用户（月额度）
  monthly: {
    promptGeneration: 1000,
    imageToPrompt: 500,
    imageGeneration: 200,
    videoGeneration: 20,
  }
};

// 订阅套餐
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: '免费版',
    nameEn: 'Free',
    price: 0,
    currency: 'CNY',
    features: [
      '每日10张图片生成',
      '每日2个视频生成',
      '基础提示词优化',
      '浏览器扩展',
      '7天历史记录'
    ],
    quotas: {
      imageGeneration: 10,  // 每天
      videoGeneration: 2,   // 每天
    }
  },
  monthly: {
    id: 'monthly',
    name: '月卡',
    nameEn: 'Monthly',
    price: 29,
    currency: 'CNY',
    period: 'month',
    features: [
      '每月200张图片生成',
      '每月20个视频生成',
      '高级提示词优化',
      '浏览器扩展',
      '永久历史记录',
      '优先队列',
      '邮件支持'
    ],
    quotas: {
      imageGeneration: 200,  // 每月
      videoGeneration: 20,   // 每月
    }
  },
  yearly: {
    id: 'yearly',
    name: '年卡',
    nameEn: 'Yearly',
    price: 199,
    currency: 'CNY',
    period: 'year',
    savings: '节省40%',
    features: [
      '每年3000张图片生成',
      '每年300个视频生成',
      '高级提示词优化',
      '浏览器扩展',
      '永久历史记录',
      '优先队列',
      'VIP邮件支持',
      '新功能抢先体验'
    ],
    quotas: {
      imageGeneration: 3000,  // 每年
      videoGeneration: 300,   // 每年
    }
  }
};

// 支付配置
export const PAYMENT_CONFIG = {
  currency: 'CNY',
  currencySymbol: '¥',
  payMethods: {
    wechat: true,
    alipay: false, // 可配置
  }
};

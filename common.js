function _getDefault() {
  return {
    direction_sel: 0,
    enableAlt: true,
    timeout: 2000,
    firstEvent: true,
    saveAs: false,
    showNotice: true,
    keyCode: "Escape",
    openLinksOpenType: 1,

    effect_text: 0,
    open_type: [1, 1, 0, 1],
    text_type: [0, 0, 0, 0],
    searchEngines: [0, 7, 0, 7],

    effect_link: 0,
    open_type_link: [0, 1, 0, 1],
    link_type: [1, 3, 0, 0],
    linkSearchEngines: [0, 0, 0, 0],

    effect_img: 0,
    open_type_img: [0, 1, 0, 1],
    img_type: [1, 4, 0, 0],
    imgSearchEngines: [0, 0, 0, 0],
  };
}

var direction_val = ["↖ ↙ ↗ ↘", "↑ ↓ ← →"];
var _effect_text = ["四面八方", "上下", "左右"];
var _open_type = ["前台", "后台"];
var _text_type = ["搜索", "复制", "生成二维码"];
var _effect_link = ["四面八方", "上下", "左右"];
var _link_type = [
  "打开链接",
  "复制链接",
  "复制链接文本",
  "搜索链接文本",
  "生成二维码",
];
var _effect_img = ["四面八方", "上下", "左右"];
var _img_type = [
  "打开图片指向网站",
  "打开图片",
  "复制图片",
  "复制图片链接",
  "下载图片",
  "以图搜图",
];

var _build_in_seach_engines = [
  {
    name: "『网页』Google",
    url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
  },
  {
    name: "『网页』必应",
    url: "https://www.bing.com/search?q=%s",
  },
  {
    name: "『网页』duckduckgo",
    url: "https://duckduckgo.com/?q=%s",
  },
  {
    name: "『网页』百度",
    url: "https://www.baidu.com/s?wd=%s&ie=utf-8",
  },
  {
    name: "『网页』搜狗",
    url: "https://www.sogou.com/web?query=%s",
  },
  {
    name: "『网页』360",
    url: "https://www.so.com/s?ie=utf-8&q=%s",
  },
  {
    name: "『网页』秘迹搜索",
    url: "https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN",
  },
  {
    name: "『翻译』Google Translate",
    url: "https://translate.google.com/?sl=auto&op=translate&tl=zh-CN&text=%s",
  },
  {
    name: "『翻译』有道词典",
    url: "https://dict.youdao.com/search?q=%s",
  },
  {
    name: "『翻译』海词",
    url: "https://dict.cn/%s",
  },
  {
    name: "『知识』维基",
    url: "https://zh.wikipedia.org/wiki/%s",
  },
  {
    name: "『知识』stackoverflow",
    url: "https://stackoverflow.com/search?q=%s",
  },
  {
    name: "『知识』知乎",
    url: "https://www.zhihu.com/search?q=%s",
  },
  {
    name: "『知识』百度百科",
    url: "https://baike.baidu.com/search/word?pic=1&sug=1&word=%s",
  },
  {
    name: "『视频』youtube",
    url: "https://www.youtube.com/results?search_query=%s",
  },
  {
    name: "『视频』bilibili",
    url: "https://search.bilibili.com/all?keyword=%s",
  },
  {
    name: "『视频』爱奇艺",
    url: "https://so.iqiyi.com/so/q_%s",
  },
  {
    name: "『视频』优酷",
    url: "https://www.soku.com/search_video/q_%s",
  },
  {
    name: "『视频』腾讯视频",
    url: "https://v.qq.com/x/search/?q=%s",
  },
  {
    name: "『社交』Twitter",
    url: "https://twitter.com/search/%s",
  },
  {
    name: "『社交』豆瓣",
    url: "https://www.douban.com/search?source=suggest&q=%s",
  },
  {
    name: "『社交』新浪微博",
    url: "https://s.weibo.com/weibo/%s",
  },
  {
    name: "『购物』淘宝",
    url: "https://s.taobao.com/search?q=%s",
  },
  {
    name: "『购物』京东",
    url: "https://search.jd.com/Search?keyword=%s&enc=utf-8",
  },
];

var _build_in_seach_engines_for_img = [
  {
    name: "Google",
    url: "https://www.google.com/searchbyimage?image_url=%s",
  },
  {
    name: "Baidu",
    url: "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=%s",
  },
  {
    name: "TinEye",
    url: "https://www.tineye.com/search?url=%s",
  },
];

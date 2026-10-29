# Whenua Printing 网站维护与交接

记录日期：2026-10-27（新西兰时间）。这是后续维护时应先阅读的项目记录，不是聊天记录的逐字备份。

## 网站与源码

- 正式网站：https://kimliumingyang.github.io/whenuaprinting/
- 走查窗口：https://kimliumingyang.github.io/whenuaprinting/preview.html
- GitHub 源码：https://github.com/Kimliumingyang/whenuaprinting
- 当前源码 ZIP：https://github.com/Kimliumingyang/whenuaprinting/archive/refs/heads/main.zip
- 分支：main。静态 HTML / CSS / JavaScript 网站，无需 npm 或数据库。

## 以后在哪里修改

少量修改可以在 GitHub 仓库打开文件，点击铅笔编辑并提交。较大的修改建议用 VS Code：克隆仓库，修改、预览、检查后提交并推送 main。不会代码时，可以将仓库链接和修改要求交给有仓库访问权限的开发者或助手。

| 要改什么 | 文件 / 位置 |
| --- | --- |
| 首页文字、版块、FAQ | index.html |
| 公司介绍 | about.html |
| 服务流程及该页面的 FAQ | how-it-works.html |
| 产品总览、推荐商品、图片卡片文字 | products.html |
| 名片 / 传单 / 海报 / 胸牌 / 易拉宝详情和价格 | business-cards.html / flyers.html / posters.html / name-badges.html / pull-up-banners.html |
| 正式询价页 | quote.html |
| 询价成功页 | thank-you.html |
| 隐私 / 退款 / 条款 | privacy-policy.html / refund-policy.html / terms-and-conditions.html |
| 图片与 Logo | assets/ |
| 全站基础样式 | styles/home.css |
| 最新全站视觉、导航和页脚 Logo 微调 | styles/refinements.css（最后加载） |
| 产品总览、产品详情的样式 | styles/products.css / styles/product.css / styles/pricing.css |
| 全站交互、询价与搜索 | scripts/quote.js / scripts/navigation.js / scripts/search.js |
| 推荐商品筛选、详情弹窗 | scripts/products.js |
| 发布文件清单与部署 | .github/workflows/pages.yml |

## 更新图片与产品

- 替换现有图片：使用相同文件名上传到 assets/，页面引用可保持不变。图片文件名大小写及扩展名必须完全一致。
- 上传新图片：建议英文小写加短横线，例如 tote-bag-natural-01.jpg。优先使用适当压缩的 JPG、PNG 或 WebP，保留有意义的 alt 描述。
- 新推荐商品：在 products.html 添加卡片，按相邻卡片填写分类、名称、描述、图片与询价数据属性。现有 22 张商品图映射见 MERCHANDISE-CATALOGUE.md。
- 更改推荐商品分类时，同步检查 scripts/products.js 的筛选逻辑。
- 新建独立页面时，必须加入 .github/workflows/pages.yml 中复制 HTML 的清单，并接入导航、搜索及询价产品选项（如果适用）。
- 首页与 How it works 各自包含完整 10 条 FAQ；修改内容时同步两处。
- 导航、页脚、询价弹窗目前重复存在于各 HTML；全站修改需要同步每一页。

## 当前已确认的设计与功能

- 米白背景、绿色品牌色；统一导航、细线搜索及邮箱图标；当前页提示。手机搜索位于展开菜单。
- 页脚使用完整透明白色 Logo assets/footer-logo.png。1440px 桌面布局图片宽 342px；下方文案字号保留原设置。
- 主页绿色询价按钮打开弹窗；主页 Explore more 跳转产品总览推荐商品区。
- 各产品询价弹窗使用同一风格，默认选择该产品。右上角邮箱图标进入 quote.html。
- 产品卡片悬停 / 键盘聚焦出现绿色圆底白箭头；触屏设备保留可发现的箭头。
- 产品总览含 5 类印刷品和 22 张原始推荐商品概念图，可筛选、搜索、查看大图并询价。
- 商品概念图不代表确认库存；规格、供应、数量和交期由报价确认。
- 法律条款以用户提供内容为准，Terms 来源为用户 DOCX，不随意改写。
- About 页评价目前为示例内容；应在公开使用真实评价前确认客户授权及真实性。
- Facebook / Instagram 账号链接尚未提供，当前保留展示文字与图标。

## 询价和邮件（修改前必读）

- 收件邮箱：whenuaprinting@gmail.com。
- 客户字段：姓名、邮箱、电话、公司、产品、数量；Project details 可选。
- FormSubmit 原生 POST，target=_top；客户邮箱字段必须 name=email。
- 使用 _autoresponse、_replyto、_next 跳到 thank-you.html；保留 reCAPTCHA。不要为了留在页面而随意改回 AJAX，否则可能影响自动回复。
- FormSubmit 是外部服务，表单激活、验证码和实际邮件送达需独立验证；浏览器交互检查不能代替真实收件测试。
- 网站中无需存放邮箱密码。更多说明见 CUSTOMER-AUTOREPLY.md。

## 如何预览、发布与恢复

1. 本地在仓库目录运行 python3 -m http.server 8000，浏览 http://localhost:8000/。本地只用于查看交互，不要误发真实询价。
2. 检查桌面 1440px、手机 390px / 320px，导航、图片、FAQ、产品筛选、弹窗及询价字段。
3. 提交并推送 main，GitHub Actions 的 Publish Whenua website 工作流负责部署 Pages。
4. 发布时 scripts/stamp-build.py 为 CSS/JS 附加提交版本号，并生成 build-info.json，减少旧缓存。
5. 预览页点击“刷新预览”，左侧版本号应对应最新部署提交。推送成功与部署成功是两个步骤；在 Actions 中确认部署绿勾。
6. 想恢复旧版本，使用 GitHub 历史记录 revert 对应提交后再部署。ZIP 是文件备份；完整修改历史保留在 GitHub。

## 以后继续合作

新对话请提供仓库链接，并说：“请先阅读 WEBSITE-MAINTENANCE.md，再基于当前 main 继续修改。”随后说明想增加的服务、要替换的图片和参考设计。维护者应先拉取最新 main，保留用户上传文件，完成适当检查再推送。

本文件帮助延续项目背景，但不能保证任何助手在新对话中自动记得全部聊天，也不代表新会话自动拥有 GitHub 访问权限。

## 2026-10-27 代码整理

HTML、CSS、JavaScript 已统一格式化。原 scripts/home.js 按职责拆为 navigation.js、quote.js、search.js，并按此顺序加载；产品脚本随后加载。完整文件职责见 README.md。格式配置在 .prettierrc.json。此轮整理保留原有样式覆盖顺序与原生询价流程。

## 2026-10-29 正式询价页 Banner

quote.html 使用 assets/Customer joins print consultation.png 原图（用户上传的咨询场景），标题 Tell us what you need.。Banner 桌面高 220–280px、手机高 175px；手机将表格置于介绍前，减少开始填写前的滚动。主页 Banner 保持原样。

# BrewLog 国内部署指南

## 方案一：Gitee Pages（推荐，国内访问最快）

### 1. 创建 Gitee 仓库
- 访问 https://gitee.com 注册/登录
- 新建仓库，名称建议为 `BrewLog`
- 将本地代码推送到 Gitee：
  ```bash
  git remote add gitee https://gitee.com/你的用户名/BrewLog.git
  git push -u gitee main
  ```

### 2. 修改构建配置（重要）
如果仓库名不是 `BrewLog`，请修改 `vite.config.ts`：
```ts
export default defineConfig({
  base: '/你的仓库名/',
  // ...
})
```

### 3. 构建并部署
```bash
npm run build
```
将 `dist` 文件夹内所有文件推送到 Gitee 仓库的独立分支（如 `pages`），或直接上传到 Gitee Pages。

### 4. 开启 Gitee Pages
- 进入仓库 → 服务 → Gitee Pages
- 选择部署分支和目录（`/dist` 或根目录）
- 点击「启动」
- 访问地址：`https://你的用户名.gitee.io/你的仓库名`

> 注意：Gitee Pages 对免费用户可能需要实名认证。

---

## 方案二：GitHub Pages（已配置自动部署，国内访问一般）

本项目已配置 GitHub Actions 自动部署。

### 1. 推送到 GitHub
```bash
git remote add origin https://github.com/你的用户名/BrewLog.git
git push -u origin main
```

### 2. 启用 Pages
- 进入仓库 → Settings → Pages
- Source 选择「GitHub Actions」

### 3. 自动部署
每次推送代码到 `main` 或 `master` 分支，会自动构建并部署。

### 4. 访问地址
`https://你的用户名.github.io/BrewLog`

> 如果仓库名不是 `BrewLog`，请同步修改 `vite.config.ts` 中的 `base`。

---

## 方案三：腾讯云 COS / 阿里云 OSS（稳定快速，需少量费用）

1. 购买对象存储服务（约 0.5 元/GB/月）
2. 创建存储桶，开启静态网站托管
3. 将 `dist` 文件夹上传至存储桶根目录
4. 绑定自定义域名（可选）
5. 配置 CDN 加速（推荐）

---

## 方案四：Vercel / Netlify（国际，国内访问一般）

1. 注册 Vercel/Netlify 账号
2. 导入 GitHub/Gitee 仓库
3. 构建命令：`npm run build`
4. 输出目录：`dist`
5. 自动获得 `.vercel.app` / `.netlify.app` 域名

---

## 关于 Zip 包上传

直接上传 `BrewLog-demo.zip` 到社区即可。

包内已包含完整的静态资源：
- `index.html` — 入口文件
- `assets/` — JS/CSS 等资源文件
- `favicon.svg`

解压后直接用浏览器打开 `index.html` 即可本地体验。

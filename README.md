# Frank's Blog

使用 Markdown 写作，由 GitHub Pages / Jekyll 自动生成的个人博客。

- [博客首页](https://frankcasbert.github.io/Blogs/)
- [网页使用说明](https://frankcasbert.github.io/Blogs/posts/blog-guide.html)
- [Markdown 使用说明](./_posts/2026-10-25-blog-guide.md)
- [文章模板](./_templates/post.md)

## 日常发布

1. 把 Markdown 放到 `_posts/YYYY-MM-DD-slug.md`，保留文章开头的 YAML 信息。
2. 把配图放到 `assets/images/slug/`。
3. 在文章里使用 `![说明](../assets/images/slug/example.png)`。
4. 提交到 `main`，等待 Pages 自动生成网站。

请优先阅读完整使用说明，其中包含网页上传、图片规则和常见问题。

## 首次启用 Pages

仓库 **Settings → Pages → Build and deployment**：

- Source：**Deploy from a branch**
- Branch：**main**
- Folder：**/ (root)**
- 点击 **Save**，等待部署成功。

网站配置中的 `baseurl: /Blogs` 用于当前项目网址，样式和导航已经统一处理这个前缀。普通文章默认生成到 `/posts/slug.html`，与 `_posts` 中的 Markdown 共用 `../assets/images/` 路径。原 Hello World 文章的历史地址单独保留。

本仓库与博客公开，无密码保护。重要内容不要上传。

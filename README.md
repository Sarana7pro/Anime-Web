
# Anime-Server

Anime-Server 是一个前后端分离的动漫数据展示平台，后端使用 Node.js + Express + MySQL 实现 API 服务，前端使用 Vue 2 + Element UI 构建交互界面。该项目支持动漫数据的随机推荐、详细信息展示、用户注册登录、收藏、观看历史、搜索以及消息提示等功能。

---

**项目仓库**  
前端：[Anime-Web 前端仓库](https://github.com/Sarana7pro/Anime-Web)  
后端：[Anime-Server 后端仓库](https://github.com/Sarana7pro/Anime-Server)

---

## 目录

- [项目概述](#项目概述)
- [主要特性](#主要特性)
- [技术栈](#技术栈)
- [项目架构](#项目架构)
- [目录结构](#目录结构)
- [快速开始](#快速开始)
  - [后端部署](#后端部署)
  - [前端部署](#前端部署)
- [API 文档](#api-文档)
- [开发规范](#开发规范)
- [贡献指南](#贡献指南)
- [License](#license)

---

## 项目概述

Anime-Server 为动漫爱好者提供一个全面、便捷的动漫内容浏览平台。后端提供 API 接口支持数据随机推荐、分类查询、详细信息展示、用户认证及收藏、观看历史管理等；前端基于 Vue 2 构建，借助 Element UI 设计精美的用户交互界面，实现内容展示、搜索、播放等功能。

---

## 主要特性

- **动漫数据展示**：支持随机推荐、日本动漫、国产动漫、电影/剧场版/OVA 等分类展示。
- **详细内容页**：提供动漫详情、剧情简介、演员、导演、评分等详细信息。
- **用户系统**：注册、登录、收藏、观看历史以及消息推送。
- **搜索功能**：支持关键词搜索，返回动漫标题、封面及简介。
- **响应式 UI**：前端采用 Vue 2 与 Element UI，实现高效、响应式的用户界面。
- **后端 API 调用统计**：内置统计 API 调用次数与近30分钟调用量记录。

---

## 技术栈

- **后端**：  
  - Node.js  
  - Express  
  - MySQL（使用 mysql2 驱动）  
  - Crypto（用于密码加盐 MD5 加密）

- **前端**：  
  - Vue.js 2  
  - Vue Router  
  - Vuex  
  - Element UI

---

## 项目架构

项目采用前后端分离架构，后端作为 API 服务提供数据支持，前端通过 HTTP 请求调用接口，展示数据。整体架构设计如下：

- **后端 (anime-server)**  
  提供各类动漫数据查询接口、用户认证、收藏、观看历史接口。使用 CORS 允许来自前端（默认 http://localhost:8080）的请求。

- **前端 (anime-web)**  
  基于 Vue 2 构建单页面应用（SPA），主要分为以下模块：
  - **组件**：动漫分类、轮播图、详情页、播放列表、登录/注册、搜索、收藏、观看历史等组件。
  - **路由**：基于 Vue Router 实现页面跳转（首页、详情、认证、消息、收藏、观看历史、搜索结果）。
  - **状态管理**：使用 Vuex 管理用户状态及全局数据。

---

## 目录结构

```plaintext
Anime-Server
│
├── anime-api/                # Node.js 后端
│   ├── index.js              # 服务器入口
│   ├── package.json          # 后端依赖及配置
│   └── ...                   # 其他后端相关文件
│
├── anime-web/                # Vue 前端
│   ├── public/               # 静态资源
│   ├── src/                  # 前端源代码
│   │   ├── assets/           # CSS、图片等静态资源
│   │   │   └── css/          # 样式文件（AnimeCategory.css, favorites.css, messages.css, 等）
│   │   ├── components/       # Vue 组件库
│   │   │   ├── AnimeCategory/       # 分类展示组件（AnimeCategoryChina.vue, AnimeCategoryJapan.vue, 等）
│   │   │   ├── AnimeDetail/         # 动漫详情组件（AnimeDescription.vue, AnimeInfoRanking.vue, 等）
│   │   │   ├── AppHeader.vue          # 页头组件
│   │   │   ├── AppFooter.vue          # 页脚组件
│   │   │   ├── AppSidebar.vue         # 侧边栏导航组件
│   │   │   ├── LoginComponent.vue     # 登录组件
│   │   │   ├── RegisterComponent.vue  # 注册组件
│   │   │   ├── SearchWindow.vue       # 搜索结果组件
│   │   │   └── ...                    # 其他组件
│   │   ├── router/           # 路由配置（index.js）
│   │   ├── store/            # Vuex 状态管理（index.js）
│   │   ├── views/            # 页面视图（HomeView.vue, VideoDetailView.vue, CombinedAuth.vue, 等）
│   │   ├── App.vue           # Vue 主组件
│   │   └── main.js           # 前端入口文件
│   ├── package.json          # 前端依赖及配置
│   └── vue.config.js         # Vue 配置文件
│
└── README.md                 # 项目说明文档（本文件）
```

---

## 快速开始

### 后端部署

1. **安装 Node.js**  
   请确保本机安装 [Node.js](https://nodejs.org/)（推荐版本 12 及以上）。

2. **配置数据库**  
   - 安装 MySQL 并创建数据库（例如：`anime_db`）。  
   - 根据 `anime-server/index.js` 中的数据库配置，设置数据库主机、用户名、密码等。

3. **安装依赖**  
   ```bash
   cd anime-server
   npm install
   ```

4. **启动服务器**  
   ```bash
   node index.js
   ```
   服务器默认监听 `http://localhost:3000`。

---

### 前端部署

1. **安装依赖**  
   ```bash
   cd anime-web
   npm install
   ```

2. **启动开发服务器**  
   ```bash
   npm run serve
   ```
   前端默认访问地址为 `http://localhost:8080`。

3. **构建生产版本**  
   ```bash
   npm run build
   ```

---


## 数据库设计

该项目使用 MySQL 数据库管理系统，主要包含两张表：`users` 和 `mac_vod`，它们分别用于管理用户信息和动漫数据。

### `users` 表

用于存储用户相关信息，包括注册信息、密码、头像、收藏、观看历史等。

| 字段名        | 类型               | 说明                               |
|---------------|--------------------|------------------------------------|
| `id`          | `int(11)`          | 用户ID，主键，自动递增               |
| `username`    | `varchar(50)`       | 用户名，唯一                        |
| `password`    | `varchar(32)`       | 用户密码（MD5加密）                 |
| `avatar`      | `varchar(255)`      | 用户头像，允许为空                   |
| `messages`    | `text`              | 用户消息，允许为空                   |
| `favorites`   | `text`              | 用户收藏，允许为空                   |
| `watch_history`| `text`             | 用户观看历史，允许为空               |
| `created_at`  | `timestamp`         | 用户创建时间，默认当前时间戳         |

### `mac_vod` 表

用于存储动漫相关数据，包括标题、封面图、剧情简介、集数等详细信息。

| 字段名              | 类型                    | 说明                                            |
|---------------------|-------------------------|-------------------------------------------------|
| `vod_id`            | `int(10) UNSIGNED`       | 动漫ID，主键，自动递增                           |
| `type_id`           | `smallint(6)`            | 分类ID（用于分类，如日本动漫、国产动漫等）      |
| `type_id_1`         | `smallint(6) UNSIGNED`   | 二级分类ID                                     |
| `group_id`          | `smallint(6) UNSIGNED`   | 分组ID                                          |
| `vod_name`          | `varchar(255)`           | 动漫标题                                        |
| `vod_sub`           | `varchar(255)`           | 动漫副标题                                      |
| `vod_en`            | `varchar(255)`           | 动漫英文名称                                    |
| `vod_status`        | `tinyint(1) UNSIGNED`    | 动漫状态（如是否可用）                          |
| `vod_letter`        | `char(1)`                | 标题的首字母（用于排序和索引）                  |
| `vod_color`         | `varchar(6)`             | 封面颜色（用于标记特定主题或风格）              |
| `vod_tag`           | `varchar(100)`           | 标签（如“热血”、“搞笑”等）                     |
| `vod_class`         | `varchar(255)`           | 分类（如“日本动漫”，“国产动漫”等）             |
| `vod_pic`           | `varchar(1024)`          | 动漫封面图URL                                   |
| `vod_pic_thumb`     | `varchar(1024)`          | 动漫封面缩略图URL                               |
| `vod_pic_slide`     | `varchar(1024)`          | 动漫幻灯片图片URL                               |
| `vod_pic_screenshot`| `text`                   | 动漫截图URL                                      |
| `vod_actor`         | `varchar(255)`           | 演员列表                                        |
| `vod_director`      | `varchar(255)`           | 导演                                           |
| `vod_writer`        | `varchar(100)`           | 编剧                                           |
| `vod_behind`        | `varchar(100)`           | 背景资料                                       |
| `vod_blurb`         | `varchar(255)`           | 动漫简介                                        |
| `vod_remarks`       | `varchar(100)`           | 备注                                           |
| `vod_pubdate`       | `varchar(100)`           | 发布日期                                        |
| `vod_total`         | `mediumint(8) UNSIGNED`  | 动漫总集数                                      |
| `vod_serial`        | `varchar(20)`            | 动漫序列号（如果是剧集或系列）                  |
| `vod_tv`            | `varchar(30)`            | 动漫电视台（播放平台）                          |
| `vod_weekday`       | `varchar(30)`            | 每周播放的日期（如每周三、周五等）              |
| `vod_area`          | `varchar(20)`            | 动漫发布地区                                    |
| `vod_lang`          | `varchar(10)`            | 动漫语言                                        |
| `vod_year`          | `varchar(10)`            | 动漫发布年份                                    |
| `vod_version`       | `varchar(30)`            | 动漫版本（如原版、修复版等）                    |
| `vod_state`         | `varchar(30)`            | 状态（如正在播放、已完结等）                    |
| `vod_author`        | `varchar(60)`            | 作者                                           |
| `vod_jumpurl`       | `varchar(150)`           | 动漫跳转链接                                    |
| `vod_tpl`           | `varchar(30)`            | 模板                                            |
| `vod_tpl_play`      | `varchar(30)`            | 播放模板                                        |
| `vod_tpl_down`      | `varchar(30)`            | 下载模板                                        |
| `vod_isend`         | `tinyint(1) UNSIGNED`    | 是否完结（0表示未完结，1表示完结）              |
| `vod_lock`          | `tinyint(1) UNSIGNED`    | 是否锁定（0表示解锁，1表示锁定）                |
| `vod_level`         | `tinyint(1) UNSIGNED`    | 观看级别（如适合儿童、青少年等）                |
| `vod_copyright`     | `tinyint(1) UNSIGNED`    | 是否有版权（0表示无版权，1表示有版权）          |
| `vod_points`        | `smallint(6) UNSIGNED`   | 总积分                                          |
| `vod_points_play`   | `smallint(6) UNSIGNED`   | 播放积分                                        |
| `vod_points_down`   | `smallint(6) UNSIGNED`   | 下载积分                                        |
| `vod_hits`          | `mediumint(8) UNSIGNED`  | 总点击量                                        |
| `vod_hits_day`      | `mediumint(8) UNSIGNED`  | 今日点击量                                      |
| `vod_hits_week`     | `mediumint(8) UNSIGNED`  | 本周点击量                                      |
| `vod_hits_month`    | `mediumint(8) UNSIGNED`  | 本月点击量                                      |
| `vod_duration`      | `varchar(10)`            | 动漫时长                                        |
| `vod_up`            | `mediumint(8) UNSIGNED`  | 上传用户ID（如果相关）                          |
| `vod_down`          | `mediumint(8) UNSIGNED`  | 下载用户ID（如果相关）                          |
| `vod_score`         | `decimal(3, 1) UNSIGNED` | 动漫评分（0.0-10.0）                            |
| `vod_score_all`     | `mediumint(8) UNSIGNED`  | 总评分人数                                      |
| `vod_score_num`     | `mediumint(8) UNSIGNED`  | 评分人数                                        |
| `vod_time`          | `int(10) UNSIGNED`       | 动漫更新时间                                    |
| `vod_time_add`      | `int(10) UNSIGNED`       | 动漫数据创建时间，默认当前时间戳               |
| `vod_time_hits`     | `int(10) UNSIGNED`       | 动漫的点击时间戳                                |
| `vod_time_make`     | `int(10) UNSIGNED`       | 动漫制作时间                                    |
| `vod_trysee`        | `smallint(6) UNSIGNED`   | 试看集数                                        |
| `vod_douban_id`     | `int(10) UNSIGNED`       | 动漫豆瓣ID                                       |
| `vod_douban_score`  | `decimal(3, 1) UNSIGNED` | 动漫豆瓣评分                                    |
| `vod_reurl`         | `varchar(255)`           | 重新定向URL                                      |
| `vod_rel_vod`       | `varchar(255)`           | 相关视频ID（如推荐视频）                        |
| `vod_rel_art`       | `varchar(255)`           | 相关艺术作品                                    |
| `vod_pwd`           | `varchar(10)`            | 观看密码                                        |
| `vod_pwd_url`       | `varchar(255)`           | 密码验证URL                                      |
| `vod_pwd_play`      | `varchar(10)`            | 播放密码                                        |
| `vod_pwd_play_url`  | `varchar(255)`           | 播放密码验证URL                                  |
| `vod_pwd_down`      | `varchar(10)`            | 下载密码                                        |
| `vod_pwd_down_url`  | `varchar(255)`           | 下载密码验证URL                                  |
| `vod_content`       | `mediumtext`             | 动漫详细内容                                    |
| `vod_play_from`     | `varchar(255)`           | 播放来源                                        |
| `vod_play_server`   | `varchar(255)`           | 播放服务器                                      |
| `vod_play_note`     | `varchar(255)`           | 播放备注                                        |
| `vod_play_url`      | `mediumtext`             | 播放URL                                          |
| `vod_down_from`     | `varchar(255)`           | 下载来源                                        |
| `vod_down_server`   | `varchar(255)`           | 下载服务器                                      |
| `vod_down_note`     | `varchar(255)`           | 下载备注                                        |
| `vod_down_url`      | `mediumtext`             | 下载URL                                          |
| `vod_plot`          | `tinyint(1) UNSIGNED`    | 是否为剧情更新（0表示否，1表示是）             |
| `vod_plot_name`     | `mediumtext`             | 剧情更新标题                                    |
| `vod_plot_detail`   | `mediumtext`             | 剧情更新详细信息                                |

---


## API 文档

### 动漫数据接口

| **接口名称**              | **请求方法** | **路径**                          | **参数**                        | **返回字段**                              |
|---------------------------|--------------|-----------------------------------|---------------------------------|-------------------------------------------|
| **随机日本动漫**          | GET          | `/api/random-anime`               | 无                              | `vod_id`、`vod_name`、`vod_pic`           |
| **随机国产动漫**          | GET          | `/api/random-china-anime`         | 无                              | 同上                                      |
| **动漫电影/剧场版/OVA**   | GET          | `/api/anime-movies`               | 无                              | 未指定                                    |
| **动漫详情**              | GET          | `/api/anime-detail/:id`           | 路径参数：`id`                  | 未指定                                    |
| **搜索动漫**              | GET          | `/api/search-anime`               | 查询参数：`q`（关键词）         | `vod_id`、`vod_name`、`vod_pic`、`vod_content` |
| **用户注册**              | POST         | `/api/register`                   | `username`、`password`          | 未指定                                    |
| **用户登录**              | POST         | `/api/login`                      | `username`、`password`          | 未指定                                    |
| **获取用户消息**          | GET          | `/api/user/messages`              | 查询参数：`userId`（用户ID）    | 未指定                                    |
| **获取用户收藏**          | GET          | `/api/user/favorites`             | 查询参数：`userId`（用户ID）    | 未指定                                    |
| **更新用户收藏**          | POST         | `/api/user/favorites`             | `userId`、`video`（对象）       | 未指定                                    |
| **获取用户观看历史**      | GET          | `/api/user/watch-history`         | 查询参数：`userId`（用户ID）    | 未指定                                    |
| **记录观看历史**          | POST         | `/api/user/watch-history`         | `userId`、`video`（对象）       | 未指定                                    |

---

### 说明：
1. **参数类型**：
   - **路径参数**：如 `:id` 表示动态路径参数（需替换为实际值）。
   - **查询参数**：如 `q={关键词}` 需通过URL传参（例如 `/api/search-anime?q=火影`）。
   - **请求体参数**：如 `POST` 请求中的 `username`、`password` 需通过请求体传递。

2. **返回字段**：
   - “同上”表示与上一行接口的返回字段一致。
   - “未指定”表示接口文档中未明确说明返回字段。
---

## 开发规范

- **代码风格**  
  前后端代码均遵循一致的代码风格。后端使用 JavaScript 编写，前端使用 Vue 单文件组件（SFC）。建议使用 ESLint 对代码进行规范检查。

- **提交规范**  
  提交信息应清晰描述所做更改，建议使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式。

- **分支策略**  
  - `main` 分支：保持稳定版本。  
  - `develop` 分支：用于集成新功能和日常开发。  
  - 功能开发建议创建独立功能分支，完成后提交 Pull Request。

- **文档更新**  
  开发过程中请及时更新文档，确保文档与代码保持一致。

---

## 贡献指南

欢迎任何形式的贡献！如果你有改进建议或 bug 反馈，请按照以下步骤提交 Pull Request：

1. Fork 本仓库；
2. 创建你的功能分支 (`git checkout -b feature/xxx`)；
3. 提交你的修改 (`git commit -m 'Add some feature'`)；
4. 推送到分支 (`git push origin feature/xxx`)；
5. 创建 Pull Request。

请确保代码通过本地测试，提交信息符合规范。

---

## License

该项目采用 MIT License 开源，详情请查看 [LICENSE](LICENSE) 文件。

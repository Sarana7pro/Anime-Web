<template>
    <div class="anime-category">
        <!-- 分类标题 -->
        <div class="category-header">
            <h2>
                <i class="el-icon-film"></i> 
                {{ title }}
            </h2>
        </div>

        <!-- 动漫电影 8x6 网格 -->
        <div class="anime-grid">
            <div v-for="anime in animeList" :key="anime.id" class="anime-box">
                <!-- 使用 img 标签展示图片 -->
                <div class="anime-cover-wrapper" @click="goToDetail(anime.id)">
                    <img :src="anime.pic" alt="anime.cover" class="anime-cover" />
                    <div class="overlay">
                        <i class="el-icon-caret-right play-button"></i>
                    </div>
                </div>
                <div class="anime-title">{{ truncatedAnimeTitle(anime.title) }}</div>
            </div>
        </div>

        <!-- 分页按钮 -->
        <div class="pagination">
            <el-button 
                :disabled="currentPage === 1" 
                @click="fetchAnimeData(currentPage - 1)"
            >
                上一页
            </el-button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <el-button 
                :disabled="currentPage === totalPages" 
                @click="fetchAnimeData(currentPage + 1)"
            >
                下一页
            </el-button>

            <!-- 跳转到某一页 -->
            <el-input
                v-model.number="jumpPage"
                type="number"
                :min="1"
                :max="totalPages"
                placeholder="跳转到..."
                style="width: 100px; margin-left: 10px;"
                @change="jumpToPage"
            />
            <el-button @click="jumpToPage">跳转</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MovieTheatricalOVAMore",
    props: {
        title: {
            type: String,
            default: "电影/剧场版/OVA",
        },
    },
    data() {
        return {
            animeList: [], // 动漫数据
            currentPage: 1, // 当前页码
            totalPages: 1, // 总页数
            pageSize: 48, // 每页条数
            jumpPage: 1, // 用户输入的目标页码
        };
    },
    mounted() {
        this.fetchAnimeData(this.currentPage);
    },
    methods: {
        async fetchAnimeData(page) {
            try {
                if (page < 1 || page > this.totalPages) return; // 如果页面超出范围，不执行请求
                const response = await fetch(
                    `http://localhost:3000/api/hd-anime-movies?page=${page}&pageSize=${this.pageSize}`
                );
                const data = await response.json();
                this.animeList = data.data.map((anime) => ({
                    id: anime.vod_id,
                    title: anime.vod_name,
                    pic: anime.vod_pic,
                }));
                this.currentPage = data.pagination.currentPage;
                this.totalPages = data.pagination.totalPages;
                this.jumpPage = this.currentPage; // 更新跳转页
            } catch (error) {
                console.error('Failed to fetch anime data:', error);
            }
        },
        truncatedAnimeTitle(title) {
            if (title.length > 8) {
                return title.substring(0, 8) + '...';
            }
            return title;
        },
        goToDetail(id) {
            // 跳转到视频详情页，路由路径为 /anime/detail/:id
            this.$router.push({ path: `/anime/detail/${id}` });
        },
        jumpToPage() {
            if (this.jumpPage >= 1 && this.jumpPage <= this.totalPages) {
                this.fetchAnimeData(this.jumpPage);
            } else {
                this.$message.error('页码超出范围');
            }
        },
    },
};
</script>

<style scoped>
/* 分类整体样式 */
.anime-category {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

/* 标题栏 */
.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

/* 8x6 网格 */
.anime-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 10px;
}

/* 动漫卡片 */
.anime-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
}

/* 动漫封面包装 */
.anime-cover-wrapper {
    position: relative;
    width: 190px;
    height: 120px;
}

/* 固定图片大小 */
.anime-cover {
    width: 100%;
    height: 100%;
    background: #ddd;
    object-fit: cover;
    transition: opacity 0.3s;
}

/* 悬浮时图片的透明度 */
.anime-cover-wrapper:hover .anime-cover {
    opacity: 0.5;
}

/* 播放按钮 */
.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 40px;
    opacity: 0;
    transition: opacity 0.3s;
}

/* 悬浮时播放按钮的显示 */
.anime-cover-wrapper:hover .play-button {
    opacity: 1;
}

/* 遮罩层 */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s;
}

/* 悬浮时遮罩层的显示 */
.anime-cover-wrapper:hover .overlay {
    opacity: 1;
}

/* 标题 */
.anime-title {
    font-size: 14px;
    color: #333;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

/* 分页按钮样式 */
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.pagination span {
    font-size: 16px;
    color: #333;
}

.pagination el-button {
    font-size: 14px;
}
</style>

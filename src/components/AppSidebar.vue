<template>
  <div class="sidebar">
    <div class="logo" @click="goToHome">
      <img src="/logo_black.png" alt="Logo" class="logo-image"/>
    </div>
    <el-menu
      default-active="1"
      background-color="#ffffff"
      text-color="#282828"
      active-text-color="#e50914"
    >
      <el-menu-item index="1" @click="goToHome">
        <i class="el-icon-s-home icon"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goToCategory('japanAnime')">
        <i class="el-icon-film icon"></i>
        <span slot="title">日本动漫</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goToCategory('chinaAnime')">
        <i class="el-icon-film icon"></i>
        <span slot="title">国产动漫</span>
      </el-menu-item>
      <el-menu-item index="4" @click="goToCategory('movieAnime')">
        <i class="el-icon-film icon"></i>
        <span slot="title">电影/剧场版/OVA</span>
      </el-menu-item>
      <el-menu-item index="5" @click="goToCategory('scheduleAnime')">
        <i class="el-icon-date icon"></i>
        <span slot="title">追剧周表</span>
      </el-menu-item>
      <el-menu-item index="6" @click="goToCategory('todayAnime')">
        <i class="el-icon-refresh icon"></i>
        <span slot="title">今日更新</span>
      </el-menu-item>
    </el-menu>
    <!-- 添加的底部图片 -->
    <div class="footer-image">
      <img :src="footerImage" alt="Footer Image" class="footer-image animated"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      footerImage: '/favicon1.png',
      animationCount: 0,
    };
  },
  methods: {
    // 跳转到首页，滚动到页面顶部
    goToHome() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$router.push('/'); // 使用路由跳转到主页
      this.$emit('scroll-to-category', 'home'); // 你也可以选择触发一个事件，方便后续操作
    },
    goToCategory(category) {
      this.$emit('scroll-to-category', category);
    },
    // 动画切换函数
    toggleFooterImage() {
      if (this.animationCount % 2 === 0) {
        this.footerImage = '/favicon2.png';
      } else {
        this.footerImage = '/favicon1.png';
      }
      this.animationCount++;
    },
  },
  mounted() {
    setInterval(this.toggleFooterImage, 10000); // 每10秒切换一次图片
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background: #f7f8f9;
  margin: 0;
  padding: 0;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #e3e6ea;
  cursor: pointer; /* 添加鼠标指针样式以提示可点击 */
}

.icon {
  margin-right: 8px;
}

.logo-image {
  height: 50px;
  width: auto;
}

.footer-image {
  position: absolute;
  bottom: 20px; /* 调整图片距离底部的位置 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.footer-image img {
  width: 200px; 
  height: 200px;
}

.animated {
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: translateX(-50%) rotateZ(0deg);
  }
  to {
    transform: translateX(-50%) rotateZ(360deg * 5);
  }
}
</style>

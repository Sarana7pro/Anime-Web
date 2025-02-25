<template>
  <el-header class="app-header">
    <div class="left-placeholder"></div>

    <div class="search-box">
      <el-input v-model="searchQuery" placeholder="搜索动漫..." prefix-icon="el-icon-search" clearable />
      <el-button type="primary" @click="performSearch" class="custom-search-btn">搜索</el-button>
    </div>

    <div class="header-icons">
      <!-- 消息图标 -->
      <el-badge :value="5" class="icon-badge">
        <el-button type="text" icon="el-icon-bell" @click="showMessages" class="icon-btn" />
      </el-badge>
      <!-- 收藏图标 -->
      <el-button type="text" icon="el-icon-star-on" class="icon-btn" @click="goToFavorites" />
      <!-- 观看历史图标 -->
      <el-button type="text" icon="el-icon-time" class="icon-btn" @click="viewHistory" />

      <!-- 登录按钮（未登录时显示） -->
      <el-button v-if="!isLoggedIn" type="primary" size="large" class="login-button" @click="goToLogin">
        登录
      </el-button>

      <!-- 头像菜单（登录后显示） -->
      <el-dropdown v-else class="user-avatar-dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="40" src="https://via.placeholder.com/100" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    isLoggedIn() {
      return this.user !== null;
    },
  },
  methods: {
    ...mapActions(["logout"]),
    showMessages() {
      // 点击消息图标，跳转到消息页面
      this.$router.push("/messages");
    },
    goToFavorites() {
      // 点击收藏图标，跳转到收藏页面
      this.$router.push("/favorites");
    },
    viewHistory() {
      // 点击观看历史图标，跳转到观看历史页面
      this.$router.push("/watch-history");
    },
    goToLogin() {
      this.$router.push("/loginregister");
    },
    async handleCommand(command) {
      if (command === "logout") {
        this.logout();
        this.$message.success("退出登录成功！");
        this.$router.push("/"); // 退出后回到首页
      }
    },
    performSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
      } else {
        this.$message.warning("请输入搜索内容");
      }
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.search-box {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-box .el-input {
  width: 100%;
  max-width: 400px;
}

.custom-search-btn {
  margin-left: 10px;
  background-color: #e50914;
  border-color: #e50914;
  color: #ffffff;
}

.custom-search-btn:hover {
  background-color: #ff6347;
  border-color: #ff6347;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-badge {
  margin-right: 15px;
}

.icon-btn {
  font-size: 22px;
  color: #606266;
}

.icon-btn:hover {
  color: #ff6347;
}

.login-button {
  background-color: #e50914;
  border-color: #e50914;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
}

.login-button:hover {
  background-color: #ff6347;
  border-color: #ff6347;
}

.user-avatar-dropdown {
  cursor: pointer;
}
</style>

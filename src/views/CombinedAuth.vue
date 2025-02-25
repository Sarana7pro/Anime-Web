<template>
  <el-container class="auth-container">
    <!-- 左侧导航栏 -->
    <el-aside width="200px">
      <AppSidebar />
    </el-aside>

    <!-- 主要内容区域 -->
    <el-main>
      <AppHeader />

      <!-- 登录/注册表单 -->
      <div class="auth-content">
        <el-card class="auth-card">
          <el-tabs v-model="activeTab" class="auth-tabs">
            <el-tab-pane label="登录" name="login">
              <LoginComponent @loginSuccess="handleLoginSuccess" />
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <RegisterComponent @registerSuccess="handleRegisterSuccess" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

      <AppFooter />
    </el-main>
  </el-container>
</template>
  
  <script>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

export default {
  name: "CombinedAuth",
  components: {
    AppSidebar,
    AppHeader,
    AppFooter,
    LoginComponent,
    RegisterComponent,
  },
  data() {
    return {
      activeTab: "login", // 默认显示“登录”标签页
    };
  },
  methods: {
    handleLoginSuccess(user) {
      console.log("登录成功:", user);
      this.$message.success("登录成功！");
      this.$router.push("/");
    },
    handleRegisterSuccess(data) {
      console.log("注册成功:", data);
      this.$message.success("注册成功！请登录");
      this.activeTab = "login"; // 注册成功后切换到登录页面
    },
  },
};
</script>
  
  <style scoped>
/* 主要容器样式 */
.auth-container {
  background-color: #f0f0f0; /* 与主页相同的灰色背景 */
  min-height: 100vh;
}

.auth-content {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 400px;
  padding: 20px;
}

/* 选项卡样式 */
.auth-tabs /deep/ .el-tabs__item {
  font-size: 16px;
  color: #e50914;
}

/* 按钮颜色 */
.el-button--primary {
  background-color: #e50914 !important;
  border-color: #e50914 !important;
}
.el-button--primary:hover {
  background-color: #ff6347 !important;
  border-color: #ff6347 !important;
}
</style>
  
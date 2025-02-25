<template>
  <el-form :model="loginForm" ref="loginForm" label-width="80px">
    <!-- 用户名输入框 -->
    <el-form-item label="用户名">
      <el-input v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item label="密码">
      <el-input
        v-model="loginForm.password"
        type="password"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item label="验证码">
      <el-input
        v-model="loginForm.captchaInput"
        placeholder="请输入验证码"
        autocomplete="off"
      ></el-input>
      <div class="captcha-container">
        <span class="captcha-question">{{ captchaQuestion }}</span>
        <el-button type="text" @click="generateCaptcha">换一组</el-button>
      </div>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" class="login-button" @click="submitLogin"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
  
  <script>
import { mapActions } from "vuex";

export default {
  name: "LoginComponent",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        captchaInput: "",
      },
      captchaQuestion: "",
      expectedCaptchaAnswer: null,
    };
  },
  created() {
    this.generateCaptcha();
  },
  methods: {
    ...mapActions(["login"]),

    // 生成验证码（简单的数学运算）
    generateCaptcha() {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      this.captchaQuestion = `${a} + ${b} = ?`;
      this.expectedCaptchaAnswer = a + b;
      this.loginForm.captchaInput = "";
    },

    // 提交登录
    async submitLogin() {
      // 验证验证码是否正确
      if (
        parseInt(this.loginForm.captchaInput) !== this.expectedCaptchaAnswer
      ) {
        this.$message.error("验证码错误，请重试！");
        this.generateCaptcha();
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.loginForm.username,
            password: this.loginForm.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // 存储用户状态并跳转
          this.login(result.user);
          this.$message.success("登录成功！");
          this.$router.push("/"); // 跳转到首页
        } else {
          this.$message.error(result.error);
          this.generateCaptcha();
        }
      } catch (error) {
        console.error("登录错误:", error);
        this.generateCaptcha();
      }
    },
  },
};
</script>
  
  <style scoped>
/* 验证码容器 */
.captcha-container {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.captcha-question {
  font-weight: bold;
  margin-right: 10px;
}

/* 登录按钮颜色 */
.login-button {
  background-color: #e50914 !important;
  border-color: #e50914 !important;
  color: white !important;
}
.login-button:hover {
  background-color: #ff6347 !important;
  border-color: #ff6347 !important;
}
</style>
  
<template>
  <el-form :model="registerForm" ref="registerForm" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="registerForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="registerForm.password"
        type="password"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input
        v-model="registerForm.confirmPassword"
        type="password"
        show-password
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="验证码">
      <el-input
        v-model="registerForm.captchaInput"
        placeholder="请输入验证码"
        autocomplete="off"
      >
      </el-input>
      <div class="captcha-container">
        <span class="captcha-question">{{ captchaQuestion }}</span>
        <el-button type="text" @click="generateCaptcha">换一组</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitRegister">注册</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script>
export default {
  name: "RegisterComponent",
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
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
    generateCaptcha() {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      this.captchaQuestion = `${a} + ${b} = ?`;
      this.expectedCaptchaAnswer = a + b;
      this.registerForm.captchaInput = "";
    },
    async submitRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$message.error("两次密码输入不一致！");
        return;
      }
      if (
        parseInt(this.registerForm.captchaInput) !== this.expectedCaptchaAnswer
      ) {
        this.$message.error("验证码错误，请重试！");
        this.generateCaptcha();
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.registerForm.username,
            password: this.registerForm.password,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          this.$emit("registerSuccess", result);
          this.$message.success("注册成功！");
        } else {
          this.$message.error(result.error);
          this.generateCaptcha();
        }
      } catch (error) {
        console.error("注册错误:", error);
        this.generateCaptcha();
      }
    },
  },
};
</script>
  
  <style scoped>
.captcha-container {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.captcha-question {
  font-weight: bold;
  margin-right: 10px;
}

/* 按钮颜色统一设置 */
.el-button--primary {
  background-color: #e50914 !important;
  border-color: #e50914 !important;
}
.el-button--primary:hover {
  background-color: #ff6347 !important;
  border-color: #ff6347 !important;
}
</style>
  
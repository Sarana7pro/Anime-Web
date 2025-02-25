<template>
  <div class="footer-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>免责声明</span>
      </div>
      <div class="footer-content">
        <p>本站只提供WEB页面服务，本站不存储、不制作任何视频，不承担任何由于内容的合法性及健康性所引起的争议和法律责任。</p>
        <p>若本站收录内容侵犯了您的权益，请附说明联系邮箱，本站将第一时间处理。</p>
        <p>联系邮箱：example@example.com</p>
      </div>
    </el-card>
    <div class="footer-extra">
      <p>© 2025 www.test.cn All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer-container {
  padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
}
.box-card {
  margin-bottom: 20px;
  border: 1px solid #dcdfe6; /* 边框颜色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影 */
}
.footer-content {
  color: #333; /* 字体颜色 */
}
.footer-extra {
  font-size: 12px;
  color: #999; /* 额外信息颜色 */
}
</style>

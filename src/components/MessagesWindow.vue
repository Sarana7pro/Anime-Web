<template>
  <div class="messages-window">
    <h2>消息</h2>
    <div v-if="messages.length === 0" class="empty-state">
      <p>暂无消息</p>
    </div>
    <el-card
      v-for="(message, index) in messages"
      :key="index"
      class="message-card"
      shadow="hover"
    >
      <p>{{ message.content }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MessagesWindow",
  data() {
    return {
      messages: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      let url = "http://localhost:3000/api/user/messages";
      if (this.user && this.user.id) {
        url += `?userId=${this.user.id}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.messages = data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/messages.css";
</style>

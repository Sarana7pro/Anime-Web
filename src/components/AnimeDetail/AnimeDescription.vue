<template>
  <div class="anime-description">
    <h3>剧情简介</h3>
    <p>{{ cleanDescription }}</p>
  </div>
</template>

<script>
export default {
  props: ["description"],
  computed: {
    cleanDescription() {
      return this.description
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '')
        .replace(/&nbsp;/gi, '');
    }
  }
};
</script>

<style scoped>
.anime-description {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>

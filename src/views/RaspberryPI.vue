<template>
  <div>
    <img class="stream" :src="streamSource" />
    <p class="text-center headline">
      Running remote python explorerhat script coming soon
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    streamSource() {
      return (
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_WEBCAM_PATH +
        "?action=stream"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.stream {
  display: flex;
  margin: auto;
}
</style>

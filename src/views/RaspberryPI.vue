<template>
  <div>
    <img id="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  sockets: {
    image(data) {
      console.log("image data", data);
      const image = document.getElementById("image");
      image.src = "data:image/jpeg;base64," + data;
    },
  },
};
</script>

<style lang="scss" scoped></style>

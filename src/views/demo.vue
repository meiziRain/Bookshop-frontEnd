<template>
  <div>
    <effect-input v-model="value" type="haruki" label="姓名"></effect-input>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    go() {
      console.log(123);
      this.$axios
        .get("/user/find")
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>

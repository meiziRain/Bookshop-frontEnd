<template>
  <div class="buttons" @click="$emit('click')">
    <button class="blob-btn">
      {{content}}
      <span class="blob-btn__inner">
        <span class="blob-btn__blobs">
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
        </span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    content: ""
  }
};
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
$openSans: "Open Sans", Helvetica, Arial, sans-serif;
// body {
//   background: #333;
//   font-family: $openSans;
// }

.buttons {
  text-align: center;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}

$cyan: #0fe0f5;
$dark: rgb(136, 135, 126);
$borderW: 6px;

.blob-btn {
  $numOfBlobs: 4;
  z-index: 1;
  position: relative;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  color: $cyan;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;

  &:before {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 5px solid $cyan;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  &:after {
    content: "";
    z-index: -2;
    position: absolute;
    left: $borderW * 1.5;
    top: $borderW * 1.5;
    width: 100%;
    height: 100%;
    border: 5px dashed $dark;
    transition: all 0.3s 0.2s;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  &:hover {
    color: $dark;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;

    &:after {
      transition: all 0.3s;
      left: 0;
      top: 0;
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
    }
  }

  &__inner {
    z-index: -1;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  // additional container created, because in FF blobs are breaking overflow:hidden of element with svg gooey filter
  &__blobs {
    position: relative;
    display: block;
    height: 100%;
    filter: url("#goo");
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
}
</style>

<template>
  <div>
    <div class="button-container-1" @click="$emit('click')">
      <span class="mas">{{hide}}</span>
      <button id="work" type="button" name="Hover">{{show}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hide: "",
    show: ""
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");
@import url("https://fonts.googleapis.com/css?family=Roboto:100");

@mixin button($bcolor, $url, $x1, $y1, $bor, $col) {
  background: $bcolor;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}
.header {
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  margin-top: 12vh;
}
.footer {
  text-align: center;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 20px;
  margin-top: 15vh;
}
.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6vh;
  overflow: hidden;
  border: 1px solid;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  button {
    width: 101%;
    height: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 1px;
    @include button(
      #ff3333,
      "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png",
      2300%,
      100%,
      none,
      rgb(0, 0, 0)
    );
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(22) forwards;
    animation: ani2 0.7s steps(22) forwards;
    &:hover {
      -webkit-animation: ani 0.7s steps(22) forwards;
      animation: ani 0.7s steps(22) forwards;
    }
  }
}
.mas {
  position: absolute;
  color: rgb(0, 0, 0);
  text-align: center;
  width: 101%;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  position: absolute;
  font-size: 20px;
  margin-top: 12px;
  overflow: hidden;
}
@-webkit-keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@-webkit-keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
</style>

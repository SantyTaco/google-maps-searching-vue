<template>
  <div id="search-item" class="search-item" @click="handleItemOnClick()">
    <div class="pin-section">
      <svg
        class="pin-icon"
        viewBox="0 0 11 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.49 0A5.496 5.496 0 0 0 0 5.49c0 2.08 1.412 4.261 2.596 5.724.97 1.197 2.54 2.768 2.886 2.797l.051.003c.37 0 2.002-1.69 2.88-2.786 1.17-1.461 2.567-3.644 2.567-5.738A5.496 5.496 0 0 0 5.49 0zm0 8.546a3.147 3.147 0 1 1-.001-6.293 3.147 3.147 0 0 1 0 6.293z"
        />
      </svg>
    </div>
    <div class="item-info">
      <b id="item-title" class="item-title">{{ item?.name }}</b>
      <div id="item-location" class="item-location">
        {{ item?.location?.lat }} {{ item?.location?.lon }}
      </div>
    </div>
    <div v-show="enableButton" class="item-button">
      <button id="item-button" class="right">Visit Website</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchingItem",
  props: ["item", "enableButton"],
  methods: {
    handleItemOnClick() {
      this.$emit("item-onclick");
    },
  },
};
</script>
<style>
.search-item {
  width: 400px;
  display: flex;
  background: #ffffff;
  padding: 10px;
  border-bottom: 1px solid rgba(188, 188, 188, 0.99);
}
.pin-section {
  display: flex;
  align-items: center;
}
.pin-icon {
  fill: rgb(68, 127, 239);
  width: 30px;
  height: 30px;
  padding: 5px;
}
.item-info {
  width: 85%;
  padding-top: 8px;
  align-items: center;
}
.item-location {
  color: rgb(155, 155, 155);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  padding: 5px;
}
.item-title {
  padding: 5px;
}
.item-button {
  width: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
}
button.right {
  float: right;
  height: 40px;
  width: 130px;
  background: rgb(68, 127, 239);
  border: none;
  border-radius: 3px;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
</style>

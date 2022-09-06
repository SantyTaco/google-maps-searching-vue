<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <SearchingItem :item="item" :enableButton="true"></SearchingItem>
      <p>{{ item?.details?.description }}</p>
      <div class="images-list">
        <li v-for="(image, index) in item?.images" :key="index">
          <div>
            <img v-if="image" class="image-item" v-bind:src="image" alt="image index" />
          </div>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import SearchingItem from "@/components/SearchingItem.vue";

export default {
  name: "MapModal",
  components: {
    SearchingItem,
  },
  props: ["item"],
  methods: {
    closeModal() {
      this.$emit("closed-modal");
    },
  },
};
</script>
<style>
.modal {
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  left: 50%;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 420px; /* Could be more or less, depending on screen size */
  height: auto;
}

p {
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}

.images-list {
  width: 100%;
  height: 31%;
  display: flex;
  padding: 2px;
}
.image-item {
  width: 131px;
  height: 100%;
  padding: 4px;
}

/* The Close Button */
.close {
  color: hsl(0, 0%, 100%);
  font-size: 35px;
  font-weight: bold;
  position: absolute;
  right: 20px;
  top: 10px
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<template>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>Some text in the Modal..</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MapModal",
  
  methods: {
    closeModal() {
      this.$emit('created');
    }
  }
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

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  height: 50%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

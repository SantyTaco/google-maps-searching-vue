<template>
  <section class="map">
    <div class="searching-section">
      <div class="searching-component">
        <img class="search-icon" src="./assets/icons/icon-search.svg" />
        <input type="text" @input="handleInput" v-model="inputSearchValue" placeholder="Search..."/>
      </div>
      <div v-if="resultList.length > 0" class="searching-list-component">
        <div class="searching-message">
          <b>{{ resultMessage }}</b>
        </div>
        <div class="searching-list">
          <li v-for="item in resultList" :key="item.id">
            <SearchingItem
              @item-onclick="handleItemOnClick(item)"
              :item="item"
              :enableButton="false"
            />
          </li>
        </div>
      </div>
      <div v-if="showNotFoundMessage" class="searching-not-found-message">
        <img v-bind:src="imgURL" />
        <p>{{ resultMessage }}</p>
      </div>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 98vh" />
    <MapModal
      v-show="showModal"
      @closed-modal="handleCloseModal"
      :item="itemDataSelected"
    />
  </section>
</template>
<!-- eslint-disable no-undef -->
<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { getLocation } from "./services/MapServices";
import { Loader } from "@googlemaps/js-api-loader";
import {
  getSearchingData,
  getResultMessage,
} from "./services/SearchingServices";
import { GOOGLE_MAPS_API_KEY } from "../config/config";
import MapModal from "@/components/MapModal.vue";
import SearchingItem from "@/components/SearchingItem.vue";

export default {
  name: "App",
  components: {
    SearchingItem,
    MapModal,
  },
  setup() {
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    const inputSearchValue = ref("");
    const resultList = ref([]);
    const resultMessage = ref("");
    const map = ref(null);
    const mapMarker = ref(null);
    const showModal = ref(false);
    const itemDataSelected = ref({});
    const showNotFoundMessage = ref(false);
    const imgURL = ref(
      "https://t4.ftcdn.net/jpg/01/68/08/09/240_F_168080987_nsGI5ILn8pBb42thQxdJNb4G7dXNjn5M.jpg"
    );

    const { coords } = getLocation();
    const currentPosition = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    onMounted(async () => {
      await loader.load();
      const svgMarker = {
        path: "M5.49 0A5.496 5.496 0 0 0 0 5.49c0 2.08 1.412 4.261 2.596 5.724.97 1.197 2.54 2.768 2.886 2.797l.051.003c.37 0 2.002-1.69 2.88-2.786 1.17-1.461 2.567-3.644 2.567-5.738A5.496 5.496 0 0 0 5.49 0zm0 8.546a3.147 3.147 0 1 1-.001-6.293 3.147 3.147 0 0 1 0 6.293z",
        fillColor: "rgb(68, 127, 239)",
        fillOpacity: 2,
        strokeWeight: 0,
        rotation: 0,
        scale: 3,
        anchor: new google.maps.Point(15, 15),
      };

      map.value = new google.maps.Map(mapDiv.value, {
        center: currentPosition.value,
        zoom: 10,
        disableDefaultUI: true,
      });

      mapMarker.value = new google.maps.Marker({
        position: currentPosition.value,
        map: map.value,
        icon: svgMarker,
      });
    });

    const handleInput = () => {
      if(inputSearchValue.value) {
        const searchingDataResult = getSearchingData(inputSearchValue.value);
        resultList.value = searchingDataResult;
        resultMessage.value = getResultMessage(searchingDataResult);
        showNotFoundMessage.value = searchingDataResult.length == 0;
      } else {
        resultList.value = [];
      } 
    }

    const handleItemOnClick = (item) => {
      const itemFormated = JSON.parse(JSON.stringify(item));
      map.value.setCenter({
        lat: itemFormated.location.lat,
        lng: itemFormated.location.lon,
      });
      map.value.setZoom(14);
      mapMarker.value.setPosition({
        lat: itemFormated.location.lat,
        lng: itemFormated.location.lon,
      });
      mapMarker.value.addListener("click", () => {
        showModal.value = true;
      });
      itemDataSelected.value = itemFormated;
    };

    const handleCloseModal = () => {
      showModal.value = false;
    };

    return {
      mapDiv,
      inputSearchValue,
      resultList,
      resultMessage,
      handleItemOnClick,
      handleInput,
      showModal,
      handleCloseModal,
      itemDataSelected,
      showNotFoundMessage,
      imgURL,
    };
  },
};
</script>
<style>
.map {
  width: 100%;
  height: 98%;
  position: relative;
}
.searching-section {
  float: left;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
  padding: 5px;
  color: #ffffff;
  font-weight: bold;
}
li {
  list-style-type: none;
}
.search-icon {
  filter: invert(45%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
}
input {
  border: none;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding-left: 15px;
}
b {
  font-family: Arial, Helvetica, sans-serif;
}
.searching-component {
  width: 400px;
  height: 25px;
  background: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
}
.searching-list-component {
  width: 400px;
  height: auto;
  background: #ffffff;
  margin: 10px;
  color: black;
}

.searching-not-found-message {
  width: 420px;
  height: 300px;
  background: #ffffff;
  margin: 10px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}
.searching-message {
  width: 100%;
  height: 10px;
  color: #ffffff;
  background: rgb(68, 127, 239);
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
.searching-list {
  width: 100%;
  height: auto;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
.search-item:hover {
  background: rgb(236, 241, 249);
}
html {
  height: 100%;
}
</style>

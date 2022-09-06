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
      <div v-if="showNotFoundMessage" class="searching-not-found-component">
        <img v-bind:src="imgURL" />
        <p class="searching-not-found-message">{{ resultMessage }}</p>
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
import {NO_FOUND_IMAGE_URL, SVG_PIN_PATH} from "./utils/constants"

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
      NO_FOUND_IMAGE_URL
    );

    const { coords } = getLocation();
    const currentPosition = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    onMounted(async () => {
      await loader.load();
      const svgMarker = {
        path: SVG_PIN_PATH,
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
html {
  height: 100%;
}
li {
  list-style-type: none;
}
input {
  width: 100%;
  border: none;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding-left: 15px;
}
b {
  font-family: Arial, Helvetica, sans-serif;
}
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
.search-icon {
  filter: invert(45%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
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
.searching-not-found-component {
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
.searching-not-found-message {
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
</style>

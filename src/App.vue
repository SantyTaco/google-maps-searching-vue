<script>
import { computed, onMounted, onUpdated, ref } from "@vue/runtime-core";
import { getLocation } from "./services/MapServices";
import { Loader } from "@googlemaps/js-api-loader";
import { getSearchingData } from "./services/SearchingDataSource";
import {GOOGLE_MAPS_API_KEY} from "../config/config";

export default {
  name: "App",
  setup() {
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    let inputSearchValue = ref("");
    let resultList = ref([]);
    //let resultMessage = ref("");

    const { coords } = getLocation();
    const currentPosition = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    onMounted(async () => {
      await loader.load();
      // eslint-disable-next-line no-undef
      new google.maps.Map(mapDiv.value, {
        center: currentPosition.value,
        zoom: 10,
        disableDefaultUI: true,
      });
    });

    onUpdated(() => {
      resultList.value = getSearchingData(inputSearchValue.value);
    });

    console.log(resultList);

    return { currentPosition, mapDiv, inputSearchValue, resultList };
  },
};
</script>
<template>
  <section class="map">
    <div class="searching-section">
      <div class="searching-component">
        <img class="search-icon" src="./assets/icons/icon-search.svg" />
        <input type="text" v-model="inputSearchValue" placeholder="Search..." />
      </div>
      <div class="searching-list-component">
        <div class="searching-message">
          <b>{{ resultList.length }}</b>
        </div>
        <div class="searching-list">
          <li v-for="item in resultList" :key="item.id">
            <div class="search-item">
              <svg class = "pin-icon" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg"><path d="M5.49 0A5.496 5.496 0 0 0 0 5.49c0 2.08 1.412 4.261 2.596 5.724.97 1.197 2.54 2.768 2.886 2.797l.051.003c.37 0 2.002-1.69 2.88-2.786 1.17-1.461 2.567-3.644 2.567-5.738A5.496 5.496 0 0 0 5.49 0zm0 8.546a3.147 3.147 0 1 1-.001-6.293 3.147 3.147 0 0 1 0 6.293z"/></svg>
              <div>
                <b class="item-title">{{item.name}}</b>
                <div class="item-location">{{item.location.lat}}  {{item.location.lon}}</div>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 98vh" />
  </section>
</template>
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
  z-index: 1000;
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
  width: 300px;
  height: 25px;
  background: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
}
.searching-list-component {
  width: 300px;
  height: auto;
  background: #ffffff;
  margin: 10px;
  color: black;
}
.searching-message {
  width: 100%;
  height: 10px;
  color: #ffffff;
  background: cornflowerblue;
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
.search-item {
  width: 300px;
  display: flex;
  background: #ffffff;
  padding: 10px;
  border-bottom: 1px solid rgba(163, 160, 160, 0.99);
}
.pin-icon {
  fill: cornflowerblue;
  width: 40px;
  height:35px;
}
.item-location {
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  padding: 5px;
}
.item-title {
padding: 5px;
}
html {
  height: 100%;
}
</style>

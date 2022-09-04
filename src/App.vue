<script>
import { computed, onMounted, onUpdated, ref } from "@vue/runtime-core";
import { getLocation } from "./services/MapServices";
import { Loader } from "@googlemaps/js-api-loader";
import { getSearchingData } from "./services/SearchingDataSource";

const GOOGLE_MAPS_API_KEY = "AIzaSyBx-iusyiYtmpVwimq3Mr7RIesI74guuiE";

export default {
  name: "App",
  setup() {
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    let inputSearchValue = ref("");
    let resultList = ref([]);

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
        <img class="search-icon" src="./assets/icons/icon-search.svg"/>
        <input type="text" v-model="inputSearchValue" placeholder="Search..."/>
      </div>
      <div>
        <div>
          <b>{{ resultList.length }}</b>
          <li v-for="item in resultList" :key="item.id">
            <div>{{item.name}}</div>
          </li>
        </div>
      </div>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 100vh" />
  </section>
</template>
<style>
.map {
  border: 1px solid #dddddd;
  width: 100%;
  height: 100%;
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
  filter: invert(45%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
}
input{
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding-left: 15px;
}
.searching-component {
  width: 300px;
  height: 25px;
  background: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
}
</style>

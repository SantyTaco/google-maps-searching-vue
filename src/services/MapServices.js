import { onUnmounted, onMounted, ref } from "vue";

export function getLocation() {
    const coords = ref({latitude: 0, longitude: 0});
    const isEnabled = 'navigator' in window && 'geolocation' in navigator;

    let watcher = null;

    onMounted(() => {
        if(isEnabled) {
            watcher = navigator.geolocation.watchPosition(position => (coords.value = position.coords));
        }
    });

    onUnmounted(() => {
        if(watcher) navigator.geolocation.clearWatch(watcher);
    });

    return { coords, isEnabled};
}
<script>
import axios from "axios";

export default {
    data() {
        return {
            listMaps: [],
        };
    },

    methods: {
        getAllMaps() {
            return axios.get("https://valorant-api.com/v1/maps", {
                params: { language: "fr-FR" },
            });
        },
    },

    mounted() {
        this.getAllMaps().then((res) => {
            this.listMaps = res.data.data;
            console.log("listmaps", this.listMaps);
        });
    },
};
</script>

<template>
    <div class="map-list">
        <div v-for="map in listMaps" class="map-item">
            {{map.displayName}}
        </div>
    </div>
</template>

<style scoped>
.map-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
}

.map-item {
    background-color: #f2f2f21e;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    border-radius: 5px;
}
</style>

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
    <div class="map-grid">
        <a v-for="map in listMaps" :href="'maps/' + map.displayName" 
            class="valorant-card" 
            :style="'background-image: url('+map.splash+')'">
            <span class="valorant-card__name">{{map.displayName}}</span>
            <span class="valorant-card__vertical">Map // {{map.displayName}}</span>
        </a>
    </div>
</template>

<style scoped>
.map-grid {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
}

.valorant-card {
    padding-top: 56.25%;
}
.valorant-card {
    outline: 1px solid #7399BF;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    height: 16rem;
    background-size: cover;
}

.valorant-card:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    border: 2rem solid #0F141A;
    box-sizing: border-box;
    background: rgba(255,255,255,0);
    transition: border-width ease-in .15s, background-1 ease-in .15s;
}

.valorant-card:hover:before {
    border-width: 2.25rem;
    background: rgba(255,255,255,.075);
}

.valorant-card__name {
    text-transform: uppercase;
    font-size: 2.5rem;
    font-family: Rajdhani,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen-Sans,Ubuntu,Cantarell,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
    font-weight: 500;
    line-height: 1;
    text-shadow: 1px 1px 5px black;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
}

.valorant-card__vertical {
    transform: rotate(90deg);
    transform-origin: left top;
    position: absolute;
    top: 2rem;
    left: calc(100% - 0.5rem);
    white-space: nowrap;
    color: #495159;
    text-transform: uppercase;
    font-size: .875rem;
    font-family: Rajdhani,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen-Sans,Ubuntu,Cantarell,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
    font-weight: 700;
}

a[href] {
    cursor: pointer;
    color: inherit;
    text-underline-position: under;
}

</style>

<script>
import axios from "axios";

export default {
    props: ["uuid"],
    data() {
        return {
            map: {},
        };
    },
    methods: {
        getInfoMap(uuid) {
            return axios.get("https://valorant-api.com/v1/maps/" + uuid.toString(), {
                params: { language: "fr-FR" },
            });
        },

        getDisplayMap(){
            return "https://trackercdn.com/cdn/tracker.gg/valorant/db/maps/6.11/" + this.map?.displayName?.toLowerCase() + ".png"
        }
    },

    mounted() {
        this.getInfoMap(this.uuid).then((res) => {
            this.map = res.data.data;
            console.log("this map", this.map);
        });
    },
};
</script>

<template>
    <div class="map-presentation">
        <div class="map-left">
            <div class="map-info">
                <h1 class="map-info__name">{{map.displayName}} - Valorant Map</h1>                
            </div>
            <div class="map-legend">
                <span class="map-legend__title">Map Legende</span>
                <div class="map-legend__items">
                    <div class="map-legend__item map-legend__item--defenders-zone">Zone achat des défenseurs</div>
                    <div class="map-legend__item map-legend__item--attackers-zone">Zone achat des attaquants</div>
                    <div class="map-legend__item map-legend__item--spike">Zone spike</div>
                    <div class="map-legend__item map-legend__item--defenders-barrier">Barrière d'apparition des défenseurs</div>
                    <div class="map-legend__item map-legend__item--attackers-barrier">Barrière d'apparition des attaquants</div>
                </div>
            </div>
        </div>
        <div class="map-right">
            <div class="valorant-map">
                <div class="valorant-map__markers"></div>
                <img :src="this.getDisplayMap()"/>
            </div>
        </div>
        
    </div>
</template>

<style scoped>

.map-presentation {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
}

.map-info {
    margin: 2.5rem 0 1.5rem;
}

.map-info__name {
    font-family: Rajdhani,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen-Sans,Ubuntu,Cantarell,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.25rem 0 0;
}

.map-info__callout {
    color: var(--color-text-secondary);
    font-size: .875rem;
    font-weight: 500;
}

.map-legend__item {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    grid-gap: 1rem;
    align-items: center;
    font-size: .875rem;
    margin: 0 0 0.5rem 1rem;
    height: 1.5rem;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.map-legend__item--defenders-zone:before {
    background: #649A8C;
}

.map-legend__item--attackers-zone:before {
    background: #9E7274;
}

.map-legend__item--spike:before {
    background: #BC8D7C;
}

.map-legend__item--defenders-barrier:before {
    background: #16E5B4;
    height: 4px;
}

.map-legend__item--attackers-barrier:before {
    background: #FF4655;
    height: 4px;
}

.map-legend__item:before {
    content: "";
    width: 1.5rem;
    height: 1.5rem;
    box-sizing: border-box;
}


.map-legend__title {
    font-family: Rajdhani,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen-Sans,Ubuntu,Cantarell,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
    display: block;
}

.map-legend__items {
    border-left: 1px solid rgba(255,255,255,.25);
    position: relative;
}

.valorant-map {
    position: relative;
}

.valorant-map__markers {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.valorant-map img {
    width: 100%;
}

.valorant-map>* {
    pointer-events: none;
}

</style>
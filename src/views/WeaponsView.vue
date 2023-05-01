<script>
import axios from "axios";

export default {
    data() {
        return {
            listWeapons: [],
        };
    },

    methods: {
        getAllWeapons() {
            return axios.get("https://valorant-api.com/v1/weapons", {
                params: { language: "fr-FR"},
            });
        },
    },

    mounted() {
        this.getAllWeapons().then((res) => {
            this.listWeapons = res.data.data;
            console.log('mo', this.listWeapons);
        });
    },
};

</script>

<template>
    <div class="weapon-grid">
        <div v-for="weapon in listWeapons" class="weapon-card">
            <RouterLink :to="{ name: 'weaponDetails', params: { uuid: weapon.uuid }}">
                <div class="weapon-name">
                    {{ weapon.displayName }}
                </div>
                <div class="weapon-image">
                    <img :src="weapon.displayIcon" alt="image de l'arme" />
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

.weapon-grid {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 25px;
    max-width: 1160px;
}

.weapon-card {
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    background-color: rgba(15, 25, 35, 0.6);
    cursor: pointer;
    text-decoration: none;
    border: 1px solid red;
    width: 150px;
    height: 150px;
}

.weapon-card a {
    text-decoration: none;
}

.weapon-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.weapon-card h3 {
    margin: 10px 0;
}

.weapon-card p {
    margin: 0 10px 10px;
}

</style>

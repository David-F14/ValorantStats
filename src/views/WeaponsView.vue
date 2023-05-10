<script>
import axios from "axios";

export default {
    data() {
        return {
            listWeapons: [],
            listCategories: [],
        };
    },

    methods: {
        getAllWeapons() {
            return axios.get("https://valorant-api.com/v1/weapons", {
                params: { language: "fr-FR" },
            });
        },
    },

    mounted() {
        this.getAllWeapons().then((res) => {
            this.listWeapons = res.data.data;
        });
    },

    computed: {
        categories() {
            return [...new Set(this.listWeapons.map((w) => w.category))].reverse();
        },
    },
};
</script>

<template>
    <div class="weapon-grid">
        <div class="category" v-for="category in categories">
            <h3>{{ category.replace("EEquippableCategory::", "") }}</h3>
            <div v-for="weapon in listWeapons.filter(w => w.category == category)" class="weapon-card" 
                v-bind:class="{pistol : weapon.category == 'EEquippableCategory::Sidearm'}">
                <RouterLink :to="{ name: 'weaponDetails', params: { uuid: weapon.uuid } }">
                    <div class="weapon-name">
                        {{ weapon.displayName }}
                    </div>
                    <div class="weapon-image">
                        <img :src="weapon.displayIcon" alt="image de l'arme" />
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.weapon-grid {
    display: flex;
    justify-content: center;
}

.weapon-card {
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    background-color: rgba(15, 25, 35, 0.6);
    cursor: pointer;
    text-decoration: none;
    /* border: 1px solid red; */
    margin: 10px 0px;
}

.category {
    text-align: center;
    padding: 15px;
}

.category h3 {
    margin-bottom: 15px;
    text-align: center;
    color: black;
    border-bottom: 1px solid red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(135deg, rgb(255, 51, 66) 0%, rgb(255, 70, 86) 0.01%, rgb(255, 124, 101) 100%);

}

.weapon-card a {
    text-decoration: none;
}

.weapon-card img {
    width: 90%;
    height: auto;
    object-fit: cover;
}

.pistol img {
    width: 60%;
}

.weapon-card h3 {
    margin: 10px 0;
}

.weapon-card p {
    margin: 0 10px 10px;
}
</style>

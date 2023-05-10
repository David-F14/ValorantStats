<script>
import axios from "axios";

export default {
    props: ["uuid"],
    data() {
        return {
            weapon: {},
            showTooltip: [],
            currentAbility: {},
        };
    },
    methods: {
        getInfoWeapon(uuid) {
            return axios.get("https://valorant-api.com/v1/weapons/" + uuid.toString(), {
                params: { language: "fr-FR" },
            });
        },
    },

    mounted() {
        this.getInfoWeapon(this.uuid).then((res) => {
            this.weapon = res.data.data;
            console.log("weapon", this.weapon);
        });
    },
};
</script>

<template>
    <div class="weapon-details-header">
        <div class="weapon-details-header-image">
            <img :src="weapon.displayIcon" :alt="weapon.displayName" />
        </div>
        <div class="weapon-details-header-info">
            <h1>{{ weapon.displayName }}</h1>
            <h4>{{ weapon?.shopData?.categoryText }}</h4>
            <h2>{{ weapon?.shopData?.category }} - {{ weapon.shopData?.cost }} Creds</h2>
        </div>        
    </div>
</template>

<style scoped>
.weapon-details-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #2a2a2a;
    color: #fff;
    padding: 20px;
}

.weapon-details-header-image img {
    height: 100px;    
    margin: 30px;
}

.weapon-details-header-info h1 {
    font-size: 36px;
    margin-bottom: 10px;
}

.weapon-details-header-info h2 {
    font-size: 18px;
    font-weight: normal;
}
</style>

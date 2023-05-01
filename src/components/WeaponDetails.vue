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

        playSound(voiceLine) {
            let soundUrl = voiceLine?.mediaList[0].wave;
            const audio = new Audio(soundUrl);
            audio.play();
        },

        showAbilityDescription(index) {
            this.currentAbility = this.weapon.abilities[index];
        },
    },

    mounted() {
        this.getInfoWeapon(this.uuid).then((res) => {
            this.weapon = res.data.data;
            this.weapon.abilities.forEach((e) => (e.showTooltip = false));
            this.currentAbility = this.weapon.abilities[0];
            this.playSound(this.weapon.voiceLine);
        });
    },
};
</script>

<template>
    <div class="weapon-presentation">
        <img class="weapon-image" :src="weapon.bustPortrait" :alt="weapon.name" />
        <div class="name-description">
            <h3 class="weapon-name">{{ weapon.displayName }}</h3>
            <div class="weapon-role" v-if="weapon.role">
                <img :src="weapon.role.displayIcon" />
                <h3>{{ weapon.role.displayName }}</h3>
            </div>
            <p class="weapon-description">{{ weapon.description }}</p>
        </div>

        <div class="weapon-abilities">
            <div class="abilities-title">Compétences</div>
            <div class="abilities">
                <div class="ability-container" v-for="(ability, index) in weapon.abilities">
                    <div class="ability-description" @click="showAbilityDescription(index)">
                        <img :src="ability.displayIcon" alt="icône de compétence" />
                    </div>
                </div>
            </div>
            <div class="ability-tooltip" v-if="this.currentAbility">
                <h2 class="ability-name">{{ this.currentAbility.displayName }}</h2>
                {{ this.currentAbility.description }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.name-description {
    width: 350px;
    border: 1px solid red;
    border-radius: 10px;
}

.abilities {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.weapon-abilities {
    width: 30%;
    border: 1px solid red;
    border-radius: 10px;
}

.weapon-presentation {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    height: 60%;
}

.weapon-name {
    font-size: 2rem;
    text-align: center;
    color: black;
    border-bottom: 1px solid red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(135deg, rgb(255, 51, 66) 0%, rgb(255, 48, 64) 0.01%, rgb(255, 125, 102) 100%);
}

.weapon-image {
    position: relative;
    height: 60vh;
}

.weapon-role {
    padding: 15px 5px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid red;
    justify-content: center;
}

.weapon-role img {
    padding-right: 20px;
    height: 30px;
    width: 50px;
}

.weapon-description {
    font-size: 1rem;
    padding: 4%;
    text-align: justify;
}

.abilities-title {
    font-size: 2rem;
    text-align: center;
    color: black;
    border-bottom: 1px solid red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(135deg, rgb(255, 51, 66) 0%, rgb(255, 48, 64) 0.01%, rgb(255, 125, 102) 100%);
}

.ability-container {
    width: 50%;
    border-bottom: 1px solid red;
    padding: 7px 5px;
    display: flex;
    justify-content: center;
}

.ability-name {
    font-size: 1rem;
    text-align: center;
    text-decoration: underline;
    padding-bottom: 1%;
}

.ability-description {
    font-size: 1.2rem;
    cursor: pointer;
    text-align: center;
}

.ability-description img {
    height: 40px;
}

.ability-tooltip {
    font-size: 0.8rem;
    padding: 3%;
    text-align: justify;
}
</style>

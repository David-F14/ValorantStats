<script>
import axios from "axios";

export default {
    props: ["uuid"],
    data() {
        return {
            agent: {},
            showTooltip: [],
            currentAbility: {},
        };
    },
    methods: {
        getInfoAgent(uuid) {
            return axios.get("https://valorant-api.com/v1/agents/" + uuid.toString(), {
                params: { language: "fr-FR" },
            });
        },

        showAbilityDescription(index) {
            this.currentAbility = this.agent.abilities[index];
        },
    },

    mounted() {
        this.getInfoAgent(this.uuid).then((res) => {
            this.agent = res.data.data;
            this.agent.abilities.forEach((e) => (e.showTooltip = false));
            this.currentAbility = this.agent.abilities[0];
            console.log("mounted AgentDetails", this.agent);
        });
    },
};
</script>

<template>
    <div class="agent-presentation">
        <img class="agent-image" :src="agent.bustPortrait" :alt="agent.name" />
        <div class="name-description">
            <h3 class="agent-name">{{ agent.displayName }}</h3>
            <div class="agent-role" v-if="agent.role">
                <img :src="agent.role.displayIcon" />
                <h3>{{ agent.role.displayName }}</h3>
            </div>
            <p class="agent-description">{{ agent.description }}</p>
        </div>

        <div class="agent-abilities">
            <div class="abilities-title">Compétences</div>
            <div class="abilities">
                <div class="ability-container" v-for="(ability, index) in agent.abilities">
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

.agent-abilities {
    width: 30%;
    border: 1px solid red;
    border-radius: 10px;    
}

.agent-presentation {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    height: 60%;
}

.agent-name {
    font-size: 2rem;
    text-align: center;
    color: black;
    border-bottom: 1px solid red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(135deg, rgb(255, 51, 66) 0%, rgb(255, 48, 64) 0.01%, rgb(255, 125, 102) 100%);
}

.agent-image {
    position: relative;
    height: 60vh;
}

.agent-role {
    padding: 15px 5px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid red;
    justify-content: center;
}

.agent-role img {
    padding-right: 20px;
    height: 30px;
    width: 50px;
}

.agent-description {
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

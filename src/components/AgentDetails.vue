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
            return axios.get(
                "https://valorant-api.com/v1/agents/" + uuid.toString(),
                { params: { language: "fr-FR" } }
            );
        },

        showAbilityDescription(index) {
            this.currentAbility = this.agent.abilities[index];
        },
    },

    mounted() {
        this.getInfoAgent(this.uuid).then((res) => {
            this.agent = res.data.data;
            this.agent.abilities.forEach((e) => (e.showTooltip = false));
            console.log("mounted AgentDetails", this.agent);
        });
    },
};
</script>

<template>
    <div class="agent-details">
        <div class="agent-presentation">
            <img
                class="agent-image"
                :src="agent.bustPortrait"
                :alt="agent.name"
            />
            <div class="name-description">
                <h3 class="agent-name">{{ agent.displayName }}</h3>
                <div class="agent-role" v-if="agent.role">
                    <img :src="agent.role.displayIcon" />
                    <h3>{{ agent.role.displayName }}</h3>
                </div>
                <p class="agent-description">{{ agent.description }}</p>
            </div>
        </div>

        <h2 class="abilities-title">Compétences</h2>
        <div class="agent-abilities">
            <div
                class="ability-container"
                v-for="(ability, index) in agent.abilities"
            >
                <h3 class="ability-name">{{ ability.displayName }}</h3>
                <div
                    class="ability-description"
                    @click="showAbilityDescription(index)"
                >
                    <img :src="ability.displayIcon" alt="icône de compétence" />
                </div>
            </div>
        </div>
        <div class="ability-tooltip" v-if="this.currentAbility">
            {{ this.currentAbility.description }}
        </div>
    </div>
</template>

<style scoped>
.name-description {
    width: 350px;
    border: 1px solid red;
    border-radius: 10px;
}

.agent-presentation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.agent-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
}

.agent-name {
    font-size: 2rem;
    text-align: center;
    color: black;
    border-bottom: 1px solid red;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: linear-gradient(
        135deg,
        rgb(255, 51, 66) 0%,
        rgb(255, 48, 64) 0.01%,
        rgb(255, 125, 102) 100%
    );
}

.agent-image {
    position: relative;
    height: 50vh;
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
    margin-top: 2rem;
}

.agent-abilities {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.ability-container {
    margin-top: 1rem;
    width: 50%;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
}

.ability-name {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    text-align: center;
}

.ability-description {
    font-size: 1.2rem;
    cursor: pointer;
    text-align: center;
}

.ability-tooltip {
    font-size: 1rem;
    margin-top: 0.5rem;
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>

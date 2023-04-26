<script>
import axios from "axios";

export default {
    props: ["uuid"],
    data() {
        return {
            agent: {},
            showTooltip: [],
        };
    },
    methods: {
        getInfoAgent(uuid) {
            return axios.get(
                "https://valorant-api.com/v1/agents/" + uuid.toString()
            );
        },
        showAbilityDescription(index) {
            // Toggle the visibility of the tooltip for the clicked ability
            this.showTooltip[index] = !this.showTooltip[index];
        },
    },

    mounted() {
        console.log("mounted AgentDetails", this.uuid);
        this.getInfoAgent(this.uuid).then(
            (res) => (this.agent = res.data.data)
        );
    },
};
</script>

<template>
    <div class="agent-details">
        <h1 class="agent-name">{{ agent.displayName }}</h1>
        <div class="agent-image-container">
            <img
                class="agent-image"
                :src="agent.bustPortrait"
                :alt="agent.name"
            />
        </div>
        <div class="agent-description">{{ agent.description }}</div>
        <div class="agent-abilities">
            <h2 class="abilities-title">Abilities:</h2>
            <div
                class="ability-container"
                v-for="(ability, index) in agent.abilities"
                :key="index"
            >
                <h3 class="ability-name">{{ ability.name }}</h3>
                <div
                    class="ability-description"
                    @click="showAbilityDescription(index)"
                >
                    {{ ability.description }}
                    <div class="ability-tooltip" v-if="showTooltip[index]">
                        {{ ability.tooltip }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.agent-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
}

.agent-name {
    font-size: 3rem;
    margin-top: 2rem;
    text-align: center;
}

.agent-image-container {
    width: 80%;
    margin-top: 2rem;
}

.agent-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
}

.agent-description {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-right: 2rem;
    text-align: justify;
}

.abilities-title {
    font-size: 2rem;
    margin-top: 2rem;
}

.ability-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1rem;
    width: 80%;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
}

.ability-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.ability-description {
    font-size: 1.2rem;
    cursor: pointer;
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

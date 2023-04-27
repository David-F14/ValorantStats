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
                "https://valorant-api.com/v1/agents/" + uuid.toString(),
                { params: { language: "fr-FR" } }
            );
        },
        showAbilityDescription(index) {
            // Toggle the visibility of the tooltip for the clicked ability
            this.showTooltip[index] = !this.showTooltip[index];
        },
    },

    mounted() {
        
        this.getInfoAgent(this.uuid).then(res => {
            this.agent = res.data.data
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
                
                <!-- <h3 class="agent-role">{{ agent.role.displayName }}</h3> -->
                <!-- <img :src="agent.role.displayIcon"> -->
                <p class="agent-description">{{ agent.description }}</p>
            </div>
        </div>

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
    padding: 2rem;
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
    height: 50vh;
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

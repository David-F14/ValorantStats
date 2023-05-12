<script>
import axios from "axios";

export default {
    data() {
        return {
            listAgents: [],
        };
    },

    methods: {
        getAllAgents() {
            return axios.get("https://valorant-api.com/v1/agents", {
                params: { language: "fr-FR", isPlayableCharacter: true },
            });
        },
    },

    mounted() {
        this.getAllAgents().then((res) => {
            this.listAgents = res.data.data;
        });
    },
};
</script>

<template>
    <div class="agent-grid">
        <div v-for="agent in listAgents" class="agent-card">
            <RouterLink :to="{ name: 'agentDetails', params: { uuid: agent.uuid }}">
                <div class="agent-name">
                    {{ agent.displayName }}
                </div>
                <div class="agent-image">
                    <img :src="agent.displayIconSmall" alt="image de l'agent" />
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.agent-grid {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 25px;
    max-width: 1400px;
}

.agent-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    background-color: rgba(15, 25, 35, 0.6);
    cursor: pointer;
    text-decoration: none;
    border: 1px solid red;
}

.agent-card a {
    text-decoration: none;
}

.agent-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.agent-card h3 {
    margin: 10px 0;
}

.agent-card p {
    margin: 0 10px 10px;
}

</style>

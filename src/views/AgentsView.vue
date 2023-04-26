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
            console.log("listItems", this.listAgents);
        });
    },
};
</script>

<template>
    <div class="agent-container">
        <ul class="list">
            <li v-for="agent in listAgents" class="list-item">
                <RouterLink :to="{ name: 'agentDetails', params: { uuid: agent.uuid } }">
                    <div class="image">
                        <img
                            :src="agent.displayIconSmall"
                            alt="image de l'agent"
                        />
                    </div>
                    <div class="name">
                        {{ agent.displayName }}
                    </div>
                    <div class="description">
                        {{ agent.description }}
                    </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.agent-container {
    max-width: 960px;
    margin: 0 auto;
}

.list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.list-item a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.7rem;
    background-color: rgba(15, 25, 35, 0.6);
    cursor: pointer;
    text-decoration: none;
}

.image img {
    width: 135px;
    height: 135px;
    padding: 5px;
}

.name {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    padding: 0 5%;
    text-align: left;
}

.description {
    font-size: 12px;
    text-align: center;
}
</style>

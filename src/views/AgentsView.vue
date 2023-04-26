<script>
import axios from 'axios';

export default {
    data(){
        return {
            listItems: []
        }
    },

    methods: {
        getAllAgents(){
            return axios.get("https://valorant-api.com/v1/agents", {
                params: { language: "fr-FR", isPlayableCharacter: true }
            });
        }
    },

    mounted(){
        this.getAllAgents()
            .then(res => {
                this.listItems = res.data.data
                console.log("listItems", listItems)
            });
    }
}

</script>

<template>
    <div class="agent-container">

        <li v-for="item in this.listItems">
            {{ item.displayName }}
        </li>
    </div>
</template>

<style scoped></style>

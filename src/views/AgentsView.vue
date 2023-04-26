<!-- <script>
import axios from 'axios';

export default {
    methods: {
        getAllAgents(){
            return axios.get('https://valorant-api.com/v1/agents', {params: {language:"fr-FR"}});
        }
    },

    mounted(){
        this.getAllAgents()
            .then(res => {
                console.log('res', res)
            });
    }
}

</script> -->

<script setup>
import axios from "axios";

function getAllAgents() {
    return axios.get("https://valorant-api.com/v1/agents", {
        params: { language: "fr-FR" },
    });
}

// onMounted(() => {
//     getAllAgents().then(res => console.log('res2', res));
// });

let listItems = [];
getAllAgents().then((res) => {
    listItems = res.data.data;
    console.log("listItems", listItems);
});

</script>

<template>
    <div class="agent-container"></div>
</template>

<style scoped></style>

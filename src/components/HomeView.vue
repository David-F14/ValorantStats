<script>
export default {
    data() {
        return {
            activeTab: "agents", // Onglet actif par défaut
        };
    },
    methods: {
        navigateTo(tab) {
            // Méthode pour changer l'onglet actif
            this.activeTab = tab;
        },
    },
};
</script>

<template>
    <div class="container">
        <nav class="navbar">
            <ul class="navbar-menu">
                <li class="navbar-item" @click="navigateTo('agents')">Agents</li>
                <li class="navbar-item" @click="navigateTo('armes')">Armes</li>
                <li class="navbar-item" @click="navigateTo('cartes')">Cartes</li>
                <li class="navbar-item" @click="navigateTo('mode-de-jeu')">Mode de jeu</li>
            </ul>
        </nav>        
        <div class="content">
            <div v-if="activeTab === 'agents'">
                <h1>Agents</h1> 
            </div>
            <div v-if="activeTab === 'armes'">
                <h1>Armes</h1>
            </div>
            <div v-if="activeTab === 'cartes'">
                <h1>Cartes</h1>
            </div>
            <div v-if="activeTab === 'mode-de-jeu'">
                <h1>Mode de jeu</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navbar {
    background-color: #000;
    color: #fff;
    font-size: large;
    width: 100%;
    padding: 1rem 3rem;
    background-color: transparent;
}

.navbar-menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style-type: none;
    padding: 0;
}

.navbar-item {
    cursor: pointer;
    margin-right: 1rem;
}

.content {
    padding: 1rem;
}
</style>

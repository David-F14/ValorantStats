<script setup></script>

<template>
    <nav class="navbar" style="position: sticky">
        <ul class="navbar-menu">
            <li class="navbar-item"><RouterLink to="/">Home</RouterLink></li>
            <li class="navbar-item"><RouterLink to = "/agents">Agents</RouterLink></li>
            <li class="navbar-item"><RouterLink to = "/weapons">Weapons</RouterLink></li>
            <li class="navbar-item"><RouterLink to = "/maps">Maps</RouterLink></li>
            <li class="navbar-item"><RouterLink to = "/game-modes">Game modes</RouterLink></li>
            <li class="navbar-item"><RouterLink to = "/about">About</RouterLink></li>
        </ul>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #0f1923;
    color: #fff;
    font-size: large;
    width: 100%;
    padding: 1rem 3rem;
    margin-bottom: 3rem;
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

.navbar-item a {
    text-decoration: none;
}

</style>

<style>
    body {
        background-image: url("./assets/background.jpg");
        background-size: cover;
    }

    html, body {
        height: 100%;
    }

    p {
        margin-right: 8px;
    }
</style>
<template>
    <div id="container">
        <div v-if="user.type">
            <Sidenav></Sidenav>
        </div>
        <router-view></router-view>
    </div>
</template>
<script src="./App.js"></script>
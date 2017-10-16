<style>
    h1 {
        color: green;
        text-align: center;
    }

    #position {
        position: absolute;
        top: 35%;
    }

    #back {
        background-color: white;
    }
</style>
<template>
    <md-layout mdVerticalAlign="center" mdAlign="center" mdFlex="100"
               mdFlexLarge="100" id="position">
        <h1>Admin</h1>
        <p>{{home_text}}</p>
    </md-layout>
</template>
<script src="./Home.js"></script>
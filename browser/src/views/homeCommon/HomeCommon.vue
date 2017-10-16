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
    <div>
        <md-layout mdVerticalAlign="center" mdAlign="center" mdFlex="100"
                   mdFlexLarge="100" id="position">
            <h1>Common</h1>
            <p>{{home_text}}</p>
        </md-layout>
    </div>

</template>
<script src="./HomeCommon.js"></script>
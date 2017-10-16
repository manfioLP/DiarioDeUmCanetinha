<template>
    <div>
        <md-card mdWithHover="" id="space">
            <md-layout mdGutter="">
                <md-layout mdColumn="" mdGutter="">
                    <md-layout mdFlex="100">
                        <!--<div class="box"></div>-->
                        <img src="../../assets/turista.jpg" class="box">
                        <h2 id="title">Seja-bem vindo Admin</h2>
                    </md-layout>
                </md-layout>
            </md-layout>
        </md-card>
        <div>
            <md-layout mdGutter="" style="margin:10px 0px 0px 0px">
                <md-layout mdColumn="" mdGutter="">
                    <md-layout mdFlex="100" mdAlign="center">
                        <md-card>
                            <md-card-media><img src="../../assets/img1.jpg" class="image"></md-card-media>
                            <md-button><md-icon>account_box</md-icon>Regras</md-button>
                        </md-card>
                        <md-card style="margin-left: 10px">
                            <md-card-media><img src="../../assets/img2.jpg" class="image"></md-card-media>
                            <md-button><md-icon>pregnant_woman</md-icon>Enigmas</md-button>
                        </md-card>
                        <md-card style="margin-left: 10px">
                            <md-card-media><img src="../../assets/img3.jpg" class="image"></md-card-media>
                            <md-button><md-icon>lightbulb_outline</md-icon>Ovaldo Boss-All</md-button>
                        </md-card>
                    </md-layout>
                </md-layout>
            </md-layout>

        </div>

    </div>
</template>

<script src="./AdminScreen.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #title {
        padding-top: 40px;
        position: relative;
        left: 10px;
    }
    .image{
        width: 300px;
        height: 200px;
    }

    #space {
        width: 70%;
        position: relative;
        left: 15%;
        padding-left: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 25px;
    }

    .box {
        color: red;
        width: 150px;
        height: 150px;
        border: 1px solid black;
        border-radius: 100%;
    }


</style>

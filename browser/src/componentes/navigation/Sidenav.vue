<template>
    <div>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
        </md-toolbar>
        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-small">
                <div class="md-toolbar-container">
                    <h3 class="md-title">Menu</h3>
                </div>
            </md-toolbar>
            <div>
                <div v-if="user.type === 'admin'">
                    <br/>
                    <md-button @click="go('/home')">
                        <md-icon>account_circle</md-icon>
                        <span>Home</span>
                    </md-button>
                    <br/>
                    <md-button @click="go('/AdminScreen')">
                        <md-icon>account_balance</md-icon>
                        <span>Admin</span>
                    </md-button>
                </div>
                <md-button @click="go('/homeCommon')">
                    <md-icon>account_circle</md-icon>
                    <span>Home Common</span>
                </md-button>
            </div>
        </md-sidenav>
    </div>
</template>
<script src="./Sidenav.js"></script>
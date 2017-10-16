<style>
</style>
<template>
    <md-dialog md-open-from="#custom"
               md-close-to="#custom"
               :md-click-outside-to-close=false
               ref="basicAlert">
        <md-dialog-title>{{modal.title}}</md-dialog-title>
        <md-dialog-content>{{modal.description}}</md-dialog-content>
        <md-dialog-actions>
            <span v-for="button in modal.buttons">
                <md-button class="md-primary" @click="callMethod(button.method)">{{button.label}}</md-button>
            </span>
        </md-dialog-actions>
    </md-dialog>
</template>
<script src='./BasicAlert.js'></script>
<style>
    #position {
        position: absolute;
        top: 20%;
        padding: 5px 5px 5px 5px;
    }
    #messagepassword{
        border: 0px;
        position: relative;
        bottom: 20px;
    }
    #messageemail{
        border: 0px;
        position: relative;
        bottom: 20px;
    }
    .is-danger {
        color: #B1E200;
        font-size: 12px;
    }

</style>
<template>
    <div>
        <md-layout mdTag="form" novalidate
                   mdAlign="center" mdVerticalAlign="center">
            <md-layout mdTag="md-card" mdColumn mdFlexXlarge="35"
                       mdFlexLarge="30" mdFlexMedium="40" mdFlexSmall="80"
                       mdFlexXsmall="85" class="md-primary" id="position">
                <md-card-header>
                    <div class="md-title">Login</div>
                </md-card-header>
                <!--TODO:Terminar a validação dos inputs + função que evita o submit até estar válido-->
                <md-card-content>
                    <md-input-container>
                        <md-icon>person</md-icon>
                        <label for="email">Email</label>
                        <md-input v-validate="'email'" data-vv-delay="1000" :class="{'input':true, 'is-danger' : errors.has('email')}"
                                  v-model="user.email"
                                  name="email"
                                  type="text">
                        </md-input>
                    </md-input-container>
                    <span v-show="errors.has('email') " class="is-danger" id="messageemail">{{ errors.first('email') }}</span>

                    <md-input-container mdHasPassword="">
                        <md-icon>lock</md-icon>
                        <label>Senha</label>
                        <md-input v-validate="'min:6|max:12'" data-vv-delay="1000" :class="{'input':true, 'is-danger' : errors.has('password')}"
                                  v-model="user.password"
                                  name="password"
                                  type="password">
                        </md-input>
                    </md-input-container>
                    <span v-show="errors.has('password') " class="is-danger" id="messagepassword">{{ errors.first('password') }}</span>
                </md-card-content>

                <md-card-actions>
                    <md-button @click="logar">Login</md-button>
                </md-card-actions>
            </md-layout>
        </md-layout>
        <BasicAlert></BasicAlert>
    </div>
</template>
<script src="./Login.js"></script>
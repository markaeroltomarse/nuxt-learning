<template>
    <div class="rightbar pl-2">
        <!-- <div class="bg-info text-white p-2 rounded">
            <strong>Lorem20</strong>
            <p>KADA GAGAWA KA NG PAGE LAGE MO TETESTING I REFRESH </p>
        </div> -->
        <div class="roundedbg-white shadow-sm">
            <div class="p-3 border-bottom bg-white">
                <strong>Inbox <v-icon>fa-message</v-icon></strong> <span class="badge badge-info" style="float:right;">2</span>
            </div>
            <v-list avatar="true" dense >
                <v-list-item v-ripple='{class:"text-info"}'>
                    <v-list-item-avatar>
                        <v-img :src="require('../../assets/undraw/toga.png')"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            John doe
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            2hrs ago
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-icon color="indigo">
                            fa-check
                        </v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-list-item v-ripple='{class:"text-info"}'>
                    <v-list-item-avatar>
                        <v-img :src="require('../../assets/undraw/toga.png')"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            Robert
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            2hrs ago
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-icon color="dark">
                            fa-check
                        </v-icon>
                    </v-list-item-action>
                </v-list-item>

                
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
    name:'rightbar'
}
</script>

<style >
.rightbar{
    position:fixed;
    right:4%;
    top:10%;
    width:15%;
}
</style>
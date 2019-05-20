<template>
    <div>
        Waiting...
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as Oidc from 'oidc-client'

@Component
export default class Callback extends Vue {
    mounted() {
        var mgr = new Oidc.UserManager({
            userStore: new Oidc.WebStorageStateStore({}),
        })

        mgr.signinRedirectCallback()
            .then(function(user) {
                window.location.href = '../'
            })
            .catch(function(err) {
                // eslint-disable-next-line
        console.error(err)
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<template>
    <projectListComponent />
    <alerts />
</template>

<script>
// @ is an alias to /src
import projectListComponent from '@/components/projectListComponent.vue'
import alerts from '@/components/Alerts.vue'


export default {
  name: 'Projects',
  components: {
    projectListComponent,
    alerts
  }
}
</script>

<style>

</style>

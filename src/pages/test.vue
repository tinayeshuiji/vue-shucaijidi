<template>
  
</template>
<script>
export default {
     name: "Mine",
  components: {
    
  },
  data() {
    return {
   host:''
    };
  },
  created() {
    this.host = this.Global.URL;
   
  },
  computed: {},
  methods: {
     closewin: function() {
      this.$router.go(-1);
    },
   
    
   
  }
}
</script>
<style scoped>

</style>

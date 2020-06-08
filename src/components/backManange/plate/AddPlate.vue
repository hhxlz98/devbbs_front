<template>
  <div class="main_container">
    <EditorPlateForm
    size="medium"
    :plateInfo="plateInfo"
    :plateNameEditable="false"
    :userId="0">
    </EditorPlateForm>
  </div>
</template>

<script>
  import EditorPlateForm from './EditorPlateForm.vue'

  export default {
    data() {
      return {
        plateInfo: {
          plateName: '',
          plateIntro: '',
          imgUrl: '/plateImg/default.jpg',
          plateId: 0,
        },
      }
    },
    components: {
      EditorPlateForm
    },
  }
</script>

<style scoped>
  .main_container {
    padding: 40px 40px 40px 40px;
  }
</style>

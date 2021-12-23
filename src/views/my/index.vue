<template>
  <comm-content title="我的">我的</comm-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CommContent from '@/components/Content/index.vue';

export default defineComponent({
  name: 'ViewsMy',
  components: { CommContent },
  setup() {
    return {
      //
    };
  },
});
</script>

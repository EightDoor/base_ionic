<template>
  <comm-content :title="title">
    <template #fixed>
      <ion-segment @ionChange="segmentChanged($event)">
        <ion-segment-button
          v-for="(item, index) in data"
          :key="index"
          :value="item.title"
        >
          {{ item.title }}
        </ion-segment-button>
      </ion-segment>
    </template>
    <template #default>
      <swiper class="top_tabs" :modules="modules">
        <swiper-slide v-for="(item, index) in data" :key="index">
          <component :is="item.component" />
        </swiper-slide>
      </swiper>
    </template>
  </comm-content>
</template>
<script lang="ts">
import { defineComponent, markRaw, PropType, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.min.css';
import '@ionic/vue/css/ionic-swiper.css';
import { IonIcon, IonSegmentButton, IonSegment } from '@ionic/vue';
import { Keyboard, Pagination, Scrollbar } from 'swiper';
import CommContent from '@/components/Content/index.vue';
import log from '@/utils/log';

export interface TopTabsList {
  title: string;
  component: any;
}
export default defineComponent({
  name: 'TopTabs',
  components: {
    CommContent,
    Swiper,
    SwiperSlide,
    IonIcon,
    IonSegment,
    IonSegmentButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    list: Array as PropType<TopTabsList[]>,
  },
  setup(props) {
    const data = ref<TopTabsList[]>([]);

    function segmentChanged(e: CustomEvent) {
      log.d(e);
    }

    watch(
      () => props.list,
      (newVal) => {
        if (newVal) {
          data.value = markRaw(newVal);
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );
    return {
      data,
      segmentChanged,
      modules: [Keyboard, Pagination, Scrollbar],
    };
  },
});
</script>
<style scoped lang="scss">
.top_tabs {
  height: 100%;
  border: 1px solid red;
}
</style>

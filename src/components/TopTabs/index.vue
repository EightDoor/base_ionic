<template>
  <comm-content :title="title" :tabsHeight="tabsHeight">
    <template #tabs>
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
      <div class="swiper_container">
        <swiper
          class="top_tabs"
          :modules="modules"
          :pagination="true"
          :scrollbar="true"
        >
          <swiper-slide v-for="(item, index) in data" :key="index">
            <component :is="item.component" />
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </comm-content>
</template>
<script lang="ts">
import { defineComponent, markRaw, PropType, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import '@ionic/vue/css/ionic-swiper.css';
import { IonIcon, IonSegmentButton, IonSegment, IonicSlides } from '@ionic/vue';
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
    // tabs高度
    const tabsHeight = 35;

    const data = ref<TopTabsList[]>([]);

    function segmentChanged(e: any) {
      const { value } = e.target;
      const index = data.value.findIndex((item) => item.title === value);
      log.d(index, 'index');
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
      modules: [Keyboard, Pagination, Scrollbar, IonicSlides],
      tabsHeight,
    };
  },
});
</script>
<style scoped lang="scss">
.top_tabs {
  height: 100%;
  width: 100%;
  //border: 1px solid red;
}
.swiper_container {
  width: 100vw;
  height: 100%;
}
</style>

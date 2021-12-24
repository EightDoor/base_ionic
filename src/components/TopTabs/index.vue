<template>
  <comm-content :title="title" is-tabs>
    <template #tabs>
      <ion-segment :value="selectSegment" @ionChange="segmentChanged($event)">
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
          :modules="modules"
          virtual
          class="top_tabs_swiper"
          @slideChange="slideChange"
          @swiper="swiperInit"
        >
          <swiper-slide
            :virtualIndex="index"
            v-for="(item, index) in data"
            :key="index"
          >
            <content-container
              :style="{
                height: `calc(100vh - ${Config.height.tabsHeight}px - ${Config.height.headerHeight}px)`,
                width: '100%',
              }"
              :isLoad="index === selectIndex"
              refresh
              @loadMore="loadMore($event, item.key)"
              :currentTabSelect="currentTabSelect"
            >
              <component :is="item.component" />
            </content-container>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </comm-content>
</template>
<script lang="ts">
import { defineComponent, markRaw, nextTick, PropType, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonIcon, IonSegmentButton, IonSegment } from '@ionic/vue';

import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@ionic/vue/css/ionic-swiper.css';

import { Virtual } from 'swiper';
import CommContent, {
  PullUpRefresherParam,
} from '@/components/Content/index.vue';
import log from '@/utils/log';
import Config from '@/config/index';

import ContentContainer from '@/components/Content/content_container.vue';

export interface TopTabsList {
  title: string;
  component: any;
  key: string;
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
    ContentContainer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    list: Array as PropType<TopTabsList[]>,
    selectIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['loadMore'],
  setup(props, { emit }) {
    const slidesRef = ref<any>();
    const selectSegment = ref('');
    const contentContainerRef = ref<any[]>([]);

    const data = ref<TopTabsList[]>([]);
    const currentTabSelect = ref(0);

    function segmentChanged(e: any) {
      const { value } = e.target;
      const index = data.value.findIndex((item) => item.title === value);
      log.d(index, 'index');
      slidesRef.value.slideTo(index);
      currentTabSelect.value = index;
    }

    watch(
      () => props.list,
      (newVal) => {
        if (newVal) {
          data.value = markRaw(newVal);
          selectSegment.value = data.value[props.selectIndex].title;
          nextTick(() => {
            log.d(contentContainerRef.value);
          });
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );

    const swiperInit = (swiper: any) => {
      slidesRef.value = swiper;
    };

    function slideChange(swiper: any) {
      const index = swiper.activeIndex;
      selectSegment.value = data.value[index].title;
    }

    function loadMore(
      data: { params: PullUpRefresherParam; done: Function },
      key: string,
    ) {
      emit('loadMore', data, key);
    }
    return {
      data,
      segmentChanged,
      slidesRef,

      swiperInit,
      selectSegment,
      slideChange,
      modules: [Virtual],
      Config,

      loadMore,
      currentTabSelect,
    };
  },
});
</script>
<style scoped lang="scss">
.swiper {
  --bullet-background: rgb(var(--ion-color-primary-rgb), 0.5);
  --bullet-background-active: var(--ion-color-primary);
  --scroll-bar-background: var(--ion-color-light);
}
.top_tabs_swiper {
  width: 100%;
  //border: 1px solid red;
}
.swiper_container {
  width: 100vw;
}
</style>

<template>
  <com-content title="首页">
    <ion-list>
      <ion-item
        @click="change(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <ion-label>{{ item.title }}</ion-label>
      </ion-item>
    </ion-list>
  </com-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonList, IonItem, IonLabel } from '@ionic/vue';
import ComContent from '@/components/Content/index.vue';

interface ListType {
  title: string;
  path: string;
}
export default defineComponent({
  name: 'ViewsHome',
  components: {
    ComContent,
    IonList,
    IonItem,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const list = ref<ListType[]>([
      {
        title: '上拉加载、下拉刷新',
        path: '/pll_up_refresh',
      },
    ]);

    function change(val: ListType) {
      router.push({
        path: val.path,
      });
    }
    return {
      list,
      change,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

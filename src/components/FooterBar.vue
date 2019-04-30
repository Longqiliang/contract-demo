<template>
  <nav id="z-nav">
    <van-tabbar v-model="active">
      <template v-for="(item, i) in routes">
        <template v-if="!item.hidden">
          <template v-if="item.children">
            <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
              <template v-if="onlyOneChild.meta">
                <van-tabbar-item :key="i"
                                 :to="{path: onlyOneChild.path}">
                  <span>{{onlyOneChild.meta.title}}</span>
                  <i slot="icon"
                     slot-scope="props"
                     :class="props.active ? `${iconName(onlyOneChild.meta.icon || item.meta.icon)} is-active` : `${iconName(onlyOneChild.meta.icon || item.meta.icon)}`"></i>
                </van-tabbar-item>
              </template>
            </template>
            <template v-else>
              <template v-if="item.meta">
                <van-tabbar-item :key="i"
                                 :to="{path: item.path}">
                  <span>{{item.meta.title}}</span>
                  <i slot="icon"
                     slot-scope="props"
                     :class="props.active ? `${iconName(item.meta.icon)} is-active` : `${iconName(item.meta.icon)}`"></i>
                </van-tabbar-item>
              </template>
            </template>
          </template>
          <template v-else>
            <template v-if="item.meta">
              <van-tabbar-item :key="i"
                               :to="{path: item.path}">
                <span>{{item.meta.title}}</span>
                <i slot="icon"
                   slot-scope="props"
                   :class="props.active ? `${iconName(item.meta.icon)} is-active` : `${iconName(item.meta.icon)}`"></i>
              </van-tabbar-item>
            </template>
          </template>
        </template>
      </template>
    </van-tabbar>
  </nav>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {},
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  data() {
    return {
      active: -1
    };
  },
  created() {
    const parentRoute = this.$route.matched[0];
    const parentPath = parentRoute.path;
    const showRoutes = this.routes.filter(item => {
      return !item.hidden;
    });
    showRoutes.forEach((item, i) => {
      if (item.path === parentPath) {
        this.active = i;
      }
    });
  },
  methods: {
    iconName(icon) {
      return `z-icon z-icon-${icon}`;
    },
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    }
  }
};
</script>
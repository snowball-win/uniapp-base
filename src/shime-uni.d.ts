import { StateType } from '@/store/index.d'
import { InjectionKey } from 'vue'
import { Store } from 'vuex'

declare module "vue" {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks {
    // 这里扩展this.$store，还可以在这里对this添加其他的声明
    $store: Store<StateType>
  }
}

// 扩展useStore声明
declare module 'vuex' {
  export function useStore<S = StateType>(injectKey?: InjectionKey<Store<S>> | string): Store<S>
}

export {}
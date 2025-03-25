import { ref, resolveComponent, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { S as SubCard } from './SubCard.vue.mjs';
import { _ as _export_sfc } from './server.mjs';
import './time.svg.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';
import 'seemly';
import 'vooks';
import '@css-render/vue3-ssr';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import 'treemate';
import 'vdirs';
import 'date-fns/locale';
import '@juggle/resize-observer';
import 'date-fns';
import 'date-fns-tz';
import 'async-validator';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const gradientLength = ref("10%");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Vue3Marquee = resolveComponent("Vue3Marquee");
      _push(`<!--[--><div class="banner" data-v-2bece1ef><h1 class="banner-title" data-v-2bece1ef>SUBRADAR - ВСЕ ВАШИ ПОДПИСКИ В ОДНОМ МЕСТЕ</h1><h6 class="banner-desc" data-v-2bece1ef> Сервис для удобного управления подписками. Добавляйте, отслеживайте расходы и отключайте ненужные подписки в пару кликов, находите лучшие предложения и экономьте деньги. </h6></div><div class="top" data-v-2bece1ef><h2 class="top-title" data-v-2bece1ef>Топовые предложения</h2>`);
      _push(ssrRenderComponent(_component_Vue3Marquee, {
        gradient: true,
        "pause-on-hover": true,
        "gradient-length": gradientLength.value,
        duration: "5",
        clone: true,
        class: "top-marquee"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="top-marquee-card-wrapper" data-v-2bece1ef${_scopeId}>`);
            _push2(ssrRenderComponent(SubCard, { class: "top-marquee-card" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "top-marquee-card-wrapper" }, [
                createVNode(SubCard, { class: "top-marquee-card" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Vue3Marquee, {
        gradient: true,
        "pause-on-hover": true,
        "gradient-length": gradientLength.value,
        duration: "5",
        clone: true,
        class: "top-marquee",
        direction: "reverse"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="top-marquee-card-wrapper" data-v-2bece1ef${_scopeId}>`);
            _push2(ssrRenderComponent(SubCard, { class: "top-marquee-card" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "top-marquee-card-wrapper" }, [
                createVNode(SubCard, { class: "top-marquee-card" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2bece1ef"]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map

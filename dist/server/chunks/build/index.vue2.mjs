import { mergeProps, useSSRContext, defineComponent, ref, provide, createElementBlock, computed, unref, withCtx, createTextVNode, toDisplayString, createSlots, renderSlot, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import FilterIcon from './filter.svg.mjs';
import CircleArrowsIcon from './circle-arrows.svg.mjs';
import AngleRightIcon from './angle-right.svg.mjs';
import { S as SubCard } from './SubCard.vue.mjs';
import { _ as _export_sfc, I as IconX, N as NInput, B as Button } from './server.mjs';
import LoopIcon from './loop.svg.mjs';
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

const _sfc_main$5 = {
  __name: "FilterButton",
  __ssrInlineRender: true,
  props: {
    theme: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        disabled: __props.disabled,
        type: __props.nativeType,
        class: ["base-filter-button", { "base-button-white": __props.theme === "white" }]
      }, _attrs))} data-v-70be9672>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("base/ui/FilterButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const RoundedButton = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-70be9672"]]);

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const _sfc_main$4 = {
  __name: "FilterDropdown",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      required: false
    },
    type: {
      type: String,
      default: ""
    },
    showDropdown: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update-options"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    computed(() => {
      return props.showDropdown !== null ? { show: props.showDropdown } : { trigger: props.trigger };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("base/components/FilterDropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = {
  __name: "Tag",
  __ssrInlineRender: true,
  props: {
    closeIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update-tag"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tag" }, _attrs))} data-v-45c88721>`);
      if (__props.closeIcon) {
        _push(ssrRenderComponent(unref(IconX), {
          class: "tag-icon",
          onClick: ($event) => emit("update-tag")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("base/ui/Tag.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Tag = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-45c88721"]]);

const _sfc_main$2 = {
  __name: "FilterTags",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: "update-tags",
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags" }, _attrs))} data-v-30753c06><!--[-->`);
      ssrRenderList(__props.options, (tag) => {
        _push(ssrRenderComponent(Tag, {
          key: tag.key,
          closeIcon: "",
          onUpdateTag: ($event) => emit("update-tags", tag.key)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("base/components/FilterTags.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FilterTags = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-30753c06"]]);

const _sfc_main$1 = {
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "medium"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const value = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NInput), mergeProps({
        class: "base-input",
        value: value.value,
        "onUpdate:value": ($event) => value.value = $event,
        round: __props.round,
        size: __props.size,
        clearable: __props.clearable,
        disabled: __props.disabled,
        type: __props.type,
        placeholder: __props.placeholder
      }, _attrs), createSlots({ _: 2 }, [
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "prefix", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
              ];
            }
          }),
          key: "0"
        } : void 0,
        _ctx.$slots.suffix ? {
          name: "suffix",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "suffix", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("base/ui/Input.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-11d14309"]]);

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const options = ref([
      {
        label: "Bay Sands",
        key: "2",
        checked: false
      },
      {
        label: "Brown645",
        key: "1",
        checked: false
      },
      {
        label: "A645",
        key: "3",
        checked: false
      },
      {
        label: "657",
        key: "4",
        checked: false
      }
    ]);
    const handleCheckboxClick = (key) => {
      const option = options.value.find((opt) => opt.key === key);
      if (option) {
        option.checked = !option.checked;
      }
    };
    const hasActiveOption = computed(() => {
      return options.value.some((option) => option.checked);
    });
    const iconClass = computed(() => {
      return hasActiveOption.value ? "subs-header-filter-icon active" : "subs-header-filter-icon";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "subs" }, _attrs))} data-v-b54e6527><div class="subs-header" data-v-b54e6527><div class="subs-header-filter" data-v-b54e6527><h1 class="subs-header-title" data-v-b54e6527>Все подписки</h1>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "show-dropdown": isOpen.value,
        options: options.value,
        onUpdateOptions: handleCheckboxClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(RoundedButton, {
              onClick: ($event) => isOpen.value = !isOpen.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FilterIcon), { class: iconClass.value }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FilterIcon), { class: iconClass.value }, null, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(RoundedButton, {
                onClick: ($event) => isOpen.value = !isOpen.value
              }, {
                default: withCtx(() => [
                  createVNode(unref(FilterIcon), { class: iconClass.value }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Input, {
        round: "",
        size: "large",
        class: "subs-header-search",
        placeholder: "Поиск"
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LoopIcon), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(LoopIcon))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(FilterTags, {
        class: "subs-header-tags",
        options: options.value.filter((tag) => tag.checked),
        onUpdateTags: handleCheckboxClick
      }, null, _parent));
      _push(`<div class="subs-content" data-v-b54e6527><!--[-->`);
      ssrRenderList(18, (n) => {
        _push(`<div class="flip-card" data-v-b54e6527><div class="flip-card-inner" data-v-b54e6527>`);
        _push(ssrRenderComponent(SubCard, { class: "flip-card-front" }, null, _parent));
        _push(`<div class="flip-card-back" data-v-b54e6527>`);
        _push(ssrRenderComponent(Button, {
          theme: "white",
          size: "large",
          class: "flip-card-back-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-b54e6527${_scopeId}>Оформить подписку</span>`);
              _push2(ssrRenderComponent(unref(AngleRightIcon), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", null, "Оформить подписку"),
                createVNode(unref(AngleRightIcon))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="subs-load" data-v-b54e6527>`);
      _push(ssrRenderComponent(unref(CircleArrowsIcon), { class: "subs-load-icon" }, null, _parent));
      _push(`<span class="subs-load-text" data-v-b54e6527>Загрузить еще</span></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/subs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b54e6527"]]);

export { index as default };
//# sourceMappingURL=index.vue2.mjs.map

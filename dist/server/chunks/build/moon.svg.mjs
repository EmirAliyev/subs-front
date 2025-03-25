import { createElementBlock, openBlock, createElementVNode } from 'vue';

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "23",
  height: "23",
  fill: "none"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-miterlimit": "10",
      "stroke-width": "1.5",
      d: "M15.707 13.945c-3.391-.507-6.148-3.262-6.654-6.653a7.934 7.934 0 0 1 1.013-5.252c.3-.507-.113-1.149-.689-1.024a10.61 10.61 0 0 0-8.29 11.738c.591 4.726 4.433 8.568 9.16 9.16a10.609 10.609 0 0 0 11.738-8.291c.123-.577-.518-.99-1.025-.689a7.94 7.94 0 0 1-5.253 1.011Z"
    }, null, -1)
  ]));
}
const moon = { render };

export { moon as default, render };
//# sourceMappingURL=moon.svg.mjs.map

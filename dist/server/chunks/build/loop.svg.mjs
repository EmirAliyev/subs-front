import { createElementBlock, openBlock, createElementVNode } from 'vue';

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  fill: "none"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
    createElementVNode("path", {
      fill: "#334155",
      "fill-rule": "evenodd",
      d: "M1.5 8.241C1.5 4.514 4.501 1.5 8.193 1.5c3.692 0 6.693 3.014 6.693 6.741 0 3.728-3.001 6.742-6.693 6.742C4.5 14.983 1.5 11.969 1.5 8.24ZM8.193 0C3.663 0 0 3.694 0 8.241s3.663 8.242 8.193 8.242a8.13 8.13 0 0 0 5.305-1.962l4.433 4.462a.75.75 0 0 0 1.064-1.057l-4.45-4.48a8.24 8.24 0 0 0 1.84-5.205C16.386 3.694 12.723 0 8.194 0Z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const LoopIcon = { render };

export { LoopIcon as default, render };
//# sourceMappingURL=loop.svg.mjs.map

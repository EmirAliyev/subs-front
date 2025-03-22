<script setup></script>

<template>
  <div class="toggle-switch">
    <label>
      <input type="checkbox" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.toggle-switch {
  position: relative;
  width: 85px;
}

label {
  position: absolute;
  width: 100%;
  height: 44px;
  background-color: $light-grey;
  border-radius: 50px;
  cursor: pointer;
}

input {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  transition: 0.3s;
}

input:checked ~ .slider {
  background-color: white;
}

input:checked ~ .slider::before {
  transform: translateX(95px);
  background-color: var(--dark);
  box-shadow: none;
}
</style>

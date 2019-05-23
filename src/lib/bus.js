import Vue from 'vue'

export default {
  install (vm) {
    vm.prototype.$bus = new Vue()
  }
}

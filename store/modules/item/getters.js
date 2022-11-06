export default {
  items(state) {
    return state.items
  },
  useItem(state) {
    return state.useItem
  },
  canUseItem(state) {
    return state.useItem ? false : true
  },
}

export default {
  SET_ITEMS(state, items) {
    state.items = items
  },

  USE_ITEM(state, index) {
    state.useItem = state.items[index]
    state.items.splice(index, 1)
  },

  RESET_ITEM_USED(state) {
    state.useItem = null
  },
}

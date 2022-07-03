const filtered = {
  data() {
    return {
      searchLine: "",
    };
  },
  template: `<form action="#" method="get">
  <input
                  class="input"
                  type="text"
                  placeholder="Search for Item..."
                  v-model="searchLine"
                />
                <button class="search" @click="$parent.$refs.products.filterGoods(searchLine)" type="submit">
                  <i class="fas fa-search"></i>
                </button></form>`,
};
//
export default filtered;

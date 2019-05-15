import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
import { HeaderSearchText } from "@/components/mixins/header-search-text.ts";
import SearchResults from "@/components/shared/header/search-results/search-results.vue";
import { clickOutside } from "@/directives/v-click-outside";
@Component({
    components: {
        SearchResults,
    },
    directives: {
        clickOutside,
    },
})
class SearchByNumber extends Mixins(HeaderSearchText) {
    @Prop(String) readonly type!: string;
}
export default SearchByNumber;

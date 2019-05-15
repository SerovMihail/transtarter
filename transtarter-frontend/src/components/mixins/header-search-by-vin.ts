import { Component, Vue, Watch } from "vue-property-decorator";
import { ISearchByVinResult } from "@/models/index";

// You can declare a mixin as the same style as components.
@Component
export class HeaderSearchByVin extends Vue {
    searchText: string | number = "";

    foundItems: ISearchByVinResult[] = [];

    /**
     * Mock Data
     */
    potentialFoundItems: ISearchByVinResult[] = [
        {
            id: 1,
            manufacturer: "Lexus",
            model: "LX450D",
            engine: "5700CC 32-VALVE DOHC EFI",
            dateOfManufacture: "11.2007—09.2015",
            transmission: "ATM",
            alreadyInCart: 1,
        },
        {
            id: 2,
            manufacturer: "Lexus",
            model: "LX450D",
            engine: "5700CC 32-VALVE DOHC EFI",
            dateOfManufacture: "11.2007—09.2015",
            transmission: "ATM",
            alreadyInCart: 0,
        },
        {
            id: 3,
            manufacturer: "BMW",
            model: "X2",
            engine: "5700CC 32-VALVE DOHC EFI",
            dateOfManufacture: "11.2007—09.2015",
            transmission: "ATM",
            alreadyInCart: 0,
        },
    ];

    closeSearchResult() {
        this.foundItems = [];
    }

    clearSearchInput() {
        this.searchText = "";
        this.foundItems = [];
    }

    @Watch("searchText")
    onChildChanged(val: string, oldVal: string) {
        if (val.length >= 3) {
            this.foundItems = this.potentialFoundItems;
        } else if (val.length <= 3 && oldVal.length >= 3) {
            this.foundItems = [];
        }
        this.$emit("searchText", this.searchText);
    }
}

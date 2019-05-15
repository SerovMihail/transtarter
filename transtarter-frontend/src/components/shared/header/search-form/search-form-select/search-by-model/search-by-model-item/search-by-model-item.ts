import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { clickOutside } from "@/directives/v-click-outside/index";
interface ISearchByModelItem {
    isOpened: boolean;
    changeActiveOption(option: string): void;
}
interface ICars {
    [CarManufacturer: string]: CarManufacturer;
}
interface CarManufacturer {
    [key: string]: Years;
}
interface Years {
    [key: string]: Year;
}
interface Year {
    [key: string]: Liters;
}
interface Liters {
    [key: string]: Liter;
}
interface Liter {
    [key: string]: Fuel;
}
interface Fuel {
    [key: string]: {};
}
@Component({
    directives: {
        clickOutside,
    },
})
class SearchByModelItem extends Vue implements ISearchByModelItem {
    @Prop(String) readonly type!: string;
    @Prop(Object) readonly cars!: ICars;
    @Prop(Object) readonly models!: CarManufacturer;
    @Prop(Object) readonly years!: Years;
    @Prop(Object) readonly liters!: Liters;
    @Prop(Object) readonly fuels!: Fuel;
    isOpened = false;
    activeOption = "";

    @Watch("models")
    onModelChanges() {
        this.activeOption = Object.keys(this.models)[0];
    }
    @Watch("years")
    onYearChanges() {
        this.activeOption = Object.keys(this.years)[0];
    }
    @Watch("liters")
    onLitersChange() {
        this.activeOption = Object.keys(this.liters)[0];
    }
    @Watch("fuels")
    onFuelChange() {
        this.activeOption = Object.keys(this.fuels)[0];
    }
    get singleOption() {
        return this.optionsWithoutSelected.length === 0;
    }
    get options(): any {
        if (this.type === "brand") {
            return Object.keys(this.cars);
        }
        if (this.type === "model") {
            return Object.keys(this.models);
        }
        if (this.type === "year") {
            return Object.keys(this.years);
        }
        if (this.type === "liters") {
            return Object.keys(this.liters);
        }
        if (this.type === "fuel") {
            return Object.keys(this.fuels);
        }
    }
    created() {
        if (this.type === "brand") {
            this.activeOption = Object.keys(this.cars)[0];
        }
        if (this.type === "model") {
            this.activeOption = Object.keys(this.models)[0];
        }
        if (this.type === "year") {
            this.activeOption = Object.keys(this.years)[0];
        }
        if (this.type === "liters") {
            this.activeOption = Object.keys(this.liters)[0];
        }
        if (this.type === "fuel") {
            this.activeOption = Object.keys(this.fuels)[0];
        }
    }
    get optionsWithoutSelected(): any {
        if (this.type === "brand") {
            return Object.keys(this.cars).filter(option => option !== this.activeOption);
        }
        if (this.type === "model") {
            return Object.keys(this.models).filter(option => option !== this.activeOption);
        }
        if (this.type === "year") {
            return Object.keys(this.years).filter(option => option !== this.activeOption);
        }
        if (this.type === "liters") {
            return Object.keys(this.liters).filter(option => option !== this.activeOption);
        }
        if (this.type === "fuel") {
            return Object.keys(this.fuels).filter(option => option !== this.activeOption);
        }
    }
    toggleDropDown() {
        if (this.options.length > 1) {
            this.isOpened = !this.isOpened;
        }
    }
    closeDropDown() {
        this.isOpened = false;
    }

    private getFirstKey(obj: object, lvl: number = 0): any {
        let result;
        if (lvl >= 2) {
            for (let i = 1; i < lvl; i++) {
                if (i === 1) {
                    result = (<any>obj)[Object.keys(<any>obj)[0]];
                } else {
                    result = <any>result[Object.keys(<any>result)[0]];
                }
            }
            return Object.keys(result)[0];
        } else {
            return Object.keys(obj)[0];
        }
    }

    @Emit("ActiveOptionChanged")
    changeActiveOption(option: string) {
        this.activeOption = option;
        if (this.type === "brand") {
            return {
                brand: option,
                model: Object.keys(this.cars[option])[0],
                year: Object.keys(
                    (<any>this.cars)[option][Object.keys(this.cars[option])[0]].years
                )[0],
                liters: this.getFirstKey(this.cars, 6),
                fuel: this.getFirstKey(this.cars, 8),
            };
        }
        if (this.type === "model") {
            return {
                model: option,
                year: Object.keys(this.models[this.activeOption].years)[0],
                liters: this.getFirstKey(this.models[this.activeOption], 4),
                fuel: this.getFirstKey(this.models[this.activeOption], 6),
            };
        }
        if (this.type === "year") {
            return {
                year: option,
                liters: this.getFirstKey(this.years[this.activeOption], 2),
                fuel: this.getFirstKey(this.years[this.activeOption], 4),
            };
        }
        if (this.type === "liters") {
            return { liters: option, fuel: this.getFirstKey(this.liters[this.activeOption], 2) };
        }
        if (this.type === "fuel") {
            return { fuel: option };
        }
        return "";
    }
}
export default SearchByModelItem;

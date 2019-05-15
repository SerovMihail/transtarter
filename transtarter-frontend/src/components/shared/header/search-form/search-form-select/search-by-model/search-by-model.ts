import { Vue, Component, Prop } from "vue-property-decorator";
import SearchByModelItem from "@/components/shared/header/search-form/search-form-select/search-by-model/search-by-model-item/search-by-model-item";
// interface ICar { //     [manufacturerName: string]: string: { //         [modelName: string]: string: {
// interface //     }
// }
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
    components: {
        SearchByModelItem,
    },
})
class SearchByModel extends Vue {
    cars: ICars = {
        Lexus: {
            "CT 1200h": {
                years: {
                    "2008": {
                        liters: {
                            "2.0": {
                                fuel: { бензин: {}, дизель: {} },
                            },
                            "1.5": {
                                fuel: { бензин: {} },
                            },
                        },
                    },
                    "2009": {
                        liters: {
                            "2.0": {
                                fuel: { дизель: {} },
                            },
                        },
                    },
                },
            },
            Es240: {
                years: {
                    "2008": {
                        liters: {
                            "2.0": {
                                fuel: { бензин: {} },
                            },
                        },
                    },
                    "2009": {
                        liters: {
                            "2.0": {
                                fuel: { дизель: {} },
                            },
                        },
                    },
                },
            },
        },
        BMW: {
            X2: {
                years: {
                    "2052": {
                        liters: {
                            "2.0": {
                                fuel: { бензин: {} },
                            },
                        },
                    },
                    "2050": {
                        liters: {
                            "2.0": {
                                fuel: { дизель: {} },
                            },
                        },
                    },
                },
            },
            Es240: {
                years: {
                    "2004": {
                        liters: {
                            "2.0": {
                                fuel: { бензин: {} },
                            },
                        },
                    },
                    "2009": {
                        liters: {
                            "2.0": {
                                fuel: { дизель: {} },
                            },
                        },
                    },
                },
            },
        },
    };
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
    selectedOptions = {
        brand: this.getFirstKey(this.cars),
        model: this.getFirstKey(this.cars, 2),
        year: this.getFirstKey(this.cars, 4),
        liters: this.getFirstKey(this.cars, 6),
        fuel: this.getFirstKey(this.cars, 8),
    };
}
export default SearchByModel;

/* eslint-disable */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { orderBy } from 'lodash'
import {Placemark} from './Placemark';
import {ICitiesCoords, IMapPoint} from "@/models/map"
import {GLOBAL_FILIALS_DATA, GLOBAL_FRANCHISE_DATA, citiesCoords } from "@/assets/data/mapData"
import appSelect from '@/components/core-ui/app-select/app-select'
import * as staticFiles from './static-files';

@Component({
    components: {
        appSelect,
    },
})
class yandexMap extends Vue {
    @Prop( String ) readonly placemarksType!:  "filials" | "franchise" | "all";
    private myMap: any = {}
    mapLoaded = false
    geolocationControlLayout = staticFiles.geolocationControlLayout ;
    zoomControlLayout  = staticFiles.zoomControlLayout;
    geoObjects: object[] = []
    placemarksData: IMapPoint[] = [];
    iframeStyles = staticFiles.iframeStyles

    showInfoBlock = false
    get shownCities(): string[] {
        let result = [
            ...new Set(
                this.placemarksData.map(city => {
                    return city.info.city
                })
            ),
        ]

        result = orderBy(result, ['info']['city'], ['asc'])
        return result
    }
    get citiesList() {
        let result = [{ name: 'Выберите город', value: 'default' }]

        result = result.concat(
            this.shownCities.map(city => {
                return { name: city, value: city }
            })
        )
        return result
    }
    mapEl: HTMLDivElement | null = null;
    iframeWindow: any = null;
    iframeDocument: any = null;
    shadowDocument: any = null;
    mounted() {
        try {
            const customTag: any = document.getElementsByTagName('TS-UI-YANDEX-MAP')[0];
            const shadowDocument = customTag.shadowRoot as ShadowRoot;
            this.shadowDocument = shadowDocument;
        } catch(e) {
            console.warn("Webcomonent TS-UI-YANDEX-MAP is not present on the page. ShadowDocument has been set to document", e);
            this.shadowDocument = document
        } 
        this.loadMap();
    }
    loadMap() {
        const iframe = this.$refs.iframe as HTMLIFrameElement
        iframe.addEventListener('load', () => {
        const IFrameDocument = iframe.contentDocument;
        this.iframeDocument = IFrameDocument;
        this.iframeWindow = iframe.contentWindow;
        this.mapEl = document.createElement("div");
        this.mapEl.id = 'map'
        IFrameDocument!.body.appendChild(this.mapEl);
        if(this.placemarksType === "filials") {
            this.placemarksData = GLOBAL_FILIALS_DATA;
        } else if(this.placemarksType === "franchise") {
            this.placemarksData = GLOBAL_FRANCHISE_DATA;
        } 
        else {
            this.placemarksData = GLOBAL_FILIALS_DATA.concat(GLOBAL_FRANCHISE_DATA)
        }
        const yaMapScript = document.createElement('SCRIPT')
        yaMapScript.setAttribute(
            'src',
            'https://api-maps.yandex.ru/2.1/?apikey=64a23fa1-6705-4827-978a-ab84dc6ad5ad&lang=ru_RU'
            )
            yaMapScript.setAttribute('async', '')
            yaMapScript.setAttribute('defer', '')
            yaMapScript.setAttribute('type', 'text/javascript')
            IFrameDocument!.body!.appendChild(yaMapScript)
            const style = document.createElement('style');
            style.innerHTML = this.iframeStyles

            IFrameDocument!.body!.appendChild(style);
            // @ts-ignore
            yaMapScript.onload = () => {
                    this.yaMapInit()
    
            }
        } )

    }
    private yaMapInit() {
        const { ymaps } = this.iframeWindow;
        ymaps.ready(() => {
            let self = this;
            const mapNode = this.mapEl
            const myMap = new ymaps.Map(mapNode, {
                center: [54.24801290964209, 37.773155011718764],
                zoom: 4,
                controls: [],
            })

            const mapCluster = new ymaps.Clusterer({
                preset: 'islands#darkGreenClusterIcons',
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
                hasBalloon: false,
                zoomMargin: 200,
            })

            const geolocationLayout = ymaps.templateLayoutFactory.createClass(self.geolocationControlLayout)
            const ZoomLayout = ymaps.templateLayoutFactory.createClass(self.zoomControlLayout,
                {
                    build: function() {
                        ZoomLayout.superclass.build.call(this)
                        this.zoomInCallback = ymaps.util.bind(this.zoomIn, this)
                        this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this)
                        const zoomInBtn = self.iframeDocument.querySelector('#zoom-in') as HTMLElement
                        zoomInBtn.addEventListener('click', this.zoomInCallback)
                        const zoomOutBtn = self.iframeDocument.querySelector('#zoom-out') as HTMLElement
                        console.log(self.$refs.map);
                        zoomOutBtn.addEventListener('click', this.zoomOutCallback)
                    },

                    clear: function() {},

                    zoomIn: function() {
                        var map = this.getData().control.getMap()
                        map.setZoom(map.getZoom() + 1, { checkZoomRange: true })
                    },

                    zoomOut: function() {
                        var map = this.getData().control.getMap()
                        map.setZoom(map.getZoom() - 1, { checkZoomRange: true })
                    },
                }
            )
            var zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } })
            var geolocationControl = new ymaps.control.GeolocationControl({
                options: { layout: geolocationLayout },
            })

            myMap.controls.add(geolocationControl, {
                position: {
                    top: '80px',
                    right: '30px',
                },
            })

            myMap.controls.add(zoomControl, {
                position: {
                    top: '150px',
                    right: '30px',
                },
            })

            const myGeoObject = new ymaps.GeoObject(
                {
                    geometry: {
                        type: 'Point',
                        coordinates: myMap.getCenter(),
                    },
                    properties: { iconColor: '#3b5998' },
                },
                {}
            )


            //* -------------------  Cluster of YMap ---------------------*//

            this.placemarksData.forEach(function(point) {

                self.geoObjects.push(
                    new Placemark(ymaps, point.coords, point.info, self.onPlacemarkClick, <ShadowRoot>self.shadowDocument).placemark
                )
            })

            mapCluster.add(this.geoObjects)
            myMap.geoObjects.add(mapCluster)

            myMap.setBounds(mapCluster.getBounds(), {
                zoomMargin: 50,
            })
            /* -------------------------- End Cluster --------------------------- */

            /* -------------------------- End Cluster --------------------------- */

            const mapSelectorMobile = self.shadowDocument.querySelector('.mobile-city-select')
            // mapSelectorMobile.addEventListener('change', e => {
            //     setMapPosition(e)
            // })

            // /*eslint-disable*/
            myMap.behaviors.disable('scrollZoom')

            this.myMap = myMap
        })
        this.mapLoaded = true
    }


    selectedCity = { name: 'Выберите город', value: 'default' }
    
    changeOrganizationVariant(event) {
        if(typeof event === "string") {
            this.selectedCity.name = event
            this.selectedCity.value = event
            this.setMapPosition(event)
        } else {
            this.selectedCity.name = event.name
            this.selectedCity.value = event.name
            this.setMapPosition(event.name)
        }
        // this.showInfoBlock = false

    }
    readonly citiesCoords: ICitiesCoords = citiesCoords

    setMapPosition(city: string): void {
        if(this.citiesCoords.hasOwnProperty(city)) {
            this.myMap.setCenter(this.citiesCoords[city].center);
            this.myMap.setZoom(this.citiesCoords[city].zoom);
        } else {
            // if there is no such city in the list of cities
            // showInfo block hides an position and zoom set to default
            this.showInfoBlock = false;
            this.myMap.setCenter([54.24801290964209, 37.773155011718764])
            this.myMap.setZoom(4)
        }
    }

    onPlacemarkClick(city, animateInfoBlock): void {
        city = city.name || city;
        if(this.selectedCity.name !== city) {
            this.showInfoBlock = true;
            this.selectedCity.name = city
            this.selectedCity.value = city
            animateInfoBlock();
        }
    }
}
export default yandexMap

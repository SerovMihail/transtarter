export class Placemark {
    placemark

    private readonly mobileResolution = '768px'
    constructor(
        // @ts-ignore
        ymaps,
        coords: number[],
        info: any = '',
        onClick: (city: string, animateInfoBlock: () => void) => void,
        shadowDocument: ShadowRoot
    ) {
        let telTemplate = ''
        const phonelist = info.phones.map(phone => `<li>${phone}</li>`).join('')

        if (Array.isArray(info.phone)) {
            let template = ''
            info.phone.forEach(singleTel => {
                template += `<div class="ya-maps__phone"><span class="ya-maps__phone-link" >${singleTel}</span></div>`
            })
            telTemplate = template
        } else {
            telTemplate = `<div class="ya-maps__phone"><span class="ya-maps__phone-link" >${
                info.phone
            }</span></div>`
        }
        const placemark = new ymaps.Placemark(coords, null, {
            iconLayout: 'default#image',
            iconImageHref:
                'https://res.cloudinary.com/duz1yo4sl/image/upload/v1553700558/ui/map_pin.png',
            iconImageSize: [48, 64],
            iconImageOffset: [-24, -64],
        })
        const hintContent = `
        <div class="hint-container">
            <div class="ya-maps__company">
              ${info.company}
            </div>
            <div class="ya-maps__header">Адрес офиса:</div>
            ${info.address}
            <ul class="ya-maps__phonelist">
              ${phonelist}
            </ul>
        </div>
            <!-- <a class="ya-maps__email" href="malito:alice@tstarter.ru">alice@tstarter.ru </a> -->
            <!--<div class="ya-maps__person">
                <div class="ya-maps__face" style="background-image:url('https://res.cloudinary.com/duz1yo4sl/image/upload/v1553510444/woman_face_1.png');"></div>
                <div>
                    <div class="ya-maps__person-name">Алиса Сидоренко</div>
                    <div class="ya-maps__person-position">Руководитель головного офиса компании<br> «Транс Стартер» </div>
                </div>
            </div> -->
        </div>
    `

        const balloonContentBody = `
    <div class="baloonContentBody">
        <div class="ya-maps">
            <div class="ya-maps__header">Адрес офиса</div>
            ${info.address}
            <ul class="ya-maps__phonelist">
              ${phonelist}
            </ul>
            <a class="ya-maps__email" href="//${info.website}">${info.website}</a>
            <!--<div class="ya-maps__person">
                <div class="ya-maps__face" style="background-image:url('https://res.cloudinary.com/duz1yo4sl/image/upload/v1553510444/woman_face_1.png');"></div>
                <div>
                    <div class="ya-maps__person-name">Алиса Сидоренко</div>
                    <div class="ya-maps__person-position">Руководитель головного офиса компании<br> «Транс Стартер» </div>
                </div>
            </div> -->
        </div>
    </div>
    `
        placemark.properties.set({ balloonContentBody, hintContent, info })

        function animateMapInfo() {
            const mapInfoBlock = shadowDocument.querySelector('.map-info') as HTMLDivElement
            const animationDurationMilliseconds = 400
            mapInfoBlock.style.animationDuration = animationDurationMilliseconds + 'ms'
            mapInfoBlock.style.animationName = 'blink'
            setTimeout(() => {
                mapInfoBlock.style.animationName = ''
            }, animationDurationMilliseconds)
        }

        placemark.events.add('click', e => {
            e.stopPropagation()
            const mapInfoBody = shadowDocument.querySelector('.map-info__body') as HTMLDivElement
            mapInfoBody.style.display = 'block'
            const phoneList = shadowDocument.getElementById('phone-list') as HTMLElement

            const { info, tel } = placemark.properties.getAll()
            const mapAsideAddress = shadowDocument.getElementById('mapAsideAddress') as HTMLElement
            const mobileList = shadowDocument.getElementById('phone-list')
            const mobile = window.matchMedia(`(max-width: ${this.mobileResolution})`).matches
            const companySiteEl = shadowDocument.getElementById('company-site')

            if (companySiteEl && info.website !== '') {
                companySiteEl.innerHTML = ''
                const link = document.createElement('a')
                link.href = `//${info.website}`
                link.innerHTML = info.website
                link.target = '_blank'
                companySiteEl.appendChild(link)
            }

            if (!mobile) {
                placemark.properties.set({ balloonContentBody: null })
                // animateMapInfo()
            } else {
                placemark.properties.set({ balloonContentBody })
            }
            mapAsideAddress.textContent = info.address

            if (typeof info.phones !== 'undefined' && Array.isArray(info.phones)) {
                phoneList.innerHTML = ''
                info.phones.forEach(singleTel => {
                    const li = document.createElement('li')
                    li.textContent = singleTel
                    phoneList.appendChild(li)
                })
            }

            onClick(placemark.properties.getAll().info.city, animateMapInfo)
        })
        this.placemark = placemark
    }
}

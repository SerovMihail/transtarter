const FilialCities = ['Moscow', 'Kaliningrad', 'Ekaterinburg', 'Krasnodar', 'Almaty', 'kiev']
const franchiseCitites = ['astrachan', 'archanglesk', 'omsk', 'Krasnodar', 'saratov']

// prettier-ignore
const GLOBAL_FILIALS_DATA = [
    [
        [55.645943569081666, 37.67312399999999],
        {
            company: 'Транс Стартер МСК &laquo;Каширка&raquo;',
            address: 'г.Москва, Каширское ш. д.41',
            phones: ['8-495-744-37-75'],
            website: 'msk.tstarter.ru'
        }
    ],
    [
        [55.64204706910142, 37.82867649999988],
        {
            company: '&laquo;Транс Стартер МСК&raquo;',
            address: 'Московская область, г.Дзержинский, ул.Энергетиков 18А',
            phones: ['8-495-748-97-74 (Многоканальный номер)'],
            website: 'msk.tstarter.ru'
        }
    ],
    [
        [54.73466856993723, 20.513289999999976],
        {
            company: '&laquoТранс Стартер КЛД&raquo',
            address: 'г.Калининград, ул.Первомайская, д.17',
            phones: ['8-4012-525-400'],
            website: 'kld.tstarter.ru'
        }
    ],
    [
        [56.81833556789966, 60.63350600000002],
        {
            company: '&laquoТранс Стартер ЕКБ&raquo',
            address: 'г.Екатеринбург, ул.Ткачей, 14-А',
            phones: ['8-343-219-88-66'],
            website: 'ekb.tstarter.ru'
        }
    ],
    [
        [45.063578574591006, 38.972447499999966],
        {
            company: '&laquoТранс Стартер КРД&raquo',
            address: 'г.Краснодар, ул.Дальняя, д.2',
            phones: ['8-861-290-09-19'],
            website: 'krd.tstarter.ru'
        }
    ],
    [
        [43.21356007453611, 76.8984115],
        {
            company: '&laquoТранс Стартер КЗ&raquo',
            address: 'г.Алматы, пр.Гагарина, 236-Б',
            phones: ['8-727-346-82-08'],
            website: 'tstarter.kz'
        }
    ],
    [
        [50.48895707299117, 30.482164499999907],
        {
            company: '&laquoТранс Стартер UA&raquo',
            address: 'г.Киев, Московский пр., д.15',
            phones: ['+380 44 222 67-85'],
            website: ''
        }
    ],
    [
        [59.60026806460948, 60.55263950000002],
        {
            company: '&laquoТранс Стартер Серов&raquo',
            address: 'г.Серов, ул.Кирова, 49/10Б',
            phones: ['8 (34385) 9-81-03'],
            website: 'ekb.tstarter.ru'
        }
    ],
    [
        [56.910173, 60.798203],
        {
            company: '&laquoТранс Стартер Березовский&raquo',
            address: 'г.Березовский, Березовский тракт, 2Г',
            phones: ['8 (343) 268-11-90'],
            website: 'ekb.tstarter.ru'
        }
    ],
];

// prettier-ignore
const GLOBAL_FRANCHISE_DATA = [
    [
        [46.36051457446036, 48.09006899999998],
        {
            company: '&laquoТранс Стартер Астрахань&raquo',
            address: 'г.Астрахань, ул.Славянская, д.1',
            phones: ['8-906-456-05-26', '8-937-509-79-82'],
            website: 'ast.tstarter.ru'
        }
    ],
    [
        [64.55915155729815, 40.57601199999998],
        {
            company: '&laquoТранс Стартер Архангельск&raquo',
            address: 'г.Архангельск, Окружное ш., д.11, стр.2',
            phones: ['8 (8182) 4-777-51', '8 (8182) 4-777-56', '8 (8182) 4-777-62'],
            website: 'arh.tstarter.ru'
        }
    ],
    [
        [55.0707160696502, 73.30726149999994],
        {
            company: '&laquoТранс Стартер Омск&raquo',
            address: 'г.Омск, Красноярский тракт, 119/1',
            phones: ['8 (3812) 59-11-99', '8 (908) 116-77-77'],
            website: 'omsk.tstarter,ru'
        }
    ],
    [
        [45.02223957458696, 39.04732199999996],
        {
            company: '&laquoТранс Стартер Краснодар&raquo',
            address: 'г.Краснодар, ул.Сормовская д.1',
            phones: ['8 (961) 853-39-94'],
            website: 'krd.tstarter.ru'
        }
    ],
    [
        [51.555569072363866, 46.00297749999999],
        {
            company: '&laquoТранс Стартер Саратов&raquo',
            address: 'г.Саратов, Мурманский проезд, д.1А',
            phones: ['8 (8452) 49-49-26', '8 (953) 634-43-80'],
            website: 'saratov.tstarter.ru'
        }
    ],
    [
        [58.565420065904114, 49.608258],
        {
            company: '&laquoТранс Стартер Киров&raquo',
            address: 'г. Киров, ул.Производственная, 39/1',
            phones: ['8 (8332) 78-73-71', '8 909 135-55-33'],
            website: 'kirov.tstarter.ru'
        }
    ],
]

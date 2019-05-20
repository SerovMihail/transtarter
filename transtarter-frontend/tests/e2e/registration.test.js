import { Selector, RequestLogger } from 'testcafe'
import config from './config'
import faker from 'faker'

const logger = RequestLogger(
    {
        url: `${config.stagingConfig.identityServer}/api/account/register`,
        method: 'post',
    },
    {
        logRequestHeaders: true,
        logResponseHeaders: true,
        logResponseBody: true,
        stringifyResponseBody: true,
    }
)

fixture`New Fixture`.page`${config.testConfig.vueHost}/`

test
/*eslint-disable */
  .requestHooks(logger)
  ('Registration Process', async t => {
    await t
        /* eslint-enable */
        .maximizeWindow()
            .click(Selector('a').withText('Регистрация'))
            .typeText(Selector('.form-group').find('.form-control'), faker.name.firstName())
        .pressKey('tab')
        .typeText(
            Selector('div')
                .withText('Введите телефон')
                .nth(7)
                .find('.form-control'),
            faker.phone.phoneNumber()
        )
            .pressKey('tab')
        .typeText(
            Selector('div')
                .withText('Введите email')
                .nth(7)
                .find('.form-control'),
            faker.internet.email()
        )
            .pressKey('tab')
        .typeText(
            Selector('div')
                .withText('Введите пароль')
                .nth(7)
                .find('.form-control'),
            '123$Asd'
        ) // faker pattern throws overflow
        .typeText(
            Selector('.two-selectors').find('.form-control.second-selector'),
            faker.company.companyName()
        )
        .click(
            Selector('.registration-form')
                .find('button')
                .withText('Зарегистрироваться')
        )

    await t
            .expect(
                logger.contains(
                record => record.response.statusCode === 200 || record.response.statusCode === 222
            )
        )
            .ok()
    })

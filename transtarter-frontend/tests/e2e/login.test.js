import { Selector } from 'testcafe'
import config from './config'

fixture`New Fixture`.page`${config.stagingConfig.vueHost}/`

test('Login Process', async t => {
    await t.maximizeWindow()

    const loginBtn = await Selector(() =>
        document.querySelector('ts-ui-header').shadowRoot.querySelector('a.border')
    )

    await t
        .click(loginBtn)
        .typeText(Selector('#Username'), 'admin')
        .pressKey('tab')
        .typeText(Selector('#Password'), '4G9tNaC[CP')
        .click(Selector('button').withText('Войти'))
        .click(Selector('.user-sidebar-top').find('.user-picture'))
        .click(Selector('button').withText('Регистрационные данные'))
        .click(Selector('button').withText('Адреса доставки'))
        .click(Selector('button').withText('Реквизиты и юр'))
})

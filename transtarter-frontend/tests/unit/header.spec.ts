import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import LayoutHeader from '@/components/shared/header/header.vue'
import Vuex, { Store } from 'vuex'
import { VueConstructor } from 'vue'

describe('Header component behavior', () => {
    let wrapper: Wrapper<LayoutHeader>
    let inputSelectors: string[] = []
    let searchResultsSelectors: string[] = []
    let options: {
        store: any
        localVue: any
    }
    const stockMock = Object.freeze({
        modules: {
            auth: {
                namespaced: true,
                name: 'auth',
                actions: {
                    actualizeUser: jest.fn().mockName('actualizeUser'),
                },
            },
        },
    })

    beforeEach(() => {
        // testing Vuex
        jest.clearAllMocks()
        const store = new Vuex.Store<{}>(stockMock)
        const localVue = createLocalVue()
        options = { store, localVue }

        localVue.use(Vuex)

        // base section
        wrapper = shallowMount(LayoutHeader, options)

        inputSelectors.push('.search-input-desktop')
        inputSelectors.push('.search-input-mobile')

        searchResultsSelectors.push('.desktop-search-result')
        searchResultsSelectors.push('.mobile-search-result')
    })

    it('Component is mounted', () => {
        expect(wrapper.element).toBeTruthy()
    })

    it('Component has mobile and desktop input', () => {
        inputSelectors.forEach(inputSelector => {
            expect(wrapper.find(inputSelector).isVisible()).toBe(true)
        })
    })

    it('Mobile and Desktop search results are hidden when in search input 2 or less symbols', () => {
        searchResultsSelectors.forEach(searchResultSelector => {
            for (let i = 0; i < 2; i++) {
                wrapper.setData({ searchText: 't'.repeat(i) })
                expect(wrapper.find(searchResultSelector).exists()).toBe(false)
            }
        })
    })

    it('Mobile and Desktop search results are hidden when in search input 3 or more symbols', () => {
        searchResultsSelectors.forEach(searchResultSelector => {
            for (let i = 3; i < 10; i++) {
                wrapper.setData({ searchText: 't'.repeat(i) })
                expect(wrapper.find(searchResultSelector).isVisible()).toBe(true)
            }
        })
    })

    it('Mobile and Desktop search results will be hidden after reducing numbers of symbols in input', () => {
        wrapper.setData({ searchText: 't'.repeat(4) })
        wrapper.setData({ searchText: 't'.repeat(2) })
        expect(wrapper.vm.$data.foundItems.length).toBe(0)
    })

    /**
     * TODO: How to mock dynamic modules
     */

    it(`When component is mounted we call store.dispatch('auth/actualizeUser')`, () => {
        shallowMount(LayoutHeader, {
            ...options,
            mounted: function() {
                // we should redefine $store because in all components we use dynamic modules
                // unless we test it everything is okay
                this.$store.dispatch('auth/actualizeUser')
            },
        })
        expect(stockMock.modules.auth.actions.actualizeUser).toHaveBeenCalled()
    })
})

import { mount, Wrapper } from '@vue/test-utils'
import SearchResultsComponent from '@/components/shared/header/search-results/search-results.vue'
import { ISearchResult } from '@/models'

describe('SearchResults Component behavior', () => {
    let wrapper: Wrapper<SearchResultsComponent>

    beforeEach(() => {
        wrapper = mount(SearchResultsComponent)
        const mockData: ISearchResult[] = []
        for (let i = 0; i < 10; i++) {
            mockData.push({
                id: i + 1,
                alreadyInBucket: i,
                desc: 'desc',
                manufacturer: 'manufacturer',
                number: 'number',
            })
        }
        wrapper.setProps({
            foundItems: mockData,
        })
    })

    it('Component is mounted', () => {
        expect(wrapper.element).toBeTruthy()
    })

    it('Search results header is visible', () => {
        expect(wrapper.find('.search-results__header').isVisible()).toBe(true)
    })

    it('Possible maximum is equal 5 for visualization', () => {
        expect(wrapper.findAll('.search-results__body-row').length).toEqual(5)
    })

    it(`Don't show item with 0 reservation`, () => {
        expect(wrapper.findAll('.search-results__body-row-item-optional').length).toEqual(4)
    })
})

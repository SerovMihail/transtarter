import { mount } from '@vue/test-utils'
import FindDetail from '@/components/find-detail/find-detail.vue'

describe('Find detail component behavior', () => {
    const wrapper = mount(FindDetail)
    const buttons = wrapper.findAll('.find-detail__filter-item')

    it('Has an input tag', () => {
        expect(wrapper.contains('input')).toBe(true)
    })

    it('changes activeTab property on click', () => {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons.at(i)
            button.trigger('click')
            expect(wrapper.vm.$data.activeTab).toBe(i)
        }
    })

    it('changes input placeholder value on tab click', () => {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons.at(i)
            button.trigger('click')
            const input = wrapper.find('.find-detail__input')
            expect(input.attributes('placeholder')).toBe(wrapper.vm.$data.placeholderText[i])
        }
    })
})

import { shallowMount } from '@vue/test-utils'
import TheSideNavToggle from '../TheSideNavToggle.vue'

describe('TheSideNavToggle.vue', () => {
    test('emits event toggle when clicked' , () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = shallowMount(TheSideNavToggle, { mocks })
        wrapper.find('.drawer-toggle').trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('toggle')
    })
})
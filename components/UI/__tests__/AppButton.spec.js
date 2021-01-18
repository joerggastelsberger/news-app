import { shallowMount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton.vue', () => {
    test('displays default button when passed on no prop' , () => {
        const wrapper = shallowMount(AppButton)
        expect(wrapper.find('button').classes()).toContain('button')
    })

    test('displays cancel button when passed on as prop' , () => {
        const propsData = {
            btnStyle: 'cancel'
        }
        const wrapper = shallowMount(AppButton, { propsData })
        expect(wrapper.find('button').classes()).toContain('cancel')
    })

    test('enables button by default', () => {
        const wrapper = shallowMount(AppButton)
        expect(wrapper.element.disabled).toBe(false)
    })

    test('disables button when passed on as prop', () => {
        const propsData = {
            disable: true
        }
        const wrapper = shallowMount(AppButton, { propsData })
        expect(wrapper.element.disabled).toBe(true)
    })

    test('inserts content in button', () => {
        const slots = {
            default: '<div>testslot</div>'
        }
        const wrapper = shallowMount(AppButton, { slots })
        expect(wrapper.html()).toContain('<div>testslot</div>')
    })
})
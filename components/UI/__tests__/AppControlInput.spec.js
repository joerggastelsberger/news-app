import { shallowMount } from '@vue/test-utils'
import AppControlInput from '../AppControlInput.vue'

describe('AppControlInput.vue', () => {
    test('inserts content label' , () => {
        const slots = {
            default: 'testlabel'
        }
        const wrapper = shallowMount(AppControlInput, { slots })
        expect(wrapper.html()).toContain('testlabel')
    })

    test('displays input by default', () => {
        const wrapper = shallowMount(AppControlInput)
        expect(wrapper.html()).toContain('input')
    })

    test('displays textarea when received as prop', () => {
        const propsData = {
            controlType: 'textarea'
        }
        const wrapper = shallowMount(AppControlInput, { propsData })
        expect(wrapper.html()).toContain('textarea')
    })

    test('sets value on input when received as prop', () => {
        const propsData = {
            value: 'testvalue'
        }
        const wrapper = shallowMount(AppControlInput, { propsData })
        expect(wrapper.find('input').element.value).toBe('testvalue')
    })

    test('sets value on textarea when received as prop', () => {
        const propsData = {
            controlType: 'textarea',
            value: 'testvalue'
        }
        const wrapper = shallowMount(AppControlInput, { propsData })
        expect(wrapper.find('textarea').element.value).toBe('testvalue')
    })

    test('sets placeholder on input when received as prop', () => {
        const propsData = {
            placeholder: 'test placeholder'
        }
        const wrapper = shallowMount(AppControlInput, { propsData })
        expect(wrapper.find('input').element.placeholder).toBe('test placeholder')
    })

    test('sets placeholder on textarea when received as prop', () => {
        const propsData = {
            controlType: 'textarea',
            placeholder: 'test placeholder'
        }
        const wrapper = shallowMount(AppControlInput, { propsData })
        expect(wrapper.find('textarea').element.placeholder).toBe('test placeholder')
    })

    test('emits event input with the value $event.target.value on input', async () => {
        const propsData = {
            value: 'testvalue'
        }
        const mocks = {
            $emit: jest.fn(),
        }
        const wrapper = shallowMount(AppControlInput, { propsData, mocks })
        await wrapper.find('input').trigger('input')
        expect(mocks.$emit).toHaveBeenCalledWith('input', 'testvalue')
    })

    test('emits event input with the value $event.target.value on textarea', async () => {
        const propsData = {
            controlType: 'textarea',
            value: 'testvalue'
        }
        const mocks = {
            $emit: jest.fn(),
        }
        const wrapper = shallowMount(AppControlInput, { propsData, mocks })
        await wrapper.find('textarea').trigger('input')
        expect(mocks.$emit).toHaveBeenCalledWith('input', 'testvalue')
    })
})
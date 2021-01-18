import { shallowMount } from '@vue/test-utils'
import AppDropDown from '../AppDropDown.vue'
import merge from 'lodash.merge'

const items = [{ value: 'v1', text: 'text1' },
{ value: 'v2', text: 'text2' },
{ value: 'v3', text: 'text3' }]

function createWrapper(overrides) {
    const defaultMountingOptions = {
        propsData: {
            items: items
        }
    }
    return shallowMount(AppDropDown, merge(defaultMountingOptions, overrides))
}

describe('AppDropDown.vue', () => {
    test('renders default item with text', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.selected').text()).toContain('text1')
    })

    test('renders each item with text it receives', () => {
        const wrapper = createWrapper()
        const itemElements = wrapper.findAll('.item')
        expect(itemElements).toHaveLength(items.length)
        itemElements.wrappers.forEach((wrapper, i) => {
            expect(wrapper.text()).toContain(items[i].text)
        })
    })

    test('opens dropdown when clicked on closed dropdown', async () => {
        const wrapper = createWrapper()
        await wrapper.find('.selected').trigger('click')
        expect(wrapper.find('.items').isVisible()).toBe(true)
    })

    test('closes dropdown when clicked on opened dropdown', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        await wrapper.find('.selected').trigger('click')
        expect(wrapper.find('.items').isVisible()).toBe(true)
        await wrapper.find('.selected').trigger('click')
        expect(wrapper.find('.items').isVisible()).toBe(false)
    })

    test('closes dropdown when it loses focus', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        await wrapper.find('.selected').trigger('click')
        expect(wrapper.find('.items').isVisible()).toBe(true)
        await wrapper.find('.dropdown').trigger('blur')
        expect(wrapper.find('.items').isVisible()).toBe(false)
    })

    test('displays selected item when clicked on an item in open dropdown', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        expect(wrapper.find('.selected').text()).toContain('text1')
        await wrapper.findAll('.item').at(1).trigger('click')
        expect(wrapper.find('.selected').text()).toContain('text2')
    })

    test('emits event input with selected item value when clicked on an item in open dropdown', async () => {
        expect.assertions(2)
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper({ mocks })
        expect(wrapper.find('.selected').text()).toContain('text1')
        await wrapper.findAll('.item').at(1).trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('input', items[1].value)
    })  

    test('attaches border to selected item when dropdown open', async () => {
        const wrapper = createWrapper()
        await wrapper.find('.selected').trigger('click')
        expect(wrapper.find('.selected').classes()).toContain('selected--border')
    })
}) 
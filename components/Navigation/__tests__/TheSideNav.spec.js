import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import TheSideNav from '../TheSideNav.vue'
import TheSideNavModule from '../TheSideNavModule.vue'
import merge from 'lodash.merge'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

function createWrapper(overrides) {
    const defaultMountingOptions = {
        propsData: {
            show: true
        }
    }
    return shallowMount(TheSideNav, merge(defaultMountingOptions, overrides))
}

describe('TheSideNav.vue', () => {
    test('displays no sidenav by default', () => {
        const propsData = {
            show: false
        }
        const wrapper = createWrapper({ propsData })
        expect(wrapper.find('.sidenav').exists()).toBe(false)
    })

    test('displays no backdrop by default', () => {
        const propsData = {
            show: false
        }
        const wrapper = createWrapper({ propsData })
        expect(wrapper.find('.sidenav-backdrop').exists()).toBe(false)
    })

    test('displays sidenav when it receives prop show with true', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.sidenav').exists()).toBe(true)
    })

    test('displays backdrop when it receives prop show with true', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.sidenav-backdrop').exists()).toBe(true)
    })

    test('removes categories when clicked on category title and categories are displayed', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(2)
        await wrapper.find('.nav-title').trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(1)
    })

    test('removes countries when clicked on countries title and countries are displayed', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(2)
        await wrapper.findAll('.nav-title').at(1).trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(1)
    })

    test('displays categories when clicked on category title and no categories are displayed', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        await wrapper.find('.nav-title').trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(1)
        await wrapper.find('.nav-title').trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(2)
    })

    test('displays countries when clicked on countries title and no countries are displayed', async () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        await wrapper.findAll('.nav-title').at(1).trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(1)
        await wrapper.findAll('.nav-title').at(1).trigger('click')
        expect(wrapper.findAllComponents(TheSideNavModule)).toHaveLength(2)
    })

    test('emits event close when it receives event close', async () => {
        const store = {
            getters: {
                category: () => { },
                country: () => { }
            }
        }
        const propsData = {
            show: true
        }
        const wrapper = mount(TheSideNav, { store, propsData, localVue })
        await wrapper.find('.nav-title').trigger('click')
        wrapper.findComponent(TheSideNavModule).vm.$emit('close')
        expect(wrapper.emitted().close).toBeTruthy()
    })

    test('sorts categories', () => {
        expect.assertions(3)
        const wrapper = createWrapper()
        expect(wrapper.vm.categories[0].name.localeCompare(wrapper.vm.categories[1].name)).toBeLessThan(0)
        expect(wrapper.vm.categories[1].name.localeCompare(wrapper.vm.categories[2].name)).toBeLessThan(0)
        expect(wrapper.vm.categories[2].name.localeCompare(wrapper.vm.categories[3].name)).toBeLessThan(0)
    })

    test('sorts countries', () => {
        expect.assertions(3)
        const wrapper = createWrapper()
        expect(wrapper.vm.countries[0].name.localeCompare(wrapper.vm.countries[1].name)).toBeLessThan(0)
        expect(wrapper.vm.countries[1].name.localeCompare(wrapper.vm.countries[2].name)).toBeLessThan(0)
        expect(wrapper.vm.countries[2].name.localeCompare(wrapper.vm.countries[3].name)).toBeLessThan(0)
    })
})
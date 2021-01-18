import { shallowMount, mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import TheHeader from '../TheHeader.vue'
import TheSideNavToggle from '../TheSideNavToggle.vue'
import VueRouter from 'vue-router'
import merge from 'lodash.merge'

const localVue = createLocalVue()
localVue.use(VueRouter)

function createWrapper(overrides) {
    const defaultMountingOptions = {
        stubs: {
            NuxtLink: RouterLinkStub
        },
        localVue
    }
    return shallowMount(TheHeader, merge(defaultMountingOptions, overrides))
}

describe('TheHeader.vue', () => {
    test('pushes route to "/" when clicked on NEWS', () => {
        const wrapper = createWrapper()
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/')
    })

    test('emits event side-nav-toggle when it receives event toggle', () => {
        const stubs = {
            NuxtLink: RouterLinkStub
        }
        const wrapper = mount(TheHeader, { stubs, localVue })
        wrapper.findComponent(TheSideNavToggle).vm.$emit('toggle')
        expect(wrapper.emitted()['side-nav-toggle']).toBeTruthy()
    })

    test('emits event modal-open when clicked on search', async () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper({ mocks })
        await wrapper.findAll('.material-icons').at(1).trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('modal-open')
    })
})
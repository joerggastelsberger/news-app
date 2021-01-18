import { shallowMount } from '@vue/test-utils'
import ErrorLayout from '../error.vue'

describe('error.vue', () => {
    test('pushes route to "/" after two seconds', () => {
        const mocks = {
            $router: {
                push: jest.fn()
            }
        }
        jest.useFakeTimers()
        shallowMount(ErrorLayout, { mocks })
        jest.advanceTimersByTime(2000)
        expect(mocks.$router.push).toHaveBeenCalledWith('/')
    })
})
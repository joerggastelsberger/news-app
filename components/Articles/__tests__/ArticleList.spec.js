import { shallowMount } from '@vue/test-utils'
import ArticleList from '../ArticleList.vue'
import ArticlePreview from '../ArticlePreview.vue'

describe('ArticleList.vue', () => {
    test('renders an ArticlePreview with data for each article it receives', () => {
        const articles = [{ title: 'A', encodedTitle: 'eA', description: 'dA', url: 'uA', urlToImage: 'utIA', publishedAt: 'pA' },
                          { title: 'B', encodedTitle: 'eB', description: 'dB', url: 'uB', urlToImage: 'utIB', publishedAt: 'pB'  },
                          { title: 'C', encodedTitle: 'eC', description: 'dC', url: 'uC', urlToImage: 'utIC', publishedAt: 'pC'  }]
        const wrapper = shallowMount(ArticleList, {
            propsData: {
                articles
            }
        })
        const articlePreviews = wrapper.findAllComponents(ArticlePreview)
        expect(articlePreviews).toHaveLength(articles.length)
        articlePreviews.wrappers.forEach((wrapper, i) => {
            expect(wrapper.props().title).toBe(articles[i].title)
            expect(wrapper.props().encodedTitle).toBe(articles[i].encodedTitle)
            expect(wrapper.props().description).toBe(articles[i].description)
            expect(wrapper.props().url).toBe(articles[i].url)
            expect(wrapper.props().urlToImage).toBe(articles[i].urlToImage)
            expect(wrapper.props().publishedAt).toBe(articles[i].publishedAt)
        })
    })
})
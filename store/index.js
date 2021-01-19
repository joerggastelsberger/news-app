import { encodeArticles, encodeSearchTerms } from '~/util/encoders'

export const state = () => ({
    loadedArticles: [],
    loadedArticle: null,
    category: "breaking-news",
    country: "us",
})

export const mutations = {
    setArticles(state, articles) {
        state.loadedArticles = articles;
    },
    setArticle(state, article) {
        state.loadedArticle = article;
    },
    setCategory(state, category) {
        state.category = category;
    },
    setCountry(state, country) {
        state.country = country;
    },
}

export const actions = {
    async nuxtServerInit({ commit, state }, context) {
        try {
            const headlines = await context.app.$axios.$get(`${process.env.NEWS_BASE_URL}/top-headlines?country=${state.country}&topic=${state.category}&token=${process.env.NEWS_API_KEY}`);
            const encodedArticles = encodeArticles(headlines);
            commit('setArticles', encodedArticles);
        } catch (error) {
            context.error(error);
        }
    },
    setArticles({ commit }, articles) {
        commit('setArticles', articles);
    },
    setArticle({ commit, state }, encodedTitle) {
        const article = state.loadedArticles.find(article => article.encodedTitle == encodedTitle);
        commit('setArticle', article);
    },
    async setCategory({ commit, state }, category) {
        commit('setCategory', category);
        if (state.country == "") {
            commit('setCountry', "us");
        }
        try {
            const headlines = await this.$axios.$get(`${process.env.NEWS_BASE_URL}/top-headlines?country=${state.country}&topic=${category}&token=${process.env.NEWS_API_KEY}`);
            const encodedArticles = encodeArticles(headlines);
            commit('setArticles', encodedArticles);
        } catch (error) {
            console.log(error);
        }
    },
    async setCountry({ commit, state }, country) {
        commit('setCountry', country);
        if (state.category == "") {
            commit('setCategory', "breaking-news");
        }
        try {
            const headlines = await this.$axios.$get(`${process.env.NEWS_BASE_URL}/top-headlines?country=${country}&topic=${state.category}&token=${process.env.NEWS_API_KEY}`);
            const encodedArticles = encodeArticles(headlines);
            commit('setArticles', encodedArticles);
        } catch (error) {
            console.log(error);
        }
    },
    async setSearch({ commit }, search) {
        try {
            const encodedSearchTerms = encodeSearchTerms(search.searchTerms)
            const headlines = await this.$axios.$get(`${process.env.NEWS_BASE_URL}/search?q=${encodedSearchTerms}&sortby=${search.criteria}&token=${process.env.NEWS_API_KEY}`);
            const encodedArticles = encodeArticles(headlines);
            commit('setArticles', encodedArticles);
        } catch (error) {
            console.log(error);
        }
    },
    resetCriterias({ commit }) {
        commit('setCategory', "");
        commit('setCountry', "");
    },
}

export const getters = {
    loadedArticles(state) {
        return state.loadedArticles;
    },
    loadedArticle(state) {
        return state.loadedArticle;
    },
    category(state) {
        return state.category;
    },
    country(state) {
        return state.country;
    },
}
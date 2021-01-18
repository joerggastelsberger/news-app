import slugify from 'slugify'

export function encodeArticles (headlines) {
    const encodedArticles = headlines.articles.map(article => {
        const encodedTitle = slugify(article.title, {
            replacement: "-",
            remove: /[^a-zA-Z0-9 -]/g,
            lower: true
        });
        return { ...article, encodedTitle: encodedTitle }
    })
    return encodedArticles
}

export function encodeSearchTerms (searchTerms) {
    return slugify(searchTerms, {
        replacement: "-",
        remove: /[^a-zA-Z0-9 -]/g,
        lower: true
    });
}
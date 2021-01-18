export default function (context) {
    if(!context.store.getters.loadedArticle) {
        context.redirect('/');
    }
}
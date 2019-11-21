export default {
    name: 'news-slide',
    props: {
        newsId: {
            required: true,
            type: Number,
        },
        title: {
            required: true,
            type: String,
        },

        img: {
            required: true,
            type: String,
        },
        category: {
            required: true,
            type: String,
        },
        date: {
            required: true,
            type: String,
        },
        newsRootUrl: {
            required: true,
            type: String,
        },
    },
}

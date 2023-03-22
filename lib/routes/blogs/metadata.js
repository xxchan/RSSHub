const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'http://muratbuffalo.blogspot.com/';
    const response = await got({
        method: 'get',
        url,
    });
    const $ = cheerio.load(response.data);
    const resultItem = $('article')
        .map((index, elem) => {
            elem = $(elem);
            const $link = elem.find('h3').find('a');
            const title = $link.text();
            const link = $link.attr('href');
            const description = elem.find('.snippet-item').text();

            return {
                title,
                link,
                description,
            };
        })
        .get();

    ctx.state.data = {
        title: 'Metadata',
        link: url,
        item: resultItem,
    };
};

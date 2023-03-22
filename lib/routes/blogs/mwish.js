const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://blog.mwish.me/archives/';
    const response = await got({
        method: 'get',
        url,
    });
    const $ = cheerio.load(response.data);
    const resultItem = $('.post-item')
        .map((index, elem) => {
            elem = $(elem);
            const $link = elem.find('a');
            const title = $link.text();
            const link = $link.attr('href');

            return {
                title,
                link,
            };
        })
        .get();

    ctx.state.data = {
        title: 'mwish',
        link: url,
        item: resultItem,
    };
};

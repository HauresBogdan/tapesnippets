const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const cheerio = require('cheerio');

router.post('/', async (req, res) => {
    try {
        if (!req.body.url){
            throw new Error('url query parameter required')
            return
        }

        // Fetch HTML content from URL passed in as query parameter:
        //console.log(req.body.url)
        const resp = await axios.get(req.body.url)
        const html = resp.data

        // This is an array of meta properties we want to scrape.
	//const props = ['og:title', 'og:description', 'og:image', 'og:url']

	$ = cheerio.load(html)
	/*const metaData = {}
        $('meta').each((i, meta) => {
            if (meta.attribs == null) // <meta> tag contains no attributes
                return true

            const attribs = meta.attribs
            const property = attribs.property
            if (property == null) // "property" attribute not found
                return true

            if (props.indexOf(property) === -1) // property is not among the ones that we want 
                return true

            const attribute = property.replace('og:', '')
            metaData[attribute] = attribs.content
        })*/


        const rating = $('span[itemprop="ratingValue"]').text();
       
        // return response:
        res.json({confirmation: 'success', data: rating})
    } catch (error) {
        // return error response:
        res.json({confirmation: 'fail', message: error.message})
    }
})

module.exports = router;
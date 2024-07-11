const axios = require('axios');
const cheerio = require('cheerio');

async function main(keyword) {
  const response = await axios.get('https://www.google.com/search?q=${keyword}&tbm=isch');
  const $ = cheerio.load(response.data);

  const results = [];
	$('table.RntSmf').each((i, elem) => {
		const imgSrc = $(elem).find('img').attr('src');
		const text = $(elem).find('span:first-child').text();
		results.push({ imgSrc, text });
	});

	return results;
}

const keyword = 'coffee';

main(keyword).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
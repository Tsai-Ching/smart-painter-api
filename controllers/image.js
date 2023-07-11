const fetch = require("node-fetch");
const {Configuration, OpenAIApi} = require("openai");


const handleApiCall = (req, res) => {
	const configuration = new Configuration({
		organization: "org-JmXBPuadpIdZyXuR8FmOqYFf",
		apiKey: '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',
	});

	const openai = new OpenAIApi(configuration);
	
	const predict = async function getUrl() {
		const response = await openai.createImage({
			prompt: 'a Vincent Van Gogh style paint of' + req.body.inputText,
			n: 1,
			size: "256x256",
		  });
		const image_url = response.data.data[0].url;
  		return(image_url);
	}
	predict()
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json(err))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(data => {
			res.json(data[0].entries)
		})
		.catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
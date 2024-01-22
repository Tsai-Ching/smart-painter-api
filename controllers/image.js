const fetch = require("node-fetch");
const {Configuration, OpenAIApi, OpenAI} = require("openai");


const handleApiCall = (req, res) => {
	const key = process.env.OPENAI_API_KEY;
	const configuration = new Configuration({
		organization: "org-JmXBPuadpIdZyXuR8FmOqYFf",
		apiKey: key,
	});

	const openai = new OpenAI()(configuration);
	
	const predict = async function getUrl() {
		const response = await openai.images.generate({
			prompt: 'a Vincent Van Gogh style paint of' + req.body.inputText,
			n: 1,
			size: "512x512",
		  });
		const image_url = response.data[0].url;
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
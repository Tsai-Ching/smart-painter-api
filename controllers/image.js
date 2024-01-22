const fetch = require("node-fetch");
const {Configuration, OpenAIApi} = require("openai");


const handleApiCall = (req, res) => {
	const configuration = new Configuration({
		organization: "org-JmXBPuadpIdZyXuR8FmOqYFf",
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);
	const apiUrl = 'https://api.openai.com/v1/models';
	const apiKey = process.env.OPENAI_API_KEY;
	const prompt = 'a Vincent Van Gogh style paint of' + req.body.inputText

	// const predict = async function getUrl() {
	// 	const response = await openai.createImage({
	// 		model: "dall-e-3",
	// 		prompt: 'a Vincent Van Gogh style paint of' + req.body.inputText,
	// 		n: 1,
	// 		size: "512x512",
	// 	  });
	// 	const image_url = response.data.data[0].url;
	// 	console.log(image_url)
  	// 	return(image_url);
	// }
	// predict()
	// 	.then(data => {
	// 		res.json(data);
	// 	})
	// 	.catch(err => res.status(400).json(err))
	const requestOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
		  model: "dall-e-2",
		  prompt: prompt,  // 使用您的實際輸入文字
		  n: 1,
		  size: "512x512",
		}),
	  };
	  
	  fetch(apiUrl, requestOptions)
		.then(response => {
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  return response.json();
		})
		.then(response => {
		  // 處理 API 回應
		  const image_url = response.data.data[0].url;
		  return(image_url);
		})
		.then(data => {
		  res.json(data);
		})
		.catch(err => res.status(400).json(err));
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
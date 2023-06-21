

const handleApiCall = (req, res) => {
	const requestOptions = {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Authorization': 'Key ' + '7307a83a63294f25b1a4569ecf26d727'
	    },
	    body: req.body.inputText
	};
	fetch(`https://api.clarifai.com/v2/models/general-image-generator-dalle-mini/versions/86c0ae39083e45a8bf96fde91f4e1952/outputs`, requestOptions)
	.then(data => data.json())
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
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
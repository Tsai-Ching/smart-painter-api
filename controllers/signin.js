const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if(!email || !password) {
		return res.status(400).json('Incorrect form submission')
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		bcrypt.compare(password, data[0].hash, function(err, result) {
			const isValid = result;
			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => res.json(user[0]))
				.catch(err => res.status(400).json('Unable to get user'))
			} else {
				res.status(400).json('Wrong credential');
			}
		});
	})
	.catch(err => res.status(400).json('Wrong credential'))
}

module.exports = {
	handleSignin: handleSignin
};


const handleRegister = (req, res, db, bcrypt) => {
	const {name, email, password} = req.body;
	const saltRounds = 10;
	const myPlaintextPassword = password;

	if(!name || !email || !password) {
		return res.status(400).json('Incorrect form submission')
	}

	bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
		if (err) {
			// 處理 bcrypt.hash 的錯誤
			res.status(400).json('unable to register');
		} else {
			db.transaction(function(trx) {
			  return trx.insert({email: email, hash: hash})
			    .into('login')
			    .returning('email')
			    .then(loginEmail => {
			    	return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0].email,
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					})
					.catch(err => res.status(400).json('unable to register'))
			    })
			    .then(trx.commit)
			    .catch(trx.rollback);
			})
		}
	});
}

module.exports = {
	handleRegister: handleRegister
};
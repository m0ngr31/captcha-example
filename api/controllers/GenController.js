/**
 * GenController
 *
 * @description :: Server-side logic for managing gens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	generate: function (req, res) {

		var possibilities = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var captcha = '';
		var sessionID = ''
		for (var i = 5; i > 0; --i) captcha += possibilities[Math.round(Math.random() * (possibilities.length - 1))];

		Gen.create({captcha: captcha}).exec(function createCapcha(err, gen) {
			if (err) { return res.send({'status': 'error'}); }
			else {
				sessionID = gen.sessionID;
				return res.send({'status': 'success', 'captcha': captcha, 'sessionID':  sessionID});
			}
		});
	}
};
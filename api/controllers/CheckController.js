/**
 * CheckController
 *
 * @description :: Server-side logic for managing checks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	check: function(req, res) {
		var sessionID = req.body.sessID;
		var attempt = req.body.captcha;

		Gen.findOne({sessionID: sessionID, captcha: attempt}).exec(function(err, gen) {
			if (!gen) {
				Gen.destroy({ sessionID: sessionID })
				return res.send({'status': 'error'});
			}
			else {
				Gen.destroy({ sessionID: sessionID, captcha: attempt })
				return res.send({'status': 'success'});
			}
		})
	}
	
};
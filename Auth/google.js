const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID =
	'482344023870-gcdtdp3a3rbq3luf0vfib6g2psh39mu2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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'; 

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:5000/auth/google/callback',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, profile);
			});
		}
	)
);

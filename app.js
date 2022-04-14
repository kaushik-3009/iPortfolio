app.get('/', async (req, res) => {
	const notes = await Note.find().sort('-createdAt');
	res.render('index', { notes: notes });
});

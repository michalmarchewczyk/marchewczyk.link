import ShortURL from './_database';

export function post(req, res) {
    const {url, slug} = req.body;
    
    const newURL = new ShortURL();
    newURL.url = url;
    if(slug) newURL.slug = slug;

    newURL.save((err) => {
        if(err) {
            let msgs = [];
            if (err.name === 'MongoError' && err.code === 11000) {
                msgs.push('this slug is already taken');
            }
            if(err.errors){
                msgs = [...msgs, ...Object.values(err.errors).map(e => e.properties.message)];
            }
            res.status(400);
            res.json({messages: msgs,});
            return;
        }
        res.status(201);
        res.json(newURL);
    });
}

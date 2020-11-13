import ShortURL from './_database';

export async function get(req, res) {
    const {slug} = req.params;
    
    const shortURL = await ShortURL.findOne({slug});
    
    if(!shortURL){
        res.sendStatus(404);
        return;
    }
    
    res.json(shortURL);
}


export async function put(req, res) {
    const {slug} = req.params;
    const {token, url} = req.body;
    
    const shortURL = await ShortURL.findOne({slug});
    
    if(!shortURL){
        res.sendStatus(404);
        return;
    }
    
    if(!shortURL.editToken || shortURL.editToken !== token){
        res.sendStatus(403);
        return;
    }
    
    shortURL.url = url;
    
    shortURL.save((err) => {
        if(err) {
            let msgs = [];
            if(err.errors){
                msgs = [...msgs, ...Object.values(err.errors).map(e => e.properties.message)];
            }
            res.status(400);
            res.json({messages: msgs,});
            return;
        }
        res.status(200);
        res.json(shortURL);
    });

}

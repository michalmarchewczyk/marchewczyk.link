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

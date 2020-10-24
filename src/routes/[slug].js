import ShortURL from './api/_database';

export async function get(req, res) {
    const {slug} = req.params;
    
    const shortURL = await ShortURL.findOne({slug});
    
    if(!shortURL || !shortURL.url){
        res.sendStatus(404);
        return;
    }
    
    res.redirect(shortURL.url);
}

import mongoose from 'mongoose';
import cryptoRandomString from 'crypto-random-string';
import validator from 'validator';


(async () => {
    
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    
})();


const ShortURL = new mongoose.Schema({
    slug: {
        type: String,
        default: () => cryptoRandomString({length: 10, type: 'alphanumeric'}),
        unique: true,
        trim: true,
        minlength: [2, 'slug is too short'],
        maxlength: [50, 'slug is too long'],
        validate: {
            validator: (v) => {
                return validator.isAlphanumeric(v);
            },
            message: props => `slug must contain only alphanumeric characters`,
        }
    },
    url: {
        type: String,
        required: [true, 'url is required'],
        set: (v) => {
            if(!validator.isURL(v)) return v;
            const r = new RegExp('^(?:[a-z]+:)?//', 'i');
            return r.test(v) ? v : `http://${v}`;
        },
        validate: {
            validator: (v) => {
                return validator.isURL(v);
            },
            message: props => `${props.value} is not a valid url`,
        },
    },
    date: { type: Date, default: Date.now },
});


export default mongoose.model('ShortURL', ShortURL);

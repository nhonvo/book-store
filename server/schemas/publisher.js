var mongoose = require('mongoose');
var publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
},{
    timestamps:true
});
publisherSchema.virtual('publish',{
    ref:'book',
    localField:'_id',
    foreignField:'publisher'
})
publisherSchema.set('toJSON',{virtuals:true})
publisherSchema.set('toObject',{virtuals:true})
module.exports = new mongoose.model('publisher', publisherSchema);//->books
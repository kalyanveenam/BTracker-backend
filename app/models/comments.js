let mongoose = require('mongoose')
let commentSchema = mongoose.Schema;
let commSchema = new commentSchema(
    {
        username: {
            type: String,
       
        },
        comment: {
            type: String
        },
        bugId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'bugSchema'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('comments',commSchema)
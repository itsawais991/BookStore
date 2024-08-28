import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        tittle:{
            type: String,
            required: true,
        },
        auther:{
            type: String,
            required: true,
        },
        tittle:{
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
       }
);

export const Book = mongoose.model('cat', {name: String}); 
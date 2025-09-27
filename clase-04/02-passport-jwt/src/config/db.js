import mongoose from 'mongoose';

export default async function connectDB(url) {
    await mongoose.connect(url, {
        dbName: 'integrative_practice'
    })
}
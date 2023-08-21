const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
      
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected succesfully...');
       
    } catch (err) {
        console.log('Connection to db failed', err.message)
    }
};

dbConnect();
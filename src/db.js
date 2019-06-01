import mongoose from 'mongoose';

export default (callback) => {
  mongoose.promise = global.Promise;
  const uristring = 'mongodb://localhost/authsearch';
  mongoose.connect(uristring, {
    useNewUrlParser: true,
  }, (err) => {
    if (err) {
      console.log(`ERROR connecting to: ${uristring}. ${err}`);
    } else {
      console.log(`Succeeded connected to: ${uristring}`);
    }
  });
  callback();
};

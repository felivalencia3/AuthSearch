import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;
const UserSchema = new Schema({
  displayName: String,
  id: Number,
});
UserSchema.methods.toJSON = () => ({
  id: this.id,
  displayName: this.displayName,
});
mongoose.model('User', UserSchema);

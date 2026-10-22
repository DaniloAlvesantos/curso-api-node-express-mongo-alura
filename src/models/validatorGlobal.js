import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
    validator: (value) => value.trim() !== "",
    message: 'The field {PATH} is required',
})
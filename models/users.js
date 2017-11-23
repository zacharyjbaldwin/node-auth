var bcryptjs = require('bcryptjs');
var mongoose = require('mongoose');

var userSchemaOptions = {
    emailAndUsernameOptions: {
        required: true,
        trim: true,
        type: String,
        unique: true
    },
    passwordOptions: {
        required: true,
        type: String
    }
};

var UserSchema = new mongoose.Schema({
    email: userSchemaOptions.emailAndUsernameOptions,
    username: userSchemaOptions.emailAndUsernameOptions,
    password: userSchemaOptions.passwordOptions
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({
        email: email
    }).exec((err, user) => {
        if (err) {
            return callback(err);
        } else if (!user) {
            var err = new Error('User not found!');
            err.status = 400;
            return callback(err);
        }

        bcryptjs.compare(password, user.password, (err, result) => {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
    })
};

UserSchema.pre('save', next => {
    var user = this;
    bcryptjs.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
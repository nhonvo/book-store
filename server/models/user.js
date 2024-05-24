var SchemaUser = require('../schemas/user')

module.exports = {
    getall: function (query) {
        var sort = {};
        var Search = {};
        if (query.sort) {
            if (query.sort[0] == '-') {
                sort[query.sort.substring(1)] = 'desc';
            } else {
                sort[query.sort] = 'asc';
            }
        }
        if (query.key) {
            Search.userName = new RegExp(query.key, 'i');
        }
        var limit = parseInt(query.limit) || 2;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
        return SchemaUser.find(Search).select('userName email role').sort(sort).limit(limit).skip(skip).exec();
    },
    getOne: function (id) {
        return SchemaUser.findById(id);
    },
    getByName: function (name) {
        return SchemaUser.findOne({ userName: name }).exec();
    },
    createUser: function (user) {
        return new SchemaUser(user).save();
    },
    login: function (userName, password) {
        return SchemaUser.checkLogin(userName, password);
    },
    getByEmail: function (email) {
        return SchemaUser.findOne({ email: email }).exec();
    },
    getByTokenForgot: function (token) {
        return SchemaUser.findOne(
            {
                tokenForgot: token,
                tokenForgotExp: { $gte: Date.now() }
            }
        ).exec();
    },
    findByIdAndUpdate: function (id, user){
        return SchemaUser.findByIdAndUpdate(id, user, { returnDocument: 'after' });
    },
    findByIdAndDelete: async function(id){
        return await SchemaUser.findByIdAndDelete(id);
    }
}
var SchemaAuthor = require('../schemas/author');

module.exports = {
    // Get all authors with pagination, sorting, and search, excluding deleted ones
    getAll: function (query) {
        var sort = {};
        var search = {  }; // Only retrieve non-deleted authors
        if (query.sort) {
            if (query.sort[0] === '-') {
                sort[query.sort.substring(1)] = 'desc';
            } else {
                sort[query.sort] = 'asc';
            }
        }
        if (query.key) {
            search.name = new RegExp(query.key, 'i');
        }
        var limit = parseInt(query.limit) || 2;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
        return SchemaAuthor.find(search)
                         .select('name')
                         .sort(sort)
                         .limit(limit)
                         .skip(skip)
                         .exec();
    },
    // Get one author by ID, excluding deleted ones
    getOne: function (id) {
        return SchemaAuthor.findOne({ _id: id }).populate('name'); // Populate author information
    },
    // Create a new author
    createAuthor: function (author) {
        return new SchemaAuthor(author).save();
    },
    // Find a author by ID and update
    findByIdAndUpdate: function (id, author) {
        return SchemaAuthor.findByIdAndUpdate(id, author, { returnDocument: 'after' });
    },
    // Soft delete a author by ID
    findByIdAndDelete: async function (id) {
        return SchemaAuthor.findByIdAndDelete(id); // Set isDeleted to true
    }
};

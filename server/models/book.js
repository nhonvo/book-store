var SchemaBook = require('../schemas/book');

module.exports = {
    // Get all books with pagination, sorting, and search, excluding deleted ones
    getAll: function (query) {
        var sort = {};
        var search = { isDeleted: false }; // Only retrieve non-deleted books
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
        return SchemaBook.find(search)
                         .select('name year author publisher')
                         .populate('author', 'name') // Populate author information
                         .populate('publisher', 'name') // Populate author information
                         .sort(sort)
                         .limit(limit)
                         .skip(skip)
                         .exec();
    },
    // Get one book by ID, excluding deleted ones
    getOne: function (id) {
        return SchemaBook.findOne({ _id: id, isDeleted: false }).populate('author', 'name'); // Populate author information
    },
    // Create a new book
    createBook: function (book) {
        return new SchemaBook(book).save();
    },
    // Find a book by ID and update
    findByIdAndUpdate: function (id, book) {
        return SchemaBook.findByIdAndUpdate(id, book, { returnDocument: 'after' });
    },
    // Soft delete a book by ID
    findByIdAndDelete: async function (id) {
        return SchemaBook.findByIdAndUpdate(id, { isDeleted: true }, { new: true }); // Set isDeleted to true
    }
};

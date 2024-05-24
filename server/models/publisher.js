var SchemaPublisher = require('../schemas/publisher');

module.exports = {
    // Get all publishers with pagination, sorting, and search, excluding deleted ones
    getAll: function (query) {
        var sort = {};
        var search = {  }; // Only retrieve non-deleted publishers
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
        return SchemaPublisher.find(search)
                         .select('name')
                         .sort(sort)
                         .limit(limit)
                         .skip(skip)
                         .exec();
    },
    // Get one publisher by ID, excluding deleted ones
    getOne: function (id) {
        return SchemaPublisher.findOne({ _id: id }).populate('name'); // Populate publisher information
    },
    // Create a new publisher
    createPublisher: function (publisher) {
        return new SchemaPublisher(publisher).save();
    },
    // Find a publisher by ID and update
    findByIdAndUpdate: function (id, publisher) {
        return SchemaPublisher.findByIdAndUpdate(id, publisher, { returnDocument: 'after' });
    },
    // Soft delete a publisher by ID
    findByIdAndDelete: async function (id) {
        return SchemaPublisher.findByIdAndDelete(id); // Set isDeleted to true
    }
};

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter = () => {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((ele) => delete queryObj[ele]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        //https://thecodebarbarian.com/how-find-works-in-mongoose.html => how find works
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = APIFeatures;
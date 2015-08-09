Index = function(resources) {
    this.index = lunr(function () {
        this.ref("id");
        this.field('province');
        this.field('city');
        this.field('suburb');
        this.field('category');
        this.field('services');
        this.field('name');
    })

    for (var idx in resources) {
        var r = resources[idx];
        this.index.add({
            id: idx,
            name: r["Name"],
            category: r["Category"],
            services: r["Services"],
            province: r["Province"], 
            city: r["City"],
            suburb: r["Suburb"],
        });
    }
}

Index.prototype.filter_results = function(query) {
    var results = this.index.search(query);
    var results_set = {};
    for (var idx in results) {
        results_set[results[idx]["ref"]] = "";
    }

    return results_set;
}

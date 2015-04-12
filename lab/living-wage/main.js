var o;
var days_in_month = 22;
var day_max_threshold = 350;
var day_min_threshold = 50;
var month_min_threshold = 1000;
var month_max_threshold = 10000;

var nearest10 = function(val) {
    return 10 * Math.floor(val / 10);
}

var ds = new Miso.Dataset({
    url : "responses.csv",
    delimiter : ",",
    columns : [{
        name : "dayrate", 
        type : "number", 
        before : function(v) {
            v = Math.abs(v);
            if (v <= day_min_threshold) {
                return null;
            } else if (v >= month_max_threshold) {
                return null;
            } else if (v >= month_min_threshold) {
                return nearest10(v / days_in_month);
            } else if (v <= day_max_threshold) {
                return nearest10(v);
            } else {
                return null;
            }
        }
    }]
});

var is_province = function(province) {
    return function(row) {
        return row.province == province;
    }
}

var is_not_province = function(province) {
    return function(row) {
        return row.province != province;
    }
}

var sort_by_dayrate = function(r1, r2) {
    return r1.dayrate - r2.dayrate;
}

var normalise = function(ds) {
    ds.addColumn({
        type: 'number',
        name: 'normalised'
    })
    total = ds.sum('count')
    ds.update(function(r) {
        r.normalised = r.count / total;
        return r;
    });
}

ds.fetch({
    success : function(a, b) {
        var ds2 = this
            .where(function(r) { return r.dayrate != null})
            .where({
                rows: is_province("Western Cape")
            })
            .countBy("dayrate")
            .sort(sort_by_dayrate)

        var ds3 = this
            .where(function(r) { return r.dayrate != null})
            .where({
                rows: is_not_province("Western Cape")
            })
            .countBy("dayrate")
            .sort(sort_by_dayrate)

        normalise(ds2); 
        normalise(ds3); 
        var count_col = ds2._columnPositionByName.count;
        var norm_col = ds2._columnPositionByName.normalised;
        var dayrate_col = ds2._columnPositionByName.dayrate;
        var data1 = ['x1'].concat(ds2._columns[norm_col].data);
        var data2 = ['x2'].concat(ds3._columns[norm_col].data);

        var chart = c3.generate({
            data: {
                columns: [
                    data2,
                    data1 
                ],
                types: {
                    x1: 'area-spline',
                    x2: 'area-spline'
                },
                names: {
                    x1: "Western Cape",
                    x2: "Outside of Western Cape",
                },
                colors: {
                    x2: "rgb(187, 35, 62)"
                }
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ds2._columns[dayrate_col].data
                }
            }
        });

    }
})

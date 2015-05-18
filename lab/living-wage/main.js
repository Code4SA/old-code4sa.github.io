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

var all_provinces = function() {
    return function(row) {
        return true;
    }
}

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
    return parseInt(r1.dayrate) - parseInt(r2.dayrate);
}

var normalise = function(ds) {
    ds.addColumn({
        type: 'number',
        name: 'normalised'
    })
    total = ds.sum('count')
    ds.update(function(r) {
        r.normalised = Math.round(r.count / total * 100) / 2;
        return r;
    });
}

var histogram = function(ds, filter) {
    var ds = ds
        .where(function(r) { return r.dayrate != null})
        .where({ rows: filter })
        .countBy("dayrate")
        .sort(sort_by_dayrate)
    normalise(ds);
    return ds
}

var o;
ds.fetch({
    success : function(a, b) {
        var provinces = ["Western Cape", "Eastern Cape", "Northern Cape", "Free State", "KwaZulu-Natal", "Gauteng", "North West", "Mpumalanga", "Limpopo"];

        var data = []
        var types = {}
        var names = {}
        for (idx in provinces) {
            var idx = parseInt(idx);
            var label = provinces[idx];
            var ds = histogram(this, is_province(label))
            var data_label = "x" + idx;
            var province_data = [data_label].concat(ds._column("normalised").data);

            data.push(province_data);
            types[data_label] = "area-spline";
            names[data_label] = label;
        } 
        var all_ds = histogram(this, all_provinces())
        data.push(["x10"].concat(all_ds._column("normalised").data));
        types["x10"] = "area-spline";
        names["x10"] = "National";

        var dayrate_col = all_ds._column("dayrate").data;
        var chart = c3.generate({
            bindto: "#chart1",
            data: {
                columns: data,
                types: types,
                names: names,
                colors: {
                    x10: "rgb(187, 35, 62)"
                }
            },
            axis: {
                x: {
                    type: 'category',
                    categories: dayrate_col,
                    label: "Daily wage (Rands)"
                },
                y: {
                    label: "% of respondents"
                }
            },
            tooltip: {
              format: {
                title: function (idx) { return "Daily Rate: R" + dayrate_col[idx]; },
                value: function (value, ratio, id, index) { return value + "%"; }
              }
            }
        });
    }
})

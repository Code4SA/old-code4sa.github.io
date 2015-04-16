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
        var provinces = ["Western Cape", "Eastern Cape", "Northern Cape", "Free State", "KwaZulu Natal", "Gauteng", "North West", "Mpumalanga", "Limpopo"];
        for (idx in provinces) {
            var idx = parseInt(idx);
            var label = provinces[idx];
            var ds2 = histogram(this, is_province(label))
            var ds3 = histogram(this, is_not_province(label))
            o = ds2;

            var dayrate_col = ds2._column("dayrate").data;
            var data1 = ["x1"].concat(ds2._column("normalised").data);
            var data2 = ["x2"].concat(ds3._column("normalised").data);
        
            var chart = c3.generate({
                bindto: "#chart" + (idx + 1),
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
                        x1: label,
                        x2: "Outside of " + label
                    },
                    colors: {
                        x2: "rgb(187, 35, 62)"
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
                    title: function (idx) { console.log(dayrate_col); return idx + "Daily Rate: R" + dayrate_col[idx]; },
                    value: function (value, ratio, id, index) { return value + "%"; }
                  }
                }
            });
        }
    }
})

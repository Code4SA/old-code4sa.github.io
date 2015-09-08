var width = 1200;
var height = 800;
var margin = {top: 40, right: 40, bottom: 40, left:60}
var x2js = new X2JS();

var start_date = new Date(2010, 6, 1)
var end_date = new Date(2016, 1, 1)

var date_format = d3.time.format("%Y-%m-%d")
var get_start_date = function(d) {
    var activity_date = d["activity-date"]
    console.log(activity_date)
    for (i in [0, 1]) {
        if (
            activity_date[i] != undefined &&
            (
                activity_date[i]["_type"] == "start-actual" ||
                activity_date[i]["_type"] == "start-planned"
            )
        ) {
            return date_format.parse(d["activity-date"][i]["_iso-date"])
        }
    }
    return date_format.parse(d["activity-date"]["_iso-date"])
}

var get_country = function(d) {
    var country = "";
    if (d['recipient-country'] != undefined)
        country = d['recipient-country']._code;
    return country;
}

var get_organisation = function(d) {
    if (d['participating-org'].__text != undefined)
        return d['participating-org'].__text
    if (d['transaction']['receiver-org'] != undefined)
        return d['transaction']['receiver-org'].__text
    return "No organisation found"
}

var rand_pound = 19;
var dollar_pound = rand_pound / 14;
var convert_to_pounds = function(value) {
    var val = parseInt(value["__text"])
    if (value["_currency"] == "GBP" || value["_currency"] == undefined)
        return val
    else if (value["_currency"] == "ZAR")
        return val / rand_pound;
    else if (value["_currency"] == "USD") {
        return val / dollar_pound
    } else {
        console.log(value)
        return 20000
    }
}

var get_budget = function(d) {
    if (d["transaction"] != undefined) {
        if (d["transaction"]["value"] != undefined) {
            var transaction = d["transaction"]["value"]
            return convert_to_pounds(transaction)
        }
        else if (d["transaction"].length != undefined) {
            var total = 0;
            for (el in d["transaction"]) {
                var transaction = d["transaction"][el]
                total += convert_to_pounds(transaction["value"])
            }
            return total
        }
    }
    else {
        var budget = d["budget"]["value"]
        return convert_to_pounds(budget)
    }
}

var color_scale = d3.scale.ordinal()
    .domain(["ZA", "GB", "TZ", "UG", "NG", "RW", "KE", "CM", "MA", "SL"])
    .range(["red", "blue", "green", "pink", "orange", "grey", "yellow", "purple", "cyan", "lightgreen"])
var time_scale = d3.time.scale().domain([start_date, end_date]).range([0, width])
var x_axis = d3.svg.axis()
    .scale(time_scale)
    .orient('bottom')
    .ticks(d3.time.months, 6)
    .tickFormat(d3.time.format('%b %Y'))
    .tickSize(0.4)
    .tickPadding(8);

var svg = d3.select('#chart').append('svg')
    .attr('class', 'chart')
    .attr("viewBox", "0 0 1500 800")
    .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


var paint_circles = function(d) {
    var country_code = get_country(d)
    d3.selectAll("circle")
        .each(function() {
            var me = d3.select(this)
            if (me.attr("data-code") == country_code) {
                me.classed("selected", true)
            }
            else
                me.classed("selected", false)
        })
}

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        var max_length = 150;

        var description = d.description;
        if (description.length > max_length)
            description = description.substring(0, max_length) + '...';

        return "<dl class='dl-horizontal'>" +
            "<dt>Title:</dt><dd>" + d.title + "</dd>" +
            "<dt>Value:</dt><dd>&pound;" + d3.format(',0d')(get_budget(d)) + "</dd>" +
            "<dt>Start date:</dt><dd>" + d3.time.format("%Y-%m-%d")(get_start_date(d)) + "</dd>" +
            "<dt>Recipient:</dt><dd>" + get_organisation(d) + "</dd>" +
            "<dt>Country:</dt><dd>" + get_country(d) + "</dd>" +
        "</dl>" +
        "<div>" + description + "</div>"
    })

svg.call(tip);

d3.xml("indtrust-activities.xml", function(xml) {
    
    var json = x2js.xml2json(xml)
    var data = json["iati-activities"]["iati-activity"]
    var max_val = d3.max(data, get_budget)
    var money_scale = d3.scale.linear().domain([0, max_val]).range([height - margin.top, 0 + margin.bottom])
    var y_axis = d3.svg.axis()
        .scale(money_scale)
        .orient('left')
        .tickSize(0)
        .tickPadding(8);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
        .call(x_axis);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(0, ' + -margin.bottom + ')')
        .call(y_axis)

    svg
        .append("g")
            .attr("transform", "translate(0, " + -margin.bottom + ")")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("r", 5)
                .attr("cx", function(d) {
                    return time_scale(get_start_date(d))
                })
                .attr("cy", function(d) {
                    return money_scale(get_budget(d))
                    
                })
                .attr("data-code", get_country)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('mousemove', paint_circles)
    d3.selectAll("#countries input").on("click", function() {
        var me = d3.select(this);
        d3.selectAll("circle")
            .each(function() {
                var me2 = d3.select(this)
                if (me.attr("data-code") == me2.attr("data-code"))
                    me2.classed("selected", true)
                else
                    me2.classed("selected", false)
            })
    })
})



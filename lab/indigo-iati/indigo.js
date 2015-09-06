var width = 1200;
var height = 800;
var margin = {top: 40, right: 40, bottom: 40, left:60}
var x2js = new X2JS();

var start_date = new Date(2010, 6, 1)
var end_date = new Date(2016, 1, 1)

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

var get_country_color = function(d) {
    var country = get_country(d);
    if (country == "UG")
        return "red"
    return "#eee"

}

var get_budget = function(d) {
    if (d["budget"] == undefined)
        return d["transaction"]["value"]
    return money_scale(parseInt(d["budget"]["value"]["__text"]))
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

var money_scale = d3.scale.linear().domain([0, 60000]).range([height - margin.top, 0 + margin.bottom])
var svg = d3.select('#chart').append('svg')
    .attr('class', 'chart')
    .attr("viewBox", "0 0 1500 800")
    .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

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
            "<dt>Value:</dt><dd>&pound;" + d.budget.value + "</dd>" +
            "<dt>Recipient:</dt><dd>" + get_organisation(d) + "</dd>" +
            "<dt>Country:</dt><dd>" + get_country(d) + "</dd>" +
        "</dl>" +
        "<div>" + description + "</div>"
    })

svg.call(tip);

d3.xml("indtrust-activities.xml", function(xml) {
    
    var json = x2js.xml2json(xml)
    var data = json["iati-activities"]["iati-activity"]
    svg
        .append("g")
            .attr("transform", "translate(0, " + -margin.bottom + ")")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("r", 5)
                .attr("cx", function(d) {
                    if (d["activity-date"][0])
                        return time_scale(Date.parse(d["activity-date"][0]["_iso-date"]))
                    return time_scale(Date.parse(d["activity-date"]["_iso-date"]))
                })
                .attr("cy", function(d) {
                    return get_budget(d)
                    
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
                console.log(me.attr("data-code"))
                if (me.attr("data-code") == me2.attr("data-code"))
                    me2.classed("selected", true)
                else
                    me2.classed("selected", false)
            })
    })
})



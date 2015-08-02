var height = 500;
var width = 500;
var padding = 20;
var radius = 1;

var data_statics = {
    fullname : function(obj) {
        return obj.title + ' ' + obj.first_name + ' ' + obj.surname;
    },
    escaped_name : function(obj) {
        var name = this.fullname(obj);
        name = name.replace(/ /g, '_');
        return name.toLowerCase();
    }
}

var get_meetings = function(data, committee_name) {
    
    var meetings = data.filter(function(el) { return el['Name Committee'] == committee_name; })
    var hash = {};
    for (i in meetings) {
        var meeting = meetings[i];
        if (hash[meeting.ISSID] == undefined) {
            hash[meeting.ISSID] = [];
        }

        hash[meeting.ISSID].push(meeting);
    }
    
    meetings_arr = [];
    for (var el in hash) {
        meetings_arr.push(hash[el]);
    }
    return meetings_arr;
}

var get_mp_counts = function(data) {
    var mp_hash = {};
    var mp_counts = [];

    for (var i in data) {
        var obj = data[i];
        var fullname = data_statics.fullname(obj);
        if (mp_hash[fullname] == undefined) {
            mp_hash[fullname] = {
                x : 0,
                y : 0,
                data : obj
            }
        }
        if (obj.attendance == 'A') {
            mp_hash[fullname]['x']++;
        } else {
            mp_hash[fullname]['y']++;
        }
    }

    for (mp in mp_hash) {
        mp_counts.push([mp, mp_hash[mp]]);
    }

    return mp_counts;
}

var draw_scatterplot = function(node, data) {
    var get_x = function(el) { return el[1].x; };
    var get_y = function(el) { return el[1].y; };
    var min_x = d3.min(data, get_x)
    var max_x = d3.max(data, get_x)
    var min_y = d3.min(data, get_y)
    var max_y = d3.max(data, get_y)

    x_scale = d3.scale.linear()
        .domain([min_x, max_x])
        .range([0, width]);

    y_scale = d3.scale.linear()
        .domain([min_y, max_y])
        .range([height, 0]);
    svg = node.append('svg')
        .attr('width', width + 2 * padding)
        .attr('height', height + 2 * padding)

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('r', radius)
            .attr('cx', function(el) { return x_scale(get_x(el)) + padding; })  
            .attr('cy', function(el) { return y_scale(get_y(el)) + padding; })
            .attr('class', function(el) {
                return 'mp ' + el[1].data.party_affiliation;
            })
            .on('mousemove', function(el) {
                console.log(el[0]);
                console.log("Meetings attended: " + el[1].y);
                console.log("Meetings not attended: " + el[1].x);
            })

    svg.append('line')
        .attr('x1', 0 + padding - radius)
        .attr('y1', height + padding + radius)
        .attr('x2', width)
        .attr('y2', height + padding + radius)
        .classed('x-axis axis', true)


    svg.append('line')
        .attr('x1', 0 + padding - radius)
        .attr('x2', 0 + padding - radius)
        .attr('y1', 0 + padding)
        .attr('y2', height + padding)
        .classed('y-axis axis', true)

    svg.append('g')
        .append('text')
            .classed('axis-text', true)
            .text('Number of meetings not attended')
            .attr('x', width/2)
            .attr('y', height + padding)

    svg.append('g')
        .attr('transform', 'rotate(90)')
        .append('text')
            .classed('axis-text', true)
            .text('Number of meetings')
            .attr('x', width)
            .attr('y', height + padding)
}

var draw_meeting = function(el) {
    var node = d3.select(this);
    var width = 130, height = 144, padding = 20;
    node.append('text').text(new Date(el[0]['Date']).toDateString());
    var svg = node.append('svg')
        .attr('width', width + padding)
        .attr('height', height + padding)

    var layout_slice = function(node, data, cols) {
        var count = 0;
        var radius = 4;
        var spacing = 2 * radius + 10;
        for (var i = 0; i < 12; i++) {
            obj = data[i];
            var row = Math.floor(count / cols)
            var col = count % cols;
            var circle = node.append('circle')
                .attr('cx', col * spacing + radius * 2)
                .attr('cy', row * spacing + radius * 2 + 7)
                .attr('r', radius)
                .data([obj])

            if (obj != undefined) {
                var escaped_name = data_statics.escaped_name(obj);
                circle
                    .classed('participant', true)
                    .classed(escaped_name, true)
                    .classed(obj.party_affiliation, true)
                    .on('mousemove', function(el) {
                        var escaped_name = data_statics.escaped_name(el);
                        d3.selectAll('.' + escaped_name).classed('selected', true);
                        d3.select('#mp-details h2').text(data_statics.fullname(el));
                        d3.select('#mp-details h3 #party').text(el.party_affiliation);
                    })
                    .on('mouseout', function(el) {
                        d3.selectAll('.participant').classed('selected', false);
                    });
            } else {
                circle.classed('participant empty', true)
            }
            
            count++;            
        }
        return node.selectAll('circle.participant')
    }
    var func_statefilter = function(state) {
        return function(item) {
            return item.attendance == state;
        }
    }
    var g1 = svg.append('g').attr('class', 'attendance')
    var g2 = svg.append('g').attr('class', 'attendance')
    var g3 = svg.append('g').attr('class', 'attendance')
    var g4 = svg.append('g').attr('class', 'attendance')
    var g5 = svg.append('g').attr('class', 'attendance').style('display', 'none');

    var absents = layout_slice(g1, el.filter(func_statefilter('A')), 4);
    var arrived_late = layout_slice(g2, el.filter(func_statefilter('L')), 4);
    var departed_early = layout_slice(g3, el.filter(func_statefilter('DE')), 4);
    var present = layout_slice(g4, el.filter(func_statefilter('P')), 4);
    var lde = layout_slice(g5, el.filter(func_statefilter('LDE')), 4);

    g1.append('text').text('Absent');
    g2.append('text').text('Arrived Late');
    g3.append('text').text('Left Early');
    g4.append('text').text('Present');
    g1.attr('transform', 'translate(0, 20)')
    g2.attr('transform', 'translate(80, 20)')
    g3.attr('transform', 'translate(0, 100)')
    g4.attr('transform', 'translate(80, 100)')

    absents.classed('absent', true);
    arrived_late.classed('arrived-late', true);
    departed_early.classed('departed-early', true);
    present.classed('present', true);

}

var draw_meetings = function(node, meetings) {
    node.append('h1').text(meetings[0][0]['Name Committee'])
    node.selectAll('.meeting')
        .data(meetings)
        .enter(meetings)
        .append('div')
            .classed('meeting', true)
            .each(draw_meeting)
}

d3.csv('mps.csv', function(data) {
    //var mp_counts = get_mp_counts(data);
    //draw_scatterplot(d3.select('#content1'), mp_counts);
    //var meetings = get_meetings(data, 'Portfolio Committee on Agriculture, Forestry and Fisheries');
    var meetings = get_meetings(data, 'Portfolio Committee on Rural Development and Land Reform');
    //var meetings = get_meetings(data, 'Portfolio Committee on Higher Education and Training');
    draw_meetings(d3.select('#content2'), meetings);
})

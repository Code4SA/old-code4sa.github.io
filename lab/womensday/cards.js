var category_filter = "",
    query_text = ""

var create_list = function(node, resources) {
    var cards = node.selectAll('.card')
        .data(resources)
        .enter()
        .append('div')
            .classed('card', true)
            .append('dl')

    cards.append('dt').text('Name');
    cards.append('dd').text(function(el) { return el['Name']; });
    cards.append('dt').text('Suburb');
    cards.append('dd').text(function(el) { return el['Suburb']; });
    cards.append('dt').text('City');
    cards.append('dd').text(function(el) { return el['City']; });
    cards.append('dt').text('Province');
    cards.append('dd').text(function(el) { return el['Province']; });
    cards.append('dt').text('Category');
    cards.append('dd').text(function(el) { return el['Category']; });
    cards.append('dt').text('Services');
    cards.append('dd').text(function(el) { return el['Services']; });
    cards.append('dt').text('Address');
    cards.append('dd').text(function(el) { return el['Where are they?']; });
    cards.append('dt').text('Crisis Line');
    cards.append('dd')
        .append('a')
            .attr('href', function(el) {
                return 'tel:' + el['Crisis/Counselling Line'];
            })
            .text(
                function(el) { return el['Crisis/Counselling Line'];
            });
    cards.append('dt').text('Telephone');
    cards.append('dd')
        .append('a')
            .attr('href', function(el) {
                return 'tel:' + el['Telephone'];
            })
            .text(
                function(el) { return el['Telephone'];
            });
    cards.append('dt').text('Web Contact');
    cards.append('dd').text(function(el) { return el['Web contact']; });
}

var filter_list = function(node, index) {
    var query = (query_text + " " + category_filter).trim();

    if (query != '') {
        var results = index.filter_results(query);

        var not_result = d3.selectAll(".card")
            .filter(function(el, idx) {
                if (results[idx] != undefined)
                    return false
                return true;
            })

        not_result.style('display', 'none');

        var cards = d3.selectAll(".card")
            .filter(function(el, idx) {
                if (results[idx] != undefined)
                    return true
                return false;
            })
        cards.style('display', 'block');
    } else {
        d3.selectAll('.card').style('display', 'block');
    }

}

d3.csv('data.csv', function(resources) {

    var index = new Index(resources);
    var root_node = d3.select('#list');

    d3.select("#place_filter").on("input", function(d) {
        query_text =  d3.event.target.value;
        filter_list(root_node, index);
    });

    d3.selectAll(".icon").on("click", function(el) {
        d3.selectAll(".icon").classed("selected", false);
        category_filter = d3.select(this).attr("data-category")
        d3.select(this).classed("selected", true);
        filter_list(root_node, index);
    });

    list_of_resources = create_list(root_node, resources);
     
});


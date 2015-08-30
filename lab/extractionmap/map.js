var MapObj = function(root_node) {
    this.selected = false;
    this.mapnode = root_node;
    this.pointers = new Pointers(root_node);
    this.pointers.hide_all();

    this.enable_mouseover();
    this.enable_click();
}

MapObj.prototype = {
    enable_mouseover : function() {
        var me = this;
        this.mapnode.selectAll('.story-country').on('mouseover', function(el) {
            var country = this.id;
            me.process_mouseover(country)
        });
    },
    disable_mouseover : function() {
        this.mapnode.selectAll('.story-country').on('mouseover', null);
    },
    enable_click : function() {
        var me = this;
        this.mapnode.selectAll('.story-country').on('click', function() {
            var country = d3.select(this);
            var is_pressed = country.classed('selected');

            d3.selectAll('.story-country').classed('selected', false);
            if (is_pressed) {
                me.enable_mouseover();
            } else {
                country.classed('selected', true);
                me.disable_mouseover();
                me.process_mouseover(this.id);
            }
        });
    },
    process_mouseover : function(country) {
        var country_obj = d3.select('#' + country);
        var infobox = d3.select('#infobox');
        this.pointers.hide_all();
        this.pointers.display_pointer(country);
        infobox.select('#title').text(country_obj.attr('data-name'));
        if (data[country] != undefined) {
            infobox.select('.body-text').text(data[country]['body']); 
            infobox.select('image').attr('xlink:href', data[country]['image']);
            infobox.select('#read-more')
                .attr('xlink:href', data[country]['url'])
                .attr('xlink:show', 'new')
        }
    }
}

var Pointers = function(root_node) {
    this.root_node = root_node;
    this.pointers = this.root_node.selectAll('.pointer');    
}

Pointers.prototype = {
    hide_all : function() {
        this.pointers.classed('hidden', true);
    },
    display_pointer : function(country) {
        var pointer = this.root_node.select('#' + country + '_' + 'pointer');
        pointer.classed('hidden', false);
    }
}


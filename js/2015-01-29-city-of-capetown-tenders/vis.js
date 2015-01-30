var chart;
var departments = [
    "Community Services",
    "Compliance and Auxiliary Services",
    "Corporate Services",
    "Health",
    "Eco, Env & Spatial Planning",
    "Finance",
    "Human Settlements",
    "Utility Services",
    "Office of City Manager",
    "Safety & Security",
    "Social Development",
    "Tourism, Events & Marketing",
    "Transport for Cape Town",
    "Transport, Roads & Stormwater",
    "Unknown"
]

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function BubbleChart(data) {
  var max_amount;
  this.data = data;
  this.width = 1000;
  this.height = 650;
  this.tooltip = CustomTooltip("tenders_tooltip", 240);
  this.center = {
    x: this.width / 2,
    y: this.height / 2
  };

  var padding = 90;
  this.box = {
    x: padding,
    y: padding,
    width: this.width - padding * 2,
    height: this.height - padding * 2,
  }

  this.column_width = this.box.width / 4;
  this.row_height = this.box.height / 4;

  this.year_centers = {}
  this.dept_titles = {}
  for (idx in departments) {
    var dept = departments[idx]
    this.year_centers[dept] = {
        x: this.box.x + (idx % 4) * this.column_width + this.column_width / 2,
        y: this.box.y + Math.floor(idx / 4) * this.row_height + this.row_height / 2
    }
    this.dept_titles[dept] = {
        x: this.box.x + (idx % 4) * this.column_width + this.column_width / 2,
        y: this.box.y + Math.floor(idx / 4) * this.row_height + this.row_height / 2 + 10
    }
  }

  this.department_ids = {}
  for (el in departments) {
    this.department_ids[el] = el;
  }
  
  this.layout_gravity = -0.01;
  this.damper = 0.1;
  this.vis = null;
  this.nodes = [];
  this.force = null;
  this.circles = null;
  this.fill_color = d3.scale.ordinal()
      .domain(departments)
      .range(d3.scale.category20().range())

  max_amount = d3.max(this.data, function(d) {
    return parseInt(d.value);
  });
  this.radius_scale = d3.scale.sqrt().domain([0, max_amount]).range([0, 50]);
  this.create_nodes();
  this.create_vis();
}

BubbleChart.prototype.create_nodes = function() {
  this.data.forEach((function(_this) {
    return function(d) {
      var node = {
        id: d.no,
        radius: _this.radius_scale(parseInt(d.value)),
        value: d.value,
        name: d.description,
        vendor: d.vendor,
        department: d.department,
        tender_no: d.tender_no,
        org: d.department,
        group: d.group,
        awarded_date: new Date(d.award_date),
        x: Math.random() * _this.width,
        y: Math.random() * _this.height
      };
      return _this.nodes.push(node);
    };
  })(this));
  return this.nodes.sort(function(a, b) {
    return b.value - a.value;
  });
};

BubbleChart.prototype.create_vis = function() {
  var me = this;

  this.vis = d3.select("#vis")
    .style("width", this.width)
    .style("height", this.height)
    .append("svg")
      .attr("id", "svg_vis")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewbox", "0 0 " + this.width + " " + this.height);

  /*
  this.vis.append("rect")
    .attr("x", this.box.x)
    .attr("y", this.box.y)
    .attr("width", this.box.width)
    .attr("height", this.box.height)
    .style("stroke", "#000")
    .style("fill", "none")
  */

  /*
  this.vis.append("line")
    .attr("x1", this.box.x + this.column_width * 1)
    .attr("y1", this.box.y)
    .attr("x2", this.box.x + this.column_width * 1)
    .attr("y2", this.box.height + this.box.y)
    .style("stroke", "#000")

  this.vis.append("line")
    .attr("x1", this.box.x + this.column_width * 2)
    .attr("y1", this.box.y)
    .attr("x2", this.box.x + this.column_width * 2)
    .attr("y2", this.box.height + this.box.y)
    .style("stroke", "#000")

  this.vis.append("line")
    .attr("x1", this.box.x + this.column_width * 3)
    .attr("y1", this.box.y)
    .attr("x2", this.box.x + this.column_width * 3)
    .attr("y2", this.box.height + this.box.y)
    .style("stroke", "#000")

  this.vis.append("line")
    .attr("x1", this.box.x)
    .attr("y1", this.box.y + this.row_height * 1)
    .attr("x2", this.box.x + this.box.width)
    .attr("y2", this.box.y + this.row_height * 1)
    .style("stroke", "#000")

  this.vis.append("line")
    .attr("x1", this.box.x)
    .attr("y1", this.box.y + this.row_height * 2)
    .attr("x2", this.box.x + this.box.width)
    .attr("y2", this.box.y + this.row_height * 2)
    .style("stroke", "#000")

  this.vis.append("line")
    .attr("x1", this.box.x)
    .attr("y1", this.box.y + this.row_height * 3)
    .attr("x2", this.box.x + this.box.width)
    .attr("y2", this.box.y + this.row_height * 3)
    .style("stroke", "#000")
  */

  this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
    return d.id;
  });

  this.circles.enter().append("circle")
    .attr("r", 0)
    .attr("fill", function(d) {
        return me.fill_color(d.group);
    })
    .attr("stroke-width", 2)
    .attr("stroke", function(d) {
      return d3.rgb(me.fill_color(d.group)).darker();
    })
    .attr("id", function(d) {
      return "bubble_" + d.id;
    })
    .classed("tender-bubble", true)
    .on("mouseover", function(d, i) {
      me.show_details(d, i, me);
      d3.select(this).attr("stroke", "black");
    })
    .on("mouseout", function(d, i) {
      me.tooltip.hideTooltip();
      d3.select(this).attr("stroke", function(d) {
        return d3.rgb(me.fill_color(d.group)).darker();
      })
    })

  return this.circles.transition().duration(2000).attr("r", function(d) {
    return d.radius;
  });
};

BubbleChart.prototype.charge = function(d) {
  return -Math.pow(d.radius, 2.0) / 8;
};

BubbleChart.prototype.start = function() {
  return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
};

BubbleChart.prototype.display_group_all = function() {
  var me = this;
  this.force.gravity(this.layout_gravity)
    .charge(this.charge)
    .friction(0.9)
    .on("tick", function(e) {
      return me.circles.each(me.move_towards_center(e.alpha))
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
    })

  var total = 0
  this.data.forEach(function(d) {
    total += parseInt(d.value);
  })

  this.vis.selectAll("#total-title").remove()
  this.vis.selectAll(".department").remove();
  this.vis.selectAll(".value-label").remove();

  this.vis.selectAll(".total-value")
    .data(["Total tender value: R" + addCommas(total)])
    .enter().append("text")
      .attr("class", "total-value")
      .attr("x", this.width / 2)
      .attr("y", 45)
      .attr("text-anchor", "middle")
      .text(String);

  this.vis.selectAll("#total-title")
    .data(["All Tenders"])
    .enter()
    .append("text")
      .attr("id", "total-title")
      .attr("x", this.width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .text(String)

  /*
  this.vis.selectAll(".example-bubbles").data([1000000, 10000000, 100000000])
    .enter()
    .append("circle")
      .attr("r", function(d) { return me.radius_scale(d)})
      .attr("fill", "#cdcdcd")
      .attr("stroke-color", "000")
      .attr("stroke-width", "2")
      .attr("cy", function(d, idx) {return me.height/2 - 200 + 30 * idx * idx/0.95})
      .attr("cx", 100)
  */

  this.force.start();
};

BubbleChart.prototype.move_towards_center = function(alpha) {
  return (function(_this) {
    return function(d) {
      d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
      return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
    };
  })(this);
};

BubbleChart.prototype.display_by_department = function() {
  var me = this;
  this.force.gravity(this.layout_gravity)
    .charge(this.charge)
    .friction(0.9)
    .on("tick", function(e) {
      me.circles.each(me.move_towards_dept(e.alpha))
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

        for (idx in departments) {
          var dept = departments[idx];
          var count = 0;
          var x = 0;
          var y = 0;
          var highest_y = -1;

          me.vis.selectAll(".tender-bubble").select(function(d) {
            if (d.group == dept) {
              count += 1
                x += d.x;
                y += d.y;
                if (d.y > highest_y)
                  highest_y = d.y;
            }
          })

          d3.select("#dept-label-" + idx)
            .attr("x", x / count)
            .attr("y", highest_y + 30)

          d3.select("#value-label-" + idx)
            .attr("x", x / count)
            .attr("y", highest_y + 45)
        }
      })

  this.force.start();
  this.vis.selectAll(".total-value").remove()
  this.vis.selectAll("#total-title").remove()
  return this.display_departments();
};

BubbleChart.prototype.move_towards_dept = function(alpha) {
  var me = this;
  return function(d) {
    var target = me.year_centers[d.group];
    d.x = d.x + (target.x - d.x) * (me.damper + 0.02) * alpha * 1.1;
    return d.y = d.y + (target.y - d.y) * (me.damper + 0.02) * alpha * 1.1;
  };
};

BubbleChart.prototype.display_departments = function() {
  var me = this;
  var dept_labels = d3.keys(this.dept_titles);
 
  this.vis.selectAll(".department").data(dept_labels)
      .enter().append("text")
        .classed("department", true)
        .attr("text-anchor", "middle").text(String)
        .attr("id", function(d, idx) {
          return "dept-label-" + idx;
        })

  this.vis.selectAll(".value-label").data(dept_labels)
      .enter().append("text")
        .classed("value-label", true)
        .attr("text-anchor", "middle")
        .text(function(d) {
          var total = 0;
          me.vis.selectAll(".tender-bubble").select(function(bubble) {
            if (bubble.group == d) {
              total += parseInt(bubble.value);
            }
          })
          return "Value: R" + addCommas(total);
        })
        .attr("id", function(d, idx) {
          return "value-label-" + idx;
        })

  this.vis.selectAll("#total-title")
    .data(["Tenders by Department"])
    .enter()
    .append("text")
      .attr("id", "total-title")
      .attr("x", this.width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .text(String)
};

BubbleChart.prototype.show_details = function(data, i) {
  var content;
  var date_string = d3.time.format("%Y-%m-%d")(data.awarded_date);
    
  content = "<span class=\"name\">Tender No:</span><span class=\"value\"> " + data.tender_no + "</span><br/>";
  content += "<span class=\"name\">Description:</span><span class=\"value\"> " + data.name + "</span><br/>";
  content += "<span class=\"name\">Vendor:</span><span class=\"value\"> " + data.vendor + "</span><br/>";
  content += "<span class=\"name\">Department:</span><span class=\"value\"> " + data.department + "</span><br/>";
  content += "<span class=\"name\">Amount:</span><span class=\"value\"> R" + (addCommas(data.value)) + "</span><br/>";
  content += "<span class=\"name\">Awarded:</span><span class=\"value\"> " + date_string + "</span>";
  return this.tooltip.showTooltip(content, d3.event);
};

BubbleChart.prototype.hide_details = function(data, i, element) {
  var me = this;
  d3.select(element).attr("stroke", function(d) {
    return d3.rgb(me.fill_color(d.group)).darker();
  })
  return this.tooltip.hideTooltip();
};

BubbleChart.prototype.toggle_view = function(view_type) {
  if (view_type === 'all') {
    return this.display_group_all();
  } else {
    return this.display_by_department();
  }
}


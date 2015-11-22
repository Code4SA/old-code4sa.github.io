---
layout: post
title: Valentine's Day Edition - Love knows no age
author: Adi Eyal
excerpt: |
    They say that love knows no age. Does the data agree? Have a look at a weird cross-section of our society as seen through the 2012, civil marriages dataset. 
 
date: 2015-02-13
extra_js:
    - /js/d3.v3.min.js
    - /js/c3.min.js
    - /js/pym.js
extra_stylesheets: /css/c3.css
extra_style: |
    #chart {
        max-height: 700px;
    }
---

You often learn a lot about people by looking at data. According to StatsSA in the most recent dataset of marriages and divorces, there were roughly 161,000 civil marriages in 2012. A quick histogram of the wedding month shows that December is the most popular month for getting married. No-one wants to get married in winter.

<h2>Marriages by Month</h2>
<div id="chart" style="background-color: #fff"></div>

Things start getting weird when you look at the age differences between marital partners. Have a look at the graph below. It maps all civil marriages from 2012. Every dot represents one or more marriages. As you move up the graph, the age of the bridegroom increases. As you move to the right, the age of the bride increases. 

<div id="graph"></div>

It seems that the majority of all marriages are between people who are more or less the same age. There are however a significant number of marriages that don't fit that mould. 

Let's define a sugar mommy or sugar daddy as someone who is married with a 20-year or more age difference between them and their Ben Ten/Sugar Baby. All the dots outside those diagonal lines in the graph represent sugar marriages. Note that there are far more sugar daddies than sugar mommies. In all, 3,400 sugar marriages. 

There are some odd unions. Have a look at the dot on the bottom right. It represents a marriage between an 86 year-old woman and a 16 year-old boy. 

*Gobsmacked*

There are also examples of very old men marrying younger women. 

The most disturbing part of the diagram is on the far left. Girls younger than 16 are getting married. Two 12 year-olds were married off, one to a 20 year old man, another to a 67 year-old. Is this even legal? Turns out that it is. 

According to the [Western Cape Government Website](http://www.westerncape.gov.za/service/getting-permission-marry-if-you-are-underage):

> Boys under 18 and girls under 15 cannot get married without special permission and anyone under the age of 21 has to get their parents' permission before they can get married.

So it seems that if you haven't yet reached puberty and you want to get married, you will need your parents' consent. You also need the Minister of Home Affairs to place his rubber stamp on the marriage certificate.

*shudder*

The dot on the top right between the 92 year-old bride and 94 year-old groom is heartwarming. It's clear that you can still find your soulmate, even after 9 decades of searching. 

If you want to play around with the data yourself, you can find it [here](https://data.code4sa.org/Government/South-Africa-Civil-Marriages-2012/r4bb-fvka).

## The technical stuff

Feel free to embed the marriage visualisation on your own site. Copy and paste the code below into your webpage. 

    <div id="graph"></div>
    <script src="http://www.code4sa.org/js/pym.js"></script>
    <script>
        var pymParent = new pym.Parent('graph', 'http://www.code4sa.org/embeds/marriages.html', {});
    </script>

<script>
$(function() {
    var pymParent = new pym.Parent('graph', '/embeds/marriages.html', {});
    var chart = c3.generate({
        bindto:'#chart',
        x : 'Months',
        data: {
            columns: [
                ['2012', 10866, 11351, 14359, 12941, 10928, 10466, 9850, 10689, 14272, 13491, 14761, 27138]
            ],
            type: 'bar'
        },
        groups : ['2012'],
        axis: {
            x: {
                type: 'category',
                categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            y : {
                label: 'Number of marriages'
            }
        }
    });
});
</script>

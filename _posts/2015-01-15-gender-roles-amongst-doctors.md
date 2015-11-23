---
layout: post
author: Adi Eyal
title: Genders roles in different fields of medicine
excerpt: |
    Medicine is one of those fields that parents secretly (and sometimes not so secretly) wish for for their children. It's a respectable line of work. You'll never go hungry. And, it's merit based. In this day and age, gender should be completely irrelevant. But is it?
extra_stylesheets:
  - /css/c3.css
style: |
    svg {
        background-color: white;
    }
    .chart {
        margin-bottom: 1em;
    }
    .c3-chart-line path {
        stroke-width:0.2em;
    }
 
date: 2015-01-15
---

I've been playing with a new dataset over the last week. It's amazing what stories you can find in data which are completely unexpected. Last week I found some <a href="/2015/01/08/traffic-fines-highway-robbery.html">interesting revenue models</a> used by a handful of municipalities in the country using their statements of operating revenue and expenditure. This week I have been looking at the history of gender equality in the medical profession. 

I'm still digging into the data so this blog will only be a brief report-back on what I have found so far. Using the register of medical professionals over at the <a href="http://hpcsa.co.za">Health Professionals Council of South Africa</a>, I have been exploring whether there are any strong gender biases within the medical profession. 

There are, the graphs below are quite telling.

Firstly, I was curious to see what is the overall picture with respect to gender equality in the medical profession. In this case, I define a medical professional as someone who has been registered as a medical practitioner. For all intents and purposes, this is someone who has a 'Dr' in front of their name.

I plotted the number of doctors who qualify on a yearly basis and compared them by gender. The graph really doesn't need much explanation, the trend is clear.

<center>
<h2>Number of doctors qualifying over time</h2>
<div id="chart1" class="chart"></div>
</center>


Starting from the early- to mid-70s, the proportion of women doctors graduating started to increase. In 1970, only 14% of new doctors were women. That number slowly climbed to 17% in 1980, 24% in 1990, 38% in 2000 and over 50% in 2010. It would be interesting to compare this graph with a similar one for the economy as a whole. I suspect that they might be similar, although the medical practitioner graph would likely be shifted to the right due to a higher barrier to entry and the longer qualifications of doctors.

For this graph, ignore the y-axis. My data set isn't yet complete (collecting data is not easy). The numbers are not correct but the overall trend is.

What happens when we start looking at specialisations? Are there any specialities which favour one gender over another?

Paediatrics surprisingly seems to have been dominated by male doctors until around 2004 when women started taking over the field. (By the way, from now on the y-axis can be trusted, the data for this graph and the ones that follow is complete). Notice that approximately 100 new paediatricians graduate every year.

<h2>Number of paediatricians qualifying over time</h2>
<div id="chart4" class="chart"></div>

What about psychiatry?
<h2>Number of psychiatrists qualifying over time</h2>
<div id="chart2" class="chart"></div>

The field was almost exclusively male until the mid-80s whereas now, a new generation of women are starting to dominate. Just a quick caveat regarding the interpretation of these graphs. The numbers in each bar represent the graduates for that year. Doctors who graduated in previous years are mostly still practicing so even if new psychiatry graduates are predominantly women, there a still a large proportion of men.

On a somewhat different topic, notice that only 30-40 psychiatrists graduate every year. In total there are only 787 active psychiatrists with only 617 under retirement age. That's 0.66 psychiatrists per 100,000. Compare that with <a href="http://www.who.int/mental_health/evidence/atlas/profiles/usa_mh_profile.pdf?ua=1">7.8 in the US</a>, <a href="http://www.who.int/mental_health/evidence/atlas/profiles/fra_mh_profile.pdf?ua=1">22.35 in France</a> and <a href="http://www.who.int/mental_health/evidence/atlas/profiles/nor_mh_profile.pdf?ua=1">30.77 in Norway</a>. Comparing with other BRICS countries, <a href="http://www.who.int/mental_health/evidence/atlas/profiles/bra_mh_profile.pdf?ua=1">Brazil : 3.07</a>, <a href="http://www.who.int/mental_health/evidence/atlas/profiles/rus_mh_profile.pdf?ua=1">Russia: 11.61</a>, <a href="http://www.who.int/mental_health/evidence/atlas/profiles/ind_mh_profile.pdf?ua=1">India: 0.3</a> and <a href="http://www.who.int/mental_health/evidence/atlas/profiles/chn_mh_profile.pdf?ua=1">China: 1.53</a>. We really need to crank out more shrinks.

Here's what it looks like for gynaecologists. It is somewhat biased towards men.
<h2>Number of gynaecologists qualifying over time</h2>
<div id="chart5" class="chart"></div>

Finally, the John Waynes of the medical profession, the Surgeons.
<h2>Number of surgeons qualifying over time</h2>
<div id="chart3" class="chart"></div>

Of the 1360 or so surgeons in the country, only 117 are women. It seems that this field has been resistant to the forward march of gender equality, not just in South Africa but <a href="http://www.solidarity-us.org/node/24">outside as well</a>. Having asked a surgeon friend of mine why he thought this was the case, he suggested the inflexible and family-unfriendly working hours. Other accounts speak of <a href="https://medium.com/@karenmilford/being-female-in-surgery-blood-guts-and-rehabilitating-chauvinists-c5f861b0c3ac">raw chauvinism</a>. 

I'm not going to say anymore on this topic since I don't have any personal insight beyond what the numbers say. This is the real point of this blog. Even though I know very little about the medical profession, I was able learn quite a lot about the trends that are shaping the industry.

I'm hoping to beat this dataset with a stick over the next few months to see what else comes out. If there is anything, I'll let you know.

<script src="{{ site.url }}/js/d3.v3.min.js"></script>
<script src="{{ site.url }}/js/c3.min.js"></script>
<script>
var defchart = function(url, bindto) {
    return {
        bindto: bindto,
        padding: {
            top: 10,
            right: 10,
        },
        data: {
            type: 'line',
            x: 'Year',
            url: url,
            order: function(a, b) {
                if (a['id'] == 'Men')
                    return -1;
                return 1;
            },
        },
        point : {
            show : false
        },
        bar : {
            width : {
                ratio :0.6 
            }
        },
        axis: {
            x : {
                label : {
                    text : 'Year of qualification',
                    position: 'outer-center'
                }
            },
            y : {label : 'Number of qualifications'}
        },
        tooltip: {
            format: {
                title: function (d) { return 'Qualification Year: ' + d; }
            }
        }
    }
};

        
    var alldef = defchart('/data/doctors/data.csv', '#chart1')
    alldef['data']['order'] = function(a, b) {
        if (a['id'] == 'Men')
            return 1;
        return -1;
    }
    var chart1 = c3.generate(alldef);
    var chart2 = c3.generate(defchart('/data/doctors/psychiatrists.csv', '#chart2'));
    var chart3 = c3.generate(defchart('/data/doctors/surgeons.csv', '#chart3'));
    var chart4 = c3.generate(defchart('/data/doctors/paediatricians.csv', '#chart4'));
    var chart5 = c3.generate(defchart('/data/doctors/gynaecologists.csv', '#chart5'));
</script>

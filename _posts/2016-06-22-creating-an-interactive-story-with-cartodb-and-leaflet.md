---
layout: post
title: Creating an interactive story with CartoDB and Leaflet.js
date: 2016-06-22
excerpt: A technical run-through of how we created an interactive storyboard on informal settlements, with detailed explanations on how we used CartoDB and Leaflet.js.
image: http://code4sa.org/img/blog/matrix-dev.jpg
author: Guus Hoekman
---

In April, Code for South Africa was approached by [Ndifuna Ukwazi](http://nu.org.za/), a non-profit law centre in Cape Town, to create an online map visualisation of Cape Town’s informal settlements. This blog post will cover the technical side of creating the map. You can read more about the project [here](/2016/06/22/mapping-sanitation.html). If you haven't already, please <a href="http://ismaps.org.za/" target="_blank">explore the map</a> so you have a better idea what this blog is about.



## First steps
For reasons discussed in [this blog](/2016/06/22/mapping-sanitation.html), we decided to use [CartoDB](http://cartodb.com/), with which we were able to easily map the data and build features on top of it. More specifically, we used the [`createLayer`](https://academy.cartodb.com/courses/cartodbjs-ground-up/createvis-vs-createlayer/#createlayer) option so we could easily switch between layers and also take advantage of [Leaflet](http://leafletjs.com/), an open-source JavaScript library for interactive maps.

Before any real dev work started, the data was geocoded and uploaded to CartoDB. The dataset contained the boundaries of the informal settlements in [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format, which CartoDB automatically recognises and plots on a map.

Then it was a matter of using Leaflet to instantiate a basic map object. This wasn't complicated; first we set the parameters so that the map started off fairly zoomed out with a focus on Cape Town. We also added the [tiles](https://en.wikipedia.org/wiki/Tiled_web_map) using Leaflet's [`L.tileLayer`](http://leafletjs.com/reference.html#tilelayer).

    var map_object = new L.Map('map',{
        center: [-33.99943, 18.61679],
        zoom: 10,
    });
    
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
        attribution: 'CartoDB'
    }).addTo(map_object);

## Adding the data

We had the map itself, but it was empty. We had to add the dataset, knowing NU wanted users to be able to switch between different parts of the data. We called these layers and the idea was to have buttons that, when clicked, display a certain layer: number of households, age of the informal settlement, household density, just the boundaries, etc.

[CartoDB's API](https://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#cartodbcartodbsublayer) allows for searches in a dataset and will display the results accordingly. When it comes to this map we can, for example, ask it to display only the informal settlements that have a minimum number of residents. CartoDB also accepts [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) and can fill polygons based on its values; make the polygon blue if an informal settlements has 0 to 5000 residents, red when it has more than that. Every layer displays all pockets and so the search stays the same - we want it to select everything: `sql: "SELECT * FROM matrix_formatted_data"` (`matrix_formatted_data` is the name of the [dataset we used](https://adi45.cartodb.com/tables/matrix_formatted_data)). The CSS *does* change. For the households layer, we wanted CartoDB to check the household column and, depending on the value, fill the polygons with a certain colour. This same process needed to happen for the other layers, and that's how they were defined:

    sublayers: [{
    sql: "SELECT * FROM matrix_formatted_data",
    cartocss: '#matrix_formatted_data {polygon-opacity: 1;line-color: #FFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data[structure_count <= 8000] {polygon-fill: #a50f15;}#matrix_formatted_data[structure_count <= 5000] ...'
    },
    sql: "SELECT * FROM matrix_formatted_data",
    cartocss: ...
    }]

[Source](https://github.com/ismaps/ismaps.github.io/blob/master/js/map-control.js#L28)

Every layer loads exactly the same data from the dataset. The only difference is in the CSS. To get things working it was just a matter of calling a function that shows the correct layer and hides the others when a layer button is pressed, [like this](https://github.com/ismaps/ismaps.github.io/blob/master/js/map-control.js#L320).  

A second feature NU wanted was the ability to switch between map and satellite view, which was one of the reasons we chose the createLayer option. As mentioned previously, we added a map object through Leaflet and used CartoDB's tiles. Adding satellite view doesn't require another map, it just requires different tiles. We decided to use [Nokia's HERE tiles](https://developer.here.com/javascript-apis/documentation/v3/maps/topics/map-types.html):

    L.tileLayer('https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O', {
    attribution: 'Nokia'
    });

We made both base maps variables and then assigned a [simple function](https://github.com/ismaps/ismaps.github.io/blob/master/js/map-control.js#L172) to the buttons that users can click to change view.

## User interactivity
NU wanted users to be able to click on an informal settlement and get more detailed information such as what ward it is in, the types of toilets there, and the reasons the City of Cape Town gives as to why it doesn't build permanent toilets.

We could use CartoDB's [`sublayer.setInteraction(true)`](https://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#sublayersetinteractiontrue) for this, which allows for mouse interaction with elements on the map (featureOver, featureClick, featureOut, mouseover and mouseout). In order to display the detailed information we had to use sublayer.setInteractivity(), with the headers of the columns that we wanted to display between the parentheses, [like this](https://github.com/ismaps/ismaps.github.io/blob/master/js/map-control.js#L102). We then used [`featureClick`](https://docs.cartodb.com/cartodb-platform/cartodb-js/events/#layerfeatureclickevent-latlng-pos-data-layerindex) to create the interactivity.

## Smaller elements
The user interactivity was there, but we wanted to display some of the data in graphs, for which we used [Google Charts](https://developers.google.com/chart/). Though easy to use, it is not responsive which can be a drawback. Fortunately, there are [plenty of alternatives](https://www.sitepoint.com/15-best-javascript-charting-libraries/).

We created a story to engage users and teach them to use the map. Allowing users to flip through the stories wasn't complicated but did take a lot of time. We didn't expect the text and images to change much and created an [ugly but functioning solution](https://github.com/ismaps/ismaps.github.io/blob/master/js/map-control.js#L637) that displays/hides content depending on the step the user is on. There were a few significant changes to the content and we had to add a few steps to both stories. Our ugly solution was initially quick, but ended up needing a lot of work because of the various changes we had to make manually.

Besides flipping through content, the previous and next buttons also cause changes to the map. Modifying the map state is fortunately made easy by Leaflet; we could simply use `setView` and `setZoom`. You can find the relevant documentation [here](http://leafletjs.com/reference.html#map-set-methods).

## Mobile version
We worked on this project sitting in our office with pretty fast internet using monitors, keyboards, and mice. This makes it easy to ignore mobile users and honestly, I'd happily do so. A tiny screen, limited bandwidth, an even smaller attention span than desktop users… why bother? The thing is, [the majority of South Africans are mobile users](http://gs.statcounter.com/#all-comparison-ZA-monthly-201506-201605) and as annoying as it may be, creating a good mobile user experience is extremely important. Rather than seeing it as an afterthought, mobile should increasingly be considered more important than desktop.

We couldn't properly create the interactive story on mobile and decided to make things much simpler. The stories are the same but rather than the map changing on click, mobile users get a long page and they scroll through the story. We added screenshots of the map so they learn about the functionality. Not as fancy but perfectly usable. After finishing the story that explains the functionality, users are taken to the map itself. This works fine on mobile and there are no differences in terms of features.

## Explore the data and fork this project
The datasets we used are [freely available](http://ismaps.org.za/disclosure.html) and our code is open source. You are more than welcome to [fork our project](https://github.com/ismaps/ismaps.github.io) or create something else entirely using the data.
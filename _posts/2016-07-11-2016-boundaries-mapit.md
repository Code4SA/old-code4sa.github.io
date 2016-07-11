---
layout: post
title: 2016 Election Boundaries Available in MapIt
date: 2016-07-11
excerpt: The 2016 demarcation boundaries are now available from mapit.code4sa.org.
image: http://code4sa.org/img/blog/compass-map.jpg
author: Greg Kempe
---

<img src="/img/blog/compass-map.jpg">

A few months ago the [Municipal Demarcation Board](http://www.demarcation.org.za/site/) released the updated details of the wards, local and district municipalities that are being used for the 2016 Municipal Elections and beyond. This new generation of areas and boundaries is now available on [mapit.code4sa.org](https://mapit.code4sa.org).

To use the new shapes simply include ``generation=2`` in your mapit URLs. We recommend you always indicate the generation you want to prevent your application from using the wrong dataset when a new set of boundaries are released. To use the old 2011 municipal boundaries, use ``generation=1``.

Now you can easily include the 2016 electoral boundaries in the cool elections app that you're building!

If you're using mapit, please [Tweet @Code4SA](https://twitter.com/@Code4SA) and let us know.

## What's changed?

* **Wards**: many wards have changed shape, some have been removed, some have been added. There are now 4392 wards (there were 4277).
* **Local municipalities**: 21 local municipalities have been merged into adjacent municipalities, and others have had boundary adjustments. There are now 205 local municipalities (there were 226).
* **District municipalities**: Some district municipalities have had minor boundary changes, but no district municipalities were added or removed. There are still 52 district municipalities.
* **Metro municipalities**: The metro municipalities remain the same at 8.
* **Provinces**: the province boundaries have not changed.

## What's mapit?

MapIt ([mapit.code4sa.org](https://mapit.code4sa.org) is a simple JSON API for shapes and areas in South Africa. You can use mapit to find what ward, municipality and province a point is in, or to get a list of what wards are in a particular municipality. You can [read more about Mapit in this blog post](2015/07/25/mapit.html).

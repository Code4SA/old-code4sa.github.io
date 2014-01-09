---
layout: post
excerpt: |
    Know your hood. Who are your neighbours. How do they vote? What do they earn and what are their houses worth? Learn more about the schools in your area. How do you contact your ward councillor and what are they spending their ward allocation budgets on? Many of us don't know although the data exists. Code for South Africa hosted a mini-hackathon last year with the Open Democracy Advice centre to explore just that.
    
---

Know your hood
==============

National politics are important. Who did what and took what and said what is indicates the way the wind is blowing and a where the slow mocing ship that is South Africa is sailing to. None of this helps me make decisions on a daily basis. I am much more interested in property taxes and liquor licences. These are the things that affect me and which I know relatively little about. [Greg Kempe's](https://twitter.com/longhotsummer) excellent [Open By-laws](http://openbylaws.org.za) is an attempt to make it easier to know whether your neighbour is allowed to slaughter a cow in his backyard or whether you can shutdown a very loud party down the street after 12pm (I promise, I'm not really the fuddy duddy that I'm making myself out to be). 

There's a lot more. Crimes took place in my neighbourhood last week, I don't want the annual police statistics from last year. What about the matric pass rate down the road or how many COPE voters live on my street. That's interesting (and often useful) information. 

Hackathon
---------

Code for South Africa with the [Open Democracy Advice Centre](http://www.opendemocracy.org.za) hosted a mini-hackathon in December last year to explore this a little more. The idea was to start to develop building blocks that could be used to deliver neighbourhood level information so that we could start to know more about our neighbours (or gasp, even have something to talk to them about!). 

These questions fit hand-in-glove with larger initiatives such as The Integrated Development Planning Nerve Centre project managed by the [Department of Cooperative Governance and Traditional Affairs](http://www.cogta.gov.za), which seeks to consolidate all the integrated development plans of South African municipalities and different forms of ancillary documentation and planning information that was used to develop these plans. 

In recognition of the trove of information it will store, the [Open Democracy Advice Centre](http://www.opendemocracy.org.za) (in collaboration with the Foundation of Human Rights) is seeking to answer the question: how can this information be opened up in a meaningful manner to assist South Africans in giving effect to their socio-economic rights? As part of ODAC's quest to advance the right of access to information, ODAC and Code for South Africa are working to create a prototype of the kind of system COGTA could potentially utilise to open up the useful parts of the information from its system that it has already indicated it would be willing to make proactively available.

Projects
--------

While we're still a long way off from a hyper-local information repository, this hackathon took us one step further. 

The following noteworthy projects resulted from the hackathon:
* Which ward do you live in? The [Address to Ward converter)(http://wards.code4sa.org/) is an API that can be used by other applications to find which ward a particular address fits into.
* An [elections API](http://iec.code4sa.org/) for the 2009 general elections. Again, this is another tool that can be used by other applications to ask questions about the voting distributions at a ward leve.
* [Mapper.js](http://www.capesean.co.za/mapper/) by brothers Sean and Justin Walsh, a widget that allows developers to overlay interesting spatial datasets on top of google maps.

<img src="{{ site.url }}/img/mapperjs.png">

* [Election map](http://www.electionmap.co.za/) (also by the Walsh brothers) is a visualisation that shows voting distributions by province, district and ward. Apart from the obvious merits of learning more about party strongholds this tool re-uses both mapper.js and the elections API. This is a great example of how a hackathon could be run in a collaborative fashion.
* [Ballot or Street](http://ballot-or-street.aws.af.cm/) by Nerudo Mregi is a creative twist on the elections theme by comparing service delivery protests with elections. Were there violent protests in your area? Did people vote with their feet or their fists? There are quite a few technical problems that need to be resolved but the idea is a great one. This tool is another example of software re-use as it takes advantage of both the Address to Ward converter as well as the elections API.

<img src="{{ site.url }}/img/street_or_ballot.png">

* A couple of [fusion](https://www.google.com/fusiontables/DataSource?docid=10Nq9HJr42xuf_7SY33AHeJFRxD-CefdnctW4Jqs) [tables](https://www.google.com/fusiontables/DataSource?docid=10Nq9HJr42xuf_7SY33AHeJFRxD-CefdnctW4Jqs) [visualisations](https://www.google.com/fusiontables/DataSource?docid=1QIs374qGWLdQVLDvi5l9oMepm-Pe_1hnAqfPsDo) of the elections data by Frankie.

<img src="{{ site.url }}/img/frankie.png">

You might be wondering why the focus on elections. It boils down to how much one can do in a hackathon time frame. APIs that were developed before the hackathon involved much leg work and infrastructure development. Once they were ready, application developers could easily build on top of them. Following this hackathon, Mapper.js could again be re-used for similar projects.


Congratulations to Sean and Justin Walsh as well a Nerudo Mregi for winning through a public vote. The each won an IPad mini as early Christmas presents. 

Know your hood is one of our "fun projects" at Code for South Africa which we fiddle with during our lunch breaks. We're building it slowly and will be promoting it through our [Thursday night unhackathons](http://www.meetup.com/Code-for-South-Africa-Hackers/). Our next event is on the (23rd of January](http://www.meetup.com/Code-for-South-Africa-Hackers/events/159155662/). If you're in Cape Town, pop in and start wrangling data from the most recent census.

Feel free to message me on Twitter at @soapsudtycoon or join one (or all) of the open data community [watering troughs](http://www.code4sa.org/index.html#about-opendata)

[Contact Us]({{ site.url }}/index.html#contact) if you would like to know more.





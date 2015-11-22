---
layout: post
title: The Indigo Legislation Platform
date: 2015-03-03
author: Greg Kempe
excerpt: |
  Together with AfricanLII and funding from the Indigo Trust, we're building an
  open-source legislation consolidation and publishng platform. Our goal is to
  help them provide free access to online legislation in Africa.
---

Together with [AfricanLII](http://africanlii.org) and funding from [the Indigo Trust](http://indigotrust.org.uk),
we're building an open-source legislation consolidation and publishng platform. Our goal is to help them
provide free access to online legislation in Africa. We want to make it simpler to publish legislation
in standardised formats that are easy to read, navigate, share and analyse.

In honour of our funding partner, we've called the project the **Indigo Platform**.

Writing, amending, consolidating, managing and publishing legislation is
complicated and our budget is small. That's why we're focusing on only a few
parts of the larger process -- consolidating and publishing -- and trying
to keep it simple with an iterative development process and open standards.

It's still early in the project, but you can join us for the ride:

* Play with the platform: [indigo.code4sa.org](http://indigo.code4sa.org/)
* Check out our GitHub repo: [Code4SA/indigo](https://github.com/Code4SA/indigo)
* Read the documentation at: [indigo.readthedocs.org](http://indigo.readthedocs.org/en/latest/)
* Watch our progress on [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/1216120)

## Akoma Ntoso

The Indigo platform relies heavily on [Akoma Ntoso XML](http://www.akomantoso.org/).
This legislation standard is a huge step
forward in the Free Access to Law movement, particularly in Africa.  An open,
widely-used, flexible format means we can [treat legislation as **data**](http://indigotrust.org.uk/2013/01/30/legislation-as-data/)
and not rely on presentation-focused formats such as MS Word documents or PDFs.
We're not limited just to what published legislation looks like.  Instead, we
know where a chapter starts and ends, what a specific subsection actually says,
and how to find a referenced Act. We can display, and cross-link, all this
information in the way most suitable for the user.

## Reusable Parts

While researching existing platforms and tools that we could use in this project,
I was struck both by how few components are open source and how few are reusable
(often because they're tightly integrated into an application).

I hope that we're building a platform that isn't just useful in its own right,
but that also furthers the Free Access to Law Movement in just a small way.
It's very hard to tell from the start which components of a platform like this
will be reused. So we're maximising our chances of success by loosely coupling
a handful of components:

* a simple Python library for interacting with Akoma Ntoso XML legislation files (more details soon)
* a [public-facing REST API](http://indigo.readthedocs.org/en/latest/rest/public.html) built with Django for vending Akoma Ntoso documents in XML and HTML
* an [application API](http://indigo.readthedocs.org/en/latest/rest/app.html), also built with Django, to edit, consolidate and manage a legislation library

The components are documented at [indigo.readthedocs.org](http://indigo.readthedocs.org/en/latest/) and we'll
be releasing the Python component as a standalone library soon.

## Inspiration

No idea is truly original and we're leaning on a number of existing projects
for inspiration, ideas and code:

* [legislation.gov.uk](http://www.legislation.gov.uk/) is probably the most advanced free-access-to-legislation portal in the world
* [NSESA](http://nsesa.org/) is a Java/GWT toolkit for handling XML documents
* [LIME](http://lime.cirsfid.unibo.it/) is a web-based editor for Akoma Ntoso documents
* [OER Pub](http://oerpub.github.io/github-bookeditor/) is a web editor for open education resources
* [Slaw](https://github.com/longhotsummer/slaw) is a Ruby library for parsing PDF into Akoma Ntoso and is used by [openbylaws.org.za](http://openbylaws.org.za). (Full disclosure: I'm the author of both Slaw and Open By-laws South Africa.)

Under the hood, we're using widely-used and well-documented technology to move quickly:

* [Django](https://www.djangoproject.com/) and [Django Rest Framework](http://www.django-rest-framework.org/) as server-side web frameworks
* [Backbone](http://backbonejs.org/) for the client-side web application

## More to Come

We'll be posting more as we progress with the project. In the mean time, try
out the platform at [indigo.code4sa.org](http://indigo.code4sa.org) or contribute
to our [GitHub repo](https://github.com/Code4SA/indigo).

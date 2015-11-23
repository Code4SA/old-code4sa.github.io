---
layout: post
title: Who's Your Ward Councillor?
date: 2015-09-10
author: Greg Kempe
excerpt: |
    Announcing a new tool to get in touch with your ward councillor.
image: http://code4sa.org/img/ward-cllr-form.png
---

<p>
<a href="http://speakupmzansi.org.za/"><img src="http://nearby.code4sa.org/static/images/speakup-logo.png" style="height: 50px; float: left"></a>
<a href="http://pa.org.za/"><img src="http://nearby.code4sa.org/static/images/pa-logo.png" style="height: 50px; float: left; margin-left: 20px"></a>
</p>

<div class="clearfix"></div>

---

In South Africa we elect ward councillors during municipal elections. They [win their position directly through our vote](https://en.wikipedia.org/wiki/Ward_(South_Africa)) and not through a party list and so are our best representatives in our municipalities. Unfortunately, many people don't know what ward they live in, who their ward councillor is, or how to contact them.

In partnership with [Speak Up Mzansi by Freedom House](http://speakupmzansi.org.za) and [People's Assembly by PMG](http://www.pa.org.za/ward-councillor-lookup/) we've developed a mobile-friendly tool that makes it really easy to find out who your ward councillor is and how to contact them: [Find Your Ward Councillor](http://info.speakupmzansi.org.za/councillor/).

### Find your councillor

Visit [speakupmzansi.org.za](http://info.speakupmzansi.org.za/councillor/) or [www.pa.org.za/ward-councillor-lookup](http://www.pa.org.za/ward-councillor-lookup/) in your browser or on your phone and type in your address or use your browser's location. We'll show you the ward you're in, who your councillor is, and their contact details.

<div class="row p" style="padding-bottom: 20px">
  <div class="col-xs-6">
    <a href="http://info.speakupmzansi.org.za/councillor/" target="_blank"><img src="/img/ward-cllr-form.png"></a>
  </div>
  <div class="col-xs-6">
    <a href="http://info.speakupmzansi.org.za/councillor/" target="_blank"><img src="/img/ward-cllr-result.png"></a>
  </div>
</div>

If the contact details are missing or incorrect, you can suggest a correction and we'll investigate. You can share the details on Facebook to help your friends find their ward councillors.

### Who they are, how to contact them

The IEC [has a ward councillor tool](https://www.elections.org.za/content/For-voters/who-is-my-councillor-/) but it doesn't provide contact details or let you find a councillor based on an address or your location. So we're combining the IEC's councillor information with contact details for over 1500 ward councillors published by more than 40 of the biggest municipalities in South Africa. Users can easily suggest changes directly from the tool if the contact details are incorrect or out of date.

### Add this to your website

It's really easy to add the tool to your website if you'd like to help your users find their ward councillor. Just use this HTML on a webpage.

    <div id="councillor-iframe"></div>
    <script type="text/javascript" src="http://nearby.code4sa.org/static/councillor-embed.js"></script>

### How it works

Behind the scenes we're using [MapIt](http://mapit.code4sa.org) -- our free
mapping API -- to draw the map for the ward, we're fetching the councillor
information from the IEC's API, and we're combining that
with councillor contact details stored in a Google Sheets spreadsheet. You can
find the [source code on GitHub](http://github.com/Code4SA/nearby).

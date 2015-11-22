---
layout: post
author: Adi Eyal
title: Open Data FTW!
excerpt: |
    Open Data for the win! How to save on your medicines bill using open data.
   
---

If you haven't seen it yet, take a peek at our [Medicine Prices App](http://mpr.code4sa.org). Few people know, but medicine prices are regulated in South Africa. The [Single-exit price mechanism](http://www.mpr.gov.za/) determines the maximum price that you should pay for a medicine at your local pharmacy. The problem is that the information is available in a [cumbersome](http://www.mpr.gov.za/PublishedDocuments.aspx#DocCatId=21) 40mb excel spreadsheet which contains the 17,000 registered medicines in South Africa. 

To make it useful, you need to add the allowed dispensing fee (as determined by the Medicines Act). The dispensing fee depends on the price of the medicine. 

For instance if your meds cost less than R81.00, then a pharmacist is allowed to charge up to 46% of the price of the medicine + R6.30. 

If the medicine is less than R216, this changes to 33% of the price of the medicine + R16.00.

Oh, and don't forget to add 14% onto the dispensing fee. In short it's a nightmare. Most people opt to be surprised when they arrive at the cashier to pay for their prescribed meds.

A more interesting use-case is the choice of generics. Pharmacists are obliged to offer you lower priced generics but this does not always happen. As a consumer, you owe it to yourself to be informed so that you can make choices that best suit your wallet. However, that nasty 40mb file gets in the way.

This is where our [medicines app](http://mpr.code4sa.org) comes in. We took the file, fed it into our database, added the dispensing fee and VAT. We then wrote this simple mobile friendly web interface on top of the database so that you can ensure that you know what you're paying using your cellphone while standing in the queue at the pharmacy or getting a prescription from your doctor. 

Here's a real life example of how this app has benefited me. I take chronic medication A and B. The branded version of A costs R741.27 and B costs R947.78. A generic of A is available at R420.22. Not only that but my medical aid pay for it in full whereas they only cover around R420.00 for the branded medicine. I only learnt about this by using the app. More interesting is medicine B. I take 5mg of B but according to the app, a 10mg version is available at R1278.34 (only around 34% of the 5mg). I asked my doctor to prescribe half the amount of the 10mg so that I can split it into two. Also, it turns out that my medical aid provides a lot more cover for the 10mg than the 5mg.

What's the bottom line? I walked out of the pharmacy only paying R130.00 instead of the R600 that I would otherwise have paid. Remember, these are chronic meds and the R470 savings that I make every month translate to just under R6,000 per year. 

Apart from saving me a ton of money every month, there's a deeper moral here. That is that there was an unexpected outcome of making that large 40mb file available on a public website. Its intended purpose was to fulfil a legal requirement to publish single exit prices. The unexpected use-cases that we found were:

* You can now ensure that you're not being overcharged by your pharmacy. (I'm not sure if overcharging actual happens but it's good to check).
* More importantly, using this database, we are able to find generics and alternatives to our medicines which result in better decision making. 

When asking government officials to release data, I am often asked what the data will be used for. I often don't know but I'm confident that we can't anticipate the value of data unleashed into the world. In my case, I feel happier every time I walk into my pharmacy. 

Open data for the win. 


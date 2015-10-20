---
layout: post
title: Africa Migration and Brain Drain (how I navigated a data nightmare)
date: 2015-10-20
excerpt: |
     How did a seemingly simple question about mapping African migration lead me to some dark places and how I navigated my way out of there.
image: http://code4sa.org/img/blog/MIGRATION_11.jpg
---

# Africa Migration and Brain Drain (how I navigated a data nightmare)

### 09 October 2015
### By Daniela Q. Lépiz
[@Dqlepiz](https://twitter.com/Dqlepiz)

Imagine if you could trace 50 years of African migration to the four corners of the world? How many women and men left their homes heading for pastures anew in each decade? Where did they go? What did they study? These and  a multitude of other questions come to mind when we start looking back... Since we are talking about going back to the 1960s, a decade of mass decolonisation on the African continent, we are witnessing the rise of resistance movements across the continent. In South Africa, the draconic apartheid legislation that governed the lives of people of colour, saw many choose exile over oppression. 
How has that movement changed over the decades and has the flow of money from - and to - those who left their homes had an effect?

Finding the data, on the face of it, seemed simple enough as there are just three international organisations - the United Nations, the World Bank and the [Organisation for Economic Cooperation and Development (OECD)](http://www.oecd.org/about/membersandpartners/list-oecd-member-countries.htm) that can have that accurate data, and, since I had already downloaded all the relevant data it seemed like analysing it would be a walk in the park. Except I had not factored in just how dirty the data would be.

Over the next three days I managed to manipulate and massage the data from the three sources into a machine-readable format that would allow me to analyse it. What emerged was a treasure trove of story ideas: the data had done the heavy lifting and delivered lots of ideas ready for us to do the journalism. For example, did you know that of all African countries South Africa has the highest percentage - 51 percent - of female migrants to OECD countries in 2010-2011 considered as “highly educated”?
The data also revealed that Africa has the world’s highest [brain drain](https://en.wikipedia.org/wiki/Human_capital_flight) to OECD countries, followed by Latin America. Staggeringly, one in nine people in Africa with tertiary diplomas left the continent to pursue their lives and careers in an OECD country. Over the last decade, the intellectual elite that were lost in the continent is comprised of: more than 83 400 [life sciences professionals](http://www.nhscareers.nhs.uk/explore-by-career/healthcare-science/careers-in-healthcare-science/careers-in-life-sciences/), 6 000  physical and mathematical engineers, more than 127 000 teaching professionals, 12 000 lawyers and 95 000 general managers left Africa, with the highest numbers being from South Africa.

## So, how did I find and clean the data

I was aware of [Migrants Flows](http://www.global-migration.info/), but this was not exactly what we wanted to show. Instead I downloaded data from the World Bank (WB), United Nations (UN) and OECD that I thought could be relevant. The WB had data about the remittance of money from January 2010 until April 2015 and a “Global Bilateral Migration” dataset which consists of migrations per decade from 1960 to the early 2000s and is categorised by gender. Fortunately it is a reasonably clean and well-organised dataset.  However (and here starts the nightmare), the data format was changed for later years. I then poked about on Google and came across [this page](http://econ.worldbank.org/WBSITE/EXTERNAL/EXTDEC/EXTDECPROSPECTS/0,,contentMDK:22759429~pagePK:64165401~piPK:64165026~theSitePK:476883,00.html) and found lots of useful information, including the Bilateral Migration for 2010 and 2013. But this data is measured by the “total stock” of migrants in the different countries. Meaning that I now had two different methods of counting to deal with - rather than a flow per decade, I had totals contained in 219 rows and 218 columns. Useful if you want to see one result, not adequate if you want to see more than that. So I deleted the first column and removed the merged cells in order to have one simple worksheet. Using [OpenRefine's](http://openrefine.org/) transpose function  I got a single column for country of origin and country of destination. Yay!

<a href="http://code4sa.org/img/blog/MIGRATION_2.jpg" target="_blank"><img src="/img/blog/MIGRATION_2.jpg"></a>

The next step was to identify the migration between African countries, from Africa to the rest of the World and from the rest of the continents to other countries in Africa. I also needed a column to identify the country of origin and destination. So I used an easy Excel formula:

Identify the country of origin
	{% highlight ruby %}
	=IF( OR(A2="Burundi", A2="Comoros", A2="Djibouti", A2="Eritrea", A2="Ethiopia", include all the Africa’s countries names"), "AFRICAN COUNTRY", "NON AFRICAN COUNTRY")
	{% endhighlight %}
I did this by listing African countries in a column, and "A2=" prefix in another, and then used the "concatenate all" function  in one row to get the formula with few clicks. 
The next step was to join both destinations and identify the traffic: 
	{% highlight ruby %}
	=IF ((AND(C2="AFRICAN COUNTRY",D2="AFRICAN COUNTRY")), "BETWEEN AFRICAN COUNTRIES",IF ((AND(C2="NON AFRICAN COUNTRY",D2="AFRICAN COUNTRY")), "JUST AFRICAN DESTINATION",IF ((AND(C2= "AFRICAN COUNTRY",D2="NON AFRICAN COUNTRY")), "JUST AFRICAN ORIGIN", "NON AFRICAN MIGRATION")))
	{% endhighlight %}

<a href="http://code4sa.org/img/blog/MIGRATION_4.jpg" target="_blank"><img src="/img/blog/MIGRATION_4.jpg"></a>

The United Nation’s dataset of Migrant Stock was not in great shape either

<a href="http://code4sa.org/img/blog/MIGRATION_5.jpg" target="_blank"><img src="/img/blog/MIGRATION_5.jpg"></a>

I repeated the process of cleaning - getting rid of the header and deleted categories such as sub-Saharan and less developed. I removed the merged cells and for each tab I created a column on the left to identify what it referred to; “Total”, “Female”, or “Male” migrant stock in 1990, 2000, 2010 and 2013. 
One last little niggle: In some cases the UN data for some countries included refugees, which the other two data sets did not have. So I compared how different they were using  [Tableau](http://www.tableau.com/):

<a href="http://code4sa.org/img/blog/MIGRATION_6.jpg" target="_blank"><img src="/img/blog/MIGRATION_6.jpg"></a>

I decided to use the UN data for the final results as it most complete for our needs. I then repeated the cleaning process with the remittance data (one per year since 2010):

<a href="http://code4sa.org/img/blog/MIGRATION_7.jpg" target="_blank"><img src="/img/blog/MIGRATION_7.jpg"></a>

I followed the same rinse-repeat formula  for professions in the OECD countries. However, in this case there were 14 documents. I deleted the header and turned the occupation field into a column at the left to identify it from the rest and then joined it with a macro and repeated the process with OpenRefine. 
 
<a href="http://code4sa.org/img/blog/MIGRATION_8.jpg" target="_blank"><img src="/img/blog/MIGRATION_8.jpg"></a>

And this is what I eventually ended up with:

<a href="http://code4sa.org/img/blog/MIGRATION_9.jpg" target="_blank"><img src="/img/blog/MIGRATION_9.jpg"></a>

<a href="http://code4sa.org/img/blog/MIGRATION_10.jpg" target="_blank"><img src="/img/blog/MIGRATION_10.jpg"></a>

##A final thought
This initially seemed to be a pretty straight forward task but the more I discovered, the more complex it became. The angles I had identified upfront were no longer the same angles I wanted to work with, midway through, but being flexible is part and parcel of being a journalist. 
I know it can be ambitious and sometimes intimidating, but let’s be honest in this era of data journalism is not enough to simply have access to the data, we will need to demand the data in usesable and standardized formats. Yes, maybe not now, just one step at the time, but let’s start thinking that way.  If journalists don’t check the data, who will once it is out on the public domain?
Let’s not talk about South African public institutions' "opendata"- because it is not always open and is not always complete data.
Please contact me if something does not make sense to you or if you came across this post and want to have access to the data before we upload it - [daniela@code4sa.org](mailto:daniela@code4sa.org) ☺





 

---
layout: post
title: Opinionated deployments improve collaboration
author: Greg Kempe
excerpt: |
  We've been making some opinionated choices about our development and deployment practices at Code for South Africa. We've found it improves collaboration and helps us build better products, more quickly.
date: 2014-12-05
---

We've been making some [opinionated](http://programmers.stackexchange.com/questions/12182/what-does-opinionated-software-really-mean) choices about our deployment practices at Code for South Africa. We've found it improves collaboration and helps us build better products, more quickly. There are many ways to improve collaboration and opinionated deployments may seem like an odd one. Here's what we're doing and why.

We work on a number of websites and web applications, ranging from one or two page apps such as [Protest Map](http://protest-map.code4sa.org) and [Hospital Finder](http://hospitals.code4sa.org) to rich websites such as [Wazimap.co.za](http://wazimap.co.za) and complex web applications like [Dexter](http://mma-dexter.code4sa.org). We're also a small team working with limited budgets and tight deadlines, so ad-hoc collaboration is an important part of helping us move quickly. We might need Jason to help Petrus out on a project just for a day or two, or I might see the opportunity to make a quick layout change to one of our websites.

## Deployment spaghetti

As our project portfolio has grown, so has the variation in how we deploy our projects. Some projects use [Fabric](http://www.fabfile.org/) scripts while others are manual and rely on steps documented in README files, and all are slightly different. This makes it time consuming, difficult and frustrating to grab the project from the repo, make and test a change, submit a pull request and then deploy the change. Naturally, this meant that collaboration only happens when forced.

Surprisingly, the richness of our development environment leads to this problem. There are infinitely many ways to do build out a server, deploy a web application, serve static assets, and the like. That means we have to learn a new permutation every time we want to work on a project. By reducing our choices to one or two, we can focus more on where that richness delivers value, rather than choosing yet another way of giving a database connection string to our app. It's more important for collaboration that we have consistency than infinite flexibility.

Humans are lazy: if collaboration is easy, it's more likely to happen. So let's make it easy by making it **consistent**.

## You only have two choices

I'm a big fan of [Heroku](http://heroku.com) and [GitHub Pages](https://pages.github.com/). Both are opinionated about how web apps are deployed and, importantly, put constraints on our choices. They also have another huge benefit over any home-grown solution: extensive documentation and large communities.

## Heroku

We use **Heroku** for apps that require server-side functionality such as databases. It supports a number of languages and frameworks and has useful opinions:

- Python dependencies go in `requirements.txt` and are installed with `pip`
- Sensitive settings (such as database and service credentials) are injected via environment variables and not checked into source control
- Automatic database backups
- Zero hardware setup
- Free for low traffic sites

If an app outgrows Heroku and we want to host it on our own cloud servers, we don't have to start from scratch. We can use [Dokku](https://github.com/progrium/dokku) to run a Heroku-like environment using Docker.

## GitHub Pages

We use **GitHub Pages** for static websites and client-side apps. There's really no good reason to host a static website yourself any more. I absolutely love that I can accept a contribution and deploy it just by clicking Merge on a pull request.

## Helping our community

Opinionated deployments also have benefits to the larger community in which we work. All of our work is [open sourced on GitHub](https://github.com/Code4SA) and so it's important that the larger community can build on and contribute to our work. If we were using a home-grown solution we'd have to spend time documenting our processes. By using Heroku and Git Hub pages, we get the benefit that a lot of the community already knows those platforms and there's great documentation out there to lean on if they don't.

## Useful side effects

The opinionated deployments described above have the additional benefits of enforcing some other development and deployment best practices:

- **Repeatable deployments**: because each deployment is actually a deployment from scratch, you're testing a full deployment every time you push new code.
- **Dependencies are explicit**: you can't install a dependency on a production server and forget to record it in your code. No more late night panics trying to remember dependencies when you're bringing up a new server to replace a failed one.
- **Don't change code on the server**: you can't succumb to temptation and quickly hack a change on the server and then forget to check it in.
- **Don't rely on local disk**: servers fail, don't rely on local disk. Heroku's container gives you a new local file system with each deployment, so you're forced to put data into databases, the cloud, or into source control.

Heroku and GitHub's choices aren't the only way to do these things, but they're **consistent** and **well-documented**.

We're migrating all our sites and apps to use these frameworks in a bid to make collaboration simpler and easier, so we can spend more time delivering value and less time on [undifferentiated heavy lifting](https://www.google.co.za/search?q=undifferentiated+heavy+lifting).

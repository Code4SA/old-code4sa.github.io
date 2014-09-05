code4sa-site
============


Code4SA Website (http://www.code4sa.org/).

The site is relatively simple to set up, and runs on *Jekyll* (http://jekyllrb.com/) a simple, blog-aware, static site generator.

Local development
-----------------

To get the site up and running in your local environment, clone the repository with

    git clone git@github.com:Code4SA/code4sa-site.git

Install Jekyll with

    sudo gem install jekyll

Then run the Jekyll server with

    cd code4sa-site
    jekyll serve

The site should then be running on http://localhost:4000/.

Deployment
----------

To deploy to production, run

    fab deploy

and bask in the glory of your updates.

code4sa.github.io
=================


Code4SA Website (http://code4sa.org/).

The site is relatively simple to set up, and runs on *Jekyll* (http://jekyllrb.com/) a simple, blog-aware, static site generator.

Local development
-----------------

To get the site up and running in your local environment, clone the repository with

    git clone git@github.com:Code4SA/code4sa.github.io.git

Install Jekyll with

    gem install jekyll

Then run the Jekyll server with

    cd code4sa.github.io
    jekyll serve --watch

The site should then be running on http://localhost:4000/ and will reflect changes as you make them.

Deployment
----------

The site is served by github pages, so to deploy to production simply:

    git push

and bask in the glory of your updates at http://code4sa.org/.

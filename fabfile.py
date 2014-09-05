from fabric.api import put, env, local, sudo
from fabric.contrib.project import rsync_project

# the servers where the commands are executed
env.hosts = ['code4sa.org:2222']

def deploy():
    local("jekyll build")
    sudo('chgrp admin -R /var/www/www.code4sa.org/')
    sudo('chmod g+w -R /var/www/www.code4sa.org/')
    rsync_project("/var/www/www.code4sa.org/", "_site/", delete=True)

from fabric.api import put, env
from fabric.contrib.project import rsync_project

env.user = 'adi'
# the servers where the commands are executed
env.hosts = ['197.221.34.5:2222']

def deploy():
    rsync_project("/var/www/www.code4sa.org/", "_site/")
    #put('_site/*', '/var/www/www.code4sa.org/')
    

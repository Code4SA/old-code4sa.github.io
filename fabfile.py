from fabric.api import put, env

env.user = 'adi'
# the servers where the commands are executed
env.hosts = ['197.221.34.5:2222']

def deploy():
    put('_site/*', '/var/www/www.code4sa.org/')
    

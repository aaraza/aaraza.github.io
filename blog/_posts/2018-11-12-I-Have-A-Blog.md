---
layout: post
title:  "Automating Configuration Management via Ansible"
---
When I first started customizing configurations for development (simple things like vimrc files), I wanted to make sure I could replicate my settings across several machines. I backed up all of my configurations on git -- this allowed me to easily customize new machines. 

Eventually, I got tired of manually setting up configuration files, so I created a bunch of small shell scripts that setup individual components of my development environment. For example, I had one script that downloaded zsh, oh-my-zsh, and copied a zshrc file from a git repo. 

The shell scripts improved my workflow quite a bit because they allowed me to document manual configuration steps and easily execute them in a controlled manner. However, there was room for improvment. In particular, the scripts required a lot of manual intervention. Furthermore, there was no cohesion between the scripts. What I had were small programs that setup individual components of my environment. What I wanted was a way to setup all components with as little user intervention as possible. This is where [Ansible](https://www.ansible.com/) comes in.

Ansible is a configuration management software written in Python. It also declarative rather than procedural. This means in Ansible, you specify the desired state you want and ansible will work towards that.
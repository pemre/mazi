#!/usr/bin/python

# Author      : emre. < piskin[dot]emre[at]gmail[dot]com >
# Contributor : Emre Pişkin < piskin[dot]emre[at]gmail[dot]com >
# Title       : Script to download French in Action instructional series
# Date        : 2011-07-18
# Source      :
# Description : https://www.learner.org/series/french-in-action/
# Version     : 0.1

import os;
import sys;

num_parallel=6
todo = ['%02d' % i for i in range(1, 53)]
running = []

def collect(n):
    file='French_In_Action_' + n + '.wmv'
    running.append(os.spawnlp(os.P_NOWAIT, 'mplayer', 'mplayer',
                                 '-dumpstream',
                                 'mms://media.scctv.net/annenberg/' + file,
                                 '-really-quiet', '-dumpfile', file))

while True:
    while len(running) < num_parallel and todo: collect(todo.pop(0))
    if not running: sys.exit()
    running.remove(os.wait()[0])
  

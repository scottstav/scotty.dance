#!/usr/local/bin/python

import os
with os.popen('ls') as pipe:
	for line in pipe:
		word = (line.strip())
		this = '"/noripics/%s"'%word
		print '{{< figure src='+this+'  >}}'


+++
title = "Cache Simulator"
date = ""
description = ""
draft = "false"
+++

# **Cache Simulator**

example input (memory addresses in hex):
~~~~
65604
65669
0x40456
0x100b1
0x30456
0x300b1
~~~~
simulates memory requests and prints information about cache hits/misses.

**to run:** download the [zip file](/cache_sim/cachesim2.zip)

`java -jar CacheSim.jar 17 4 3 lru on memory-small.txt`

* arg 1: cache size [log base 2]
* arg 2: block size [log base 2]
* arg 3: set [associativity](http://csillustrated.berkeley.edu/PDFs/handouts/cache-3-associativity-handout.pdf) [log base 2]
* arg 4: cache miss behavior [fifo, lru]
* arg 5: verbose output [on, off]
* arg 6: input file containing memory addresses

&nbsp;
&nbsp;

**other stuff found in the zip file**

* a nasty perl script that can be used for address generation
* a random index and offset generator 
* i used them like this to create an address_gen.txt input file:

&nbsp;

`$ create | generator`

[source code](https://github.com/scottstav/cache-sim)


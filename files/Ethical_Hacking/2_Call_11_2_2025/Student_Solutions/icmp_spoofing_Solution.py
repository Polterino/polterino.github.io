#!/usr/bin/env python3
from scapy.all import *

IFACE = 'br-7a974fad7fce'

def spoof(pkt):
	"""
	Given a received packet, spoof its address and send a reply
	"""

	# Check if the packet is an ICMP echo request
	if pkt[ICMP].type == 8:

		spoof_ip = IP(src=pkt[IP].dst, dst=pkt[IP].src)

		spoof_icmp = ICMP(type=0, id=pkt[ICMP].id, seq=pkt[ICMP].seq+1)

		spoof_data = pkt[Raw].load
    	
		spoof_pkt = spoof_ip/spoof_icmp/spoof_data 	# Build the spoofed packet
		send(spoof_pkt, verbose=0)

		print('[+] Spoofed Packet Sent')
	return

print('[+] Sniffing...')
pkt = sniff(iface=IFACE, filter='icmp', prn=spoof)

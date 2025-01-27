#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

unsigned char *isThisVulnerable(unsigned char* src, int size)
{
	unsigned char* retval = (unsigned char*)malloc(size*sizeof(unsigned char));
	return memcpy((void*)retval, (const void*)src, (size_t)size);
}

int main(int argc, char **argv)
{
	int i = SIZE, k = 0;
	if(argc > 1)
	{
		i = atoi(argv[1]);
	}
	unsigned char buf[SIZE];
	for(k=0;k<SIZE;k++)
		buf[k] = 0;
	
	unsigned char *result = (unsigned char*)isThisVulnerable(buf, i);
	printf("%02X", result[0]);
	for(k=1;k<i;k++)
	{
		if(k%16 == 0)
			printf("\n");
		else if(k%4 == 0)
			printf("\t");
		printf("%02X", result[k]);
	}
	printf("\n\n");
}

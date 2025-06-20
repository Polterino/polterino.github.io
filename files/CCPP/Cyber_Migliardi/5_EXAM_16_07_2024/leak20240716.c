#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

unsigned char *isThisVulnerable(unsigned char* src, int size)
{
	unsigned char* retval = (unsigned char*)malloc(size*sizeof(unsigned char));
	return strcpy((void*)retval, (const void*)src);
}

int main(int argc, char **argv)
{
	FILE *int = NULL;
	int size = SIZE, i = SIZE, k = 0;
	if(argc > 1)
	{
		size = i = atoi(argv[1]);
	}

	unsigned char buf[size];
	for(k=0;k<size;k++)
		buf[k] = 0;

	if(argc > 2)
	{
		int index = 0;
		int tmp = 0;
		in = fopen(argv[2], "r");
		while( (tmp = fgetc(in)) != EOF)
		{
			buf[index++] = (unsigned char)tmp;
		}
		fclose(in);
	}
	
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

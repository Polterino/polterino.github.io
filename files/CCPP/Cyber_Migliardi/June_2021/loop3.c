/* loop3.c */
#include <stdio.h>
#include <stdlib.h>

#define SIZE 0
int k = 0;

void loop()
{
	unsigned int buf[SIZE];
	unsigned int i = 0;
	printf("%d Now loop starts...\n", k++);
	
	if(k<1000)
	{
		loop();
	}
	
	/*
	*/
	printf("buf is at %X\n", (unsigned int)buf);
	for(i=SIZE + 0;i<SIZE + 10;i++)
	{
		printf("[%d] = %X\n", i, buf[i]);
	}
	
	*((int*)(&(buf[SIZE + 5]))) = &loop;
	*((int*)(&(buf[SIZE + 4]))) = &loop;
	//*((int*)(&(buf[SIZE + 3]))) = buf[SIZE + 3] - 4;
	//*((int*)(&(buf[12]))) = &loop;
	//*((int*)(&(buf[9]))) = &loop;
	//*((int*)(&(buf[8]))) = &loop;
	//printf("count:%X inbuf:%X i:%X buf:%X\n", &count, inbuf, &i, buf);
	//for(i=0;i<count;i++)
	//{
	//buf[i] = inbuf[i];
	//printf("%X %d\n", &(buf[i]), i);
	//}
	printf("Now loop returns...\n");
}

int main(int argc, char** argv)
{
	int val = 7;
	int k = 0;
	int dim = atoi(argv[1]);
	unsigned char theBuf[dim];

	if(argc > 2)
	{
		val = atoi(argv[2]);
	}
	
	for(k=0;k<dim;k++)
	{
		theBuf[k] = val;
	}
	
	printf("main = %X\n", (unsigned int)main);
	printf("loop = %X\n", (unsigned int)loop);
	loop(dim, theBuf);
}
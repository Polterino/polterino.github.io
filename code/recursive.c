int recursive(int n)
{
	if (n==1)
		return (1);
	else
		return (recursive(n-1) + recursive(n-1));
}
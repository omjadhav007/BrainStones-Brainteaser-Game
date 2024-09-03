#include<iostream>
#include<time.h>
using namespace std;
int a[10]={6,6,6,6,6,6,6,6,6,6},s,p,scoreA=0,scoreB=0,t;
char ch,dir;
 void distribute();void traverse();void drop();void check();
 void finalise();void score();void print();void win();

void toss()
{ srand(time(0));
  int r=rand()%2;
  cout<<"the value of rand1 is  : "<<r;
  if(r==0)
   { ch='A'; cout<<endl<<"A goes first";}
  else 
   { ch='B'; cout<<endl<<"B goes first"; }
}

void pickup()
{ t=a[p];  a[p]=0;  distribute();}

void traverse()
{ if(dir=='C')
   { if(p==9) p=0;  else  ++p; }
  else
   { if(p==0) p=9;  else  --p; }
}

void check()
{ if(a[p]==4)
 { if(p==0||p==1||p==2||p==3||p==4) scoreA+=4;
   else  scoreB+=4;
   a[p]=0;   
 }

}

void distribute()
{
  if(t!=0)
    { traverse();  a[p]++;  check(); t--;  distribute(); }
  else
    { traverse();
      if(a[p]==0)
        {   traverse();
            if(ch=='A') { scoreA+=a[p]; ch='B'; }
            else { scoreB+=a[p]; ch='A'; }
            a[p]=0;  print(); score();  
            return;
        }
      else  {  print();  pickup();}  
   } 
}

void select()
{   
    switch(ch)
    { case 'A': cout<<endl<<"Choose a node from 1 to 5 and direction C or A : ";
                cin>>s>>dir;
                if (s>0 && s<6)  { p=s-1; print(); pickup(); }
                else  cout<<"Invalid Choice!!";
      case 'B': cout<<endl<<"Choose a node from 6 to 10 and direction C or A : ";
                cin>>s>>dir;
                if (s>5 && s<11)  {p=s-1; print(); pickup(); }
                else  cout<<"Invalid Choice!!";
      //default : cout<<"Invalid Choice!!";
    }
   
}

void print()
{ cout<<endl<<"--------------------NODES----------------------------------"<<endl<<endl;
  for(int i=0;i<=9;i++)
    { cout<<" "<<a[i]; } 
  cout<<endl<<"-----------------------------------------------------------";      
}

void score()
{ cout<<endl<<"---------------------------------------------------------------------";
  cout<<endl<<"Player A : "<<scoreA<<endl<<"Player B : "<<scoreB;
  cout<<endl<<"---------------------------------------------------------------------";
}

void win()
{cout<<endl<<"------------------------RESULT-------------------------------";
 if(scoreA>scoreB) cout<<endl<<"Player A wins ";//by "<<(scoreA-scoreB)<<" Points";
 else if(scoreA<scoreB) cout<<endl<<"Player B wins ";// by "<<(scoreB-scoreA)<<" Points";
 else
 cout<<endl<<"MATCH TIED !!";
}

int main()
{   ch='A';
  //toss(); //select();
  //while((a[0]+a[1]+a[2]+a[3]+a[4])<30 || (a[5]+a[6]+a[7]+a[8]+a[9])<30)
  while((a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]+a[8]+a[9])!=1) {
    score(); print(); select();}
   win();
  return 0;     
}
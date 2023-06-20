#include<bits/stdc++.h>
using namespace std;

const double eps=1e-4;

struct Complex{
	double r,i;
	Complex operator *(const Complex& other){
		return (Complex){r*other.r-i*other.i,r*other.i+i*other.r};
	}
	Complex operator +(const Complex& other){
		return (Complex){r+other.r,i+other.i};
	}
	Complex operator -(const Complex& other){
		return (Complex){r-other.r,i-other.i};
	}
	void output(){
		cout<<"("<<r<<","<<i<<")\n";
	}
};

double length(const Complex& c){
	return sqrt(c.r*c.r+c.i*c.i);
}

double argument(const Complex& c){
	return atan2(c.i,c.r);
}

int dcmp(double r){
	if(r>eps)return 1;
	return r<-eps?-1:0;
}

double rand_db(){
	return rand()-RAND_MAX/2;
}

int main(){
	srand(time(0));
	for(int i=1;i<=100;i++){
		Complex a=(Complex){rand_db(),rand_db()};
		Complex b=(Complex){rand_db(),rand_db()};
		Complex c=a*b;
		a.output();
		b.output();
		c.output();
		if(dcmp(length(c)-length(a)*length(b))!=0){
			cout<<"length(c)="<<length(c)<<"\n";
			cout<<"length(a)="<<length(a)<<"\n";
			cout<<"length(b)="<<length(b)<<"\n";
			cout<<"Error\n";
			exit(-1);
		}
		if(dcmp(argument(c)-argument(a)-argument(b))!=0){
			cout<<"argument(c)="<<argument(c)<<"\n";
			cout<<"argument(a)="<<argument(a)<<"\n";
			cout<<"argument(b)="<<argument(b)<<"\n";
			cout<<"Error\n";
			exit(-1);
		}
	} 
	cout<<"Test Passed\n";
	return 0;
}


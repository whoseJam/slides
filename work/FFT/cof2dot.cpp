#include<bits/stdc++.h>
using namespace std;

int read(){
	int s=0,f=1;char t=getchar();
	while('0'>t||t>'9'){
		if(t=='-')f=-1;
		t=getchar();
	}
	while('0'<=t&&t<='9'){
		s=(s<<1)+(s<<3)+t-'0';
		t=getchar();
	}
	return s*f;
}

const double PI=acos(-1);
const int N=1005;
int a[N],n;

struct Complex{
	double r,i;
	Complex operator *(const Complex& other){
		return (Complex){r*other.r-i*other.i,r*other.i+i*other.r};
	}
	Complex operator *(double v){
		return (Complex){r*v,i*v};
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
Complex y1[N];
Complex y2[N];

Complex W(int n,int m){
	return (Complex){cos(2*PI*n/m),sin(2*PI*n/m)};
}

void N2(){
	for(int i=0;i<n;i++){
		Complex w=W(n,i);
		Complex wk=(Complex){1,0};
		Complex ans=(Complex){0,0};
		for(int j=0;j<n;j++){
			ans=ans+(wk*a[i]);
		}
		y1[i]=ans;
	}
}

vector<int> partition(vector<int> poly){
	if(poly.size()==1){
		return vector<int>({poly[0]});
	}
	vector<int> even;
	vector<int> odd;
	for(int i=0;i<poly.size();i++){
		if(i%2==0)even.push_back(poly[i]);
		else odd.push_back(poly[i]);
	}
	vector<int> even_y=partition(even);
	vector<int> odd_y=partition(odd);
	for(int k=0;k<poly.size();i++){
		
	}
}

int main(){
	n=read();
	vector<int> poly;
	for(int i=0;i<n;i++){
		a[i]=read();
		poly.push_back(a[i]);
	}
	N2();
	partition(poly);
	
	return 0;
}


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
	return (Complex){cos(2*PI*m/n),sin(2*PI*m/n)};
}

void N2(){
	for(int i=0;i<n;i++){
		Complex w=W(n,i);
		Complex wk=(Complex){1,0};
		Complex ans=(Complex){0,0};
		for(int j=0;j<n;j++){
			ans=ans+(wk*a[j]);
			wk=wk*w;
		}
		y1[i]=ans;
	}
}

vector<Complex> partition(vector<int> poly){
	int n=poly.size(); 
	if(n==1){
		return vector<Complex>({
			(Complex){poly[0],0}
		});
	}
	vector<int> even;
	vector<int> odd;
	for(int i=0;i<n;i++){
		if(i%2==0)even.push_back(poly[i]);
		else odd.push_back(poly[i]);
	}
	vector<Complex> even_y=partition(even);
	vector<Complex> odd_y=partition(odd);
	vector<Complex> y;
	for(int k=0;k<n;k++){
		Complex ans=even_y[k%(n/2)]+W(n,k)*odd_y[k%(n/2)];
		y.push_back(ans);
	}
	return y;
}

int main(){
	n=read();
	vector<int> poly;
	for(int i=0;i<n;i++){
		a[i]=read();
		poly.push_back(a[i]);
	}
	N2();
	auto ans=partition(poly);
	for(int i=0;i<ans.size();i++)
		y2[i]=ans[i];
	
	for(int i=0;i<n;i++){
		y1[i].output();
		y2[i].output();
		cout<<"\n";
	}
	
	return 0;
}


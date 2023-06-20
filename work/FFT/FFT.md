# 目录

# 复数

## 复数域 {data-background-iframe="complex_region"}

$$
c=a+bi
$$

**欧拉公式**：$e^{i\theta}=(cos\theta+isin\theta)$

如果我们画一个坐标图，横坐标为实数轴，纵坐标为虚数轴，我们就得到了一个复数坐标系，每一个复数在复数坐标系中被表示成一个向量，我们称向量的模长为复数的**模长**，向量与横坐标的夹角为**辐角**

## 复数运算 {data-background-iframe="complex_compute"}

<p class="left"></p>

设$c_1=a_1+b_1i$，$c_2=a_2+b_2i$

<p id="begin_add"></p>

### 加法

$$
c_3=c_1+c_2=(a_1+a_2)+(b_1+b_2)i
$$

<p id="end_add"></p>

<p id="begin_multi"></p>

### 乘法

$$
c_3=c_1\cdot c_2=(a_1+b_1i)\cdot(a_2+b_2i)=(a_1a_2-b_1b_2)+(a_1b_2+a_2b_1)i
$$

<p id="end_multi"></p>

## 单位根

当$W_N^1$在某种乘法下满足$(W_N^1)^N=1$时，我们称$W_N^{1}$是单位根，显然以下式子成立：
$$
(W_N^1)^N=1 \\
(W_N^2)^{\frac N 2}=1 \\
...\\
(W_N^M)^{\frac N M} = 1
$$

并且我们从定义就能看出来，单位根的可以有**很多形式**，只要符合定义$(W_N^1)^N=1$就行了，而**精心构造的复数**正好可以作为单位根的**其中一种形式**

## 单位根的性质

$$
W_{2N}^{2M}=W_N^M
$$

$$
W_N^{M}=-W_N^{M+\frac N 2}
$$

$$
W_N^M
$$



# 多项式乘法

## 系数表示法

一个$n$次多项式可以表示成
$$
f(x)=\sum_{i=0}^na_ix^i
$$
也就是$n+1$个系数可以确定一个$n$次多项式

## 点值表示法

把多项式当作一个函数，采样$n+1$个不同的$x$代入，会得到$n+1$个不同的$y$，那么这$n+1$个$(x_i,y_i)$就可以唯一确定该多项式
$$
\left\{
\begin{matrix}
a_0+a_1x_0+a_2x_0^2+...+a_nx_0^n=y_0 \\
a_0+a_1x_1+a_2x_1^2+...+a_nx_1^n=y_1 \\
... \\
a_0+a_1x_{n}+a_2x_{n}^2+...+a_nx_{n}^n=y_{n}
\end{matrix}
\right.
$$
那么$f(x)$可以用$\{(x_0,f(x_0)),(x_1,f(x_1)),...,(x_n,f(x_n))\}$这样一个集合表征

## 多项式乘法的快速算法

如果用多项式的系数表示，多项式的乘法大概能写成这个样子

```
for(int i=0;i<=n;i++)
	for(int j=0;j<=m;j++)
		c[i+j]+=a[i]*b[j];
```

这是一个$O(n^2)$的算法，但是我们注意到，如果用多项式的点值表示，多项式的乘法能写成一个更加简洁的形式

```
for(int i=0;i<=n;i++)
	c[i]=a[i]*b[i];
```

## 多项式乘法的快速算法

这启发我们通过这样一条路径计算多项式乘法

<img src="https://img1.imgtp.com/2023/06/20/3EzrGxnW.png" alt="image-20230617112206043" style="zoom:50%;" />

# 系数表示法转点值表示法

## Q.代入哪些点值有特殊的效果

对于一个$n-1$次多项式，我们需要代入$n$个点值，如果暴力代入，从系数表达式到点值表达式这一步的时间复杂度仍然$O(n^2)$的

```
for(int i=1,x;i<=n;i++){
	x=1;y[i]=0;
	for(int j=0;j<n;j++){
		y[i]+=x*a[j];
		x*=naive_choose[i];
	}
}
```

## Q.代入哪些点值有特殊的效果

$-1$和$1$是两个看上去就比较特殊的值，代入试试（假设$n$为偶数）
$$
\begin{aligned}
A(1)&=a_0+a_1+a_2+...+a_{n-1} \\
A(-1)&=a_0-a_1+a_2-...-a_{n-1}
\end{aligned}
$$
设：
$$
\begin{aligned}
Even(x)&=a_0+a_2x^2+a_4x^4+...+a_{n-2}x^{n-2} \\
Odd(x)&=a_1x+a_3x^3+a_5x^5+...+a_{n-1}x^{n-1}
\end{aligned}
$$
那么$A(1)$和$A(2)$可以写成：
$$
\begin{aligned}
A(1)&=Even(1)+Odd(1) \\
A(-1)&=Even(1)-Odd(1)
\end{aligned}
$$
而计算$Even(1)$和$Odd(1)$的**总计算次数**是$n$次，我们做到了只计算$n$次就能取出$n$次多项式的两个点值

直接说答案，对于$n-1$次多项式，代入单位根$\{W_{n}^0,W_{n}^1,...,W_{n}^{n-1}\}$这$n$个值，可以简化系数多相似转点值多项式的计算，而$-1$和$1$正好是$W_2^0$和$W_2^1$（我们在上述例子中也正好简化了一次）

## 代入单位根

设我们要对多项式$A(x)=\sum_{i=0}^{n-1}a_ix^i$进行单位根代入，为了方便讨论，我们假设$n=2^m$

我们将$A(x)$划分成奇数项和偶数项
$$
\begin{aligned}
Even(x)&=a_0+a_2x^2+a_4x^4...+a_{n-2}x^{n-2} \\
Odd(x)&=a_1x+a_3x^3+a_5x^5...+a_{n-1}x^{n-1} \\
Odd(x)&=x(a_1+a_3x^2+a_5x^4...+a_{n-1}x^{n-2})
\end{aligned}
$$
仔细观察$a_0+a_2x^2+a_4x^4...+a_{n-2}x^{n-2}$和$a_1+a_3x^2+a_5x^4...+a_{n-1}x^{n-2}$，我们可以发现它们十分类似，设：
$$
\begin{aligned}
B(x)&=a_0+a_2x+a_4x^2+...+a_{n-2}x^{(n-2)/2} \\
C(x)&=a_1+a_3x+a_5x^2+...+a_{n-1}x^{(n-2)/2}
\end{aligned}
$$
那么$A(x)=B(x^2)+xC(x^2)$

## 代入单位根

$$
\left\{
\begin{matrix}
\begin{aligned}
A(W_{n}^0)&=B((W_n^0)^2)+W_n^0C((W_n^0)^2) \\
A(W_{n}^1)&=B((W_n^1)^2)+W_n^1C((W_n^1)^2) \\
&...\\
A(W_{n}^{n-1})&=B((W_n^{n-1})^2)+W_n^{n-1}C((W_n^{n-1})^2) \\
\end{aligned}
\end{matrix}
\right.
$$

考察这些式子中的第$k$个
$$
\begin{aligned}
A(W_n^k)&=B((W_n^k)^2)+W_n^kC((W_n^k)^2) \\
&=B(W_n^{2k})+W_n^kC(W_n^{2k}) \\
&=B(W_{n/2}^k)+W_n^kC(W_{n/2}^k)
\end{aligned}
$$
这么看来，我们把一个系数长度为$n-1$，需要代入$\{W_{n}^0,W_{n}^1,...,W_{n}^{n-1}\}$这$n$个单位根的多项式转化为了两个系数长度为$\frac {n-2}2$，需要分别代入$\{W_{n/2}^0,W_{n/2}^1,...,W_{n/2}^{n/2-1}\}$这$\frac n 2$个单位根的多项式，然后还需要一次复杂度为$O(n)$的合并，这正是分治的复杂度

# 点值表示法转系数表示法

## 点值表示法转系数表示法

假设$(y_0,y_1,y_2,...,y_{n-1})$为$n-1$次多项式$A(x)=\sum_{i=0}^{n-1}a_ix^i$的点值表示，其中$y_i=A(W_n^i)$

构造这样一个多项式：
$$
B(x)=y_0+y_1x+y_2x^2+...+y_{n-1}x^{n-1}
$$
如果我们把$\{W_n^0,W_n^{-1},...,W_n^{-(n-1)}\}$作为采样点，代入$B(x)$中，可以得到：
$$
\begin{aligned}
B(W_n^{-k})&=\sum_{i=0}^{n-1}y_i(W_n^{-k})^i \\
&=\sum_{i=0}^{n-1}(\sum_{j=0}^{n-1}a_j(W_n^i)^j)(W_n^{-k})^i \\
&=\sum_{j=0}^{n-1}a_j\cdot(\sum_{i=0}^{n-1}W_{n}^{ij-ik}) \\
&=\sum_{j=0}^{n-1}a_j\cdot (\sum_{i=0}^{n-1}(W_n^i)^{j-k})
\end{aligned}
$$

## 点值表示法转系数表示法

分析式子：
$$
B(W_n^{-k})
=\sum_{j=0}^{n-1}a_j\cdot (\sum_{i=0}^{n-1}(W_n^i)^{j-k})
$$

- 当$j-k=0$的时候
  - $(W_n^i)^{j-k}=1$，即$\sum_{i=0}^{n-1}(W_n^i)^{j-k}=n$
- 当 $j-k\ne 0$的时候
  - 可以推导出$\sum_{i=0}^{n-1}(W_n^i)^{j-k}=0$

所以$B(W_n^{-k})=na_k$，即$A(x)$的第$k$项系数是由$B(W_n^{-k})/n$得到，而$B(W_n^{-k})$相当于把$A(x)$的长度为$n$的点值表达式当作一个系数表达式，代入$\{W_n^0,W_n^{-1},...,W_n^{-(n-1)}\}$这$n$个采样点得到的**“点值表达式”**

至此，多项式乘法的快速计算已经全部打通

# 代码实现

## 简单的分治

```c++
Complex W(int n,int m){
	return (Complex){cos(2*PI*m/n),sin(2*PI*m/n)};
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
```

上述分治的空间复杂度高，常数过大

## 蝶形算法


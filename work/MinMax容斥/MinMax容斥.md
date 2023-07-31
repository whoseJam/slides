# MinMax容斥

## 引入

假设我们有一个全集$U=\{a_1,a_2,...,a_n\}$，设：
$$
min(S)=\mathop{min}_{a_i\in U}\ a_i \\
max(S)=\mathop{max}_{a_i\in U}\ a_i
$$
现在把$max$这个运算符ban了，我们能不能求出任意一个集合$S$的$max(S)$呢？线考虑一个简单的例子：
$$
max(a,b)=min(a)+min(b)-min(a,b)
$$
这启发我们用一个由$min$组成的式子去容斥得到$max(S)$，这似乎是可行的。
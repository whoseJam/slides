import numpy as np
import matplotlib.pyplot as plt

c = np.pi
T = 2 * np.pi
w = 2 * np.pi / T

def origin(x):
    return x + c

def a(n):
    if n == 0:
        return 2 * c
    return 0

def b(n):
    if n % 2 == 0:
        return -2 / n / w
    return 2 / n / w
    

def fourier(t, n):
    ans = a(0) / 2
    for i in range(1, n):
        ans = ans + a(i) * np.cos(i * w * t)
        ans = ans + b(i) * np.sin(i * w * t)
    return ans

# 拟合结果
# x = np.linspace(- T / 2, T / 2, 500)
# yo = [origin(x0) for x0 in x]
# for j in [1, 5, 10, 20, 50]:
#     y = [fourier(x0, j) for x0 in x]
#     plt.plot(x, yo)
#     plt.plot(x, y)
#     plt.show()

# n关于a(n)的关系
# n = range(1, 10)
# y = [a(n0) for n0 in n]
# plt.bar(n, y)
# plt.show()

# n关于b(n)的关系
# n = range(1, 10)
# y = [b(n0) for n0 in n]
# plt.bar(n, y)
# plt.show()

# n关于c(n)的关系
n = range(1, 10)
x = [n0 * w for n0 in n]
print(x, w)
y = [np.sqrt(a(n0)**2 + b(n0)**2) for n0 in n]
plt.bar(x, y, width=w * 0.1)
plt.show()
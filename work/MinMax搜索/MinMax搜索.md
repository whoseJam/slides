# MinMax搜索

## 零和博弈

- 两个玩家轮流行动
- 共同影响一个得分
- 玩家A希望得分越大越好
- 玩家B希望得分越小越好

## 单玩家的搜索树

## 状态的价值

## 零和博弈的搜索树

## MinMax Value

如果在状态$s$上轮到玩家A行动：
$$
V(s)=\mathop{max}_{s'\in successors(s)}V(s')
$$
如果在状态$s$上轮到玩家B行动：
$$
V(s')=\mathop{min}_{s\in successors(s')}V(s)
$$
终止状态：
$$
V(s)=known
$$

# 代码实现

## 伪代码

```
int max_value(state){
	if(is_terminal_state(state))
		return value_of(state);
	int v=-inf;
	foreach(successor of state)
		v=max(v,min_value(successor));
	return v;
}

int min_value(state){
	if(is_terminal_state(state))
		return value_of(state);
	int v=inf;
	foreach(successor of state)
		v=min(v,max_value(successor));
	return v;
}
```

# 效率

## 时空复杂度

假设每一步游戏行动有$b$个选择，总共进行$m$步游戏，那么：

- 时间复杂度：$O(b^m)$
- 空间复杂度：$O(bm)$

或者这么考虑，假设游戏的状态空间大小为$S$，时间复杂度就是$O(S)$，当$S$较大时，我们不禁会想到能不能对MinMax搜索剪枝

## Alpha-Beta剪枝

对于玩家B（希望得分越小越好的玩家）

- 假设我们正在计算状态$s$的`min_value()`操作
- 谁关注$s$的最终得分？玩家A
- 假设$\alpha$是玩家A能得到的，从搜索树的根到状态$s$这条路径上，任意一个决策点的最大价值
- 如果发现$value\_of(s)\le \alpha$，那么对于玩家A来说，他肯定不会让游戏进行到状态$s$这一步，所以我们也不需要再计算$s$的`min_value()`了

```
int max_value(state,a){
	if(is_terminal_state(state))
		return value_of(state);
	int v=-inf;
	foreach(successor of state){
		v=max(v,min_value(successor,a));
		a=max(a,v);
	}
	return v;
}

int min_value(state,a){
	if(is_terminal_state(state))
		return value_of(state);
	int v=inf;
	foreach(successor of state){
		v=min(v,max_value(successor,a));
		if(v<=a)return v;
	}
	return v;
}
```

## Alpha-Beta剪枝


---
title: Algorithm
date: 2023-11-23 20:49:10
tags:
---

# Algorithm

<!-- more -->

## TreeSet



## TreeMap

基于红黑树实现的NavigableMap

最近做到的题的一个考点时： HashMap + TreeMap 或者 HashMap + TreeSet

主要是 找到 刚好 大于 某个输入值的 最小点  

或者 找到 刚好 小于 某个输入值的 最大点



常用方法

1. **put(K key, V value)**: 将指定的键值对添加到映射中。如果映射之前包含了该键的映射，则旧值将被替换。
2. **get(Object key)**: 返回指定键所映射到的值；如果此映射不包含该键的映射，则返回 `null`。

1. **remove(Object key)**: 移除映射中指定键的键值对。

   

2. **firstKey()**: 返回映射中当前第一个（最低）键。

3. **lastKey()**: 返回映射中当前最后一个（最高）键。

   

1. **floorKey(K key)**: 返回小于或等于指定键的最大键；如果不存在这样的键，则返回 `null`。
2. **ceilingKey(K key)**: 返回大于或等于指定键的最小键；如果不存在这样的键，则返回 `null`。



1. **higherKey(K key)**: 返回映射中比指定键大的最小键；如果不存在这样的键，则返回 `null`。
2. **lowerKey(K key)**: 返回映射中比指定键小的最大键；如果不存在这样的键，则返回 `null`。



> Eg：
>
> 下面是一道 981 考察treeMap的题
>
> class TimeMap {
>     Map<String, TreeMap<Integer, String>> map;
>     public TimeMap() {
>         map = new HashMap<>();
>     }
>     
>     public void set(String key, String value, int timestamp) {
>         if (map.get(key) == null) {
>             map.put(key, new TreeMap<>((a, b) -> a - b));
>         }
>
> ​        map.get(key).put(timestamp, value);
> ​    }
> ​    
> ​    public String get(String key, int timestamp) {
> ​        if (map.get(key) == null) return "";
> ​        
> ​        Integer floorKey = map.get(key).floorKey(timestamp);
>
> ​        return floorKey != null ? map.get(key).get(floorKey) : "";
> ​    }
> }

## PriorityQueue

用到优先级队列的题目主要分两类:

			1. 合并多个有序链表  --> lc 21
			1. 寻找第 `k` 个最大元素 -->lc 373
			1. 



# 模运算

```
(a + b) mod m = (a mod m + b mod m ) mod m
```

```
(a . b) mod m = ((a mod m) . (b mod m)) mod m
```



如何计算 1234  * 6789 的**个位数**?

只有个位数会影响 个位数的乘积

4 * 9 = 36

对于 1234 + 6789 的个位数？

同理，4+9=134+9=13 的个位数 33 就是答案。



主要应用场景 对于 a的n次方 和 结果 求 mod

```java
public int power(int a, int n, int base) {
	if (n == 1) {
		return a %= base;
	}
	
	a %= base;
	int res = 1;
	
	for (int i = 0; i < n; i++) {
			res *= a;
			res %= base;
	}
	
	return res;
}
```



进一步优化

分类讨论 n为偶数 和 n为奇数时候的情况

![image-20231210125703002](/Users/zhouzhenzhou/Desktop/前端/hexo-web/source/_posts/Algorithm.assets/image-20231210125703002.png)

把问题规模（`b` 的大小）直接减小一半， log 级



```java
public int power(int a, int b, int base) {
		if (b == 0) return 1;
		
		int res = 1;
		
		a %= base;
		
		if (b %2 == 1) {
				return a * power(a, b - 1) % base;
		} else {
				int sub = power(a, b / 2);
				return (sub * sub) % base;
		}
}
```

任何数mod1 都为0

可以在base 写 

```java
if (mod == 1): return 0;
```



相关题目

372

50

# 数字的范围

### Integer.MIN_VALUE

```
 1000 0000 0000 0000 0000 0000 0000 0000
```

31个零

```
-2147483648
```

```
10的9点33次方
```

### Integer.MAX_VALUE

```
0111 1111 1111 1111 1111 1111 1111
```

31个1

```
2147483647
```

```
10的9点33次方
```

大于10的9次方 小于10的10次方

```
2的31次方-1
```

接近2的31次方



### Integer.MIN_VALUE 和 Integer.MAX_VALUE 关系

max - 1 取反 == - min



## 素数 Prime Number

从2开始到n- 1

下面是升级版

只需要判断到 sqrt(n) 即可

```java
boolean isPrime(int n) {
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0)
            // 有其他整除因子
            return false;
    return true;
}
```

终极版 素数排除法 the Sieve of Eratosthenes algorithm

```java
int countPrime(int n) {
	boolean[] isPrime = new boolean[n];
	Arrays.fill(isPrime, true);
  
  // n loglogn
	for (int i = 2; i * i < n; i++) { // 2-> 根号n
			for (int j = i * i; j < n; j += i) { // (n - i * i) / i
					if (isPrime[i]) {
							isPrime[j] = false;
					}
			}
	}
	
	int count = 0;
	for (int i = 2; i < n; i++) {
			if (isPrime[i]) count++;
	}
	
	return count;
}
```





# 不熟练的java方法

deque 双向队列

```java
Deque<Integer> deque = new LinkedList<>();

Deque<Integer> dq = new ArrayDeque<>();
```

ArrayDeque比linkedlist更快的数组遍历 但是插入删除会慢



```java
Deque<Integer> deque = new LinkedList<>();
deque.addFirst(1);   // 队列现在是 [1]
deque.addLast(2);    // 队列现在是 [1, 2]
```

```java
deque.removeFirst(); // 移除 1, 队列现在是 [2]
deque.removeLast();  // 移除 2, 队列现在是 []
```

```java
deque.offerFirst(1);
deque.offerLast(2);
int first = deque.getFirst(); // 返回 1
int last = deque.getLast();   // 返回 2
```

```java
deque.push(3);        // 队列现在是 [3, 1, 2]
deque.pop();          // 弹出 3, 队列现在是 [1, 2]
```

例子：

```java
Deque<Integer> deque = new LinkedList<>(); // 或者 new ArrayDeque<>();
deque.offerFirst(10);
deque.offerLast(20);
System.out.println(deque.peekFirst()); // 输出 10
System.out.println(deque.peekLast());  // 输出 20
deque.push(30);
System.out.println(deque.pop());       // 输出 30
```





数组复制

```java
int[] nums2 = Arrays.copyOf(nums1, 0, nums1.length);
```

repeat方法

生成重复字符串

```java
String res = "U".repeat(10); // UUUUUUUUUU"
```

> 创建一个字符串，将U重复10次

substring方法

对字符串切片

```java
substring(int beginIndex)
```

> 从beginIndex 开始截取， 一直到字符串末尾。

```java
substring(int beginIndex, int endIndex)
```

> 左闭右开
>
> 从beginIndex开始，一直截取到endIndex

# 摩尔投票

统计数组中，出现 次数为 n / k 的元素

经典例子：

使用 摩尔投票 在 O(1)空间复杂度内找到了出现次数超过一半的元素，即出现次数大于 n/2 的数



> 出现次数超过n/k的数最多只有k一1个。
>
> 否则必然违背「数总共只有几个」或者 「当前统计的是出现次数超过n/k的数」的前提条件。



> 使用「摩尔投票」的标准做法，在遍历数组时同时 check 这飞一1个数，假设当前遍历到的元素为a：
>
> > 如果本身是候选者的话，则对其出现次数加一；
>
> > 如果 q本身不是候选者，检查是否有候选者的出现次数为0：
>
> > > 若有，则让心代替其成为候选者，并记录出现次数为 1；
>
> > > 若无，则让所有候选者的出现次数减一。
>
> 当处理完整个数组后，这k一1 个数可能会被填满，但不一定都是符合出现次数超过n/k要求的。
>
> 需要进行二次遍历，来确定候选者是否符合要求，将符合要求的数加到答案。

**若存在出现次数超过n/k 的数，最后必然会成为这k-1个候选者之一**



关于摩尔投票算法的理解

> 多方混战。
>
> 首先要知道，在任何数组中，出现次数大于该数组长度1/3的值最多只有两个。
>
> 我们把这道题比作一场多方混战，战斗结果一定只有最多两个阵营幸存，其他阵营被歼灭。数组中的数字即代表某士兵所在的阵营。
>
> 我们维护两个潜在幸存阵营A和B。我们遍历数组，如果遇到了属于A或者属于B的士兵，则把士兵加入A或B队伍中，该队伍人数加一。继续遍历。
>
> 如果遇到了一个士兵既不属于A阵营，也不属于B阵营，这时有两种情况：
>
> 1. A阵营和B阵营都还有活着的士兵，那么进行一次厮杀，参与厮杀的三个士兵全部阵亡：A阵营的一个士兵阵亡，B阵营的一个士兵阵亡，这个不知道从哪个阵营来的士兵也阵亡。继续遍历。
> 2. A阵营或B阵营已经没有士兵了。这个阵营暂时从地球上消失了。那么把当前遍历到的新士兵算作新的潜在幸存阵营，这个新阵营只有他一个人。继续遍历。
>
> 大战结束，最后A和B阵营就是初始人数最多的阵营。判断一下A，B的人数是否超过所有人数的三分之一就行了

##### 升级为k的的写法

维护 k-1 个数，遍历数组，当前为 x

如果 x 本身是候选者的话，则对其出现次数加一；
如果 x 本身不是候选者，检查是否有候选者的出现次数为 0：
若有，则让 x 代替其成为候选者，并记录出现次数为 1
若无，则让所有候选者的出现次数减一

代码逻辑解释

> 

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> majorityElement(int[] nums, int k) {
        List<Integer> cand = new ArrayList<>();
        List<Integer> cnt = new ArrayList<>();
        for (int i = 0; i < k - 1; i++) {
            cand.add(Integer.MIN_VALUE);
            cnt.add(0);
        }

        for (int num : nums) {
            boolean oldcand = false;
            for (int j = 0; j < k - 1; j++) {
                if (cand.get(j).equals(num)) {
                    cnt.set(j, cnt.get(j) + 1);
                    oldcand = true;
                    break;
                }
            }
            if (!oldcand) {
                boolean newcand = false;
                for (int j = 0; j < k - 1; j++) {
                    if (cnt.get(j) == 0) {
                        cand.set(j, num);
                        cnt.set(j, 1);
                        newcand = true;
                        break;
                    }
                }
                if (!newcand) {
                    for (int j = 0; j < k - 1; j++) {
                        cnt.set(j, cnt.get(j) - 1);
                    }
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        int target = nums.length / 3;
        for (int i = 0; i < k - 1; i++) {
            int count = 0;
            for (int num : nums) {
                if (cand.get(i).equals(num)) {
                    count++;
                }
            }
            if (count > target) {
                res.add(cand.get(i));
            }
        }
        return res;
    }

    public List<Integer> majorityElement(int[] nums) {
        return majorityElement(nums, 3);
    }
}

```



# 中位数贪心

给定一个数组arr，取arr中的中位数x

x到arr中所有数的距离之和是最小的



# 01交替问题

直接思考 

结果1：开始为0 下一个为1

结果2：开始为1 下一个为0

如果需要修改为 结果1的操作为a, 修改为结果2的操作为b

a + b = n

n是该数组的长度

# 计算数组中元素数量

## 一个数组中所有可能子集的数量

**2^n**

> 这包括了数组的所有可能组合，无论元素是否连续。
>
> 对于数组 [1,2,3][1,2,3]，其子集包括 [],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3][],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]，总共 23=823=8 个。
>
> 每个元素都有两种选择：要么在子集中，要么不在。

## 连续子数组数量

前提 该数组必须 是单调递增数组

**n*(n+1) / 2**

> 这仅包括数组的连续部分。
>
> 对于同样的数组 [1,2,3][1,2,3]，其连续子数组包括 [1],[2],[3],[1,2],[2,3],[1,2,3]，总共 3+2+1=3+2+1=6 个。
>
> 在一个已排序的数组中，**每个连续的元素序列都形成了一个已排序的子数组**



> 假设有一个已排序的数组 [1,2,3,4,5][1,2,3,4,5] ，我们想要计算所有可能的已排序子数组的数量。这些子数组包括：
>
> 1. 单个元素的子数组，如 [1][1], [2][2], [3][3], [4][4], [5][5]。
> 2. 由两个元素组成的子数组，如 [1,2][1,2], [2,3][2,3], [3,4][3,4], [4,5][4,5]。
> 3. 由三个元素组成的子数组，如 [1,2,3][1,2,3], [2,3,4][2,3,4], [3,4,5][3,4,5]。
> 4. 以此类推，直到整个数组本身 [1,2,3,4,5][1,2,3,4,5]。
>
> 对于任意大小为 n 的数组，子数组的总数可以按以下方式计算：
>
> - 有 n 个由单个元素组成的子数组。
> - 有 n−1 个由两个元素组成的子数组（因为你可以从第1个元素开始，一直到倒数第二个元素）。
> - 有 n−2 个由三个元素组成的子数组，以此类推。
>
> 因此，总数是：
>
> *1+2+3+…+(*n*−1)+n*



# Dijkstra 算法

用于解决图论 两点间距离最短问题

一个顶点到其余各个点的最短路径算法

路径必须都为正数

如果路径存咋负数则必须使用 Behllman-Ford算法

> 一张城市交通地图，其中的节点代表城市中的重要地标（如商场、学校、医院等），边代表连接这些地标的道路，边的权重代表道路的长度或者通行时间。
>
> 假设你在这个城市中的某个地点（比如家），想要找到到达城市中其他各个地点的最短路径。

# Behllman-Ford算法



# Floyd算法

任意两点之间的最短路径

# Prim 算法



# 最长前缀

## LIS Longest Increasing SubArray

从数组右侧开始， 保证整个数组 递增，找到一个i点

从0到i点之间都是 单调递增的

## LCP Longest Common Prefix



# 前后缀分解 ->删除数组让剩余部分有序

> 将一个字符串或数组分解成多个较小的部分，这些部分分别代表原始数据的前缀和后缀。
>
> > **前缀（Prefix）**: 字符串或数组的前缀是指从开始到某个特定位置的所有元素的子集。
>
> > **后缀（Suffix）**: 后缀是指从某个特定位置到字符串或数组末尾的所有元素的子集。

思路 

从右到左，遍历，找到一个递增的增长区间

这样0-i就是单调递增，有序的， 这也意味着 i + 1 到 n都可以删除(n表示数组的长度)

如果 i 可以 从 0 一直到 n - 2的位置，说明 整个数组都是单调递增的



然后重新开一个j从右往左 遍历， 找到第一个 递减的区间

但是要保证 nums[i] 要 小于 该 nums[j] 否则 i 应该往左侧移动



总的思想像是 尽可能的 让剩下的元素多，然后满足

左半部分 递增 nums[i] < nums[i + 1] i++

右半部分 递减 nums[j] < nums[j + 1] j--

左半部分 小于 右半部分 ： nums[i] < nums[j]   



再结合单个维度去观察的视角

比作 右边 不放任何元素， 左边找到一个端点值，从该端点值i 开始，数组就变得无序了，因此 至少要 删除[i + 1, n] 这块

然后 [i, n] , [i - 1, n] ......[0, n]

>  [i + 1, n] 
>
>  [i, n] 
>
>  [i - 1, n] 
>
> ......
>
>  [1, n]  
>
>  [0, n]  

一共是i + 2中结果



右边放一个元素,前提得是 nums[i] < 该元素(nums[j])

如果 nums[i]  > nums[j] 需要num[i] 即 最左边的端点元素变小， 所有 i--

>  [i + 1, n - 1] 
>
>  [i, n - 1] 
>
>  [i - 1, n - 1] 
>
> ......
>
>  [1, n - 1]  
>
>  [0, n - 1]  

一共还是 i + 2 个结果



依次类推， j 从n - 1到 最可能的递减区间的最右侧端点

while (nums[j] == n - 1 && nums[j] < nums[j + 1])



> 再作总结
>
> 如何保证数组有序
>
> 数组左边递增
>
> 数组右边递减
>
> 数组左边递增的最大数 < 数组右边递减的最小数
>
> 然后思考 
>
> 数组右侧完全不保留
>
> 数组右侧保留一个
>
> 数组右侧保留两个
>
> 数组右侧保留 数组右侧递减的所有元素
>
> 注意
>
> 在保留的时候，一定要确保 **数组左边递增的最大数 < 数组右边递减的最小数**

2972

1574

2565

2483

2420

KMP也用到了 分析目标字符串 前缀 和 后缀 来 优化过程的。

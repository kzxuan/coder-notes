# 差分数组

[小而美的算法技巧：差分数组](https://mp.weixin.qq.com/s/123QujqVn3--gyeZRhxR-A)

差分数组模板化思路：
```python
class PrefixArray:
    def __init__(self, array: List[int]):
        # 构造差分数组
        self.prefix_array = array[:]
        for i in range(len(array) - 1, 0):
            self.prefix_array[i] -= self.prefix_array[i - 1]

    def change(self, start: int, end: int, value: int):
        # 在某一区间内统一增加
        self.prefix_array[start] += value
        if end + 1 < len(self.prefix_array):
            self.prefix_array[end + 1] -= value

    def recovery(self):
        # 复原数组
        array = self.prefix_array[:]
        for i in range(1, len(array)):
            array[i] += array[i - 1]
        return array
```

::: tip
实际使用的时候，可以进行逻辑简化。
:::

## 1109. 航班预订统计 :star::star:

[LeetCode](https://leetcode-cn.com/problems/corporate-flight-bookings/)

```python
class Solution:
    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
        # array直接作为差分数组
        array = [0] * n
        for b in bookings:
            start, stop, value = b
            array[start - 1] += value
            if stop < n:
                array[stop] -= value
        # 还原原始数组
        for i in range(1, n):
            array[i] += array[i - 1]

        return array
```

## 1094. 拼车 :star::star:

[LeetCode](https://leetcode-cn.com/problems/corporate-flight-bookings/)

相比于 1109，这道题多了一个对数组值大小的限制。

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        # 取题目中的数组长度限制
        station = [0] * 1001
        for value, start, stop in trips:
            station[start] += value
            station[stop] -= value

            people = 0
            # 人数溢出只可能发生在当前stop车站以内
            for s in station[:stop]:
                people += s
                if people > capacity:
                    return False
        return True
```

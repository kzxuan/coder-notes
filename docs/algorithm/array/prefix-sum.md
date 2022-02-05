# 前缀和

[小而美的算法技巧：前缀和数组](https://mp.weixin.qq.com/s/EwAH3JDs5WFO6-LFmI3-2Q)

## 303. 区域和检索 - 数组不可变 :star:

[LeetCode](https://leetcode-cn.com/problems/range-sum-query-immutable/)

```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.sums = [0]
        # 构造前缀和数组
        for n in nums:
            self.sums.append(self.pre[-1] + n)

    def sumRange(self, left: int, right: int) -> int:
        return self.sums[right + 1] - self.sums[left]
```

## 304. 二维区域和检索 - 矩阵不可变 :star::star:

[LeetCode](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)

```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.sums = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                self.sums[i + 1][j + 1] = self.sums[i + 1][j] + self.sums[i][j + 1] - self.sums[i][j] + matrix[i][j]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.sums[row2 + 1][col2 + 1] - self.sums[row2 + 1][col1] - self.sums[row1][col2 + 1] + self.sums[row1][col1]
```

## 560. 和为 K 的子数组 :star::star:

[LeetCode](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

前缀和的复杂形式，需要转换为**连续子数组的和**等于**两个前缀和的差**。

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # 利用哈希表存所有前缀和值和出现的次数，初始化为0出现了1次
        self.n_sums = {0: 1}
        # 前缀和计算
        sums = 0
        # 结果累计
        count = 0
        for n in nums:
            sums += n
            # 希望当前sums减去某一个已有的前缀和，结果为k
            # sums - n_sums{i} = k
            # 因此期望的前缀和是 n_sums{i} = sums - k
            count += self.n_sums.get(sums - k, 0)
            self.n_sums.setdefault(sums, 0)
            self.n_sums[sums] += 1
        return count
```
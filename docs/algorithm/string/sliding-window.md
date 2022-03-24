# 滑动窗口

维护滑动窗⼝，通常需要使用双指针的技巧，根据滑入和滑出操作更新数据。

## 567. 字符串的排列

[LeetCode](https://leetcode-cn.com/problems/permutation-in-string/)
:star::star:

注意目标子串长度来控制窗口左右。

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # 将目标字符串拆解为每个字符所需要的个数
        s_map = {}
        for s in s1:
            s_map.setdefault(s, 0)
            s_map[s] += 1

        left, right = 0, 0
        while right < len(s2):
            n = s2[right]
            right += 1
            if n in s_map:
                s_map[n] -= 1
            # 目标子串必然和s1长度相等
            if right - left >= len(s1):
                if all(v == 0 for v in s_map.values()):
                    return True
                d = s2[left]
                left += 1
                if d in s_map:
                    s_map[d] += 1
        return False
```

## 438. 找到字符串中所有字母异位词

[LeetCode](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
:star::star:

原理同 567。

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        p_map = {}
        for _p in p:
            p_map.setdefault(_p, 0)
            p_map[_p] += 1

        res = []
        left, right = 0, 0
        while right < len(s):
            n = s[right]
            right += 1
            if n in p_map:
                p_map[n] -= 1
            if right - left >= len(p):
                if all(v == 0 for v in p_map.values()):
                    res.append(left)
                d = s[left]
                left += 1
                if d in p_map:
                    p_map[d] += 1
        return res
```

## 76. 最小覆盖子串

[LeetCode](https://leetcode-cn.com/problems/minimum-window-substring/)
:star::star::star:

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        t_map = {}
        for _t in t:
            t_map.setdefault(_t, 0)
            t_map[_t] += 1

        left, right = 0, 0
        # 当前窗口内满足数量的字符数，窗口内某个字符的数量不少于其所需
        valid = 0
        # 记录满足条件的子串起始位置和长度
        start, min_len = 0, float("inf")
        while right < len(s):
            # 右指针右移将其原先位置的字符滑入窗口
            n = s[right]
            right += 1
            if n in t_map:
                t_map[n] -= 1
                if t_map[n] == 0:
                    valid += 1
            # 如果窗口使得所有字符都满足数量，开始左侧收缩
            while valid == len(t_map):
                if right - left < min_len:
                    start, min_len = left, right - left
                m = s[left]
                left += 1
                if m in t_map:
                    if t_map[m] == 0:
                        valid -= 1
                    t_map[m] += 1
        if min_len == float("inf"):
            return ""
        else:
            return s[start: start + min_len]
```

#Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

class Solution:
    def romanToInt(self, s: str) -> int:
        roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50,
                 'C': 100, 'D': 500, 'M': 1000}
        total = prev = 0
        for c in s:
            curr = roman[c]
            total += curr - 2 * prev if curr > prev else curr
            prev = curr
        return total
    
Sol = Solution()
print(Sol.romanToInt("IV"))  # Output: 3
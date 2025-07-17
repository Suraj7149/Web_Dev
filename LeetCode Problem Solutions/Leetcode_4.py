#Write a function to find the longest common prefix string amongst an array of strings.
class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        prefix = strs[0]
        for s in strs[1:]:
            while s[:len(prefix)] != prefix and prefix:
                prefix = prefix[:-1]
        return prefix
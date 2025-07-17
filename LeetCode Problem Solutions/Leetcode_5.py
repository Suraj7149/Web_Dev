# Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

# An input string is valid if:

# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
# Every close bracket has a corresponding open bracket of the same type.

class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                print(f"Processing character: {char}, Stack: {stack}, Top Element: {top_element}")
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
                print(f"Processing character: {char}, Stack: {stack}")
        
        return not stack
    
Sol = Solution()
# print(Sol.isValid("()"))  # Output: True
# print(Sol.isValid("()[]{}"))  # Output: True
# print(Sol.isValid("(]"))  # Output: False
print(Sol.isValid("([)]"))  # Output: False
# print(Sol.isValid("{[]}"))  # Output: True
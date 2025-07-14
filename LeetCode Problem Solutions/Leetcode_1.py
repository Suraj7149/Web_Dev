Number_list = [2,7,11,15] 
target = 9

def twoSum(nums, target):
        target_elements = []

        if (target-nums[0]) in nums:
                print(nums.index(target-nums[0]))
        else:
                print("false")
           

twoSum(nums=Number_list, target=target)
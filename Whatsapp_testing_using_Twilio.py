import pywhatkit

# Replace with your group's ID (not name)
group_id = "LjzxC7ZM1173cJmM7uwwBm" 
# https://chat.whatsapp.com/
 # Example: ABCxyz123456@chat.whatsapp.com
message = "Hello team! This is an automated message from Python."

# Send the message instantly
pywhatkit.sendwhatmsg_to_group_instantly(group_id, message, wait_time=10, tab_close=True)

print("Message sent to group!")
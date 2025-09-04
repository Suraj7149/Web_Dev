import pandas as pd 
from openpyxl import load_workbook
from datetime import datetime, date, time
import pywhatkit

# Whatsapp Group ID and Deepak's WhatsApp number
group_id = "LjzxC7ZM1173cJmM7uwwBm" # whatsapp group 
group_id2 = "C7qQ0MFg04N56sq3TcwAvO"
phone_number = ''

names_to_skip = [
    "Sadaf Khan",
    "Kunal Kumar",
    "Yuvraj Narula",
    "Tushit Madan",
    "Nikhil",
    "Aanchal",
    "Anjali Arya",
    "Rakib Ali",
    "Kanishka",
    "Abhishek Paswan",
    "Sofiya Sheikh",
    "Kunal Rajput"
]

Number_of_Agents = {
      
        "Mohit": "+919716946889",
        "Imanshu": "+918287256708",
        "Diya Chaudhary": "+918171683861",
        "Karishma": "+917838661060",
        "Kundan Kumar Kahar": "+918777570298",
        "Baljinder Singh": "+919958168486",
        "Yashwant Solanki": "+917838537152",
        "Mehul Sehrawat": "+919654482886",
        "Manpreet Kaur": "+917982329933",
        "Sachin Kumar": "+917678106805",
        "Ankit Jukariya": "+917505739836",
        "Isha Malla": "+919311250563",
        "Vikrant Kunwar": "+918920475575",
        "Anurag Bamola": "+917042513528",
        "Parvesh": "+919891554846",
        "Abhishek Verma": "+918287011013",
        "Arman Ali": "+919582795026",
        "Yuvraj Rawat": "+919958335692",
        "Akash": "+917060227793",
        "Manasi Gupta": "+918447730988",
        "Anjani Jha": "+919716670565",
        "Anup Kumar": "+918527639733",
        "Himanshu Vishwakarma": "+918384066139",
        "Abhishek Tamang": "+919354824919",
        "Vaishali Walia": "+917217347343",
        "Harshit Singh": "+917651859280",
        "Aditi Sharma": "+919711462980",
        "Mansi Gupta": "+918447730988",
}


workbook = load_workbook("C:/Users/Suraj/Documents/Work/output.xlsx")
 
df = pd.read_excel("C:/Users/Suraj/Documents/Work/output.xlsx")
Total_rows = len(df)

sheet = workbook.active

i = 0
for i in range(1, len(df)):
    first_row = [cell.value for cell in sheet[i]]
    try:
        AHT_time  = datetime.combine(date.today(), first_row[3])
    except TypeError:
        pass

    # first_row[1], # Name
    # first_row[2], # Status
    # first_row[3], # TAT
    # first_row[4], # TL Name
    # first_row[5], # Designation Name
    # first_row[6], # Break Reason
    # first_row[8]) # Employee Queues


    if first_row[1] in names_to_skip:
            continue  # Skip this iteration
    # Rest of your processing code here

    elif first_row[2] == "Not Available" and (first_row[6]== "- Bio break" or first_row[6] == "- Lunch" or first_row[6] == "- Tea Break"):
        try: 
            if first_row[6]== "- Bio break" and AHT_time.minute >= 5:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id2, 
                             f"Agent : *{first_row[1]}* has exceeded their *{first_row[6]}* for over {AHT_time.minute} mins.", 
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
            
            if first_row[6]== "- Tea Break" and AHT_time.minute >= 15:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id2, 
                             f"Agent : *{first_row[1]}* has exceeded their *{first_row[6]}* for over {AHT_time.minute} mins.",  
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
                        
            if first_row[6]== "- Tea Break" and AHT_time.minute >= 10:
                        for name in Number_of_Agents:
                              if first_row[1] == name:
                                    pywhatkit.sendwhatmsg_instantly(
                                         Number_of_Agents[name], 
                                         f"Your *{first_row[6]}* has reached {AHT_time.minute} mins.",  
                                         wait_time=12.5, 
                                         tab_close=True,
                                         close_time=1.5)
            
            if first_row[6]== "- Lunch" and AHT_time.minute >= 25:
                        for name in Number_of_Agents:
                              if first_row[1] == name:
                                    pywhatkit.sendwhatmsg_instantly(
                                         Number_of_Agents[name], 
                                         f"Your *{first_row[6]}* has reached {AHT_time.minute} mins.",  
                                         wait_time=12.5, 
                                         tab_close=True,
                                         close_time=1.5)
            
            if first_row[6]== "- Lunch" and AHT_time.minute >= 30:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id2, 
                             f"Agent : *{first_row[1]}* has exceeded their *{first_row[6]}* for over {AHT_time.minute} mins.",  
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
            
            else:
                pass
        except Exception as e:
            print(e)
            continue     

    elif first_row[2] == "busy" and (len(first_row[8]) == 1 or len(first_row[8]) == 0):
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 6:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : *{first_row[1]}* from *Inbound Queue* has been on the same call for over *{AHT_time.hour} hours and {AHT_time.minute} mins.*", 
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
                        
            else:
                pass
        except Exception as e:
            print(e)
            continue

    elif first_row[2] == "busy" and first_row[8] == "Chat Queue BB Sell Phone":
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : *{first_row[1]}* from *{first_row[8]}* has been on the same chat for over *{AHT_time.hour} hours and {AHT_time.minute} mins.*", 
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)

            else:
                pass
        except Exception as e:
            print(e)
            continue
    
    elif first_row[2] == "busy" and first_row[8] == "Support":
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : *{first_row[1]}* from *{first_row[8]} Queue* has been on the same email for over *{AHT_time.hour} hours and {AHT_time.minute} mins.*", 
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
                        
            else:
                pass
        except Exception as e:
            print(e)
            continue
    
    elif first_row[2] == "busy" and (first_row[8] == "Whatsapp Queue (Buyback)" or first_row[8] == "Whatsapp OOH - Buyback"):
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : *{first_row[1]}* from *{first_row[8]}* has been on the same chat for over *{AHT_time.hour} hours and {AHT_time.minute} mins.*", 
                             wait_time=12.5, 
                             tab_close=True,
                             close_time=1.5)
                        
            else:
                pass
        except Exception as e:
            print(e)
            continue
    
          
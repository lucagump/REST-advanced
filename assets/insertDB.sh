##!/bin/bash

#  /$$$$$$$  /$$$$$$  /$$$$$$  /$$   /$$ /$$$$$$$$/$$     /$$
# | $$__  $$|_  $$_/ /$$__  $$| $$$ | $$| $$_____/  $$   /$$/
# | $$  \ $$  | $$  | $$  \__/| $$$$| $$| $$      \  $$ /$$/ 
# | $$  | $$  | $$  |  $$$$$$ | $$ $$ $$| $$$$$    \  $$$$/  
# | $$  | $$  | $$   \____  $$| $$  $$$$| $$__/     \  $$/   
# | $$  | $$  | $$   /$$  \ $$| $$\  $$$| $$         | $$    
# | $$$$$$$/ /$$$$$$|  $$$$$$/| $$ \  $$| $$$$$$$$   | $$    
# |_______/ |______/ \______/ |__/  \__/|________/   |__/    

#    ___   ___   ___     _     _____   ___ 
#   / __| | _ \ | __|   /_\   |_   _| | __|
#  | (__  |   / | _|   / _ \    | |   | _| 
#   \___| |_|_\ |___| /_/ \_\   |_|   |___|
                                         
echo "Insert Player Topolino"
http POST localhost:3333/players name=Topolino  
http POST localhost:3333/players name=Topolin-o  
http GET localhost:3333/players/----ID-----

echo "Insert Player Pippo"
http POST localhost:3333/players name=Pippo

echo "Insert Player Pluto"
http POST localhost:3333/players name=Pluto

echo "Insert Enemy Paperina"
http POST localhost:3333/enemies name=Paperina  
http POST localhost:3333/enemies name=Pa$perina 
http GET localhost:3333/enemies/----ID-----

echo "Insert Enemy Medusa"
http POST localhost:3333/enemies name=Medusa

echo "Insert Enemy Sindrome"
http POST localhost:3333/enemies name=Sindrome

echo "Insert Enemy Yzma"
http POST localhost:3333/enemies name=Yzma

#   ___ ___ ___ _  _ _____ 
#  | __|_ _/ __| || |_   _|
#  | _| | | (_ | __ | | |  
#  |_| |___\___|_||_| |_|  
#                         

echo "Create Encounter"
http POST localhost:3333/encounters player_id=----ID-----
http POST localhost:3333/encounters player_id=----WRONG_ID-----
http GET localhost:3333/encounters/----ID-----

echo "Action for the encounter"
http PUT localhost:3333/encounters action=fight

echo "Action for the encounter"
http PUT localhost:3333/encounters action=heal

echo "Delete the encounter"
http DELETE localhost:3333/encounters 

#    ___    ___    _       ___    ___   ___ 
#   / __|  / _ \  | |     / _ \  | _ \ / __|
#  | (__  | (_) | | |__  | (_) | |   / \__ \
#   \___|  \___/  |____|  \___/  |_|_\ |___/
                                          

console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow);  //yellow

# Reset = "\x1b[0m"
# Bright = "\x1b[1m"
# Dim = "\x1b[2m"
# Underscore = "\x1b[4m"
# Blink = "\x1b[5m"
# Reverse = "\x1b[7m"
# Hidden = "\x1b[8m"

# FgBlack = "\x1b[30m"
# FgRed = "\x1b[31m"
# FgGreen = "\x1b[32m"
# FgYellow = "\x1b[33m"
# FgBlue = "\x1b[34m"
# FgMagenta = "\x1b[35m"
# FgCyan = "\x1b[36m"
# FgWhite = "\x1b[37m"

# BgBlack = "\x1b[40m"
# BgRed = "\x1b[41m"
# BgGreen = "\x1b[42m"
# BgYellow = "\x1b[43m"
# BgBlue = "\x1b[44m"
# BgMagenta = "\x1b[45m"
# BgCyan = "\x1b[46m"
# BgWhite = "\x1b[47m"


                                                           
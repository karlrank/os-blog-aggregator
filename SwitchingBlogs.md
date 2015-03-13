## Title: Switching viewed blog lists ##

Description: User can select different bloglist to see other blogposts.

Primary actor: User

Precondition: User has at least one bloglist(s) with blog(s) in them (NB! all bloglists tested should have at least two blogs in them).

Postcondition: User sees different blogposts.

Main:
  * User goes to “home”
  * User checks 5 first blogposts
  * User clicks on a bloglist (anything other than “popular”)
  * User checks if 5 first blogposts are now different (this step can be repeated for all bloglists)
# sqlProject info
this is a project made using lessons learnt in web development and Database management.
Its called **Organiser**.

# What is Organiser?
its basically a planning tool that enables you to list activities to be done and monitor the progress of your project via an easy to use planboard. Also the code is a mess so kindly dont change anything otherwise it may stop working, thank you in advance.

# note
**IMPORTANT POINTS**
    - make sure you create a database called 'organiser' in your mysql workbench or phpmyadmin via xampp
    - the project uses nodejs to run the backend
    - the system will set itself up as long as nodejs and mysql are running

# final change
**MORE INFO**
	- finally its done, i'll add more features as i get better and hopefully one day figure out a monetisation strategy

# How to set up
**SETUP**
	- install nodejs and set up environment variables `very important`
	- install `mysql workbench` or `xampp`
	- **xampp**
		- install xampp
		- start mysql service via the control panel
		- start apache service via the control panel
		- open the admin section of mysql service (it should take you to phpmyadmin)
		- in the phpmyadmin page create a new database called `organiser`
	- **mysqlworkbench**
		- install **MySQL Workbench**.
		- Open **MySQL Workbench**.  
		- Click **Create a New Schema** (top toolbar).  
		- Enter `organiser` as the schema name.  
		- Click **Apply**.  
		- Review the SQL script, click **Apply** again.  
		- Click **Finish**.  
	- clone to your prefered location on your computer
	- open powershell or command prompt at that location
	- run this code
		`node app.js`
	- and with that it should run perfectly

# how to use
**MANUAL**
	- create an account
	- create a project
	- click on a project to open it
	- this will open a planboard
	- there you can add notes, lists and process lists
		- process lists keep track of tasks and what progress has been made
		- lists just show a todo list of tasks
		- notes are there for metioning important info
	- everything else is self- explanatory
	- open the menu button to show more options in the planboard page

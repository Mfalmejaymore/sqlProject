# SQLProject Info  
This is a project made using lessons learnt in web development and database management.  
It's called **Organiser**.  

## What is Organiser?  
It's a planning tool that enables you to list activities to be done and monitor the progress of your project via an easy-to-use planboard.  
*Note:* The code is a mess, so kindly don’t change anything; otherwise, it may stop working. Thank you in advance.  

## Note  
**IMPORTANT POINTS**  
- Make sure you create a database called `organiser` in your MySQL Workbench or phpMyAdmin via XAMPP.  
- The project uses Node.js to run the backend.  
- The system will set itself up as long as Node.js and MySQL are running.  

## Final Change  
**MORE INFO**  
- Finally, it's done. I'll add more features as I get better and, hopefully, one day figure out a monetisation strategy.  

## How to Set Up  
**SETUP**  
1. Install Node.js and set up environment variables (very important).  
2. Install `MySQL Workbench` or `XAMPP`.  
   - **XAMPP**:  
     - Install XAMPP.  
     - Start MySQL service via the control panel.  
     - Start Apache service via the control panel.  
     - Open the admin section of the MySQL service (it should take you to phpMyAdmin).  
     - In phpMyAdmin, create a new database called `organiser`.  
   - **MySQL Workbench**:  
     - Install **MySQL Workbench**.  
     - Open **MySQL Workbench**.  
     - Click **Create a New Schema** (top toolbar).  
     - Enter `organiser` as the schema name.  
     - Click **Apply**.  
     - Review the SQL script, click **Apply** again.  
     - Click **Finish**.  
3. Clone the project to your preferred location on your computer.  
4. Open PowerShell or Command Prompt at that location.  
5. Run this command:  
   ```bash
   node app.js
   ```
6. Open `localhost:4700` on your browser
7. It should run perfectly.  

## How to Use  
**MANUAL**  
1. Create an account.  
2. Create a project.  
3. Click on a project to open it.  
4. This will open a planboard where you can:  
   - Add **notes** for important information.  
   - Add **lists** for a to-do list of tasks.  
   - Add **process lists** to track tasks and their progress.  
5. Everything else is self-explanatory.  
6. Open the menu button to show more options on the planboard page.

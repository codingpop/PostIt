
# **PostIt**
PostIt is a group messaging platform on which anyone can register for an account, create a group, add members to the group, and post messages with one of three priority levels--normal, urgent, critical. Only the memebers of a particular group will see the messages posted by the group's admin (that is, the creator of the group).

## **1. Installation**
On your machine, open your terminal or your command line. Using your terminal, navigate to any directory of your choice and enter the following command to clone this repository to the directory.

```bash
git clone https://github.com/tundewritescode/PostIt.git
```
After cloning the repository, enter the following command:

```bash
npm install
```
The command will install all the dependencies that PostIt needs to run on your machine without any hiccups.

Next, create a Postgres database with username and password, then create a .env file and configure it in the format specified below:

```
DB_HOST=database_url
DB_NAME=database_name
DB_USER=database_username
DB_PORT=database_port (usually 5432)
DB_PASS=database_password
SESS_SECRET=session_token (this can be any random string)
PORT=server_port (e.g., 3000)
```

In your terminal, enter `npm run dev` to start the PostIt server. A live instance of this project is available at [tunde.herokuapp.com](http://tunde.herokuapp.com).

## **2. Endpoints**
* **`/api/user/signup`**: Create a POST request to this endpoint to register a new account. Use these form parameters when sending your request:
  * **`firstName`**: First name of the user
  * **`lastName`**: Last name of the user
  * **`email`**: email of the user
  * **`phone`**: Phone number of the user
  * **`password`**: User password

* **`/api/user/signin`**: Create a **POST** request to this endpoint to sign in. Use these parameters when sending your request:
  * **`email`**: Registered email address
  * **`password`**: Corresponding password to the email used above

* **`/api/group`**: Create a **POST** request to this endpoint to create a new group. Use this parameter when sending your request:
  * **`name`**: Name of the group to be created

* **`/api/group/:groupId/message`**: Create a **POST** request to this endpoint to create a new group. Use these parameters when sending your request:
  * **`message`**: Message to be sent
  * **`priority`**: Priority level (normal, urgent, critical)

* **`/api/group/:groupId/user`**: Create a **POST** request to this endpoint to add a user to a particular group. Use this parameter when sending your request:
  * **`email`**: Email address of the user to be added

* **`/api/group/:groupId/message`**: Create a **GET** request to this endpoint to read all the messages in any group to which the user belongs.

### **Note**
This project is still in development. At this point, you can only use PostIt with Postman or with your own frontend, if you decide to roll your own. Keep visiting this page for updates.
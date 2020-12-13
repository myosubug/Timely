## 1. Introduction 

Popular SNS applications today are bloated and constantly attempting to implement new features that are often completely irrelevant to their original purpose. This frequently distracts users from the foundation that many of these sites are built on: connecting people. Original words, thoughts, and ideas are being lost in floods of random posts and unrelated services. We believe the root of this problem lies in how SNS applications perceive what is valuable to the user. Should sites prioritize content from real world connections over viral sensations? Should sites provide marketplaces on pages originally designed for sharing images? While value is a dynamic property for these applications, we feel that users are often not given a direct enough format to express what they want to see.


## 2. User Manual 


### Default Access (not logged in)

By default, you can still see the posts and sort posts by tags, but can’t react to the posts.


### Sign In/Sign Up

You will have to sign up first in order to sign into Timely. Click Sign In/ Up to create your account. 

Enter your unique username and password, and press Sign Up to create your account.


### Main Page

Once you sign up, the application will take you to the main page. Your user information will be displayed on the right side of the screen. 


### Posts


##### Create a post

For creating a post, you can either choose text or one image to be uploaded. The default lifetime of a newly created post is 5 min.

For attaching an image to your post, you have two options:



1. You can drag and drop to the box of the creating-post popup window
2. You can click the cloud button to open up your local file explorer and select an image.


Also, you can attach tags to your posting so that it can be searched by tags.
Press Submit when you are ready to post.




##### Reacting to an existing post

You can up-vote or down-vote any post by clicking one of thumbs to increase the “lifetime” of the post. Each reaction gives +30 secs or -30 secs to the post.


### Tags

As shown in the “Create a post” section, you can attach tags to your post. 

Those tags can be searched here:


*   Trending tags display the most liked posts.
*   Newest tags display the newly added posts.
*   Expiring tags display the posts that are about to be deleted since its lifetime is expiring
*   Longest tags display the posts that have the longest lifetime.

If you want to search posts by a specific tag, press the Tags button. This will open up the following pop-up:

Pressing Confirm will display all relevant posts in the main page.


### User Page

By clicking your avatar profile, you can go to your user page. 

From this page you can: 



1. Change your avatar by clicking the avatar picture again on top left,
2. Edit your password,
3. Check all of your active posts,
4. Click the Timely logo to bring you back to the main page

Note: If you are looking at another user's page, you can only view their information:


### Admin Privileges

As an admin, you have special control over other posts and users.

#####  Admin Privileges on Posts

For **posts**, you will have extra options on each post as below:


<table>
  <tr>
   <td>Selecting Promote Post adds 1000 likes to the post, prolonging the lifetime..
<p>

   </td>
   <td>Selecting Remove Post will delete the post regardless of the remaining time.
<p>

   </td>
  </tr>
  <tr>
   <td>Selecting Add time let the admin to add time to the post as below pop-up window appears:
<p>

   <td>Selecting Subtract Time let the admin to subtract time to the post as below pop-up window appears:
<p>

   </td>
  </tr>
</table>



##### Admin Privileges on Users

Admins can edit other user’s privileges by selecting their avatar. Admins can edit passwords, ban users from the app and promote/demote users as below:



<table>
  <tr>
   <td>Pressing Ban User will ban the user account and delete the user account from the database.
<p>

   </td>
   <tr>
   <td>Pressing Edit will let the admin change the password for the selected user.
<p>

  </tr>
  <tr>
   <td>Pressing Demote will demote a user from admin role to regular user. Conversely, pressing Promote will promote a regular user to an admin (Note: admin users will display a crown beside their username).
   </td>
   <td>

   </td>
  </tr>
</table>



## 3. Technologies Used 


<table>
  <tr>
   <td>Technology
   </td>
   <td>How we used the technology
   </td>
   <td>Technology
   </td>
   <td>How we used the technology
   </td>
  </tr>
  <tr>
   <td>React.js
   </td>
   <td>Front-end framework
   </td>
   <td>MaterialUI
   </td>
   <td>Front-end react UI library
   </td>
  </tr>
  <tr>
   <td>Express.js
   </td>
   <td>Back-end framework
   </td>
   <td>Fortawesome
   </td>
   <td>Front-end fonts and icon styling
   </td>
  </tr>
  <tr>
   <td>Node.js
   </td>
   <td>Back-end runtime environment
   </td>
   <td>cors
   </td>
   <td>Allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
   </td>
  </tr>
  <tr>
   <td>MongoDB
   </td>
   <td>Database
   </td>
   <td>dotenv
   </td>
   <td>Used to hold server database address and password and not shared on git repo 
   </td>
  </tr>
  <tr>
   <td>Socket.io
   </td>
   <td>Back-end and front-end communication
   </td>
   <td>nodemon
   </td>
   <td>Automatically updates and restarts the system if changes have been made
   </td>
  </tr>
  <tr>
   <td>Axios
   </td>
   <td>Routing requests and responses with front-end to back-end
   </td>
   <td>React router 
   </td>
   <td>Allows navigation between pages based on URL and handles forbidden paths
   </td>
  </tr>
  <tr>
   <td>TailwindCSS
   </td>
   <td>Front-end CSS framework
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>



## 4. Deployment Instructions 

GitHub link: [https://github.com/myosubug/Timely](https://github.com/myosubug/Timely)

Step by Step instructions for launching Timely @ localhost:

*   You need to install npm, node.js in your system/machine.
*   Make sure that your localhost port@ 3000 and 5000 are free to use

<table>
  <tr>
   <td>

<h3>Downloading the project</h3>

You can download either:
<ol>

Through “git clone” command from terminal:
<p>

        git clone https://github.com/myosubug/Timely.git
<ol>

Or downloading the project as a zip file from the GitHub repo:

<p>


</li>
</ol>
</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<h3>Installing npm packages</h3>

Once you found yourself in the downloaded Timely folder location in terminal, you need to install npm packages:
<ol>

<li>You need to move your position into the <code>client</code> (or <code>server</code>) folder within the “Timely” project.

<li>Type command <code>npm install</code>:

<p>



<p>


</li>
</ol>
   </td>
  </tr>
  <tr>
   <td>
<h3>Launching application - Server</h3>

Type command <code>npm start</code> as below images in <code>server</code> folder:
<p>

<p>
After a successful launching of the server, you should see the <code>"MongoDB database connection established successfully"</code> message in your terminal.
   </td>
  </tr>
  <tr>
   <td>
<h3>Launching application - Client</h3>

Type command <code>npm start</code> in <code>client</code> folder.
<p>

<p>
After a successful launching of a client, a web page on <code>"localhost:3000"</code> will be automatically launched. After this step, the app is fully launched.
   </td>
  </tr>
</table>


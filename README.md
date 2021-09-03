<h1>Easy Clinic - Clinical Management</h1>

<h2>Introduction</h2>
<p>What is Easy Clinic? The idea of this project was born from the hope of building an easier way to manage online clinical history in order to make professional’s work easier and more efficient. Accessible from anywhere at anytime, without previous installation or hard configuration, Easy Clinic allows you to manage clinic appointments and patient information in a secure way.</p>

<h2>Definition</h2>
<p>How does it work? Utilizing Node technology, you just need to create your account, specify your role as administrative or as a professional, then log in. </p>
<br/>
<p>The administration position will bring you access to all the center’s patients, giving you the option to add new patients to the database, manage their information, assign a professional to them and create new appointments. Also, you will easily have an overview of each professional’s agenda. </p>
<br/>
<p>If you’re accessing our application as a professional, Easy Clinic will allow you an overview of all your patients. You’ll have access to their personal information, contact details and the authority to modify them if necessary. Additionally, Easy Clinic provides the option to write your session notes during the patient appointment, as well as access their clinical history and your agenda. </p>
<br/>
<p>Continuous complaints and issues with the current patient management system of the public health system in the Canaries have led to a desire for change. And so, the aim of this project was to create a more user friendly and efficient application that better facilitates the daily work of professionals and clinic workers.</p>

<h2>Getting Started</h2>
To get this app running locally:
- Clone this repo
- Run `$ npm install` to install all the dependencies
- Create your .env file, adding the variables showed in the `.env.example/` file
- Run `$ npm start` to start the application

<h2>Dependencies</h2>
- ExpressJS - For handling and routing HTTP requests
- Express-session - 
- Mongoose - For modeling and mapping mongoDB data to javascript
- Mongodb - For saving databases
- Bcrypt - For handling password authentication
- ReactJS - For handling and routing HTTP requests
- Axios - For modeling and mapping mongoDB data to javascript
- Cloudinary - for handling images /video uploads

<h2>Application Structure</h2>
- `app.js` The entry point of the application. This file defines our express server, allow cors and connect the server to MongoDB using mongoose through  `config./` folder. It also requires the routes and models we will be using in the application.
- `config./` This folder contains configuration to connect to MongoDb as well as session and cookies configuration. 
- `routes/` - This folder contains the route definitions for the API
- `models/` - This folder contains the schema definitions for the Mongoose models 
- `.env.example` - This file shows configuration/environment variables needed in the application. 

<h2>Suggestions for the future</h2>
- Fix Scheduler calendar routes and models to make it render each professional's agenda show the appointments.
- Implement a rich editor to the Clinical History Page so the professional can improve session information adding highlights, cuotes, etc. 
- Add a derivation option inside the patient's information, sending a notification to the derived professional. 
- Implement a Third party profile, to be able to share a private clinical history with third parties involved in patients treatment. (schools, social services, speech therapists, etc. )
- Create a Patient profile to allow patients to upload documentation, have access to their appointments and have private chats with professionals.

<h2>Contact information</h2>
```
{
    author: 'Irene Suárez',
    github: 'https://github.com/irenesuarezalvarez'
}
````
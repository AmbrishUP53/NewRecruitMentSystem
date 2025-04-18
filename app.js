const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/User');
const AppliedJob = require('./models/AppliedJob');
const Job = require('./models/Job');
require("dotenv").config()

console.log(process.env.MongoURL)
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to the database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  seedJobs();
  
})
.catch(err => console.log("MongoDB connection error:", err));

// Seed jobs if not already present in the database
async function seedJobs() {
  const jobCount = await Job.countDocuments();
  if (jobCount === 0) {
    const jobs = [
      {
        jobTitle: 'Frontend Developer',
        jobDescription: 'Develop and maintain UI components using React.',
        jobLocation: 'Remote',
        jobSalary: '₹50,000'
      },
      {
        jobTitle: 'Backend Developer',
        jobDescription: 'Work on server-side logic and databases.',
        jobLocation: 'Bangalore',
        jobSalary: '₹60,000'
      },
      {
        jobTitle: 'Full Stack Developer',
        jobDescription: 'Build full stack web applications.',
        jobLocation: 'Delhi',
        jobSalary: '₹70,000'
      },
      {
        jobTitle: 'UI/UX Designer',
        jobDescription: 'Design user-friendly interfaces and experiences.',
        jobLocation: 'Mumbai',
        jobSalary: '₹45,000'
      }
    ];

    await Job.insertMany(jobs);
    console.log('Seed data inserted!');
  } else {
    console.log('Jobs already exist in the database');
  }
}


// Routes

// Landing Page
app.get('/', (req, res) => {
  res.render('index');
});

// Signup Page
app.get('/signup', (req, res) => {
  res.render('signUp');
});

// Signup POST
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send('User already exists!');
  }

  const user = new User({ name, email, password });
  await user.save();
  res.redirect('/dashboard');
});

// Login Page
app.get('/login', (req, res) => {
  res.render('Login');
});

// Login POST
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid email or password');
  }
});



// Dashboard Page
app.get('/dashboard', async (req, res) => {
    // Temporary: hardcoded email or use from query params
    const userEmail = req.query.email || 'demo@user.com';
  
    const appliedJobs = await AppliedJob.find({ userEmail });
  
    res.render('dashboard', { appliedJobs });
  });

  app.get('/search-job', async (req, res) => {
    try {
      const jobs = await Job.find();
      res.render('search-job', { jobs });
    } catch (err) {
      console.log("Error loading jobs:", err);
      res.send("Something went wrong");
    }
  });
  // Post a Job Page
app.get('/post-job', (req, res) => {
    res.render('post-job');
  });

  // Post a new job
app.post('/post-job', async (req, res) => {
    const { title, description, location, salary } = req.body;
    try {
      const newJob = new Job({
        title, description, location, salary
      });
  
      await newJob.save();
      res.redirect('/dashboard'); // After posting, redirect to job listings
    } catch (err) {
      console.error('Failed to post job:', err);
      res.status(500).send('Something went wrong while posting the job.');
    }
  });
  

  app.get('/apply', async (req, res) => {
    try {
        const jobs = await Job.find(); // 10 random jobs chahiye to .limit(10)
        res.render('apply', { jobs }); // ← PASSING `jobs` TO EJS
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading apply page");
    }
});
app.post('/post-job', async (req, res) => {
  const { title, description, location, salary } = req.body;
  try {
    const job = new Job({ title, description, location, salary });
    await job.save();
    console.log("Job posted:", job);  // 👈 Check this in console
    res.redirect('/dashboard');
  } catch (error) {
    console.log("Job post error:", error);
    res.send("Error posting job");
  }
});



// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page Not Found 😕');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

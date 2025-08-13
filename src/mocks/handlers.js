import { http, HttpResponse } from "msw";

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Andela Rwanda",
    location: "Kigali, Rwanda",
    type: "Full-time",
    salary: "RWF 6.5M - 8.7M/year",
    description:
      "We are looking for a skilled Frontend Developer to join our Kigali team. You will be responsible for building responsive user interfaces with React and modern web technologies.",
    requirements: [
      "3+ years React experience",
      "JavaScript/TypeScript",
      "CSS/SCSS",
      "Git",
    ],
    postedDate: "2025-08-05",
    applicationDeadline: "2025-09-15",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "HeHe Labs",
    location: "Muhanga, Rwanda",
    type: "Contract",
    salary: "RWF 7.5M - 9.8M/year",
    description:
      "Join our growing team as a Backend Developer. You will work on scalable APIs and server-side applications that power digital commerce in Rwanda.",
    requirements: [
      "Node.js",
      "Express.js",
      "MongoDB/PostgreSQL",
      "RESTful APIs",
    ],
    postedDate: "2025-08-07",
    applicationDeadline: "2025-09-20",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Awesomity Lab",
    location: "Kigali, Rwanda",
    type: "Contract",
    salary: "RWF 25K/hour",
    description:
      "We need a creative UI/UX Designer to help us create amazing user experiences for fintech and e-commerce clients.",
    requirements: [
      "Figma/Sketch",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
    postedDate: "2025-08-06",
    applicationDeadline: "2025-09-10",
  },
  {
    id: "4",
    title: "Mobile App Developer",
    company: "Pivot Access",
    location: "Rusizi, Rwanda",
    type: "Part-time",
    salary: "RWF 6M - 8M/year",
    description:
      "We are seeking a Mobile App Developer with experience in Flutter or React Native to build secure mobile banking solutions.",
    requirements: [
      "Flutter or React Native",
      "RESTful APIs",
      "State management (Bloc, Redux)",
      "UI/UX principles",
    ],
    postedDate: "2025-08-10",
    applicationDeadline: "2025-09-25",
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "BK Tech House",
    location: "Kigali, Rwanda",
    type: "Full-time",
    salary: "RWF 7.2M - 9M/year",
    description:
      "Analyze datasets from banking and mobile money platforms to provide insights for business decisions.",
    requirements: [
      "SQL",
      "Python (Pandas, NumPy)",
      "Data visualization tools",
      "Strong analytical skills",
    ],
    postedDate: "2025-08-12",
    applicationDeadline: "2025-09-28",
  },
  {
    id: "6",
    title: "IT Support Specialist",
    company: "Irembo",
    location: "Musanze, Rwanda",
    type: "Part-time",
    salary: "RWF 4.8M - 6M/year",
    description:
      "Provide technical support for Irembo platform users and ensure smooth IT operations.",
    requirements: [
      "Computer hardware & networking",
      "Customer service",
      "Troubleshooting skills",
      "Basic web technologies",
    ],
    postedDate: "2025-08-15",
    applicationDeadline: "2025-09-30",
  },
  {
    id: "7",
    title: "Cloud Engineer",
    company: "AOS Ltd",
    location: "Kigali, Rwanda",
    type: "Internship",
    salary: "RWF 8M - 10.5M/year",
    description:
      "Manage cloud infrastructure for government digital services hosted on AWS and Azure.",
    requirements: [
      "AWS or Azure certification",
      "Linux server management",
      "Docker/Kubernetes",
      "CI/CD pipelines",
    ],
    postedDate: "2025-08-16",
    applicationDeadline: "2025-10-05",
  },
  {
    id: "8",
    title: "Cybersecurity Analyst",
    company: "RISA",
    location: "Bugesera, Rwanda",
    type: "Full-time",
    salary: "RWF 9M - 12M/year",
    description:
      "Monitor and protect Rwanda's digital infrastructure from cyber threats.",
    requirements: [
      "Network security",
      "Incident response",
      "Penetration testing",
      "Security tools (SIEM, IDS/IPS)",
    ],
    postedDate: "2025-08-18",
    applicationDeadline: "2025-10-08",
  },
  {
    id: "9",
    title: "Digital Marketing Specialist",
    company: "Kasha Rwanda",
    location: "Kigali, Rwanda",
    type: "Contract",
    salary: "RWF 4.5M - 6.5M/year",
    description:
      "Plan and execute online marketing campaigns for e-commerce platforms.",
    requirements: [
      "SEO/SEM",
      "Social media ads",
      "Content creation",
      "Google Analytics",
    ],
    postedDate: "2025-08-20",
    applicationDeadline: "2025-10-10",
  },
  {
    id: "10",
    title: "Machine Learning Engineer",
    company: "Carnegie Mellon University Africa",
    location: "Gisenyi, Rwanda",
    type: "Contract",
    salary: "RWF 10M - 14M/year",
    description:
      "Develop AI models for research and real-world applications in Rwanda.",
    requirements: [
      "Python (TensorFlow, PyTorch)",
      "Data preprocessing",
      "Model deployment",
      "Research mindset",
    ],
    postedDate: "2025-07-22",
    applicationDeadline: "2025-10-15",
  },
  {
    id: "11",
    title: "Cloud Engineer",
    company: "AOS Ltd",
    location: "Kigali, Rwanda",
    type: "Part-time",
    salary: "RWF 8M - 10.5M/year",
    description:
      "Manage cloud infrastructure for government digital services hosted on AWS and Azure.",
    requirements: [
      "AWS or Azure certification",
      "Linux server management",
      "Docker/Kubernetes",
      "CI/CD pipelines",
    ],
    postedDate: "2025-08-16",
    applicationDeadline: "2025-10-05",
  },
  {
    id: "12",
    title: "Cybersecurity Analyst",
    company: "RISA",
    location: "Kigali, Rwanda",
    type: "Part-time",
    salary: "RWF 9M - 12M/year",
    description:
      "Monitor and protect Rwanda's digital infrastructure from cyber threats.",
    requirements: [
      "Network security",
      "Incident response",
      "Penetration testing",
      "Security tools (SIEM, IDS/IPS)",
    ],
    postedDate: "2025-08-18",
    applicationDeadline: "2025-10-08",
  },
  {
    id: "13",
    title: "Digital Marketing Specialist",
    company: "Kasha Rwanda",
    location: "Kigali, Rwanda",
    type: "Full-time",
    salary: "RWF 4.5M - 6.5M/year",
    description:
      "Plan and execute online marketing campaigns for e-commerce platforms.",
    requirements: [
      "SEO/SEM",
      "Social media ads",
      "Content creation",
      "Google Analytics",
    ],
    postedDate: "2025-08-20",
    applicationDeadline: "2025-10-10",
  },
];

const mockUsers = JSON.parse(localStorage.getItem("mockUsers")) || [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "John Doe",
    token: "mock-jwt-token",
  },
];

let applications = JSON.parse(localStorage.getItem("applications")) || [];

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return HttpResponse.json({
        user: { id: user.id, email: user.email, name: user.name },
        token: user.token,
      });
    }

    return HttpResponse.json(
      {
        message: "Invalid credentials",
      },
      { status: 401 }
    );
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const userData = await request.json();

    const registeredUser = mockUsers.find((u) => u.email === userData.email);
    if (registeredUser) {
      return HttpResponse.json(
        {
          message: "User already registered",
        },
        { status: 400 }
      );
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      ...userData,
      token: "mock-jwt-token-new",
    };

    mockUsers.push(newUser);

    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    return HttpResponse.json({
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
      token: newUser.token,
    });
  }),

  http.get("/api/jobs", async ({ request }) => {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";
    const location = url.searchParams.get("location") || "";
    const type = url.searchParams.get("type") || "";

    let filteredJobs = [...mockJobs];

    if (search) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return HttpResponse.json(
      {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        currentPage: page,
        totalPages: Math.ceil(filteredJobs.length / limit),
      },
      { status: 200 }
    );
  }),

  http.get("/api/jobs/:id", ({ params }) => {
    const job = mockJobs.find((j) => j.id === params.id);

    if (!job) {
      return HttpResponse.json(
        {
          message: "Job not found",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(job);
  }),

  http.post("/api/applications", async ({ request }) => {
    const applicationData = await request.json();

    const newApplication = {
      id: String(applications.length + 1),
      ...applicationData,
      userId: applicationData.userId, // Ensure userId is included
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    applications.push(newApplication);

    localStorage.setItem("applications", JSON.stringify(applications));

    return HttpResponse.json(newApplication, { status: 201 });
  }),

  http.get("/api/applications", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (userId) {
      const userApplications = applications.filter(
        (app) => String(app.userId) === String(userId)
      );
      return HttpResponse.json(userApplications);
    }

    return HttpResponse.json([]); // Return empty array if no userId provided
  }),
];

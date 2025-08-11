import { http, HttpResponse } from "msw";

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    type: "Full-time",
    salary: "$60,000 - $80,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces with React and modern web technologies.",
    requirements: [
      "3+ years React experience",
      "JavaScript/TypeScript",
      "CSS/SCSS",
      "Git",
    ],
    postedDate: "2024-08-05",
    applicationDeadline: "2024-09-15",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    description:
      "Join our growing startup as a Backend Developer. You will work on scalable APIs and server-side applications.",
    requirements: [
      "Node.js",
      "Express.js",
      "MongoDB/PostgreSQL",
      "RESTful APIs",
    ],
    postedDate: "2024-08-07",
    applicationDeadline: "2024-09-20",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$50/hour",
    description:
      "We need a creative UI/UX Designer to help us create amazing user experiences for our clients.",
    requirements: [
      "Figma/Sketch",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
    postedDate: "2024-08-06",
    applicationDeadline: "2024-09-10",
  },
];

// Load users from localStorage or use default if none exists
const mockUsers = JSON.parse(localStorage.getItem("mockUsers")) || [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "John Doe",
    token: "mock-jwt-token",
  },
];

// Load applications from localStorage or use empty array if none exists
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

    // Save updated users to localStorage
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    return HttpResponse.json({
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
      token: newUser.token,
    });
  }),

  http.get("/api/jobs", async ({ request }) => {
    // Ensure we have a valid URL to parse
    const url = new URL(request.url);

    // Get search parameters with defaults
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const search = url.searchParams.get("search") || "";
    const location = url.searchParams.get("location") || "";
    const type = url.searchParams.get("type") || "";

    // Start with all jobs
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

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    // Return paginated results with metadata
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
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    applications.push(newApplication);
    // Save applications to localStorage
    localStorage.setItem("applications", JSON.stringify(applications));

    return HttpResponse.json(newApplication, { status: 201 });
  }),

  http.get("/api/applications", () => {
    return HttpResponse.json(applications);
  }),
];

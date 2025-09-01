const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Portfolio context for better responses
const PORTFOLIO_CONTEXT = `
You are a helpful AI assistant for Muqaddas's portfolio website. Here's what you know about him:

SKILLS & TECHNOLOGIES:
- Programming Languages: HTML, CSS, JavaScript, TypeScript, Python, Java, C++, C#, .NET, SQL
- Frameworks & Libraries: ReactJS, Angular, Express, Node.js, Redux, Tailwind CSS, React Router, RxJS, Mongoose, Firebase
- Database & Cloud: MySQL, MongoDB, S3
- ML Libraries: PyTorch, TensorFlow, SciPy, NumPy, Pandas
- Tools & Platforms: Git, GitHub, Bitbucket, Jira, Docker, CI/CD, Jenkins, GitHub Actions


PROJECTS:
- FeastFleet: Built a responsive food-ordering experience with React and Redux Toolkit, consuming REST APIs for live menu data and cart flows. 1. Real-time menu updates via REST with client-side caching and prefetch. 2. Debounced search and category filters to reduce unnecessary network calls. 3. Persistent cart, item modifiers, and order review with optimistic updates and retry logic for a smooth UX. 4. Accessibility and performance tuned with Lighthouse best practices; fully responsive with Tailwind. 5. Unit tests with Jest + React Testing Library and CI checks integrated on each PR. Skills- Unit Testing · Frontend Optimization · Jest · React Testing Library · Functional Programming · React Router · Web Performance · Redux.js · Tailwind CSS · Git · Integration Testing · HTML5. Github Link- https://github.com/MUQADDASPREET/FeastFleet | Live Demo- https://feast-fleet.netlify.app/

- TopVidVault: Built a responsive YouTube-like front end in React that surfaces trending videos via the YouTube Data API. 1. Typeahead search with debounced input and Redux-cached suggestions for smoother queries. 2. Watch page with embedded player, metadata, comments, and a live chat stream (mock messages + user input) that auto-prunes older chats. 3. Virtualized video grid and chat list to keep scrolling and interactions fluid on mid-range devices. 4. Client-side routing (deep links), skeleton loaders, and graceful rate-limit/error handling. Skills- Frontend Optimization · React.js · Functional Programming · React Router · Web Performance · Redux.js · Tailwind CSS · Git · HTML5 · Webpack. Github Link- https://github.com/MUQADDASPREET/TopVidVault | Live Demo- https://mi-youtube.netlify.app/

- Job Alert System: Built a 24/7 monitoring pipeline that watches targeted job boards/APIs and sends instant email alerts when new postings match saved keywords and locations. 1. Near-real-time alerts: EventBridge-scheduled AWS Lambda scans run periodically to capture new postings quickly. 2. Smart filtering & dedup: Keyword, company, and location rules with an S3-backed cache to avoid duplicate emails. 3. Resilience & observability: Retries with backoff, CloudWatch logs/metrics, and error alarms for reliable operation. 4. Secure notifications: Templated emails via SMTP/SES with secrets stored as environment variables/manager. Skills- Python · Amazon Web Services (AWS) · JSON · GitHub Actions. Github Link- https://github.com/MUQADDASPREET/Job-Alert-System

- Reimbursely: Built an end-to-end portal that centralizes request submission → approvals → auditing with role-based access and full traceability. Led the Angular front end (TypeScript, RxJS) and ASP.NET Core MVC back end with MySQL (EF Core). 1. Streamlined workflow with dashboards for admins and employees. 2. Optimized queries, REST endpoints, and client-side caching (RxJS) for smoother interactions. 3. Implemented secure authentication (JWT), guards/interceptors, and audit logs. 4. Added receipt upload, status tracking, and exportable reports (CSV/PDF) with comprehensive form validation. Skills- MySQL · CSS · Software Design Patterns · RxJS · JSON · Bootstrap · AngularJS · TypeScript · C# · .NET Core MVC · Git · Entity Framework (EF) Core · HTML5. Github Link- https://github.com/MUQADDASPREET/Reimbursely

- Warzone Game: Risk-inspired strategy game built in Java with MVC, showcasing advanced OOP and design patterns (Strategy, State, Command, Observer, Adapter; Builder in refactor). 1. Phase-driven engine (“Startup → Issue Orders → Execute Orders”) with a flexible command pipeline (Deploy, Advance) and centralized event logging (Observer). 2. Human + AI players with dynamic strategies (Aggressive, Benevolent, Cheater, Random) and Tournament Mode for automated multi-map matches. 3. Map Editor with validation and format support via Adapter (Domination, Conquest), plus robust custom exceptions for invalid maps/commands. 4. Card system for tactical play including Bomb, Blockade, Airlift, and Diplomacy. 5. Persistence & architecture: GameService save/load, dependency injection for services, Java 8 Streams/Optional for safer collections. 6. Unit tests for strategy behaviors, map adapters, game state (save/load), tournament logic, and phase transitions. Skills- Software Design Patterns · Unit Testing · JUnit · GitHub Actions · Java · Maven · Git · SOLID Design Principles · Integration Testing · Object-Oriented Programming (OOP) · MVC. Github Link- https://github.com/MUQADDASPREET/Warzone-Game

- Event Management System: Built a web app for organizing and discovering events with Admin/User roles, secure authentication, and clear ownership rules. 1. Roles & Auth: Cookie/Forms authentication with a custom authorization filter enforcing permissions across Admin and User flows. 2. Event Workflows: Create/edit events (title, date, time, location, type, duration, description, optional details) and manage invite-only sessions with validation and error handling. 3. Architecture & Data: ASP.NET MVC with repository/service pattern, SQL Server persistence, and request/error/audit logging. 4. Maintainability: Layered solution (Business, Foundation, Web), clean separation of concerns, and containerization-ready setup (.dockerignore). Skills- MySQL · CSS · Software Design Patterns · Bootstrap · Web Performance · JavaScript · C# · .NET Core MVC · Docker · Git · SOLID Design Principles · Object-Oriented Programming (OOP) · HTML5 · MVC. Github Link- https://github.com/MUQADDASPREET/Event-Management-System

- Reddit Sentiment Analysis: Built an end-to-end pipeline to collect, label, and analyze sentiment on Reddit posts/comments, with an interactive dashboard and API for inference. 1. Data & ETL: Ingested posts/comments via Reddit API (PRAW) with rate-limit handling; stored cleaned datasets in SQLite/Postgres for reproducible runs. 2. NLP & Modeling: Text normalization → tokenization/lemmatization → TF-IDF (uni/bi-grams). Implemented traditional ML baselines alongside a DistilBERT fine-tune. 3. Explainability & Viz: Extracted top features (coef_/SHAP), visualized confusion matrices, ROC curves, word clouds, and sentiment time-series by subreddit/topic. 4. Serving & Ops: Exposed a FastAPI endpoint and a Streamlit dashboard; containerized with Docker and integrated CI with GitHub Actions. Sills- Python · PRAW (Reddit API) · pandas · scikit-learn · spaCy/NLTK · Hugging Face Transformers · FastAPI · Streamlit/Plotly · Docker · GitHub Actions · SQLite/Postgres. Github Link- https://github.com/MUQADDASPREET/Reddit-Sentiment-Analysis


- Transient Noise Reduction: This project explores three deep neural network (DNN) approaches to mitigating transient noise: 1. Multi-Layer Perceptron / Feed-Forward Network (FNN/MLP) 2. Convolutional Neural Network (CNN) 3. Recurrent Neural Network (RNN) with LSTM units. Each approach is trained and tested on speech samples artificially corrupted with transient noise under varying conditions. Evaluation considers improvements in speech intelligibility and quality using objective and perceptual measures. Dataset: Primary Speech Data: CSTR VCTK Corpus, containing recordings of over 100 speakers with varied accents. Results- 1. RNN provides strong improvements while maintaining efficient inference and memory usage. 2. FNN trains quickly and can achieve good speech quality outcomes. 3. CNN captures local time-frequency patterns but can struggle with unpredictable transient noise compared to RNN. Skills- Python · Deep Learning · Pandas · NumPy · Neural Networks · TensorFlow · Machine Learning. Github Link- https://github.com/MUQADDASPREET/Transient-Noise_Reduction


EXPERIENCE:
- Software Engineer at Nagarro (Jan 2022 - Jul 2023): 1. Delivered supplier/admin modules for Tungsten e-invoicing portal across React and Angular (25+ reusable components) with lazy loading, route-level code splitting, and image optimization. 2. Integrated .NET Core REST APIs with client-side caching (RxJS/Redux) to enhance responsiveness and reduce redundant calls, supporting suppliers across 175+ countries. 3. Improved accessibility on core flows with semantic markup, keyboard navigation, and ARIA best practices. 4. Wrote unit tests (Jest/Karma + RTL) to maintain strong coverage for new modules; contributed to bug bashes and code reviews, resolving numerous UI issues and strengthening release quality. Skills- Software Design Patterns · Unit Testing · JUnit · GitHub Actions · Java · Maven · Git · SOLID Design Principles · Integration Testing · Object-Oriented Programming (OOP) · MVC


- Frontend Developer Intern at VMM Education (Jul 2021 - Dec 2021): 1. Developed a web-based quiz module that helped students practice and engage with learning material more easily. 2. Improved the application’s navigation and user experience by organizing data flow and reducing repetitive actions. 3. Strengthened the system’s reliability by creating automated tests to catch issues before release. Skills- React · Redux · JavaScript · Jest · API Integration · Unit Testing · Integration Testing


EDUCATION:
- MSc in Applied Computer Science at Concordia University (Sep 2023 - May 2025): 3.30 GPA
- B.Tech in Computer Science from Guru Nanak Dev University (Jul 2018 - May 2022): 3.87 GPA

RESEARCH:
  - Transient Noise Reduction in Speech Signals: Deep learning approaches (FNN, CNN, RNN) for noise suppression.

- Content-Aware Investigated multiple energy functions (e1, eEntropy, Gradient) for content-aware image resizing. Implemented seam carving, pixel update techniques, and cropping/upscaling methods to preserve image details while resizing. Results and comparisons were documented in a research paper. Skills- Python, Computer Vision, Image Processing, Seam Carving, Entropy-based Methods. Github Link- https://github.com/MUQADDASPREET/Content-Aware-Image-Resizing

- Heuristic Algorithms for Longest Simple Path: Researched heuristic algorithms to approximate the NP-hard Longest Simple Path problem in geometric and online graphs. Implemented and compared DFS, modified Dijkstra, A*, and a custom heuristic to evaluate pathfinding performance across different graph types. Skills- Graph Algorithms, Heuristics, Algorithm Design, Complexity Analysis, Python. Github Link- https://github.com/Muqaddaspreet/Longest-Simple-Path

CONTACT:
- Email: muqaddaspreetsingh@gmail.com
- LinkedIn: https://www.linkedin.com/in/muqaddaspreet-singh/
- GitHub: https://github.com/MUQADDASPREET

INSTRUCTIONS:
- Be friendly, professional, and helpful
- Provide specific, detailed answers based on the portfolio data
- If asked about something not in the portfolio, politely redirect to relevant information
- Keep responses concise but informative
- Always mention Muqaddas in third person (e.g., "Muqaddas has experience in...")
`;

exports.handler = async (event, context) => {
  // Handle CORS for preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the request body
    const { message, sessionId } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Create the conversation with context
    const conversation = [
      {
        role: "system",
        content: PORTFOLIO_CONTEXT,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response: response,
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("Error in chatbot function:", error);

    // Return a fallback response if OpenAI fails
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response:
          "I'm having trouble connecting to my AI service right now. Please try asking about Muqaddas's skills, projects, experience, education, or research, and I'll do my best to help you with the information I have available.",
        sessionId: sessionId || "unknown",
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

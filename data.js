// Knowledge base for the offline (rule-based) generator.
// Each role has topics; each topic has questions per difficulty plus keywords used in rubrics.

const ROLE_DATA = {
  "Web Developer": {
    skills: ["HTML & CSS", "JavaScript", "React / Frontend Frameworks", "Backend & APIs", "Databases", "Web Performance & Security"],
    topics: {
      "HTML & CSS": {
        keywords: ["semantic HTML", "flexbox", "grid", "responsive design", "accessibility"],
        Easy: [
          "What is the difference between block, inline and inline-block elements?",
          "What is semantic HTML and why is it important?",
          "Explain the CSS box model."
        ],
        Medium: [
          "How do Flexbox and CSS Grid differ, and when would you choose each?",
          "How do you make a website responsive? Explain media queries and mobile-first design.",
          "Explain CSS specificity and how conflicts between rules are resolved."
        ],
        Hard: [
          "How would you build an accessible modal dialog from scratch (focus trap, ARIA, keyboard support)?",
          "How does the browser render a page (critical rendering path), and how can CSS block rendering?"
        ]
      },
      "JavaScript": {
        keywords: ["closures", "event loop", "promises", "async/await", "scope"],
        Easy: [
          "What is the difference between var, let and const?",
          "What are the data types in JavaScript?",
          "What is the difference between == and ===?"
        ],
        Medium: [
          "What is a closure? Give a practical example of where you have used one.",
          "Explain the event loop, call stack and callback queue.",
          "Compare callbacks, promises and async/await."
        ],
        Hard: [
          "Explain prototypal inheritance and how it differs from classical inheritance.",
          "How would you implement debounce and throttle, and where would you use each?"
        ]
      },
      "React / Frontend Frameworks": {
        keywords: ["virtual DOM", "state", "props", "hooks", "re-rendering"],
        Easy: [
          "What is the difference between state and props in React?",
          "What is the virtual DOM?",
          "What are controlled and uncontrolled components?"
        ],
        Medium: [
          "Explain useEffect and its dependency array. What bugs can arise from it?",
          "How do you avoid unnecessary re-renders in a React app?",
          "When would you use Context API versus a state library like Redux?"
        ],
        Hard: [
          "How does React's reconciliation algorithm work?",
          "How would you design state management for a large, multi-page app?"
        ]
      },
      "Backend & APIs": {
        keywords: ["REST", "authentication", "status codes", "middleware", "scalability"],
        Easy: [
          "What is a REST API? List the common HTTP methods.",
          "What is the difference between GET and POST?",
          "What are HTTP status codes? Name a few and their meaning."
        ],
        Medium: [
          "Explain JWT-based authentication and how it differs from session-based auth.",
          "What is middleware in Express/Node.js? Give an example.",
          "How do you design and version a REST API?"
        ],
        Hard: [
          "How would you design a rate limiter for a public API?",
          "How do you scale a Node.js backend to handle high traffic?"
        ]
      },
      "Databases": {
        keywords: ["SQL", "indexing", "normalization", "joins", "transactions"],
        Easy: [
          "What is the difference between SQL and NoSQL databases?",
          "What is a primary key and a foreign key?",
          "Explain the different types of SQL joins."
        ],
        Medium: [
          "What is database indexing and how does it improve performance?",
          "Explain normalization and when you would denormalize.",
          "What are ACID properties?"
        ],
        Hard: [
          "How would you optimize a slow SQL query?",
          "Explain isolation levels and the problems they prevent (dirty read, phantom read)."
        ]
      },
      "Web Performance & Security": {
        keywords: ["XSS", "CSRF", "caching", "lazy loading", "HTTPS"],
        Easy: [
          "What is HTTPS and why is it important?",
          "What is XSS and how can it be prevented?",
          "What is caching in the browser?"
        ],
        Medium: [
          "How do you improve the loading performance of a website?",
          "What is CORS and why does it exist?",
          "Explain CSRF and how tokens protect against it."
        ],
        Hard: [
          "How would you secure a web app against the OWASP Top 10 risks?",
          "Explain Core Web Vitals and how you would improve LCP and CLS."
        ]
      }
    }
  },

  "Data Scientist / ML Engineer": {
    skills: ["Statistics & Probability", "Machine Learning Basics", "Model Evaluation", "Deep Learning", "Data Preprocessing", "Python & Tools"],
    topics: {
      "Statistics & Probability": {
        keywords: ["mean", "variance", "p-value", "distributions", "hypothesis testing"],
        Easy: [
          "What is the difference between mean, median and mode?",
          "What is standard deviation and variance?",
          "What is a normal distribution?"
        ],
        Medium: [
          "Explain p-value and statistical significance in simple terms.",
          "What is the Central Limit Theorem and why does it matter?",
          "What is the difference between Type I and Type II errors?"
        ],
        Hard: [
          "How would you design and analyze an A/B test? What sample size considerations apply?",
          "Explain Bayes' theorem with a real-world example."
        ]
      },
      "Machine Learning Basics": {
        keywords: ["supervised", "unsupervised", "overfitting", "bias-variance", "regularization"],
        Easy: [
          "What is the difference between supervised and unsupervised learning?",
          "What is overfitting and underfitting?",
          "What is the difference between classification and regression?"
        ],
        Medium: [
          "Explain the bias-variance tradeoff.",
          "How does a decision tree work, and how does a random forest improve on it?",
          "What is regularization? Compare L1 and L2."
        ],
        Hard: [
          "Explain gradient boosting and how it differs from bagging.",
          "How does the SVM kernel trick work?"
        ]
      },
      "Model Evaluation": {
        keywords: ["precision", "recall", "F1", "ROC-AUC", "cross-validation"],
        Easy: [
          "What is a confusion matrix?",
          "What is the difference between accuracy and precision?",
          "What is a train-test split?"
        ],
        Medium: [
          "When would you prefer recall over precision? Give examples.",
          "Explain ROC curve and AUC.",
          "What is k-fold cross-validation and why use it?"
        ],
        Hard: [
          "How do you evaluate a model on a highly imbalanced dataset?",
          "How would you detect and handle data leakage?"
        ]
      },
      "Deep Learning": {
        keywords: ["neural network", "backpropagation", "activation", "CNN", "transformer"],
        Easy: [
          "What is a neural network and what are its main components?",
          "What is an activation function? Name a few.",
          "What is the difference between ML and Deep Learning?"
        ],
        Medium: [
          "Explain backpropagation and gradient descent.",
          "What is the vanishing gradient problem and how is it addressed?",
          "How do CNNs work and why are they good for images?"
        ],
        Hard: [
          "Explain the attention mechanism and the Transformer architecture.",
          "How would you fine-tune a pretrained model on a small dataset?"
        ]
      },
      "Data Preprocessing": {
        keywords: ["missing values", "outliers", "scaling", "encoding", "feature engineering"],
        Easy: [
          "How do you handle missing values in a dataset?",
          "What is the difference between normalization and standardization?",
          "What is one-hot encoding?"
        ],
        Medium: [
          "How do you detect and treat outliers?",
          "What is feature engineering? Give an example from a project.",
          "How do you handle categorical variables with high cardinality?"
        ],
        Hard: [
          "How would you build a robust preprocessing pipeline that avoids leakage between train and test?",
          "Explain dimensionality reduction with PCA and its limitations."
        ]
      },
      "Python & Tools": {
        keywords: ["pandas", "numpy", "scikit-learn", "vectorization", "Jupyter"],
        Easy: [
          "What is the difference between a list, tuple and dictionary in Python?",
          "What is the difference between NumPy arrays and Python lists?",
          "What is a pandas DataFrame?"
        ],
        Medium: [
          "How do you merge and group data in pandas?",
          "Why is vectorization faster than loops in NumPy?",
          "How do you deploy a trained ML model as an API?"
        ],
        Hard: [
          "How would you optimize pandas code that is slow on large datasets?",
          "How would you track experiments and version models (MLOps)?"
        ]
      }
    }
  },

  "Software Engineer (DSA & Core CS)": {
    skills: ["Data Structures", "Algorithms", "OOP", "Operating Systems", "DBMS & Networks", "System Design"],
    topics: {
      "Data Structures": {
        keywords: ["array", "linked list", "hash map", "tree", "heap"],
        Easy: [
          "What is the difference between an array and a linked list?",
          "What is a stack and a queue? Give real-life uses.",
          "How does a hash map work?"
        ],
        Medium: [
          "How do you detect a cycle in a linked list?",
          "Explain BST and how balanced trees (AVL/Red-Black) help.",
          "When would you use a heap/priority queue?"
        ],
        Hard: [
          "Design an LRU cache and state the time complexity of each operation.",
          "Explain how a Trie works and where it is used."
        ]
      },
      "Algorithms": {
        keywords: ["time complexity", "recursion", "dynamic programming", "sorting", "graphs"],
        Easy: [
          "What is Big-O notation? Explain with examples.",
          "Explain binary search and its complexity.",
          "Compare bubble sort, merge sort and quick sort."
        ],
        Medium: [
          "Explain BFS vs DFS and when to use each.",
          "What is dynamic programming? Solve a simple example like Fibonacci or knapsack.",
          "How does Dijkstra's algorithm work?"
        ],
        Hard: [
          "How would you find the shortest path in a graph with negative edge weights?",
          "Explain how to solve the longest increasing subsequence in O(n log n)."
        ]
      },
      "OOP": {
        keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "SOLID"],
        Easy: [
          "What are the four pillars of OOP?",
          "What is the difference between a class and an object?",
          "What is method overloading vs overriding?"
        ],
        Medium: [
          "What is the difference between an abstract class and an interface?",
          "Explain the SOLID principles with examples.",
          "What is composition vs inheritance?"
        ],
        Hard: [
          "Explain a design pattern (Singleton/Factory/Observer) and where you have used it.",
          "How would you design a parking-lot system using OOP?"
        ]
      },
      "Operating Systems": {
        keywords: ["process", "thread", "deadlock", "scheduling", "virtual memory"],
        Easy: [
          "What is the difference between a process and a thread?",
          "What is a deadlock?",
          "What is virtual memory?"
        ],
        Medium: [
          "Explain the four conditions necessary for deadlock and how to prevent it.",
          "Compare CPU scheduling algorithms (FCFS, SJF, Round Robin).",
          "What is paging and segmentation?"
        ],
        Hard: [
          "How do semaphores and mutexes differ? Solve the producer-consumer problem.",
          "Explain page replacement algorithms and thrashing."
        ]
      },
      "DBMS & Networks": {
        keywords: ["normalization", "indexing", "TCP", "HTTP", "DNS"],
        Easy: [
          "What is the difference between TCP and UDP?",
          "What is normalization?",
          "What happens when you type a URL in the browser?"
        ],
        Medium: [
          "Explain ACID properties and transactions.",
          "How does TCP ensure reliable delivery (handshake, flow control)?",
          "How does DNS resolution work?"
        ],
        Hard: [
          "Explain how indexes (B+ tree) are stored and used by a database.",
          "How does TLS/HTTPS establish a secure connection?"
        ]
      },
      "System Design": {
        keywords: ["scalability", "load balancer", "caching", "database sharding", "availability"],
        Easy: [
          "What is the difference between horizontal and vertical scaling?",
          "What is a load balancer?",
          "What is caching and why is it used?"
        ],
        Medium: [
          "How would you design a URL shortener?",
          "Explain SQL vs NoSQL tradeoffs in system design.",
          "What is the CAP theorem?"
        ],
        Hard: [
          "Design a chat application like WhatsApp supporting millions of users.",
          "How would you design a scalable news-feed system?"
        ]
      }
    }
  },

  "Cybersecurity Analyst": {
    skills: ["Security Fundamentals", "Network Security", "Web App Security", "Cryptography", "Incident Response"],
    topics: {
      "Security Fundamentals": {
        keywords: ["CIA triad", "least privilege", "threat", "vulnerability", "risk"],
        Easy: [
          "What is the CIA triad?",
          "What is the difference between a threat, vulnerability and risk?",
          "What is the principle of least privilege?"
        ],
        Medium: [
          "Explain defense in depth with an example.",
          "What is the difference between authentication and authorization? What is MFA?"
        ],
        Hard: [
          "How would you perform a basic threat model for a new web application?"
        ]
      },
      "Network Security": {
        keywords: ["firewall", "IDS/IPS", "VPN", "DDoS", "port scanning"],
        Easy: [
          "What is a firewall and how does it work?",
          "What is the difference between IDS and IPS?",
          "What is a VPN?"
        ],
        Medium: [
          "Explain how a DDoS attack works and how to mitigate it.",
          "What is a man-in-the-middle attack and how can it be prevented?"
        ],
        Hard: [
          "How would you design network segmentation for a mid-sized company?"
        ]
      },
      "Web App Security": {
        keywords: ["SQL injection", "XSS", "CSRF", "OWASP", "input validation"],
        Easy: [
          "What is SQL injection and how do you prevent it?",
          "What is XSS?",
          "What is the OWASP Top 10?"
        ],
        Medium: [
          "Explain CSRF and the role of SameSite cookies.",
          "What is broken access control? Give an example."
        ],
        Hard: [
          "How would you test an application for insecure deserialization and SSRF?"
        ]
      },
      "Cryptography": {
        keywords: ["symmetric", "asymmetric", "hashing", "digital signature", "TLS"],
        Easy: [
          "What is the difference between symmetric and asymmetric encryption?",
          "What is hashing and how is it different from encryption?",
          "What is a digital certificate?"
        ],
        Medium: [
          "Why should passwords be hashed with salt (e.g., bcrypt)?",
          "How does a digital signature work?"
        ],
        Hard: [
          "Walk through the TLS 1.3 handshake."
        ]
      },
      "Incident Response": {
        keywords: ["detection", "containment", "eradication", "recovery", "logs"],
        Easy: [
          "What are the phases of incident response?",
          "What is a SIEM?"
        ],
        Medium: [
          "You detect ransomware on one machine. What are your first steps?",
          "How do you analyze logs to find a suspicious login?"
        ],
        Hard: [
          "How would you conduct a post-incident review and prevent recurrence?"
        ]
      }
    }
  },

  "HR / Behavioral Round": {
    skills: ["About You", "Teamwork & Leadership", "Problem Solving", "Strengths & Weaknesses", "Career Goals"],
    topics: {
      "About You": {
        keywords: ["background", "motivation", "clarity", "relevance"],
        Easy: [
          "Tell me about yourself.",
          "Why did you choose this field / this role?",
          "Why should we hire you?"
        ],
        Medium: [
          "Walk me through your resume and highlight the project you are proudest of.",
          "What motivates you to work hard?"
        ],
        Hard: [
          "If we called your last mentor/manager, what would they say about you honestly?"
        ]
      },
      "Teamwork & Leadership": {
        keywords: ["STAR method", "collaboration", "conflict", "ownership"],
        Easy: [
          "Describe a time you worked in a team.",
          "What role do you usually take in a group?"
        ],
        Medium: [
          "Tell me about a conflict in a team and how you handled it.",
          "Describe a time you led a project or took initiative."
        ],
        Hard: [
          "Tell me about a time you disagreed with a senior and what you did."
        ]
      },
      "Problem Solving": {
        keywords: ["analysis", "prioritization", "learning", "result"],
        Easy: [
          "Describe a challenge you faced in a project.",
          "How do you handle tight deadlines?"
        ],
        Medium: [
          "Tell me about a time you failed and what you learned.",
          "How do you prioritize when you have many tasks?"
        ],
        Hard: [
          "Describe a decision you made with incomplete information. What was the outcome?"
        ]
      },
      "Strengths & Weaknesses": {
        keywords: ["self-awareness", "improvement", "examples"],
        Easy: [
          "What are your strengths?",
          "What is your biggest weakness?"
        ],
        Medium: [
          "How are you working on improving your weaknesses?",
          "What feedback have you received recently and how did you act on it?"
        ],
        Hard: [
          "What would you do differently in your career so far?"
        ]
      },
      "Career Goals": {
        keywords: ["vision", "growth", "company fit", "commitment"],
        Easy: [
          "Where do you see yourself in 5 years?",
          "Why do you want to join our company?"
        ],
        Medium: [
          "What are you looking for in your first job?",
          "How do you keep learning new skills?"
        ],
        Hard: [
          "If you get two offers, how will you decide?"
        ]
      }
    }
  }
};

// Generic follow-up probes added to questions to make interviews deeper.
const FOLLOW_UPS = [
  "Can you give a real example from your project or experience?",
  "What trade-offs or limitations are involved?",
  "How would you explain this to a beginner?",
  "What would you do differently if scale or constraints changed?",
  "How would you test or verify your answer?"
];

// Rubric criteria templates per difficulty (weights add up to 10 marks).
const RUBRIC_TEMPLATES = {
  technical: [
    { criterion: "Concept Accuracy", weight: 4, desc: "Correct definition and understanding of the core idea." },
    { criterion: "Depth & Reasoning", weight: 2, desc: "Explains why/how, covers trade-offs and edge cases." },
    { criterion: "Practical Example", weight: 2, desc: "Gives a relevant real-world or project example." },
    { criterion: "Communication", weight: 2, desc: "Clear, structured, concise answer." }
  ],
  behavioral: [
    { criterion: "Structure (STAR)", weight: 3, desc: "Situation, Task, Action, Result clearly covered." },
    { criterion: "Relevance & Specifics", weight: 3, desc: "Concrete example rather than generic statements." },
    { criterion: "Self-awareness & Learning", weight: 2, desc: "Reflects on outcome and what was learned." },
    { criterion: "Communication", weight: 2, desc: "Confident, honest and well-organized delivery." }
  ]
};

const SCORE_BANDS = [
  { min: 9, label: "Excellent", note: "Complete, accurate, insightful answer with strong example." },
  { min: 7, label: "Good", note: "Mostly correct with minor gaps in depth or examples." },
  { min: 4, label: "Average", note: "Basic understanding but missing key points or clarity." },
  { min: 0, label: "Needs Improvement", note: "Incorrect, vague or incomplete answer." }
];

(function () {
    "use strict";

    var app = document.getElementById("app");
    var toast = document.getElementById("toast");
    var STORAGE_KEY = "pathway-adaptive-internship-v1";

    var skills = ["Python", "SQL", "Machine Learning", "Excel", "Data Visualization", "Power BI", "Tableau", "Statistics", "NLP", "NumPy", "Pandas"];
    var roleData = [
        { name: "Data Analyst Intern", short: "Data Analyst", requirements: ["Python", "SQL", "Statistics", "Power BI", "Excel"], interests: ["Data Analytics", "Business Intelligence", "Finance"], modes: ["Remote", "Hybrid", "On-site"], specializations: ["Data Science", "Business Analytics", "Statistics", "Economics", "Finance"], hints: ["Finding patterns", "Business problems", "SQL & data", "Analytical", "Problem solver", "Creating visualizations", "Turning data into decisions"] },
        { name: "Data Scientist Intern", short: "Data Scientist", requirements: ["Python", "SQL", "Statistics", "Machine Learning", "Pandas"], interests: ["Data Analytics", "Machine Learning", "Finance"], modes: ["Remote", "Hybrid"], specializations: ["Data Science", "Statistics", "Computer Science", "Mathematics"], hints: ["Finding patterns", "Building models", "Research", "Experimenting with ML", "Code & models", "Analytical", "Problem solver"] },
        { name: "ML Engineer Intern", short: "ML Engineer", requirements: ["Python", "Machine Learning", "NumPy", "Pandas", "SQL"], interests: ["Machine Learning", "AI/NLP", "Data Engineering"], modes: ["Remote", "Hybrid"], specializations: ["Data Science", "Computer Science", "Artificial Intelligence"], hints: ["Building models", "Cleaning data", "Experimenting with ML", "Code & models", "AI & NLP", "Technical", "Problem solver"] },
        { name: "BI Analyst Intern", short: "BI Analyst", requirements: ["SQL", "Excel", "Data Visualization", "Power BI"], interests: ["Business Intelligence", "Data Analytics", "Finance"], modes: ["Hybrid", "On-site"], specializations: ["Business Analytics", "Business Administration", "Economics", "Finance"], hints: ["Finding patterns", "Business problems", "Real-world data", "SQL & data", "Dashboards", "Analytical", "Creative"] },
        { name: "Data Engineer Intern", short: "Data Engineer", requirements: ["Python", "SQL", "Pandas", "NumPy"], interests: ["Data Engineering", "Data Analytics"], modes: ["Remote", "Hybrid", "On-site"], specializations: ["Data Science", "Computer Science", "Information Technology"], hints: ["Cleaning data", "Real-world data", "SQL & data", "Code & models", "Technical", "Problem solver", "Building data systems"] },
        { name: "AI / NLP Intern", short: "AI / NLP", requirements: ["Python", "Machine Learning", "NLP", "Pandas"], interests: ["AI/NLP", "Machine Learning"], modes: ["Remote", "Hybrid"], specializations: ["Data Science", "Computer Science", "Artificial Intelligence", "Linguistics"], hints: ["Building models", "Research", "Experimenting with ML", "AI & NLP", "Code & models", "Technical", "Understanding language"] }
    ];

    var interestCards = [
        { name: "Data Analytics", title: "Finding patterns", subtitle: "Exploring data to uncover a useful signal" },
        { name: "Machine Learning", title: "Teaching machines", subtitle: "Building models that learn from examples" },
        { name: "AI/NLP", title: "Understanding language", subtitle: "Working with text, language, and AI" },
        { name: "Business Intelligence", title: "Turning data into decisions", subtitle: "Making information useful to a business" },
        { name: "Data Engineering", title: "Building data systems", subtitle: "Creating reliable paths for data to flow" },
        { name: "Finance", title: "Making numbers useful", subtitle: "Finding patterns behind money and business choices" }
    ];

    var questions = [
        { id: "pull", title: "What pulls you in?", subtitle: "Choose the kind of work you naturally notice", options: ["Finding patterns", "Building models", "Cleaning data", "Creating visualizations"] },
        { id: "interesting", title: "What sounds interesting?", subtitle: "Pick the problems you would like to explore", options: ["Business problems", "Research", "Real-world data", "Experimenting with ML"] },
        { id: "work", title: "How do you like working?", subtitle: "Select the tools or work style that feel right", options: ["SQL & data", "Code & models", "Dashboards", "AI & NLP"] },
        { id: "you", title: "What feels most like you?", subtitle: "Choose a few strengths that sound familiar", options: ["Analytical", "Technical", "Creative", "Problem solver"] }
    ];

    var optionTraits = {
        "Finding patterns": ["Analytical", 2], "Building models": ["Modeling", 2], "Cleaning data": ["Systems", 1, "Analytical", 1], "Creating visualizations": ["Creative", 1, "Applied", 1],
        "Business problems": ["Applied", 1, "Creative", 1], "Research": ["Analytical", 1, "Modeling", 1], "Real-world data": ["Applied", 2], "Experimenting with ML": ["Modeling", 2],
        "SQL & data": ["Analytical", 1, "Systems", 1], "Code & models": ["Modeling", 1, "Systems", 1], "Dashboards": ["Creative", 1, "Applied", 1], "AI & NLP": ["Modeling", 1, "Creative", 1],
        "Analytical": ["Analytical", 2], "Technical": ["Systems", 1, "Modeling", 1], "Creative": ["Creative", 2], "Problem solver": ["Applied", 1, "Analytical", 1]
    };

    var defaultState = {
        view: "dashboard",
        ringMetric: "ready",
        selectedRole: "Data Analyst Intern",
        selectedSkill: "SQL",
        profile: {
            fullName: "Demo Student", college: "Northstar University", degree: "BSc", degreeOther: "", specialization: "Data Science", year: "3rd",
            email: "student@example.edu", phone: "+91 98765 43210", location: "Mumbai, India",
            workPreference: "Hybrid", experienceType: "None yet", achievements: "",
            interests: ["Data Analytics", "Machine Learning", "Business Intelligence"],
            skills: { "Python": "Intermediate", "SQL": "Beginner", "Machine Learning": "Beginner", "Excel": "Intermediate", "Data Visualization": "Intermediate", "Power BI": "Beginner", "Statistics": "Intermediate", "NumPy": "Beginner", "Pandas": "Beginner" },
            roles: ["Data Analyst Intern", "Data Scientist Intern", "ML Engineer Intern", "BI Analyst Intern", "Data Engineer Intern"],
            projectYes: true, projectName: "AI-Based Adaptive Internship System", projectTech: ["Python", "SQL", "Pandas", "Power BI"], dataset: "Internship skills and role requirements (sample)",
            experienceYes: false, experienceRole: "", experienceOrg: "", experienceDetails: ""
        },
        dna: { pull: ["Finding patterns", "Building models"], interesting: ["Business problems", "Real-world data"], work: ["SQL & data", "Dashboards"], you: ["Analytical", "Problem solver"] },
        dnaOpen: 0,
        template: "classic",
        resumeStyle: { font: "Inter", size: 12, text: "#332E2B", accent: "#C97862", background: "#FFFFFF", spacing: 1.4, bold: false, italic: false, underline: false },
        resumeEdits: {},
        resumeHiddenSections: [],
        resumeCustomSections: [],
        resumeImagesVisible: true,
        resumePortraitHiddenTemplates: [],
        resumeSectionOrders: {},
        resumeSectionOffsets: {},
        resumeArrangeMode: false,
        savedRoles: [],
        recFilter: "All",
        recModeFilter: "All",
        recIndex: 0,
        expandedRole: "",
        focusSkill: "SQL",
        journeyProgress: { "SQL": 1 },
        roadmapOpen: false,
        whyOpen: false,
        progressWhyOpen: false,
        adaptNotice: null,
        analyzing: false
    };

    function clone(value) { return JSON.parse(JSON.stringify(value)); }

    function readState() {
        try {
            var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
            if (!stored) return clone(defaultState);
            var merged = Object.assign(clone(defaultState), stored);
            merged.profile = Object.assign(clone(defaultState.profile), stored.profile || {});
            merged.profile.skills = Object.assign({}, defaultState.profile.skills, (stored.profile && stored.profile.skills) || {});
            merged.profile.interests = (stored.profile && stored.profile.interests) || clone(defaultState.profile.interests);
            merged.profile.roles = (stored.profile && stored.profile.roles) || clone(defaultState.profile.roles);
            merged.profile.projectTech = (stored.profile && stored.profile.projectTech) || clone(defaultState.profile.projectTech);
            if (!stored.profile || !Object.prototype.hasOwnProperty.call(stored.profile, "specialization")) merged.profile.specialization = defaultState.profile.specialization;
            if (!stored.profile || !Object.prototype.hasOwnProperty.call(stored.profile, "workPreference")) merged.profile.workPreference = defaultState.profile.workPreference;
            if (!stored.profile || !Object.prototype.hasOwnProperty.call(stored.profile, "experienceType")) merged.profile.experienceType = defaultState.profile.experienceType;
            if (merged.profile.experienceType === "None") merged.profile.experienceType = "None yet";
            merged.profile.achievements = (stored.profile && stored.profile.achievements) || "";
            merged.dna = Object.assign(clone(defaultState.dna), stored.dna || {});
            merged.resumeStyle = Object.assign({}, defaultState.resumeStyle, stored.resumeStyle || {});
            if (merged.resumeStyle.font === "Arial" || merged.resumeStyle.font === "Nunito Sans") merged.resumeStyle.font = "Inter";
            if (merged.resumeStyle.accent === "#B9826F") merged.resumeStyle.accent = "#C97862";
            merged.resumeEdits = stored.resumeEdits || {};
            merged.resumeHiddenSections = stored.resumeHiddenSections || [];
            merged.resumeCustomSections = stored.resumeCustomSections || [];
            merged.resumePortraitHiddenTemplates = stored.resumePortraitHiddenTemplates || [];
            merged.resumeSectionOrders = stored.resumeSectionOrders || {};
            merged.resumeSectionOffsets = stored.resumeSectionOffsets || {};
            merged.journeyProgress = Object.assign({}, defaultState.journeyProgress, stored.journeyProgress || {});
            return merged;
        } catch (error) {
            return clone(defaultState);
        }
    }

    var roadmapLibrary = {
        "SQL": [
            { title: "SQL Basics", learn: "SELECT, filtering, sorting, and aggregations", time: "1–2 hrs" },
            { title: "Joins", learn: "INNER, LEFT, and RIGHT JOIN with small relational tables", time: "2–3 hrs" },
            { title: "Window Functions", learn: "Ranking, partitions, and running totals", time: "2–3 hrs" },
            { title: "SQL Project", learn: "Answer an internship-style question with a clean query and short write-up", time: "4–6 hrs" },
            { title: "Internship Ready", learn: "Explain your query choices and validate your results", time: "1 hr" }
        ],
        "Python": [
            { title: "Python Foundations", learn: "Variables, conditions, loops, and reading data", time: "2–3 hrs" },
            { title: "Data Types & Functions", learn: "Lists, dictionaries, functions, and reusable code", time: "2–3 hrs" },
            { title: "NumPy + Pandas", learn: "Arrays, DataFrames, joins, and grouped analysis", time: "3–4 hrs" },
            { title: "Python Data Project", learn: "Turn a raw dataset into a clear, reproducible analysis", time: "4–6 hrs" },
            { title: "Internship Ready", learn: "Walk through your code and explain the decisions you made", time: "1 hr" }
        ],
        "Machine Learning": [
            { title: "ML Foundations", learn: "Features, targets, train/test splits, and baseline models", time: "2–3 hrs" },
            { title: "Supervised Models", learn: "Fit and compare regression and classification models", time: "3–4 hrs" },
            { title: "Model Evaluation", learn: "Choose metrics, inspect errors, and avoid leakage", time: "2–3 hrs" },
            { title: "ML Portfolio Project", learn: "Build an end-to-end model with a clear evaluation note", time: "5–7 hrs" },
            { title: "Internship Ready", learn: "Explain model limits and how you would improve it", time: "1 hr" }
        ],
        "NLP": [
            { title: "NLP Foundations", learn: "Text cleaning, tokenization, and a simple language baseline", time: "2–3 hrs" },
            { title: "Text Preparation", learn: "Normalize text, explore vocabulary, and prepare labels", time: "2–3 hrs" },
            { title: "Embeddings & Transformers", learn: "Compare vector representations and a pretrained model", time: "3–4 hrs" },
            { title: "NLP Project", learn: "Create a small text classifier or language insight tool", time: "4–6 hrs" },
            { title: "Internship Ready", learn: "Describe data quality, model behavior, and evaluation", time: "1 hr" }
        ],
        "Statistics": [
            { title: "Descriptive Statistics", learn: "Summaries, distributions, and variability", time: "1–2 hrs" },
            { title: "Probability & Sampling", learn: "Understand uncertainty and sampling effects", time: "2–3 hrs" },
            { title: "Hypothesis Testing", learn: "Select a test, read the result, and state limits", time: "2–3 hrs" },
            { title: "Decision Case Study", learn: "Use evidence to recommend an action from a dataset", time: "3–4 hrs" },
            { title: "Internship Ready", learn: "Explain your method and communicate uncertainty clearly", time: "1 hr" }
        ],
        "Power BI": [
            { title: "Power BI Basics", learn: "Load data, clean columns, and build a first report", time: "2–3 hrs" },
            { title: "Data Model", learn: "Create relationships and a simple star schema", time: "2–3 hrs" },
            { title: "Measures & DAX", learn: "Write core measures and validate totals", time: "3–4 hrs" },
            { title: "Insight Dashboard", learn: "Build a focused dashboard around a real question", time: "4–5 hrs" },
            { title: "Internship Ready", learn: "Present the dashboard and defend the chosen metrics", time: "1 hr" }
        ],
        "Excel": [
            { title: "Spreadsheet Foundations", learn: "Clean tables, formats, and core formulas", time: "1–2 hrs" },
            { title: "Lookups & Summaries", learn: "Use lookups, pivots, and conditional summaries", time: "2–3 hrs" },
            { title: "Analysis Workflow", learn: "Check data quality and document assumptions", time: "2 hrs" },
            { title: "Excel Case Study", learn: "Turn a business question into a concise analysis", time: "3–4 hrs" },
            { title: "Internship Ready", learn: "Explain the checks behind your spreadsheet results", time: "1 hr" }
        ],
        "Data Visualization": [
            { title: "Chart Foundations", learn: "Match chart types to questions and data", time: "1–2 hrs" },
            { title: "Visual Storytelling", learn: "Use hierarchy, labels, and context to guide a reader", time: "2–3 hrs" },
            { title: "Dashboard Design", learn: "Build a useful, focused dashboard for one audience", time: "3–4 hrs" },
            { title: "Visualization Project", learn: "Publish a data story with a clear takeaway", time: "4–5 hrs" },
            { title: "Internship Ready", learn: "Walk through your visual choices and accessibility", time: "1 hr" }
        ],
        "Pandas": [
            { title: "DataFrame Basics", learn: "Read, inspect, and select structured data", time: "1–2 hrs" },
            { title: "Clean & Transform", learn: "Handle missing values, types, and categories", time: "2–3 hrs" },
            { title: "Group & Join", learn: "Aggregate and combine tables without losing meaning", time: "2–3 hrs" },
            { title: "Pandas Project", learn: "Create a reproducible analysis from a raw dataset", time: "4–5 hrs" },
            { title: "Internship Ready", learn: "Explain data preparation and validation steps", time: "1 hr" }
        ],
        "NumPy": [
            { title: "Array Foundations", learn: "Create arrays, inspect shape, and use vectorized math", time: "1–2 hrs" },
            { title: "Indexing & Operations", learn: "Slice, transform, and combine arrays", time: "2 hrs" },
            { title: "Statistics with Arrays", learn: "Summarize numerical data and handle missing values", time: "2 hrs" },
            { title: "Numerical Mini Project", learn: "Use efficient array operations in a small analysis", time: "3–4 hrs" },
            { title: "Internship Ready", learn: "Explain your approach and check the output", time: "1 hr" }
        ],
        "Tableau": [
            { title: "Tableau Basics", learn: "Connect a dataset and build a first worksheet", time: "2–3 hrs" },
            { title: "Visual Analysis", learn: "Use filters, marks, and calculated fields", time: "2–3 hrs" },
            { title: "Dashboard Design", learn: "Build a clear dashboard with useful interactions", time: "3–4 hrs" },
            { title: "Tableau Story", learn: "Publish a short data story and explain the insight", time: "4–5 hrs" },
            { title: "Internship Ready", learn: "Present your workbook and explain your design choices", time: "1 hr" }
        ]
    };

    function stepsFor(skill) { return roadmapLibrary[skill] || roadmapLibrary.Python; }

    function renderRoadmap(skill) {
        var steps = stepsFor(skill);
        var progress = Math.min(Number(state.journeyProgress[skill] || 0), steps.length);
        var openStage = state.openStage == null ? null : Number(state.openStage);
        var stageMarkup = steps.map(function (step, index) {
            var status = index < progress ? "completed" : (index === progress ? "current" : "locked");
            var statusText = status === "completed" ? "Done" : (status === "current" ? "Current" : "Locked");
            var mark = status === "completed" ? "✓" : (status === "locked" ? "·" : "●");
            return "<button class='roadmap-step " + status + "' data-action='open-stage' data-stage='" + index + "'><span class='step-node'>" + mark + "</span><span class='step-label'>" + esc(step.title) + "</span><span class='step-status'>" + statusText + "</span></button>";
        }).join("");
        var detail = "";
        if (state.roadmapOpen && openStage != null && steps[openStage]) {
            var selectedStep = steps[openStage];
            var isLocked = openStage > progress;
            var isDone = openStage < progress;
            var actionLabel = isDone ? "Stage complete ✓" : (isLocked ? "Complete the step above first" : "Mark Complete ✓");
            detail = "<div class='step-detail'><span class='section-kicker'>" + (isLocked ? "LOCKED STEP" : (isDone ? "COMPLETED STEP" : "CURRENT STEP")) + "</span><h4>" + esc(selectedStep.title) + "</h4><p><strong>Learn:</strong> " + esc(selectedStep.learn) + "<br><strong>Estimated:</strong> " + esc(selectedStep.time) + "</p><button class='text-button' data-action='toggle-why'>Why this? ⓘ</button><div class='why-copy " + (state.whyOpen ? "show" : "") + "'>" + esc(skill + " appears in " + skillRoleCount(skill) + " of your " + getTopMatches(5).length + " current internship matches. Progress here changes your skill level and refreshes your readiness, role scores, and next skill gaps.") + "</div><div class='step-detail-actions'><button class='btn btn-small " + (isLocked || isDone ? "btn-outline" : "btn-peach") + "' data-action='mark-stage' data-skill='" + esc(skill) + "' data-stage='" + openStage + "' " + (isLocked || isDone ? "disabled" : "") + ">" + actionLabel + "</button>" + (isLocked || isDone ? "" : "<span class='micro'>Your journey adapts after completion.</span>") + "</div></div>";
        }
        var allDone = progress >= steps.length;
        var button = !state.roadmapOpen ? "<button class='btn btn-peach' data-action='continue-roadmap'>Continue <span>→</span></button>" : "<button class='btn btn-peach' data-action='continue-roadmap'>" + (allDone ? "Choose next skill →" : "Continue →") + "</button>";
        return "<section class='surface journey-card'><div class='journey-header'><div><span class='section-kicker'>YOUR ROADMAP</span><h3>" + esc(skill) + " Journey</h3></div><select class='journey-select' id='journeySelect' aria-label='Choose a skill journey'>" + journeySkills().map(function (item) { return "<option value='" + esc(item.skill) + "' " + (item.skill === skill ? "selected" : "") + ">" + esc(item.skill) + " Journey · " + item.count + " roles</option>"; }).join("") + "</select></div><div class='roadmap'>" + stageMarkup + "</div>" + detail + (state.analyzing ? "<div class='adapt-analysis' style='margin-top:12px'><span class='analysis-dot'></span><span>" + esc(state.analysisText || "Analyzing your progress") + "</span></div>" : "") + (state.adaptNotice ? "<div class='adapt-notice'><h3>✦ Your journey adapted</h3><div class='adapt-results'><span>" + esc(skill) + " skill updated ✓</span><span>Readiness " + state.adaptNotice.beforeReady + "% → " + state.adaptNotice.afterReady + "%</span><span>New matches " + (state.adaptNotice.newMatches >= 0 ? "+" : "") + state.adaptNotice.newMatches + "</span><span>Skill gaps " + state.adaptNotice.beforeGaps + " → " + state.adaptNotice.afterGaps + "</span></div><p class='adapt-next'>Next best step: → " + esc(state.adaptNotice.next || "Choose another skill to keep building") + "</p></div>" : "") + "<button class='text-button adaptive-recalculate' data-action='adapt'>↻ Adapt my journey</button></section>";
    }

    function renderProgress() {
        var gaps = getSkillGaps();
        var skill = getFocusSkill();
        var count = skillRoleCount(skill);
        var topCount = getTopMatches(5).length;
        var score = readiness();
        var currentLevel = levelOf(skill) || "Not selected";
        var hasGap = gaps.some(function (gap) { return gap.skill === skill; });
        var detected = hasGap ? "Skill gap detected" : "Build your next edge";
        var insight = hasGap ? (skill + " appears in " + count + " of your " + topCount + " current matched internships. Improve it to strengthen multiple role matches at once.") : ("Your current " + skill + " level is contributing to your matches. Continue the journey to build a stronger portfolio signal.");
        return "<div class='page-wrap'>" + pageHeading("ADAPTIVE PROGRESS · ⌁ ADAPTIVE INTELLIGENCE", "Your journey changes as you improve", "A skill gap becomes a focused learning journey. When you complete a step, the system recalculates your readiness, matches, and next priorities.", "<span class='pill'><i class='pill-dot'></i>Profile-linked roadmap</span>") +
            "<section class='adaptive-hero'><div class='adaptive-copy'><span class='eyebrow'>⌁ ADAPTIVE INTELLIGENCE</span><h2>One clear next step. Then a smarter next one.</h2><p>Pathway looks at your current internship matches, finds a skill with high impact, and gives you a roadmap that can change when your profile changes.</p></div><div class='adaptive-number'><strong>" + score + "%</strong><div><span>Internship ready</span><b>Current focus · " + esc(skill) + "</b></div></div></section>" +
            "<div class='adaptive-focus'><section class='gap-insight'><span class='section-kicker'>✦ " + esc(detected.toUpperCase()) + "</span><h3>" + esc(skill) + "</h3><p>" + esc(insight) + "</p><div class='gap-impact'><span>" + (hasGap ? "⚠ " + esc(currentLevel) + " level" : "✓ " + esc(currentLevel) + " level") + "</span><span>Required by " + count + "/" + topCount + " matches</span></div><button class='btn btn-peach' data-action='continue-roadmap'>Continue <span>→</span></button></section>" + renderRoadmap(skill) + "</div>" +
            "<div class='adaptive-support'><section class='surface'><h3>Why this step?</h3><p>" + (hasGap ? esc(skill + " is currently the highest-impact gap across your top role matches. Improving it can lift readiness and more than one recommendation.") : esc("Your profile has covered its most urgent gaps. Pathway keeps building depth in skills that matter to your current matches.")) + "</p></section><section class='surface'><h3>What changes as you progress</h3><p>Skill level, readiness, role fit, recommendation order, and future gap priorities are all connected to the same profile state.</p></section></div><div class='footer-note'>The roadmap is generated from role requirements in this interactive prototype. Profile updates and completed stages are saved in this browser.</div></div>";
    }

    function renderProgressUpdated() {
        var skill = getFocusSkill();
        var matches = getTopMatches(5);
        var count = skillRoleCount(skill);
        var topGap = getSkillGaps().some(function (gap) { return gap.skill === skill; });
        var level = levelOf(skill) || "Not selected";
        var gapCopy = topGap ? skill + " is needed by " + count + " of your " + matches.length + " current matches. Building it can strengthen several of your preferred role paths." : skill + " is already in your profile. The next roadmap step adds depth for the internships you currently match.";
        var nextStage = stepsFor(skill)[Number(state.journeyProgress[skill] || 0)];
        var currentTitle = nextStage ? nextStage.title : "Choose another skill journey";
        var weekly = [skill + " · " + (nextStage ? "Complete " + nextStage.title : "Choose your next priority step"), "Project · add a small practical example", "Profile · revisit a skill level after practice"];
        var finishLine = readiness() >= 85 ? "You’re internship ready — your next opportunity is within reach." : "Every step brings you closer to internship ready.";
        var finishCard = "<section class='journey-finish-card' tabindex='0'><span class='finish-spark'>✦</span><p>YOUR JOURNEY, YOUR MOMENT</p><h2>" + esc(finishLine) + "</h2><button class='text-button' data-action='navigate' data-view='recommendations'>Explore your matches →</button></section>";
        return "<div class='page-wrap adaptive-progress-page'>" + pageHeading("ADAPTIVE PROGRESS · ⌁ ADAPTIVE INTELLIGENCE", "Your journey changes as you improve.", "Small steps can shift readiness, skill gaps, and the internships within reach.", "") +
            "<section class='adaptive-hero adaptive-hero-new'><div><span class='eyebrow'>⌁ YOUR JOURNEY, RIGHT NOW</span><h2>One step.<br>A new picture.</h2><p>As you build a skill, your profile and matches adapt with you.</p><div class='adaptive-ready-line'><strong>" + readiness() + "%</strong><span>internship ready</span></div><div class='adaptive-current-focus'><span>Current focus</span><b>" + esc(skill) + "</b><small>" + count + " of " + matches.length + " current matches use this skill · " + esc(level) + " level</small></div><button class='btn btn-peach' data-action='continue-roadmap'>Continue <span>→</span></button></div><aside class='adaptive-focus-insight'><span class='section-kicker'>✦ SKILL GAP INSIGHT</span><h3>" + esc(skill) + "</h3><p>" + esc(gapCopy) + "</p><button class='text-button' data-action='toggle-progress-why'>Why this? ⓘ</button><div class='why-copy " + (state.progressWhyOpen ? "show" : "") + "'>" + esc(skill + " appears in " + count + " of your current matched internships, so improving it has a direct effect on the paths shown in your recommendations.") + "</div></aside></section>" +
            "<div class='adaptive-roadmap-layout'>" + renderRoadmap(skill) + "<aside class='adaptive-next-panel'><span class='section-kicker'>HOW THIS JOURNEY ADAPTS</span><h3>One step.<br>A new picture.</h3><p>Complete a step and your readiness, matches, and next priority update automatically.</p><div class='adapt-phase-row'><span>Progress</span><b>→</b><span>New matches</span><b>→</b><span>Next focus</span></div><details class='weekly-goals'><summary>Weekly goal ideas</summary><ul>" + weekly.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul></details><div class='adaptive-next-step'><span>Next best step</span><strong>" + esc(currentTitle) + "</strong></div></aside></div>" + finishCard + "</div>";
    }


    var state = readState();

    function persist() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* Storage can be disabled by the browser. */ }
    }

    function esc(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character];
        });
    }

    function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
    function degreeName() { return state.profile.degree === "Other" ? (state.profile.degreeOther || "Other") : state.profile.degree; }
    function initials() {
        var words = String(state.profile.fullName || "Student").trim().split(/\s+/).filter(Boolean);
        return (words[0] || "S").charAt(0).toUpperCase() + (words.length > 1 ? words[words.length - 1].charAt(0).toUpperCase() : "");
    }
    function currentSkills() { return state.profile.skills || {}; }
    function levelOf(skill) { return currentSkills()[skill] || ""; }
    function levelValue(skill) { return ({ "Beginner": 0.43, "Intermediate": 0.76, "Advanced": 1 })[levelOf(skill)] || 0.08; }
    function meetsLevel(skill) { return levelOf(skill) === "Intermediate" || levelOf(skill) === "Advanced"; }

    function dnaSelected() {
        var out = [];
        questions.forEach(function (question) { (state.dna[question.id] || []).forEach(function (answer) { out.push(answer); }); });
        return out;
    }

    function roleDnaScore(role) {
        var selected = dnaSelected();
        if (!selected.length) return 50;
        var hits = selected.filter(function (answer) { return role.hints.indexOf(answer) >= 0; }).length;
        return clamp(Math.round(42 + hits / Math.max(1, Math.min(role.hints.length, selected.length)) * 58), 36, 100);
    }

    function roleInterestScore(role) {
        var selected = state.profile.interests || [];
        if (!selected.length) return 52;
        var hits = selected.filter(function (interest) { return role.interests.indexOf(interest) >= 0; }).length;
        return Math.round(40 + hits / selected.length * 60);
    }

    function roleSkillScore(role) {
        var total = role.requirements.reduce(function (sum, skill) { return sum + levelValue(skill); }, 0);
        return Math.round(total / role.requirements.length * 100);
    }

    function roleProjectScore(role) {
        var p = state.profile;
        if (!p.projectYes) return 38;
        var used = p.projectTech || [];
        var overlap = role.requirements.filter(function (skill) { return used.indexOf(skill) >= 0; }).length;
        return clamp(Math.round(35 + overlap / role.requirements.length * 42 + (p.projectName ? 12 : 0) + (p.dataset ? 11 : 0)), 35, 100);
    }

    function roleSpecializationScore(role) {
        var value = state.profile.specialization || "";
        if (!value) return 48;
        var normalized = value.toLowerCase();
        return role.specializations.some(function (item) { return normalized.indexOf(item.toLowerCase()) >= 0 || item.toLowerCase().indexOf(normalized) >= 0; }) ? 100 : 52;
    }

    function roleWorkScore(role) {
        var value = state.profile.workPreference || "";
        if (!value) return 58;
        return role.modes.indexOf(value) >= 0 ? 100 : 35;
    }

    function roleExperienceScore() {
        var p = state.profile;
        if (!p.experienceYes || p.experienceType === "None") return 42;
        return p.experienceRole && p.experienceOrg && p.experienceDetails ? 100 : 72;
    }

    function matchFor(role) {
        var skillScore = roleSkillScore(role);
        var interestScore = roleInterestScore(role);
        var rolePreference = (state.profile.roles || []).indexOf(role.name) >= 0 ? 100 : ((state.profile.roles || []).length ? 48 : 62);
        var dnaScore = roleDnaScore(role);
        var projectScore = roleProjectScore(role);
        var specializationScore = roleSpecializationScore(role);
        var workScore = roleWorkScore(role);
        var experienceScore = roleExperienceScore();
        var score = Math.round(skillScore * .39 + interestScore * .16 + rolePreference * .12 + dnaScore * .12 + projectScore * .11 + specializationScore * .04 + workScore * .03 + experienceScore * .03);
        var proficient = role.requirements.filter(function (skill) { return meetsLevel(skill); });
        var present = role.requirements.filter(function (skill) { return !!levelOf(skill); });
        var gaps = role.requirements.filter(function (skill) { return !meetsLevel(skill); });
        return { role: role, score: clamp(score, 16, 98), skillScore: skillScore, interestScore: interestScore, rolePreference: rolePreference, dnaScore: dnaScore, projectScore: projectScore, specializationScore: specializationScore, workScore: workScore, experienceScore: experienceScore, proficient: proficient, present: present, gaps: gaps };
    }

    function getMatches() {
        return roleData.map(matchFor).sort(function (a, b) { return b.score - a.score; });
    }

    function getTopMatches(count) { return getMatches().slice(0, count || 5); }

    function skillsInTopMatches() {
        var frequency = {};
        getTopMatches(5).forEach(function (match) {
            match.role.requirements.forEach(function (skill) { frequency[skill] = (frequency[skill] || 0) + 1; });
        });
        return frequency;
    }

    function getSkillGaps() {
        var frequency = skillsInTopMatches();
        return skills.filter(function (skill) { return (frequency[skill] || 0) > 0 && !meetsLevel(skill); }).map(function (skill) {
            var level = levelOf(skill);
            return { skill: skill, count: frequency[skill] || 0, level: level || "Not selected", impact: (frequency[skill] || 0) * 14 + (level ? 9 : 16) - (state.journeyProgress[skill] || 0) * 2 };
        }).sort(function (a, b) { return b.impact - a.impact; });
    }

    function journeySkills() {
        var frequency = skillsInTopMatches();
        return skills.filter(function (skill) { return frequency[skill] > 0; }).map(function (skill) {
            return { skill: skill, count: frequency[skill], level: levelOf(skill), impact: frequency[skill] * 12 + (levelOf(skill) ? 0 : 8) + (levelOf(skill) === "Beginner" ? 5 : 0) };
        }).sort(function (a, b) { return b.impact - a.impact; });
    }

    function getFocusSkill() {
        var options = journeySkills();
        if (state.focusManual && state.focusSkill && options.some(function (option) { return option.skill === state.focusSkill; })) return state.focusSkill;
        var gaps = getSkillGaps();
        state.focusSkill = gaps.length ? gaps[0].skill : (options[0] ? options[0].skill : "Python");
        return state.focusSkill;
    }

    function dnaValues() {
        var totals = { "Analytical": 0, "Modeling": 0, "Applied": 0, "Creative": 0, "Systems": 0 };
        dnaSelected().forEach(function (answer) {
            var traits = optionTraits[answer] || [];
            for (var i = 0; i < traits.length; i += 2) totals[traits[i]] += traits[i + 1];
        });
        return Object.keys(totals).map(function (label) { return { label: label, value: totals[label] ? clamp(34 + totals[label] * 15, 38, 96) : (dnaSelected().length ? 22 : 16) }; });
    }

    function dnaProfile() {
        var values = dnaValues().sort(function (a, b) { return b.value - a.value; });
        var names = {
            "Analytical": "Pattern Finder", "Modeling": "Model Builder", "Applied": "Impact Solver", "Creative": "Data Storyteller", "Systems": "Systems Thinker"
        };
        return { title: values[0] && dnaSelected().length ? names[values[0].label] : "Still taking shape", top: values.slice(0, 2).map(function (item) { return item.label; }).join(" + "), values: dnaValues() };
    }

    function profileStrength() {
        var p = state.profile;
        var score = 0;
        function textQuality(value, ideal) { return clamp(String(value || "").trim().length / ideal, 0, 1); }
        var skillEntries = Object.keys(p.skills || {}).map(function (skill) { return levelValue(skill); });
        score += textQuality(p.fullName, 16) * 5;
        score += textQuality(p.college, 26) * 5;
        score += p.degree === "Other" ? textQuality(p.degreeOther, 18) * 4 : (p.degree ? 4 : 0);
        score += p.specialization ? 4 : 0;
        score += p.year ? 4 : 0;
        score += clamp(Object.keys(p.skills || {}).length / 8, 0, 1) * 22;
        score += skillEntries.length ? skillEntries.reduce(function (sum, value) { return sum + value; }, 0) / skillEntries.length * 10 : 0;
        score += clamp((p.interests || []).length / 3, 0, 1) * 8;
        score += clamp((p.roles || []).length / 3, 0, 1) * 8;
        score += p.projectYes ? textQuality(p.projectName, 28) * 5 + clamp((p.projectTech || []).length / 3, 0, 1) * 7 + textQuality(p.dataset, 28) * 3 : 2;
        score += p.experienceYes ? textQuality(p.experienceRole, 20) * 2 + textQuality(p.experienceOrg, 24) * 2 + textQuality(p.experienceDetails, 45) * 2 : 3;
        score += p.workPreference ? 3 : 0;
        score += p.achievements ? clamp(String(p.achievements).length / 80, 0, 1) * 2 : 0;
        score += p.email ? 1 : 0;
        score += p.phone ? 1 : 0;
        return clamp(Math.round(score), 0, 100);
    }

    function resumeStrength() {
        var contact = (state.profile.fullName ? 1 : 0) + (state.profile.email ? 1 : 0) + (state.profile.phone ? 1 : 0);
        var education = (state.profile.degree ? 1 : 0) + (state.profile.specialization ? 1 : 0) + (state.profile.college ? 1 : 0) + (state.profile.year ? 1 : 0);
        var content = (Object.keys(state.profile.skills || {}).length ? 1 : 0) + (state.profile.projectYes && state.profile.projectName ? 1 : 0) + (state.profile.experienceYes && state.profile.experienceRole ? 1 : 0) + (state.profile.achievements ? 1 : 0);
        var edited = Object.keys(state.resumeEdits || {}).filter(function (key) { return String(state.resumeEdits[key] || "").trim().length > 4; }).length;
        var customization = clamp(edited / 8, 0, 1) * 8 + (state.resumeCustomSections || []).length * 2 - (state.resumeHiddenSections || []).length;
        return clamp(Math.round(contact / 3 * 25 + education / 4 * 25 + content / 4 * 35 + profileStrength() * .15 + customization), 0, 100);
    }

    function recommendationScore() {
        var matches = getTopMatches(3);
        return matches.length ? Math.round(matches.reduce(function (sum, match) { return sum + match.score; }, 0) / matches.length) : 0;
    }

    function skillsScore() {
        var matches = getTopMatches(5);
        if (!matches.length) return 0;
        var required = {};
        matches.forEach(function (match) { match.role.requirements.forEach(function (skill) { required[skill] = true; }); });
        var names = Object.keys(required);
        if (!names.length) return 0;
        return Math.round(names.reduce(function (sum, skill) { return sum + levelValue(skill); }, 0) / names.length * 100);
    }

    function roleFitScore() {
        var matches = getMatches();
        var preferred = state.profile.roles || [];
        var subset = preferred.length ? matches.filter(function (match) { return preferred.indexOf(match.role.name) >= 0; }) : matches.slice(0, 3);
        if (!subset.length) subset = matches.slice(0, 3);
        return Math.round(subset.reduce(function (sum, match) { return sum + match.score; }, 0) / subset.length);
    }

    function dnaScore() {
        var count = dnaSelected().length;
        return count ? clamp(Math.round(34 + count / 8 * 66), 34, 100) : 42;
    }

    function readiness() {
        return clamp(Math.round(skillsScore() * .4 + profileStrength() * .3 + roleFitScore() * .2 + dnaScore() * .1), 0, 100);
    }

    function coverageByCategory() {
        var groups = [
            { label: "Coding", names: ["Python", "SQL"] },
            { label: "Data", names: ["Excel", "Pandas", "NumPy"] },
            { label: "Statistics", names: ["Statistics"] },
            { label: "ML / NLP", names: ["Machine Learning", "NLP"] },
            { label: "BI", names: ["Power BI", "Tableau"] },
            { label: "Visuals", names: ["Data Visualization"] }
        ];
        return groups.map(function (group) {
            var values = group.names.map(function (skill) { return levelValue(skill); });
            return { label: group.label, value: Math.round(values.reduce(function (sum, value) { return sum + value; }, 0) / values.length * 100) };
        });
    }

    function getProfileMissing() {
        var p = state.profile;
        var items = [];
        if (!p.fullName) items.push("Add your name");
        if (!p.college) items.push("Add your college or university");
        if (!p.degree || (p.degree === "Other" && !p.degreeOther) || !p.specialization || !p.year) items.push("Complete degree, specialization, and year");
        if (!(p.roles || []).length) items.push("Choose a target role");
        if (!(p.interests || []).length) items.push("Choose at least one interest");
        if (Object.keys(p.skills || {}).length < 3) items.push("Add skills and set their levels");
        getSkillGaps().slice(0, 2).forEach(function (gap) { items.push(gap.skill + " · " + gap.level + " level"); });
        if (p.projectYes && (!p.projectName || !(p.projectTech || []).length || !p.dataset)) items.push("Complete your project details");
        if (p.experienceYes && (!p.experienceRole || !p.experienceOrg)) items.push("Add your role and organization");
        if (!p.workPreference) items.push("Choose a preferred work style");
        return items.slice(0, 5).map(function (text) { return { text: text, done: false }; });
    }

    function profileRadar() {
        return radarSvg(coverageByCategory(), "profile-radar");
    }

    function radarSvg(data, id) {
        var cx = 160, cy = 132, radius = 86, count = data.length;
        function point(index, value) {
            var angle = (Math.PI * 2 * index / count) - Math.PI / 2;
            var r = radius * value / 100;
            return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
        }
        var grids = [25, 50, 75, 100].map(function (level) {
            var points = data.map(function (_, i) { var p = point(i, level); return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
            return "<polygon class='radar-grid' points='" + points + "'></polygon>";
        }).join("");
        var axes = data.map(function (item, i) {
            var p = point(i, 100), label = point(i, 119);
            var anchor = label.x < cx - 9 ? "end" : (label.x > cx + 9 ? "start" : "middle");
            return "<line class='radar-axis' x1='" + cx + "' y1='" + cy + "' x2='" + p.x.toFixed(1) + "' y2='" + p.y.toFixed(1) + "'></line><text class='radar-label' text-anchor='" + anchor + "' x='" + label.x.toFixed(1) + "' y='" + (label.y + 3).toFixed(1) + "'>" + esc(item.label) + "</text>";
        }).join("");
        var polygon = data.map(function (item, i) { var p = point(i, item.value); return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
        var dots = data.map(function (item, i) { var p = point(i, item.value); return "<circle class='radar-dot' cx='" + p.x.toFixed(1) + "' cy='" + p.y.toFixed(1) + "' r='3.4'><title>" + esc(item.label) + " " + item.value + "%</title></circle>"; }).join("");
        return "<svg class='radar-svg' id='" + id + "' viewBox='0 0 320 270' role='img' aria-label='Interactive profile coverage radar chart'>" + grids + axes + "<polygon class='radar-shape' points='" + polygon + "'></polygon>" + dots + "</svg>";
    }

    function metricValues() {
        return { ready: readiness(), skills: skillsScore(), profile: profileStrength(), role: roleFitScore(), recommendations: recommendationScore(), resume: resumeStrength(), dna: dnaScore() };
    }

    function arcPath(cx, cy, r, startDegrees, endDegrees) {
        var start = (startDegrees - 90) * Math.PI / 180;
        var end = (endDegrees - 90) * Math.PI / 180;
        var x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
        var x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
        var large = endDegrees - startDegrees > 180 ? 1 : 0;
        return "M " + x1.toFixed(2) + " " + y1.toFixed(2) + " A " + r + " " + r + " 0 " + large + " 1 " + x2.toFixed(2) + " " + y2.toFixed(2);
    }

    function skillRoleCount(skill) { return skillsInTopMatches()[skill] || 0; }
    function roleByName(name) { return roleData.find(function (role) { return role.name === name; }) || roleData[0]; }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
    }

    function render() {
        var oldView = render.lastView;
        var keepScroll = oldView === state.view ? window.scrollY : 0;
        var active = document.activeElement;
        var restoreFocus = null;
        if (active && app.contains(active)) {
            if (active.matches("[data-skill-level]")) restoreFocus = { type: "skill-level", value: active.getAttribute("data-skill-level") };
            else if (active.matches("[data-profile]")) restoreFocus = { type: "profile", value: active.getAttribute("data-profile"), start: active.selectionStart, end: active.selectionEnd };
            else if (active.id) restoreFocus = { type: "id", value: active.id };
            else if (active.matches("[data-action]")) restoreFocus = { type: "action", attrs: ["data-action", "data-role", "data-skill", "data-interest", "data-question", "data-option", "data-value", "data-degree", "data-year", "data-index", "data-metric", "data-template"].map(function (name) { return [name, active.getAttribute(name)]; }) };
        }
        var html = "";
        if (state.view === "profile") html = renderProfileUpdated();
        else if (state.view === "dna") html = renderDna();
        else if (state.view === "recommendations") html = renderRecommendationsUpdated();
        else if (state.view === "resume") html = renderResumeUpdated();
        else if (state.view === "progress") html = renderProgressUpdated();
        else html = renderDashboard();
        app.innerHTML = html;
        render.lastView = state.view;
        document.querySelectorAll(".nav-link").forEach(function (button) { button.classList.toggle("active", button.getAttribute("data-view") === state.view); });
        var avatar = document.querySelector(".avatar-button");
        if (avatar) avatar.textContent = initials();
        var sampleBadge = document.querySelector(".sample-badge");
        if (sampleBadge) sampleBadge.remove();
        if (state.view === "resume") decorateResumeEditor();
        if (state.view === "recommendations") animateMatchScore();
        persist();
        if (oldView === state.view) {
            window.scrollTo(0, keepScroll);
            if (restoreFocus) {
                var target = restoreFocus.type === "skill-level" ? app.querySelector("[data-skill-level='" + restoreFocus.value + "']") : restoreFocus.type === "profile" ? app.querySelector("[data-profile='" + restoreFocus.value + "']") : restoreFocus.type === "action" ? Array.from(app.querySelectorAll("[data-action]")).find(function (item) { return restoreFocus.attrs.every(function (pair) { return item.getAttribute(pair[0]) === pair[1]; }); }) : document.getElementById(restoreFocus.value);
                if (target) {
                    target.focus({ preventScroll: true });
                    if (restoreFocus.type === "profile" && typeof target.setSelectionRange === "function" && restoreFocus.start != null) target.setSelectionRange(restoreFocus.start, restoreFocus.end);
                }
            }
        }
        if (app.animate) app.animate([{ opacity: .86, transform: "translateY(2px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 240, easing: "ease-out" });
    }

    function pageHeading(kicker, title, subtitle, action) {
        return "<div class='page-heading'><div><span class='eyebrow'>" + esc(kicker) + "</span><h1>" + esc(title) + "</h1><p>" + esc(subtitle) + "</p></div>" + (action || "") + "</div>";
    }

    function renderDashboard() {
        var metrics = metricValues();
        var p = state.profile;
        var focus = getSkillGaps()[0];
        var firstName = p.fullName ? p.fullName.trim().split(/\s+/)[0] : "you";
        var coverage = coverageByCategory();
        var coverageBars = coverage.slice(0, 4).map(function (item) { return "<div class='coverage-mini-row'><span>" + esc(item.label) + "</span><div><i style='width:" + item.value + "%'></i></div><b>" + item.value + "%</b></div>"; }).join("");
        return "<div class='page-wrap'>" +
            "<section class='dashboard-hero'><div class='hero-copy'><span class='eyebrow'>YOUR NEXT MOVE, MADE PERSONAL</span><h1>Build a path<br>that fits " + esc(firstName) + ".</h1><p>Your skills, interests, and internship matches work together to shape what comes next.</p><div class='hero-actions'><button class='btn' data-action='navigate' data-view='progress'>Continue your journey <span>→</span></button><span class='hero-note'>A little progress changes the whole picture.</span></div></div>" + renderDashboardRing(metrics) + "</section>" +
            "<div class='dashboard-insight-line'><span class='spark'>✦</span><span><em>AI noticed:</em> " + (focus ? "<strong>" + esc(focus.skill) + "</strong> is your highest-impact next step. It appears in " + focus.count + " of your current matches." : "your current profile is aligned with your preferred internship roles.") + "</span><button class='text-button' data-action='why-insight'>See why →</button></div>" +
            "<div class='dashboard-orbit-row'>" + renderRoleOrbit() + "<section class='surface skill-map-card'><div class='section-title'><div><span class='section-kicker'>SKILL INTELLIGENCE</span><h2>Your skill map</h2><p>Brighter skills matter more across the matches you fit.</p></div></div>" + renderSkillMap() + "</section></div>" +
            "<div class='dashboard-metrics-row'>" + dashboardMetric("PROFILE", metrics.profile, "Profile strength", "data-action='navigate' data-view='profile'", "◌") + dashboardMetric("RESUME", metrics.resume, "Resume readiness", "data-action='navigate' data-view='resume'", "▱") + dashboardMetric("RECOMMENDATIONS", metrics.recommendations, "Top role match", "data-action='navigate' data-view='recommendations'", "↗") + dashboardMetric("SKILL", metrics.skills, "Skills coverage", "data-action='navigate' data-view='profile'", "⌁") + "</div>" +
            "<div class='dashboard-focus-row'><section class='dashboard-priority'><span class='eyebrow'>✦ A MOMENT THAT MATTERS</span><h2>" + (focus ? esc(focus.skill) + " is your highest-impact next step." : "Your strongest signals are working together.") + "</h2><p>" + (focus ? esc(focus.skill + " is required by " + focus.count + " of your current top matches. Build it now to open more opportunities.") : "Keep adding skills and interests to make your pathway even more personal.") + "</p><button class='btn btn-peach' data-action='open-focus' data-skill='" + esc(focus ? focus.skill : getFocusSkill()) + "'>Explore this insight <span>→</span></button></section><section class='surface matches-coverage-card'><div><span class='section-kicker'>SKILL INTELLIGENCE</span><h2>Coverage across your matches</h2><p>How your current skill levels meet the needs of your top roles.</p></div><div class='matches-coverage-layout'><div class='coverage-donut' style='--coverage:" + metrics.skills + "'><div><strong>" + metrics.skills + "%</strong><span>covered</span></div></div><div class='coverage-mini-bars'>" + coverageBars + "</div></div></section></div>" +
            "<div class='footer-note'>AI Based Adaptive Internship System · Scores and recommendations are calculated from the profile on this device.</div></div>";
    }

    function dashboardMetric(label, value, description, action, icon) {
        return "<button class='dashboard-metric-card' " + action + "><span class='metric-icon' aria-hidden='true'>" + icon + "</span><span class='micro-label'>" + label + "</span><strong>" + value + "%</strong><span class='metric-description'>" + esc(description) + "</span></button>";
    }

    function renderDashboardRing(metrics) {
        var names = { ready: "Ready", profile: "Profile", role: "Role fit" };
        var keys = ["ready", "profile", "role"];
        var current = keys.indexOf(state.ringMetric) >= 0 ? state.ringMetric : "ready";
        var value = metrics[current] || 0;
        var paths = keys.map(function (key, index) {
            var start = index * 120 + 12;
            var span = 96;
            var amount = span * clamp(Number(metrics[key] || 0), 0, 100) / 100;
            return "<g class='hero-ring-group " + (current === key ? "selected" : "") + "' data-action='ring-metric' data-metric='" + key + "' role='button' tabindex='0' aria-label='Show " + names[key] + " score'><path class='hero-ring-base' d='" + arcPath(82, 82, 66, start, start + span) + "'></path><path class='hero-ring-segment " + key + "' d='" + arcPath(82, 82, 66, start, start + amount) + "'></path><path class='ring-hit' d='" + arcPath(82, 82, 66, start, start + span) + "'></path></g>";
        }).join("");
        var tabs = keys.map(function (key) { return "<button class='hero-ring-tab " + (current === key ? "active" : "") + "' data-action='ring-metric' data-metric='" + key + "'>" + names[key] + "</button>"; }).join("");
        return "<div class='hero-readiness'><span class='hero-ring-label'>LIVE PROFILE SIGNAL</span><div class='hero-ring-wrap'><svg viewBox='0 0 164 164' role='img' aria-label='Interactive readiness ring with Ready, Profile, and Role fit scores'>" + paths + "</svg><div class='hero-ring-center'><strong>" + value + "%</strong><span>" + esc(names[current]) + "</span></div></div><div class='hero-ring-tabs'>" + tabs + "</div></div>";
    }

    function renderReadinessRing(metrics) {
        var names = { ready: "Internship ready", skills: "Skills", profile: "Profile", role: "Role fit", dna: "Internship DNA" };
        var descriptions = { ready: "A combined view of skills, profile strength, role fit, and Internship DNA.", skills: "Your coverage across skills that show up in the internships you match.", profile: "How much of your internship profile is filled in and ready to share.", role: "Your current fit across the roles you selected or match most strongly.", dna: "How much signal your optional Internship DNA choices provide." };
        var current = state.ringMetric || "ready";
        var score = metrics[current] || 0;
        var circumference = 2 * Math.PI * 73;
        var offsets = { ready: 0, skills: 90, profile: 180, role: 270, dna: 315 };
        var hitTargets = ["ready", "skills", "profile", "role", "dna"].map(function (metric, index) {
            return "<path class='ring-hit' d='" + arcPath(95, 95, 73, index * 72 + 3, (index + 1) * 72 - 3) + "' data-action='ring-metric' data-metric='" + metric + "' aria-label='Show " + names[metric] + "'></path>";
        }).join("");
        var buttons = ["ready", "skills", "profile", "role", "dna"].map(function (metric) {
            return "<button class='" + (current === metric ? "active" : "") + "' data-action='ring-metric' data-metric='" + metric + "'>" + names[metric] + "</button>";
        }).join("");
        return "<div class='readiness-content'><div class='readiness-ring-wrap'><svg class='readiness-ring' viewBox='0 0 190 190' role='img' aria-label='Interactive readiness ring'><circle class='ring-orbit' cx='95' cy='95' r='88'></circle><circle class='ring-track' cx='95' cy='95' r='73'></circle><circle class='ring-progress' cx='95' cy='95' r='73' stroke-dasharray='" + circumference.toFixed(1) + "' stroke-dashoffset='" + (circumference * (1 - score / 100)).toFixed(1) + "' style='transform:rotate(-90deg);transform-origin:95px 95px;stroke:" + (current === "ready" ? "#d89a7a" : "#5a4a45") + "'></circle>" + hitTargets + "</svg><div class='ring-center'><strong>" + score + "%</strong><span>" + esc(names[current]) + "</span></div></div><div class='ring-copy'><span class='micro-label'>" + esc(names[current]) + " signal</span><h3>See the whole picture</h3><p>" + esc(descriptions[current]) + "</p><div class='ring-legend'>" + buttons + "</div></div></div>";
    }

    function renderRoleOrbit() {
        var matches = getMatches();
        var selected = state.selectedRole || (matches[0] && matches[0].role.name);
        var chosen = matches.find(function (match) { return match.role.name === selected; }) || matches[0];
        var positions = [
            { x: 50, y: 7 }, { x: 81, y: 25 }, { x: 82, y: 68 }, { x: 50, y: 94 }, { x: 18, y: 68 }, { x: 19, y: 25 }
        ];
        var nodes = roleData.map(function (role, index) {
            var match = matches.find(function (item) { return item.role.name === role.name; });
            var pos = positions[index];
            var isTopMatch = matches[0] && matches[0].role.name === role.name;
            return "<button class='orbit-node " + (selected === role.name ? "active " : "") + (isTopMatch ? "best-match" : "") + "' style='left:" + pos.x + "%;top:" + pos.y + "%' data-action='select-orbit-role' data-role='" + esc(role.name) + "' title='" + esc(role.name) + " · " + match.score + "% match'>" + esc(role.short) + "</button>";
        }).join("");
        return "<section class='surface role-orbit-card'><div class='section-title'><div><span class='section-kicker'>ROLE ORBIT</span><h2>Opportunities around you</h2><p>Select a role to inspect your current fit.</p></div></div><div class='orbit-layout'><div class='orbit-stage'><div class='orbit-ring'></div><div class='orbit-center'><div><strong>YOU</strong><span>" + esc(initials()) + "</span></div></div>" + nodes + "</div><div class='orbit-detail'><span class='micro-label'>CURRENT ROLE FIT</span><h3>" + esc(chosen.role.short) + "</h3><div class='orbit-score'>" + chosen.score + "% match</div><p>" + esc(chosen.role.requirements.filter(function (skill) { return meetsLevel(skill); }).slice(0, 4).join(" · ") || "Add role skills to build your fit") + "</p><button class='text-button' data-action='open-role' data-role='" + esc(chosen.role.name) + "'>Explore match →</button></div></div></section>";
    }

    function renderSkillMap() {
        var nodes = [
            { name: "Python", x: 49, y: 10 }, { name: "Machine Learning", x: 79, y: 25 }, { name: "Power BI", x: 87, y: 52 }, { name: "Statistics", x: 70, y: 84 },
            { name: "Excel", x: 29, y: 84 }, { name: "SQL", x: 13, y: 52 }, { name: "Data Visualization", x: 22, y: 27 }, { name: "NLP", x: 50, y: 96 },
            { name: "Pandas", x: 69, y: 13 }, { name: "NumPy", x: 11, y: 73 }
        ];
        var matches = getTopMatches(5);
        var prioritySkill = getSkillGaps()[0] && getSkillGaps()[0].skill;
        var html = nodes.map(function (node) {
            var weight = skillRoleCount(node.name) * .12 + levelValue(node.name) * .48;
            var status = !levelOf(node.name) || levelOf(node.name) === "Beginner" ? " weak" : "";
            var priority = prioritySkill === node.name;
            return "<button class='skill-node" + status + " " + (state.selectedSkill === node.name ? "active " : "") + (priority ? "priority-node" : "") + "' style='--x:" + node.x + "%;--y:" + node.y + "%;--weight:" + clamp(weight, .12, 1).toFixed(2) + "' data-action='select-skill-map' data-skill='" + esc(node.name) + "'>" + esc(node.name) + "</button>";
        }).join("");
        var selected = state.selectedSkill || "SQL";
        var count = skillRoleCount(selected);
        var priority = getSkillGaps().some(function (gap) { return gap.skill === selected; });
        var detail = "Required by " + count + " of your " + matches.length + " matched roles. " + (priority ? "It is a priority skill gap at " + (levelOf(selected) || "not selected") + " level." : "Your " + (levelOf(selected) || "unrated") + " level is contributing to your match scores.");
        return "<div class='skill-map-layout'><div class='skill-map'><div class='map-center'><strong>YOU</strong><small>SKILL MAP</small></div>" + html + "</div><div class='map-detail'><span class='micro-label'>SELECTED SKILL</span><h3>" + esc(selected) + "</h3><p>" + esc(detail) + "</p><button class='btn btn-small' data-action='open-focus' data-skill='" + esc(selected) + "'>Open journey →</button></div></div>";
    }

    function skillGroupMarkup(title, list) {
        return "<div class='skill-category'>" + esc(title) + "</div><div class='skill-grid'>" + list.map(function (skill) {
            var selected = !!levelOf(skill);
            var levelSelect = selected ? "<label class='level-select'><select data-skill-level='" + esc(skill) + "' aria-label='" + esc(skill) + " level'>" + ["Beginner", "Intermediate", "Advanced"].map(function (level) { return "<option value='" + level + "' " + (levelOf(skill) === level ? "selected" : "") + ">" + level + "</option>"; }).join("") + "</select></label>" : "";
            return "<div class='skill-tile " + (selected ? "selected" : "") + "'><button class='skill-toggle' data-action='toggle-skill' data-skill='" + esc(skill) + "'><span class='skill-check'>✓</span><span>" + esc(skill) + "</span></button>" + levelSelect + "</div>";
        }).join("") + "</div>";
    }

    function renderProfile() {
        var p = state.profile;
        var missing = getProfileMissing();
        var complete = missing.filter(function (item) { return item.done; });
        var interests = interestCards.map(function (item) {
            var active = (p.interests || []).indexOf(item.name) >= 0;
            return "<button class='choice-card problem-choice " + (active ? "active" : "") + "' data-action='toggle-interest' data-interest='" + esc(item.name) + "'><strong>" + esc(item.title) + "</strong><span>" + esc(item.subtitle) + "</span></button>";
        }).join("");
        var roles = roleData.map(function (item) {
            var active = (p.roles || []).indexOf(item.name) >= 0;
            return "<button class='choice-card role-choice " + (active ? "active" : "") + "' data-action='toggle-role' data-role='" + esc(item.name) + "'>" + esc(item.name) + "</button>";
        }).join("");
        var technologies = ["Python", "SQL", "NumPy", "Pandas", "Machine Learning", "Power BI", "Tableau", "Excel", "NLP"];
        var projectTech = technologies.map(function (technology) { return "<button class='tech-chip " + ((p.projectTech || []).indexOf(technology) >= 0 ? "active" : "") + "' data-action='toggle-tech' data-tech='" + esc(technology) + "'>" + esc(technology) + "</button>"; }).join("");
        var projectBlock = p.projectYes ? "<div class='project-fields'><div class='field-grid'><div class='field'><label for='projectName'>Project name</label><input id='projectName' data-profile='projectName' value='" + esc(p.projectName) + "' placeholder='e.g. Student performance explorer'></div><div class='field'><label for='dataset'>Dataset used</label><input id='dataset' data-profile='dataset' value='" + esc(p.dataset) + "' placeholder='Dataset name or source'></div><div class='field full'><span class='field-label'>Choose technologies</span><div class='tech-chips'>" + projectTech + "</div></div></div></div>" : "<p class='micro' style='margin:11px 0 0'>No project yet is okay. Add one later to show how you have applied your skills.</p>";
        var experienceBlock = p.experienceYes ? "<div class='project-fields'><div class='field-grid'><div class='field'><label for='experienceRole'>Role or activity</label><input id='experienceRole' data-profile='experienceRole' value='" + esc(p.experienceRole) + "' placeholder='e.g. Data volunteer'></div><div class='field'><label for='experienceOrg'>Organization</label><input id='experienceOrg' data-profile='experienceOrg' value='" + esc(p.experienceOrg) + "' placeholder='Company, campus group, or client'></div><div class='field full'><label for='experienceDetails'>What did you work on?</label><input id='experienceDetails' data-profile='experienceDetails' value='" + esc(p.experienceDetails) + "' placeholder='A short result or responsibility'></div></div></div>" : "<p class='micro' style='margin:11px 0 0'>No experience yet? Your class, volunteer, or personal projects can still show practical work.</p>";
        return "<div class='page-wrap'>" + pageHeading("STUDENT PROFILE · BUILD YOUR SIGNAL", "A profile that grows with you", "Choose your skills, interests, and goals. This profile powers every score, recommendation, roadmap, and resume in Pathway.", "<span class='pill'><i class='pill-dot'></i>Changes recalculate the system</span>") +
            "<div class='profile-layout'><div class='profile-main'>" +
            "<section class='surface section-card'><div class='section-title'><div><span class='section-kicker'>01 · YOUR DETAILS</span><h2>What should we call you?</h2><p>A few basics help your profile and resume feel like yours.</p></div></div><div class='field-grid'><div class='field'><label for='fullName'>Your name</label><input id='fullName' data-profile='fullName' value='" + esc(p.fullName) + "' placeholder='Your name'></div><div class='field'><label for='college'>Where do you study?</label><input id='college' data-profile='college' value='" + esc(p.college) + "' placeholder='College or university'></div><div class='field full'><span class='field-label'>Course or degree</span><div class='choice-row'>" + ["BSc", "BTech", "BA", "Other"].map(function (degree) { return "<button class='choice-card " + (p.degree === degree ? "active" : "") + "' data-action='choose-degree' data-degree='" + degree + "'>" + degree + "</button>"; }).join("") + "</div>" + (p.degree === "Other" ? "<input style='margin-top:9px' data-profile='degreeOther' value='" + esc(p.degreeOther) + "' placeholder='Type your course or degree'>" : "") + "</div><div class='field full'><span class='field-label'>Current year</span><div class='choice-row'>" + ["1st", "2nd", "3rd", "4th"].map(function (year) { return "<button class='choice-card " + (p.year === year ? "active" : "") + "' data-action='choose-year' data-year='" + year + "'>" + year + " year</button>"; }).join("") + "</div></div><div class='field'><label for='email'>Email <span class='muted'>(optional)</span></label><input id='email' data-profile='email' value='" + esc(p.email) + "' placeholder='you@example.edu'></div><div class='field'><label for='phone'>Phone <span class='muted'>(optional)</span></label><input id='phone' data-profile='phone' value='" + esc(p.phone) + "' placeholder='+91 98765 43210'></div></div></section>" +
            "<section class='surface section-card'><div class='section-title'><div><span class='section-kicker'>02 · YOUR CURIOSITY</span><h2>What kind of problems pull you in?</h2><p>Choose everything that sounds like you.</p></div><span class='pill'>Select any</span></div><div class='choice-row'>" + interests + "</div></section>" +
            "<section class='surface section-card'><div class='section-title'><div><span class='section-kicker'>03 · YOUR SKILLS</span><h2>What can you work with?</h2><p>Select a tile, then set a level. Your skill levels change role fit and roadmap priorities.</p></div><span class='pill'>" + Object.keys(p.skills || {}).length + " selected</span></div>" + skillGroupMarkup("Core and analysis", ["Python", "SQL", "Statistics", "Excel", "Data Visualization"]) + skillGroupMarkup("Platforms and methods", ["Machine Learning", "Power BI", "Tableau", "NLP"]) + skillGroupMarkup("Python libraries", ["NumPy", "Pandas"]) + "</section>" +
            "<section class='surface section-card'><div class='section-title'><div><span class='section-kicker'>04 · LEARN BY DOING</span><h2>Have you built something with data?</h2><p>Keep typing minimal. Add one project and its dataset if you have one.</p></div></div><div class='yesno'><button class='choice-card " + (p.projectYes ? "active" : "") + "' data-action='project-state' data-value='yes'>Yes, add a project</button><button class='choice-card " + (!p.projectYes ? "active" : "") + "' data-action='project-state' data-value='no'>Not yet</button></div>" + projectBlock + "<div class='soft-rule'></div><div class='section-title'><div><h2>Any experience to add?</h2><p>Internships, campus work, volunteering, and freelance work all count.</p></div></div><div class='yesno'><button class='choice-card " + (p.experienceYes ? "active" : "") + "' data-action='experience-state' data-value='yes'>Yes</button><button class='choice-card " + (!p.experienceYes ? "active" : "") + "' data-action='experience-state' data-value='no'>Not yet</button></div>" + experienceBlock + "</section>" +
            "<section class='surface section-card'><div class='section-title'><div><span class='section-kicker'>05 · YOUR DIRECTION</span><h2>Where do you see yourself?</h2><p>Pick one or more roles. Your recommendation scores respond to your choices.</p></div></div><div class='choice-row'>" + roles + "</div></section>" +
            "<div style='display:flex;justify-content:flex-end'><button class='btn btn-peach' data-action='navigate' data-view='dna'>Continue to Internship DNA <span>→</span></button></div>" +
            "</div><aside class='profile-aside'><section class='profile-meter'><div class='meter-top'><span>Internship ready</span><strong>" + readiness() + "%</strong></div><div class='meter-track'><span style='width:" + readiness() + "%'></span></div><div class='meter-top profile-strength-row'><span>Profile strength</span><strong>" + profileStrength() + "%</strong></div><div class='meter-track strength-track'><span style='width:" + profileStrength() + "%'></span></div><p class='meter-caption'>Your profile data is taking shape. See the missing items below to strengthen your internship story.</p></section><section class='surface missing-card'><h3>What is missing?</h3><p>These are the next details that can strengthen your profile.</p><ul class='missing-list'>" + (missing.length ? missing.map(function (item) { return "<li class='" + (item.done ? "complete" : "") + "'>" + esc(item.text) + "</li>"; }).join("") : "<li class='complete'>Your core profile details are in place.</li>") + "</ul></section><section class='surface coverage-card'><div class='section-title'><div><h2>Skill coverage</h2><p>Current level by skill group</p></div></div>" + profileRadar() + "<div class='radar-legend'><span>Beginner · 43</span><span>Intermediate · 76</span><span>Advanced · 100</span></div></section></aside></div><div class='footer-note'>Profile changes are saved in this browser and update all modules immediately.</div></div>";
    }

    function renderProfileUpdated() {
        var p = state.profile;
        var missing = getProfileMissing();
        var degreeChoices = ["BSc", "BTech", "BA", "Other"].map(function (degree) { return "<button class='choice-card " + (p.degree === degree ? "active" : "") + "' data-action='choose-degree' data-degree='" + degree + "'>" + degree + "</button>"; }).join("");
        var interests = interestCards.map(function (item) {
            var active = (p.interests || []).indexOf(item.name) >= 0;
            return "<button class='choice-card problem-choice " + (active ? "active" : "") + "' data-action='toggle-interest' data-interest='" + esc(item.name) + "'><strong>" + esc(item.title) + "</strong><span>" + esc(item.subtitle) + "</span></button>";
        }).join("");
        var roles = roleData.map(function (item) {
            var active = (p.roles || []).indexOf(item.name) >= 0;
            return "<button class='choice-card role-choice " + (active ? "active" : "") + "' data-action='toggle-role' data-role='" + esc(item.name) + "'>" + esc(item.name) + "</button>";
        }).join("");
        var technologies = ["Python", "SQL", "NumPy", "Pandas", "Machine Learning", "Power BI", "Tableau", "Excel", "NLP"];
        var projectTech = technologies.map(function (item) { return "<button class='tech-chip " + ((p.projectTech || []).indexOf(item) >= 0 ? "active" : "") + "' data-action='toggle-tech' data-tech='" + esc(item) + "'>" + esc(item) + "</button>"; }).join("");
        var coverage = coverageByCategory().map(function (item) { return "<div class='profile-coverage-row'><div><span>" + esc(item.label) + "</span><b>" + item.value + "%</b></div><i><span style='width:" + item.value + "%'></span></i></div>"; }).join("");
        var project = p.projectYes ? "<div class='field-grid compact-fields'><div class='field'><label>Project name</label><input data-profile='projectName' value='" + esc(p.projectName) + "' placeholder='e.g. Campus sales dashboard'></div><div class='field'><label>Dataset used</label><input data-profile='dataset' value='" + esc(p.dataset) + "' placeholder='Dataset or source'></div><div class='field full'><span class='field-label'>Technologies used</span><div class='tech-chips'>" + projectTech + "</div></div></div>" : "<p class='choice-hint'>Your first data project can be a class assignment, personal analysis, or dashboard.</p>";
        var experience = p.experienceYes ? "<div class='field-grid compact-fields'><div class='field'><label>Role or activity</label><input data-profile='experienceRole' value='" + esc(p.experienceRole) + "' placeholder='e.g. Data volunteer'></div><div class='field'><label>Organization</label><input data-profile='experienceOrg' value='" + esc(p.experienceOrg) + "' placeholder='Company, club, or client'></div><div class='field full'><label>What did you work on?</label><input data-profile='experienceDetails' value='" + esc(p.experienceDetails) + "' placeholder='One short result or responsibility'></div></div>" : "<p class='choice-hint'>No experience yet is fine. Projects and coursework still count as practical work.</p>";
        var ready = readiness();
        var strength = profileStrength();
        return "<div class='page-wrap profile-page'>" + pageHeading("STUDENT PROFILE · WHO ARE YOU?", "Let’s shape your profile.", "Choose what feels right. You can skip details and come back any time.", "<span class='pill'><i class='pill-dot'></i>Every choice updates your pathway</span>") +
            "<div class='profile-layout profile-layout-new'><div class='profile-main profile-main-new'>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>01 · EDUCATION</span><h2>What should we call you?</h2><p>A few basics help make your profile and resume yours.</p></div></div><div class='field-grid'><div class='field'><label>Your name</label><input data-profile='fullName' value='" + esc(p.fullName) + "' placeholder='Your name'></div><div class='field'><label>Where do you study?</label><input data-profile='college' value='" + esc(p.college) + "' placeholder='College or university'></div><div class='field'><span class='field-label'>What are you studying?</span><input data-profile='specialization' value='" + esc(p.specialization) + "' placeholder='Specialization or major'></div><div class='field'><span class='field-label'>Degree</span><div class='choice-row compact-choice-row'>" + degreeChoices + "</div>" + (p.degree === "Other" ? "<input style='margin-top:7px' data-profile='degreeOther' value='" + esc(p.degreeOther) + "' placeholder='Name your degree'>" : "") + "</div><div class='field full'><span class='field-label'>Current year</span><div class='choice-row compact-choice-row'>" + ["1st", "2nd", "3rd", "4th"].map(function (year) { return "<button class='choice-card " + (p.year === year ? "active" : "") + "' data-action='choose-year' data-year='" + year + "'>" + year + " year</button>"; }).join("") + "</div></div></div><p class='one-line'>Your education gives each internship match a little more context.</p></section>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>02 · INTERESTS</span><h2>What kind of problems pull you in?</h2><p>Choose the questions you’d like to spend time on.</p></div><span class='pill'>Select any</span></div><div class='interest-grid'>" + interests + "</div><p class='one-line'>Your interests shape your DNA and help explain why a role fits.</p></section>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>03 · TECHNICAL SKILLS</span><h2>What can you work with?</h2><p>Tap a skill, then choose the level that feels honest today.</p></div><span class='pill'>" + Object.keys(p.skills || {}).length + " selected</span></div>" + skillGroupMarkup("Core and analysis", ["Python", "SQL", "Statistics", "Excel", "Data Visualization"]) + skillGroupMarkup("Platforms and methods", ["Machine Learning", "Power BI", "Tableau", "NLP"]) + skillGroupMarkup("Python libraries", ["NumPy", "Pandas"]) + "<p class='one-line'>Skill levels directly change your match scores and next learning step.</p></section>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>04 · PROJECTS</span><h2>Have you built something with data?</h2><p>One project is enough to start. Keep the details short.</p></div></div><div class='choice-row compact-choice-row'><button class='choice-card " + (p.projectYes ? "active" : "") + "' data-action='project-state' data-value='yes'>Yes, I have</button><button class='choice-card " + (!p.projectYes ? "active" : "") + "' data-action='project-state' data-value='no'>Not yet</button></div>" + project + "<p class='one-line'>A project helps show how you use skills on a real question.</p></section>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>05 · TARGET ROLES</span><h2>Where do you see yourself?</h2><p>Choose the roles you would like to explore.</p></div></div><div class='role-choice-grid'>" + roles + "</div><div class='subsection-label'>Where would you like to work?</div><div class='choice-row compact-choice-row'>" + ["Remote", "Hybrid", "On-site"].map(function (mode) { return "<button class='choice-card " + (p.workPreference === mode ? "active" : "") + "' data-action='choose-work' data-value='" + mode + "'>" + mode + "</button>"; }).join("") + "</div><p class='one-line'>Your target role and work style help sort opportunities that suit you.</p></section>" +
            "<section class='surface section-card profile-panel'><div class='section-title'><div><span class='section-kicker'>06 · EXPERIENCE & ACHIEVEMENTS</span><h2>A little more about you</h2><p>Coursework, clubs, volunteering, and awards all belong here.</p></div></div><div class='choice-row compact-choice-row'>" + ["Internship", "Freelance", "Campus / volunteer", "None yet"].map(function (kind) { return "<button class='choice-card " + (p.experienceType === kind ? "active" : "") + "' data-action='choose-experience-type' data-value='" + kind + "'>" + kind + "</button>"; }).join("") + "</div>" + (p.experienceType && p.experienceType !== "None yet" ? experience : "<p class='choice-hint'>Choose a type above if you have experience to add.</p>") + "<div class='field' style='margin-top:14px'><label>Achievements or certifications</label><input data-profile='achievements' value='" + esc(p.achievements) + "' placeholder='Optional · e.g. analytics course, award, club role'></div><p class='one-line'>Small details help your resume feel complete and personal.</p></section>" +
            "<div class='profile-continue-row'><span>Your details are saved as you go.</span><button class='btn btn-peach' data-action='navigate' data-view='dna'>Continue <span>→</span></button></div></div>" +
            "<aside class='profile-aside profile-aside-new'><section class='profile-meter'><span class='section-kicker'>YOUR PROFILE IS TAKING SHAPE</span><div class='profile-meter-heading'><strong id='profileStrengthValue'>" + strength + "%</strong><span>profile strength</span></div><div class='meter-track strength-track'><span id='profileStrengthBar' style='width:" + strength + "%'></span></div><p class='meter-caption'>Your details build a clearer picture as you make selections.</p><div class='readiness-mini'><span>Internship ready</span><strong id='profileReadinessValue'>" + ready + "%</strong></div><div class='meter-track'><span id='profileReadinessBar' style='width:" + ready + "%'></span></div><h3>What could strengthen it?</h3><ul class='missing-list'>" + (missing.length ? missing.map(function (item) { return "<li>" + esc(item.text) + "</li>"; }).join("") : "<li class='complete'>Your key details are in place.</li>") + "</ul></section><section class='surface coverage-card profile-coverage-card'><span class='section-kicker'>SKILL COVERAGE</span><h2>Your skill mix</h2><p>Coverage across skills used by matched roles.</p>" + coverage + "</section><button class='btn btn-peach profile-side-continue' data-action='navigate' data-view='dna'>Continue <span>→</span></button></aside></div><div class='footer-note'>Profile changes are saved in this browser and recalculate the dashboard, Internship DNA, matches, resume readiness, and roadmap.</div></div>";
    }

    function renderDna() {
        var dna = dnaProfile();
        var questionMarkup = questions.map(function (question, index) {
            var open = state.dnaOpen === index;
            var choices = (state.dna[question.id] || []).map(function (item) { return "<button class='dna-option selected' data-action='toggle-dna-option' data-question='" + question.id + "' data-option='" + esc(item) + "'>" + esc(item) + " ✓</button>"; }).join("");
            var unselected = question.options.filter(function (option) { return (state.dna[question.id] || []).indexOf(option) < 0; }).map(function (item) { return "<button class='dna-option' data-action='toggle-dna-option' data-question='" + question.id + "' data-option='" + esc(item) + "'>" + esc(item) + "</button>"; }).join("");
            return "<section class='dna-accordion " + (open ? "open" : "") + "'><button class='accordion-trigger' data-action='toggle-accordion' data-index='" + index + "' aria-expanded='" + open + "'><span class='accordion-left'><span class='question-number'>0" + (index + 1) + "</span><span><strong>" + esc(question.title) + "</strong><small>" + esc(question.subtitle) + "</small></span></span><span class='accordion-chevron'>⌄</span></button><div class='accordion-panel'><div class='accordion-panel-inner'><div class='accordion-options'>" + choices + unselected + "</div><button class='dna-skip' data-action='skip-dna' data-question='" + question.id + "'>Skip this section</button></div></div></section>";
        }).join("");
        var radarData = dna.values;
        return "<div class='page-wrap dna-page'>" + pageHeading("THE WAY YOU THINK", "Find your Internship DNA.", "Open any prompt that feels interesting. Skip anything that doesn’t.", "") +
            "<div class='dna-layout'><div class='accordion-stack'>" + questionMarkup + "<button class='btn btn-peach dna-recommendations-link' data-action='navigate' data-view='recommendations'>See my recommendations <span>→</span></button></div><section class='surface radar-card dna-radar-card'><div class='section-title'><div><span class='section-kicker'>YOUR WORK-STYLE RADAR</span><h2>" + esc(dna.title || "Internship DNA") + "</h2></div></div>" + radarSvg(radarData, "dna-radar") + "</section></div></div>";
    }

    function recommendationReason(match) {
        var reqCount = match.role.requirements.length;
        var readyCount = match.proficient.length;
        var interest = match.role.interests.filter(function (item) { return (state.profile.interests || []).indexOf(item) >= 0; });
        var projectHits = match.role.requirements.filter(function (skill) { return (state.profile.projectTech || []).indexOf(skill) >= 0; });
        var sentence = "Your skill levels cover " + readyCount + " of " + reqCount + " core requirements";
        if (interest.length) sentence += ", and your " + interest.slice(0, 2).join(" + ") + " interest aligns with this path";
        if (projectHits.length) sentence += ". Your project uses " + projectHits.slice(0, 2).join(" and ");
        if (!interest.length && !projectHits.length) sentence += ". Add a matching interest or project to make the fit more personal";
        return sentence + ".";
    }

    function renderMatchCard(match, index) {
        var role = match.role;
        var featured = index === 0;
        var tone = index % 3 === 1 ? " tone-peach" : "";
        var isOpen = state.expandedRole === role.name;
        var isSaved = state.savedRoles.indexOf(role.name) >= 0;
        var chips = role.requirements.map(function (skill) {
            var ok = meetsLevel(skill);
            var exists = !!levelOf(skill);
            var label = (ok ? "✓ " : "⚠ ") + skill + (exists && !ok ? " · " + levelOf(skill) : "");
            return "<span class='skill-chip " + (ok ? "" : "gap") + "'>" + esc(label) + "</span>";
        }).join("");
        var expanded = isOpen ? "<div class='match-expanded'><strong>Why this match?</strong><p>" + esc(recommendationReason(match)) + " Your Internship DNA contributes " + match.dnaScore + "% alignment and your role preference is " + ((state.profile.roles || []).indexOf(role.name) >= 0 ? "selected" : "still open").toLowerCase() + ". The score recalculates when you edit any of those signals.</p><div class='soft-rule' style='margin:10px 0'></div><strong>Current skill coverage</strong><p>" + match.proficient.length + " of " + role.requirements.length + " skills are at intermediate level or above. Raise " + esc(match.gaps.join(", ") || "a skill of your choice") + " to strengthen this match.</p></div>" : "";
        return "<article class='match-card " + (featured ? "featured" : "") + tone + (isOpen ? " expanded" : "") + "'><div class='match-top'><div><span class='match-role-label'>" + esc(role.name.toUpperCase()) + "</span><h2>" + esc(role.short) + "</h2></div><div class='match-score'><strong>" + match.score + "%</strong><span>MATCH</span></div></div><p class='match-why'>Why you? " + esc(recommendationReason(match)) + "</p><div class='skill-chip-list'>" + chips + "</div>" + expanded + "<div class='match-actions'><div class='match-actions-left'><button class='text-button' data-action='expand-match' data-role='" + esc(role.name) + "'>" + (isOpen ? "Close details ↑" : "View match ↗") + "</button></div><button class='save-button " + (isSaved ? "saved" : "") + "' data-action='save-role' data-role='" + esc(role.name) + "' aria-label='" + (isSaved ? "Remove saved role" : "Save role") + "'>" + (isSaved ? "♥ Saved" : "♡ Save") + "</button></div></article>";
    }

    function renderRecommendations() {
        var all = getMatches();
        var filtered = state.recFilter === "All" ? all : all.filter(function (match) { return match.role.short === state.recFilter; });
        var top = all[0];
        var saved = state.savedRoles.length;
        var gaps = getSkillGaps().length;
        var cards = filtered.length ? filtered.map(renderMatchCard).join("") : "<div class='empty-state'>No internship matches this filter. Try All or update your preferred roles.</div>";
        var options = ["All"].concat(roleData.map(function (role) { return role.short; })).map(function (item) { return "<option value='" + esc(item) + "' " + (state.recFilter === item ? "selected" : "") + ">" + (item === "All" ? "All roles" : esc(item)) + "</option>"; }).join("");
        return "<div class='page-wrap'>" + pageHeading("INTERNSHIP RECOMMENDATION · MATCH DECK", "Find the roles that fit your signal", "Your match score responds to preferred roles, interests, skill levels, and Internship DNA. Open a card to see exactly why it fits and what can improve it.", "<span class='pill'><i class='pill-dot'></i>Live match scores</span>") +
            "<section class='recommendation-toolbar'><label class='filter-label'>Explore matches <select id='roleFilter'>" + options + "</select></label><div class='deck-controls'><button class='icon-button' data-action='deck-scroll' data-dir='-1' aria-label='Previous recommendation'>←</button><span class='deck-count' id='deckCount'>1 / " + filtered.length + "</span><button class='icon-button' data-action='deck-scroll' data-dir='1' aria-label='Next recommendation'>→</button></div></section><div class='match-deck' id='matchDeck'>" + cards + "</div>" +
            "<div class='rec-summary'><div class='summary-stat'><strong>" + (top ? top.score : 0) + "%</strong><span>Top current match</span></div><div class='summary-stat'><strong>" + gaps + "</strong><span>Priority skill gaps</span></div><div class='summary-stat'><strong>" + saved + "</strong><span>Saved roles</span></div></div><div class='footer-note'>Scores are illustrative decision-support signals, not hiring guarantees. Change a skill level in Student Profile to watch the deck reorder.</div></div>";
    }

    function renderRecommendationsUpdated() {
        var all = getMatches();
        var filtered = all.filter(function (match) {
            var roleOk = state.recFilter === "All" || match.role.short === state.recFilter;
            var modeOk = state.recModeFilter === "All" || match.role.modes.indexOf(state.recModeFilter) >= 0;
            return roleOk && modeOk;
        });
        var selectedIndex = clamp(Number(state.recIndex || 0), 0, Math.max(0, filtered.length - 1));
        var match = filtered[selectedIndex];
        var roleOptions = ["All"].concat(roleData.map(function (role) { return role.short; })).map(function (item) { return "<option value='" + esc(item) + "' " + (state.recFilter === item ? "selected" : "") + ">" + (item === "All" ? "All roles" : esc(item)) + "</option>"; }).join("");
        var modeOptions = ["All", "Remote", "Hybrid", "On-site"].map(function (item) { return "<option value='" + esc(item) + "' " + (state.recModeFilter === item ? "selected" : "") + ">" + (item === "All" ? "All work styles" : esc(item)) + "</option>"; }).join("");
        var card = "<div class='empty-state'>No role is available for these filters yet. Try another work style.</div>";
        if (match) {
            var role = match.role;
            var saved = state.savedRoles.indexOf(role.name) >= 0;
            var signals = role.requirements.map(function (skill) {
                var ready = meetsLevel(skill);
                return "<span class='match-signal " + (ready ? "ready" : "missing") + "'>" + (ready ? "✓ " : "⚠ ") + esc(skill) + (levelOf(skill) && !ready ? " · " + esc(levelOf(skill)) : "") + "</span>";
            }).join("");
            var gaps = match.gaps.length ? match.gaps.map(function (skill) { return "<span>" + esc(skill) + " →</span>"; }).join("") : "<span>Your listed skills meet this role’s core requirements.</span>";
            var expanded = state.expandedRole === role.name ? "<div class='match-expanded recommendation-expanded'><span class='section-kicker'>WHY THIS MATCH?</span><p>" + esc(recommendationReason(match)) + " Your profile contributes " + match.rolePreference + "% role preference, " + match.dnaScore + "% Internship DNA alignment, and " + match.projectScore + "% project signal. The score updates when your profile or answers change.</p><div class='match-factor-grid'><span>Skills <b>" + match.skillScore + "%</b></span><span>Interests <b>" + match.interestScore + "%</b></span><span>Role fit <b>" + match.rolePreference + "%</b></span><span>Internship DNA <b>" + match.dnaScore + "%</b></span></div><button class='text-button' data-action='open-focus' data-skill='" + esc(match.gaps[0] || role.requirements[0]) + "'>Improve the top skill gap →</button></div>" : "";
            card = "<article class='match-deck-card " + (filtered.length > 1 && selectedIndex === filtered.length - 1 ? "peach-card" : (selectedIndex === 0 ? "dark-card" : "light-card")) + "'><div class='match-deck-main'><span class='section-kicker'>PERSONALIZED INTERNSHIP MATCH</span><div class='match-deck-title'><h2>" + esc(role.name) + "</h2><div class='deck-score'><strong data-match-score='" + match.score + "'>0</strong><span>% match</span></div></div><span class='micro-label'>YOUR CURRENT SKILL SIGNALS</span><div class='match-signal-list'>" + signals + "</div><div class='deck-gap'><span class='micro-label'>GAP TO WORK ON</span><div>" + gaps + "</div></div><div class='match-why-box'><strong>Why this match?</strong><p>" + esc(recommendationReason(match)) + "</p></div>" + expanded + "<div class='match-actions'><button class='btn btn-small' data-action='expand-match' data-role='" + esc(role.name) + "'>" + (state.expandedRole === role.name ? "Close match" : "View match ↗") + "</button><button class='save-button " + (saved ? "saved" : "") + "' data-action='save-role' data-role='" + esc(role.name) + "'>" + (saved ? "♥ Saved" : "♡ Save") + "</button></div></div><aside class='match-deck-aside'><span class='section-kicker'>YOUR MATCH SIGNALS</span><h3>What is moving your score</h3><p>Skills, interests, role preference, project details, work style, and your optional DNA choices all contribute.</p><div class='match-factor-list'><div><span>Skills</span><b>" + match.skillScore + "%</b></div><div><span>Interests</span><b>" + match.interestScore + "%</b></div><div><span>Internship DNA</span><b>" + match.dnaScore + "%</b></div><div><span>Project</span><b>" + match.projectScore + "%</b></div><div><span>Preferred work style</span><b>" + match.workScore + "%</b></div></div><p class='micro'>Suitable work styles: " + esc(role.modes.join(" · ")) + "</p></aside></article>";
        }
        var top = all[0];
        return "<div class='page-wrap recommendation-page'>" + pageHeading("GET MATCHED · FIND INTERNSHIPS FOR ME", "A match is a starting point.", "See what already fits and which skill could move you forward. Every score is calculated from your current profile and Internship DNA.", "<span class='pill'><i class='pill-dot'></i>Live profile matching</span>") +
            "<section class='recommendation-toolbar recommendation-filters'><label class='filter-label'>Role <select id='roleFilter'>" + roleOptions + "</select></label><label class='filter-label'>Work style <select id='workModeFilter'>" + modeOptions + "</select></label><div class='deck-controls'><button class='icon-button' data-action='deck-scroll' data-dir='-1' aria-label='Previous recommendation'>←</button><span class='deck-count'>" + (filtered.length ? selectedIndex + 1 : 0) + " / " + filtered.length + "</span><button class='icon-button' data-action='deck-scroll' data-dir='1' aria-label='Next recommendation'>→</button></div></section>" + card +
            "<div class='rec-role-rail'><span class='micro-label'>YOUR CURRENT ROLE LANDSCAPE</span><div>" + roleData.map(function (item) { var current = all.find(function (entry) { return entry.role.name === item.name; }); return "<button class='role-rail-chip " + (state.recFilter === item.short ? "active" : "") + "' data-action='set-rec-role' data-role-short='" + esc(item.short) + "'>" + esc(item.short) + " · " + current.score + "%</button>"; }).join("") + "</div></div><div class='rec-summary'><div class='summary-stat'><strong>" + (top ? top.score : 0) + "%</strong><span>Top current match</span></div><div class='summary-stat'><strong>" + getSkillGaps().length + "</strong><span>Priority skill gaps</span></div><div class='summary-stat'><strong>" + state.savedRoles.length + "</strong><span>Saved roles</span></div></div><div class='footer-note'>Match scores are calculated from your choices and skill levels. Update Student Profile or Internship DNA to refresh this view.</div></div>";
    }

    function animateMatchScore() {
        var score = app.querySelector("[data-match-score]");
        if (!score) return;
        var target = Number(score.getAttribute("data-match-score"));
        var start = performance.now();
        function frame(now) {
            var progress = Math.min(1, (now - start) / 680);
            score.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function resumeValue(key, fallback) {
        return Object.prototype.hasOwnProperty.call(state.resumeEdits || {}, key) ? state.resumeEdits[key] : fallback;
    }

    function editable(key, value, tag, className) {
        return "<" + tag + " contenteditable='true' spellcheck='false' data-resume-edit='" + esc(key) + "' class='" + (className || "") + "'>" + esc(resumeValue(key, value)) + "</" + tag + ">";
    }

    function resumeFields() {
        var p = state.profile;
        var role = (p.roles || [])[0] || "Data-focused Student";
        var degree = degreeName() || "Your degree";
        var college = p.college || "Your College / University";
        var skillsText = Object.keys(p.skills || {}).map(function (skill) { return skill + " · " + p.skills[skill]; }).join("  |  ") || "Add skills in your Student Profile";
        var projectText = p.projectYes ? ((p.projectName || "Data Project") + " · " + ((p.projectTech || []).join(", ") || "Add technologies") + (p.dataset ? " · Dataset: " + p.dataset : "")) : "Add a project when you are ready to showcase applied work.";
        var summary = (degree === "Your degree" ? "Student" : degree + " student") + " at " + college + ", interested in " + ((p.interests || []).join(", ") || "data and technology") + ". Building practical skills for " + role.toLowerCase() + " opportunities.";
        var experience = p.experienceYes ? ((p.experienceRole || "Experience") + " · " + (p.experienceOrg || "Organization") + (p.experienceDetails ? " · " + p.experienceDetails : "")) : (p.projectYes ? "Academic project experience · " + (p.projectName || "Data project") : "Early-career student · ready to learn through practical work");
        return { name: p.fullName || "Your Name", role: role, degree: degree, college: college, year: p.year || "Current year", email: p.email || "email@example.com", phone: p.phone || "+91 98765 43210", location: p.location || "City, Country", summary: summary, skills: skillsText, project: projectText, experience: experience };
    }

    function renderTemplateMarkup(template) {
        var d = resumeFields();
        var p = state.profile;
        var selectedSkills = Object.keys(p.skills || {});
        var skillsList = selectedSkills.length ? selectedSkills : ["Python", "SQL", "Statistics"];
        var imageName = ({ editorial: "template-2-portrait.jpg", modern: "template-3-portrait.jpg", creative: "template-4-portrait.jpg", portfolio: "template-5-portrait.jpg" })[template];
        var portrait = imageName ? "<img class='" + (template === "editorial" ? "editorial-portrait" : template === "modern" ? "modern-portrait" : template === "creative" ? "creative-photo" : "portfolio-photo") + "' src='assets/" + imageName + "' alt='Portrait artwork from the selected resume reference'>" : "";
        if (template === "minimal") {
            return "<header class='minimal-resume-head'>" + editable("name", d.name, "h1") + editable("role", d.role, "p", "resume-title") + "<p>" + editable("email", d.email, "span") + " · " + editable("phone", d.phone, "span") + " · " + editable("location", d.location, "span") + "</p></header><section><h3>PROFILE</h3>" + editable("summary", d.summary, "p") + "</section><section><h3>EDUCATION</h3><strong contenteditable='true' data-resume-edit='degree' spellcheck='false'>" + esc(resumeValue("degree", d.degree)) + "</strong><p contenteditable='true' data-resume-edit='education' spellcheck='false'>" + esc(resumeValue("education", d.college + " · " + d.year)) + "</p></section><section><h3>SKILLS</h3>" + editable("skills", d.skills, "p") + "</section><section><h3>PROJECTS</h3>" + editable("project", d.project, "p") + "</section><section><h3>EXPERIENCE</h3>" + editable("experience", d.experience, "p") + "</section>";
        }
        if (template === "classic") {
            return "<header class='classic-head'>" + editable("name", d.name, "h1") + editable("role", d.role, "p", "resume-title") + "</header><section class='classic-summary'><h3>CAREER SUMMARY</h3>" + editable("summary", d.summary, "p") + "</section><div class='classic-columns'><aside class='classic-column'><section class='classic-section classic-contact'><h3>CONTACT</h3><p>☎ &nbsp;" + editable("phone", d.phone, "span") + "</p><p>✉ &nbsp;" + editable("email", d.email, "span") + "</p><p>⌖ &nbsp;" + editable("location", d.location, "span") + "</p></section><section class='classic-section'><h3>EDUCATION</h3><strong contenteditable='true' data-resume-edit='degree' spellcheck='false'>" + esc(resumeValue("degree", d.degree)) + "</strong><p contenteditable='true' data-resume-edit='education' spellcheck='false'>" + esc(resumeValue("education", d.college + " · " + d.year)) + "</p></section><section class='classic-section'><h3>SKILLS</h3><ul class='classic-list'>" + skillsList.slice(0, 9).map(function (skill) { return "<li>" + esc(skill) + "</li>"; }).join("") + "</ul></section></aside><section class='classic-column'><section class='classic-section'><h3>WORK EXPERIENCE</h3><div class='classic-timeline-item'><strong>" + editable("experience", d.experience, "span") + "</strong><span>" + esc(d.college) + " · Current</span><p>Applied analytical thinking and technical skills to real-world data questions.</p></div></section><section class='classic-section'><h3>PROJECTS</h3><div class='classic-timeline-item'><strong>" + editable("project", d.project, "span") + "</strong><span>Student project</span><p>Explored a practical problem using data, tools, and a structured approach.</p></div></section><section class='classic-section'><h3>REFERENCES</h3><div class='classic-foot'><p>Available on request</p><p>Project portfolio · " + esc(d.college) + "</p></div></section></section></div>";
        }
        if (template === "editorial") {
            return "<div class='editorial-grid'><aside class='editorial-left'>" + portrait + "<section><h3>EXPERIENCE</h3><strong>Current</strong><p>" + editable("experience", d.experience, "span") + "</p><ul><li>Built practical skills through focused learning and applied projects.</li></ul></section><section class='editorial-contact'><h3>CONTACT</h3><p>◉ &nbsp;" + editable("phone", d.phone, "span") + "</p><p>✉ &nbsp;" + editable("email", d.email, "span") + "</p><p>⌂ &nbsp;" + editable("location", d.location, "span") + "</p></section></aside><div class='editorial-right'>" + editable("name", d.name, "h1", "editorial-name") + editable("role", d.role, "p", "editorial-role") + editable("summary", d.summary, "p") + "<section><h3>EDUCATION</h3><strong contenteditable='true' data-resume-edit='degree' spellcheck='false'>" + esc(resumeValue("degree", d.degree)) + "</strong><p contenteditable='true' data-resume-edit='education' spellcheck='false'>" + esc(resumeValue("education", d.college + " · " + d.year)) + "</p></section><section><h3>SKILLS</h3><ul class='editorial-skills'>" + skillsList.slice(0, 7).map(function (skill) { var level = levelOf(skill); var width = level === "Advanced" ? 92 : level === "Intermediate" ? 73 : level === "Beginner" ? 48 : 36; return "<li>" + esc(skill) + "<div class='editorial-bar'><span style='width:" + width + "%'></span></div></li>"; }).join("") + "</ul></section><section><h3>PROJECT</h3><p>" + editable("project", d.project, "span") + "</p></section></div></div>";
        } if (template === "modern") {
            return "<header class='modern-head'>" + portrait + "<div>" + editable("name", d.name, "h1", "modern-name") + editable("role", d.role, "p", "modern-role") + "</div></header><div class='modern-top-grid'><section><h3>Contact</h3><p>" + editable("location", d.location, "span") + "<br>" + editable("phone", d.phone, "span") + "<br>" + editable("email", d.email, "span") + "</p></section><section><h3>Summary</h3>" + editable("summary", d.summary, "p") + "</section></div><div class='modern-two-col'><aside><section><h3>Education</h3><strong contenteditable='true' data-resume-edit='degree' spellcheck='false'>" + esc(resumeValue("degree", d.degree)) + "</strong><p contenteditable='true' data-resume-edit='education' spellcheck='false'>" + esc(resumeValue("education", d.college + " · " + d.year)) + "</p></section><section><h3>Skills</h3><ul>" + skillsList.slice(0, 10).map(function (skill) { return "<li>" + esc(skill) + "</li>"; }).join("") + "</ul></section></aside><section><h3>Work Experience</h3><div class='modern-entry'><strong>" + editable("experience", d.experience, "span") + "</strong><p>" + esc(d.college) + " · Current</p><p>Used research, data preparation, and problem-solving to develop practical outcomes.</p></div><div class='modern-entry'><strong>PROJECT · " + editable("project", d.project, "span") + "</strong><p>Profile-driven project work</p></div></section></div><div class='modern-footer'><section><h3>Certification</h3><p>Coursework and learning in progress</p></section><section><h3>References</h3><p>Available on request</p></section></div>";
        }
        if (template === "creative") {
            return "<div class='creative-banner'></div><div class='creative-corner'></div><header class='creative-head'><div>" + editable("name", d.name, "h1", "creative-name") + editable("role", d.role, "p", "creative-role") + "</div>" + portrait + "</header><div class='creative-intro'>" + editable("summary", d.summary, "p") + "<div class='creative-contact'><p>♙ &nbsp;" + editable("phone", d.phone, "span") + "</p><p>✉ &nbsp;" + editable("email", d.email, "span") + "</p><p>⌖ &nbsp;" + editable("location", d.location, "span") + "</p></div></div><div class='creative-columns'><div><section class='creative-section'><h3>Experience</h3><h4>" + esc(d.role) + "</h4><p>" + editable("experience", d.experience, "span") + "</p><p>Applied problem solving, data preparation, and project collaboration.</p></section><section class='creative-section'><h3>Project</h3><h4>" + esc(p.projectName || "Data project") + "</h4><p>" + editable("project", d.project, "span") + "</p></section></div><div><section class='creative-section'><h3>Skills</h3><ul>" + skillsList.slice(0, 9).map(function (skill) { return "<li>" + esc(skill) + " · " + esc(levelOf(skill) || "Exploring") + "</li>"; }).join("") + "</ul></section><section class='creative-section'><h3>Education</h3><h4>" + esc(d.degree) + "</h4><p contenteditable='true' data-resume-edit='education' spellcheck='false'>" + esc(resumeValue("education", d.college + " · " + d.year)) + "</p></section><section class='creative-section'><h3>Languages</h3><ul><li>English</li><li>" + esc(p.location ? "Local language" : "Add a language") + "</li></ul></section></div></div>";
        }
        return "<div class='portfolio-collage'></div><div class='portfolio-head'><aside class='portfolio-left'><div class='portfolio-photo-frame'>" + portrait + "</div><span class='portfolio-hello'>Hello! My name is</span>" + editable("name", d.name, "h1", "portfolio-name") + "</aside><section class='portfolio-about'><h2>About Me</h2>" + editable("summary", d.summary, "p") + "<p>" + editable("role", d.role, "span") + "</p><p>" + editable("email", d.email, "span") + "</p></section></div><div class='portfolio-body'><section class='portfolio-section'><h3>My Hobbies</h3><ul><li>Exploring new ideas and learning</li><li>Working with data and visual stories</li><li>" + esc(d.location) + "</li></ul></section><section class='portfolio-section'><h3>My Skills</h3><ul>" + skillsList.slice(0, 6).map(function (skill) { return "<li>" + esc(skill) + " · " + esc(levelOf(skill) || "Exploring") + "</li>"; }).join("") + "</ul></section><section class='portfolio-section'><h3>My Goal</h3><ul><li>" + esc(d.role) + "</li><li>Grow through practical internships</li></ul></section><section class='portfolio-section'><h3>My Project</h3><p>" + editable("project", d.project, "span") + "</p></section></div>";
    }

    var templateInfo = [
        { id: "classic", title: "Classic", detail: "Professional", image: "template-1-thumb.jpg" },
        { id: "editorial", title: "Editorial", detail: "Watercolor", image: "template-2-thumb.jpg" },
        { id: "modern", title: "Modern", detail: "Structured", image: "template-3-thumb.jpg" },
        { id: "creative", title: "Creative", detail: "Editorial", image: "template-4-thumb.jpg" },
        { id: "portfolio", title: "Portfolio", detail: "Visual", image: "template-5-thumb.jpg" }
    ];

    function renderResume() {
        var style = state.resumeStyle;
        var cards = templateInfo.map(function (item) {
            return "<button class='template-card " + (state.template === item.id ? "active" : "") + "' data-action='choose-template' data-template='" + item.id + "'><img src='assets/" + item.image + "' alt='Reference preview for the " + esc(item.title) + " resume design'><div class='template-info'><strong>" + esc(item.title) + "</strong><span>" + esc(item.detail) + "</span></div></button>";
        }).join("");
        var previewStyle = "--resume-font:'" + esc(style.font) + "',Arial,sans-serif;--resume-size:" + Number(style.size) + "px;--resume-text:" + esc(style.text) + ";--resume-accent:" + esc(style.accent) + ";--resume-bg:" + esc(style.background) + ";--resume-spacing:" + Number(style.spacing) + ";--resume-weight:" + (style.bold ? "700" : "400") + ";--resume-style:" + (style.italic ? "italic" : "normal") + ";--resume-decoration:" + (style.underline ? "underline" : "none") + ";";
        return "<div class='page-wrap'>" + pageHeading("RESUME · FIVE REAL TEMPLATE STYLES", "A resume that starts with you", "Choose one of the five provided designs. Each opens as an editable resume populated from your profile, with a live preview and print-to-PDF export.", "<span class='pill'><i class='pill-dot'></i>Profile connected</span>") +
            "<section class='resume-intro'><div><span class='eyebrow'>RESUME STUDIO</span><h2>Build cleanly. Customize freely.</h2><p>Start from your profile, pick a layout, edit any text directly on the page, and tune the design from the controls below.</p></div><button class='btn btn-peach' data-action='build-resume'>Build From My Profile →</button></section><section><div class='section-title' style='margin:18px 2px 10px'><div><span class='section-kicker'>CHOOSE YOUR STYLE</span><h2 style='margin:4px 0 0;color:var(--ink);font:500 21px Georgia,serif'>Select a template</h2></div><span class='micro'>Five designs from your references · each is editable</span></div><div class='template-grid'>" + cards + "</div></section><section class='surface resume-studio'><div class='custom-header'><div><span class='section-kicker'>TEMPLATE CUSTOMIZATION</span><h2>Make it yours</h2></div><button class='btn btn-small' data-action='download-resume'>Download PDF ↓</button></div><div class='studio-layout'><aside class='toolbar'><div class='tool'><label for='fontPicker'>Font</label><select id='fontPicker'>" + ["Nunito Sans", "Inter", "DM Sans", "Poppins", "Manrope", "Montserrat", "Playfair Display", "Lora", "Roboto", "Plus Jakarta Sans"].map(function (font) { return "<option value='" + esc(font) + "' " + (style.font === font ? "selected" : "") + ">" + esc(font) + "</option>"; }).join("") + "</select></div><div class='tool'><label>Text size</label><div class='size-control'><button data-action='font-size' data-delta='-1'>−</button><span id='fontSizeValue'>" + Number(style.size) + " px</span><button data-action='font-size' data-delta='1'>+</button></div></div><div class='tool'><label for='textColor'>Text color</label><div class='color-control'><input type='color' id='textColor' value='" + esc(style.text) + "'><span>" + esc(style.text.toUpperCase()) + "</span></div></div><div class='tool'><label for='accentColor'>Accent color</label><div class='color-control'><input type='color' id='accentColor' value='" + esc(style.accent) + "'><span>" + esc(style.accent.toUpperCase()) + "</span></div></div><div class='tool'><label for='backgroundColor'>Background</label><div class='color-control'><input type='color' id='backgroundColor' value='" + esc(style.background) + "'><span>" + esc(style.background.toUpperCase()) + "</span></div></div><div class='tool'><label for='spacing'>Line spacing</label><input class='range-control' type='range' id='spacing' min='1.1' max='1.8' step='0.05' value='" + Number(style.spacing) + "'></div><div class='tool'><label>Text style</label><div class='tool-row'><button class='style-button " + (style.bold ? "active" : "") + "' data-action='style-toggle' data-style='bold' aria-label='Toggle bold'><b>B</b></button><button class='style-button " + (style.italic ? "active" : "") + "' data-action='style-toggle' data-style='italic' aria-label='Toggle italic'><i>I</i></button><button class='style-button " + (style.underline ? "active" : "") + "' data-action='style-toggle' data-style='underline' aria-label='Toggle underline'><u>U</u></button></div></div></aside><div><div class='preview-area'><article id='resumeSheet' class='resume-sheet " + esc(state.template) + "' style='" + previewStyle + "'>" + renderTemplateMarkup(state.template) + (state.profile.achievements ? "<section class='resume-achievements'><h3>Achievements & certifications</h3><p>" + esc(state.profile.achievements) + "</p></section>" : "") + "</article></div><div class='resume-edit-note'><span>Click any text on the resume page to edit it.</span><span>Selected: " + esc(state.template === "minimal" ? "Minimal" : ((templateInfo.find(function (item) { return item.id === state.template; }) || templateInfo[0]).title)) + " template</span></div></div></div></section><div class='footer-note'>The five thumbnails reference your PDFs; the selected design is rendered as editable HTML and uses your live profile data.</div></div>";
    }

    function renderResumeUpdated() {
        var portraitRemoved = (state.resumePortraitHiddenTemplates || []).indexOf(state.template) >= 0;
        return renderResume()
            .replace("<section class='resume-intro'>", "<nav class='resume-subnav'><button data-action='resume-scroll' data-target='resume-minimal'>Minimal</button><button data-action='resume-scroll' data-target='resume-styles'>Choose your style</button></nav><section id='resume-minimal' class='resume-intro'>")
            .replace("<section><div class='section-title' style='margin:18px 2px 10px'>", "<section id='resume-styles'><div class='section-title' style='margin:18px 2px 10px'>")
            .replace("<div class='resume-edit-note'><span>Click any text on the resume page to edit it.</span><span>Selected: ", "<div class='resume-edit-note'><span>Choose Arrange layout, then drag any outlined text, line, or layout piece.</span><div class='resume-editor-controls'><button data-action='toggle-resume-arrange'>" + (state.resumeArrangeMode ? "Done arranging" : "Arrange layout") + "</button><button data-action='add-resume-section'>＋ Add section</button><button data-action='toggle-resume-images'>" + (portraitRemoved ? "Restore portrait" : (state.resumeImagesVisible ? "Hide template images" : "Show template images")) + "</button><button data-action='reset-resume-positions'>Reset positions</button><button data-action='restore-resume-sections'>Restore removed sections</button></div><span>Selected: ");
    }

    function decorateResumeEditor() {
        var sheet = app.querySelector("#resumeSheet");
        if (!sheet) return;
        var content = sheet.querySelector(".resume-print-content");
        if (!content) {
            content = document.createElement("div");
            content.className = "resume-print-content";
            while (sheet.firstChild) content.appendChild(sheet.firstChild);
            sheet.appendChild(content);
        }
        sheet.classList.toggle("resume-arrange-mode", state.resumeArrangeMode === true);
        sheet.classList.toggle("no-resume-images", state.resumeImagesVisible === false);
        Array.prototype.slice.call(content.querySelectorAll(".resume-move-control")).forEach(function (control) { control.remove(); });
        var portrait = content.querySelector("img");
        if (portrait) {
            var portraitWrap = portrait.parentElement;
            if (!portraitWrap.classList.contains("resume-portrait-wrap")) {
                portraitWrap = document.createElement("div");
                portraitWrap.className = "resume-portrait-wrap";
                portrait.parentNode.insertBefore(portraitWrap, portrait);
                portraitWrap.appendChild(portrait);
            }
            portraitWrap.classList.add(state.template);
            var portraitHidden = (state.resumePortraitHiddenTemplates || []).indexOf(state.template) >= 0;
            if (portraitHidden) {
                var portraitHost = portraitWrap.parentElement;
                if (portraitHost.classList.contains("portfolio-photo-frame")) {
                    if (portraitHost.parentElement) portraitHost.parentElement.classList.add("resume-without-portrait");
                    portraitHost.remove();
                } else {
                    var portraitHeader = portraitWrap.closest(".modern-head,.creative-head");
                    if (portraitHeader) portraitHeader.classList.add("resume-without-portrait");
                    portraitWrap.remove();
                }
            } else {
                portraitWrap.classList.remove("is-hidden");
                portraitWrap.classList.toggle("images-off", state.resumeImagesVisible === false);
                portrait.hidden = false;
            }
            if (!portraitHidden && !portraitWrap.querySelector(".resume-portrait-control")) {
                var portraitControl = document.createElement("button");
                portraitControl.type = "button";
                portraitControl.className = "resume-portrait-control";
                portraitControl.setAttribute("data-action", "toggle-resume-portrait");
                portraitControl.setAttribute("data-template", state.template);
                portraitWrap.appendChild(portraitControl);
            }
            if (!portraitHidden) {
                var portraitButton = portraitWrap.querySelector(".resume-portrait-control");
                portraitButton.textContent = state.resumeImagesVisible === false ? "Images hidden" : "Remove portrait";
                portraitButton.disabled = state.resumeImagesVisible === false;
            }
        }

        (state.resumeCustomSections || []).forEach(function (item) {
            var section = document.createElement("section");
            section.className = "custom-resume-section resume-section-editable";
            section.setAttribute("data-custom-section", item.id);
            var heading = document.createElement("h3");
            heading.contentEditable = "true";
            heading.spellcheck = false;
            heading.setAttribute("data-resume-edit", "custom:" + item.id + ":title");
            heading.textContent = resumeValue("custom:" + item.id + ":title", item.title || "New section");
            var body = document.createElement("p");
            body.contentEditable = "true";
            body.spellcheck = false;
            body.setAttribute("data-resume-edit", "custom:" + item.id + ":body");
            body.textContent = resumeValue("custom:" + item.id + ":body", item.body || "Add your details here.");
            section.appendChild(heading);
            section.appendChild(body);
            content.appendChild(section);
        });

        var sections = Array.prototype.slice.call(content.querySelectorAll("section"));
        var groupParents = {};
        var parentGroups = [];
        sections.forEach(function (section, index) {
            var sectionId = section.getAttribute("data-custom-section") ? "custom-section-" + section.getAttribute("data-custom-section") : state.template + "-section-" + index;
            section.setAttribute("data-resume-section", sectionId);
            var parent = section.parentElement;
            var parentIndex = parentGroups.indexOf(parent);
            if (parentIndex < 0) {
                parentIndex = parentGroups.push(parent) - 1;
                groupParents[state.template + "-group-" + parentIndex] = parent;
            }
            section.setAttribute("data-resume-group", state.template + "-group-" + parentIndex);
        });

        var savedLayout = (state.resumeSectionOrders || {})[state.template] || {};
        sections.forEach(function (section) {
            var savedPosition = savedLayout[section.getAttribute("data-resume-section")];
            if (savedPosition && groupParents[savedPosition.group]) section.setAttribute("data-resume-group", savedPosition.group);
        });
        Object.keys(groupParents).forEach(function (groupId) {
            var groupSections = sections.filter(function (section) { return section.getAttribute("data-resume-group") === groupId; });
            groupSections.sort(function (left, right) {
                var leftId = left.getAttribute("data-resume-section");
                var rightId = right.getAttribute("data-resume-section");
                var leftOrder = savedLayout[leftId] && Number(savedLayout[leftId].order);
                var rightOrder = savedLayout[rightId] && Number(savedLayout[rightId].order);
                if (Number.isFinite(leftOrder) && Number.isFinite(rightOrder)) return leftOrder - rightOrder;
                if (Number.isFinite(leftOrder)) return -1;
                if (Number.isFinite(rightOrder)) return 1;
                return sections.indexOf(left) - sections.indexOf(right);
            });
            groupSections.forEach(function (section) { groupParents[groupId].appendChild(section); });
        });

        sections.forEach(function (section) {
            var sectionId = section.getAttribute("data-resume-section");
            if ((state.resumeHiddenSections || []).indexOf(sectionId) >= 0) {
                section.classList.add("resume-section-hidden");
                return;
            }
            section.classList.add("resume-section-editable");
            var templateOffsets = (state.resumeSectionOffsets || {})[state.template] || {};
            var sectionOffset = templateOffsets[sectionId];
            var offsetX = sectionOffset ? Number(sectionOffset.x) || 0 : 0;
            var offsetY = sectionOffset ? Number(sectionOffset.y) || 0 : 0;
            section.style.translate = offsetX || offsetY ? offsetX + "px " + offsetY + "px" : "";
            var editableNodes = Array.prototype.slice.call(section.querySelectorAll("h2,h3,h4,p,strong,span,li"));
            editableNodes.forEach(function (node, nodeIndex) {
                if (node.isContentEditable || node.closest("[contenteditable='true']") || node.hasAttribute("data-resume-edit")) return;
                var textNodes = Array.prototype.slice.call(node.childNodes).filter(function (child) {
                    return child.nodeType === Node.TEXT_NODE && child.nodeValue.trim();
                });
                textNodes.forEach(function (textNode, textIndex) {
                    var key = "detail:" + sectionId + ":" + nodeIndex + (textNodes.length > 1 ? ":text:" + textIndex : "");
                    var editor = document.createElement("span");
                    editor.contentEditable = "true";
                    editor.spellcheck = false;
                    editor.setAttribute("data-resume-edit", key);
                    editor.textContent = resumeValue(key, textNode.nodeValue);
                    textNode.parentNode.replaceChild(editor, textNode);
                });
            });
            if (!section.querySelector(":scope > .resume-remove-control")) {
                var remove = document.createElement("button");
                remove.type = "button";
                remove.className = "resume-remove-control";
                remove.textContent = "Remove section";
                remove.setAttribute("data-action", "remove-resume-section");
                remove.setAttribute("data-section-id", sectionId);
                section.appendChild(remove);
            }
        });

        // Make static template copy independently editable too, including headings,
        // labels, and small text that does not belong to a resume section.
        var staticTextWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        var staticTextNodes = [];
        while (staticTextWalker.nextNode()) staticTextNodes.push(staticTextWalker.currentNode);
        var staticTextIndex = 0;
        staticTextNodes.forEach(function (textNode) {
            if (!textNode.nodeValue.trim()) return;
            var parent = textNode.parentElement;
            if (!parent || parent.closest("[data-resume-edit],[contenteditable='true'],button,input,select,textarea,svg,style,script,.resume-remove-control,.resume-portrait-control")) return;
            var section = parent.closest("[data-resume-section]");
            var sectionKey = null;
            if (section) {
                var sectionNodes = Array.prototype.slice.call(section.querySelectorAll("h2,h3,h4,p,strong,span,li"));
                var owner = parent.closest("h2,h3,h4,p,strong,span,li");
                if (owner) {
                    var ownerIndex = sectionNodes.indexOf(owner);
                    if (ownerIndex >= 0) sectionKey = "detail:" + section.getAttribute("data-resume-section") + ":" + ownerIndex + ":text:extra:" + staticTextIndex;
                }
            }
            var key = sectionKey || "static:" + state.template + ":" + staticTextIndex;
            staticTextIndex += 1;
            var editor = document.createElement("span");
            editor.contentEditable = "true";
            editor.spellcheck = false;
            editor.setAttribute("data-resume-edit", key);
            editor.textContent = resumeValue(key, textNode.nodeValue);
            textNode.parentNode.replaceChild(editor, textNode);
        });

        // Every rendered template element can be grabbed directly. Text leaf spans
        // keep copy independently editable/movable; parent elements move structure,
        // images, rules, borders, and other decorative pieces as a unit.
        var moveableItems = Array.prototype.slice.call(content.querySelectorAll("*:not(button):not(input):not(select):not(textarea):not(.resume-remove-control):not(.resume-portrait-control)"));
        var layoutOccurrences = {};
        moveableItems.forEach(function (item) {
            var moveId = item.getAttribute("data-resume-section");
            if (!moveId && item.hasAttribute("data-resume-edit")) moveId = "detail:" + item.getAttribute("data-resume-edit");
            if (!moveId) {
                var stableClasses = Array.prototype.slice.call(item.classList).filter(function (name) {
                    return name !== "resume-section-editable" && name !== "resume-without-portrait";
                }).sort();
                var descriptor = item.tagName.toLowerCase() + ":" + (stableClasses.join(".") || "plain");
                layoutOccurrences[descriptor] = (layoutOccurrences[descriptor] || 0) + 1;
                moveId = "layout:" + state.template + ":" + descriptor + ":" + layoutOccurrences[descriptor];
            }
            item.setAttribute("data-resume-moveable", "true");
            item.setAttribute("data-resume-move-id", moveId);
            var itemStyle = window.getComputedStyle(item);
            if (itemStyle.position === "static") item.style.position = "relative";
            var itemOffset = ((state.resumeSectionOffsets || {})[state.template] || {})[moveId];
            var itemX = itemOffset ? Number(itemOffset.x) || 0 : 0;
            var itemY = itemOffset ? Number(itemOffset.y) || 0 : 0;
            item.style.translate = itemX || itemY ? itemX + "px " + itemY + "px" : "";
            if (itemStyle.display === "inline" && (state.resumeArrangeMode || itemX || itemY)) item.style.display = "inline-block";
            if (state.resumeArrangeMode && !item.getAttribute("title")) item.setAttribute("title", "Drag to reposition");
        });

        // Split thin template divider rules into their own drag targets so a line
        // can be repositioned without moving its heading or surrounding section.
        if (window.getComputedStyle(content).position === "static") content.style.position = "relative";
        var contentRect = content.getBoundingClientRect();
        moveableItems.forEach(function (item) {
            var computed = window.getComputedStyle(item);
            var sides = ["Top", "Right", "Bottom", "Left"].map(function (side) {
                var width = parseFloat(computed["border" + side + "Width"]) || 0;
                var style = computed["border" + side + "Style"];
                return { name: side.toLowerCase(), width: width, style: style, color: computed["border" + side + "Color"] };
            }).filter(function (edge) { return edge.width > 0 && edge.width <= 3 && edge.style !== "none" && edge.style !== "hidden"; });
            var horizontalPair = sides.length === 2 && sides.some(function (edge) { return edge.name === "top"; }) && sides.some(function (edge) { return edge.name === "bottom"; });
            var verticalPair = sides.length === 2 && sides.some(function (edge) { return edge.name === "left"; }) && sides.some(function (edge) { return edge.name === "right"; });
            if (sides.length !== 1 && !horizontalPair && !verticalPair) return;
            var itemRect = item.getBoundingClientRect();
            sides.forEach(function (edge) {
                item.style.setProperty("border-" + edge.name + "-color", "transparent", "important");
                var divider = document.createElement("div");
                var id = "divider:" + item.getAttribute("data-resume-move-id") + ":" + edge.name;
                divider.className = "resume-divider-handle";
                divider.setAttribute("aria-hidden", "true");
                divider.setAttribute("data-divider-side", edge.name);
                divider.setAttribute("data-resume-moveable", "true");
                divider.setAttribute("data-resume-move-id", id);
                divider.style.position = "absolute";
                divider.style.margin = "0";
                divider.style.padding = "0";
                divider.style.setProperty("--resume-divider-width", edge.width + "px");
                divider.style.setProperty("--resume-divider-style", edge.style);
                divider.style.setProperty("--resume-divider-color", edge.color);
                if (edge.name === "top" || edge.name === "bottom") {
                    var y = edge.name === "top" ? itemRect.top + edge.width / 2 : itemRect.bottom - edge.width / 2;
                    divider.style.left = (itemRect.left - contentRect.left) + "px";
                    divider.style.top = (y - contentRect.top - 6) + "px";
                    divider.style.width = itemRect.width + "px";
                    divider.style.height = "12px";
                } else {
                    var x = edge.name === "left" ? itemRect.left + edge.width / 2 : itemRect.right - edge.width / 2;
                    divider.style.left = (x - contentRect.left - 6) + "px";
                    divider.style.top = (itemRect.top - contentRect.top) + "px";
                    divider.style.width = "12px";
                    divider.style.height = itemRect.height + "px";
                }
                var dividerOffset = ((state.resumeSectionOffsets || {})[state.template] || {})[id];
                var dividerX = dividerOffset ? Number(dividerOffset.x) || 0 : 0;
                var dividerY = dividerOffset ? Number(dividerOffset.y) || 0 : 0;
                divider.style.translate = dividerX || dividerY ? dividerX + "px " + dividerY + "px" : "";
                content.appendChild(divider);
            });
        });
    }

    function prepareResumePrint() {
        if (state.view !== "resume") return;
        var sheet = app.querySelector("#resumeSheet");
        var content = sheet && sheet.querySelector(".resume-print-content");
        if (!sheet || !content) return;
        document.body.classList.add("printing-resume");
        var pageHeight = 297 * 96 / 25.4;
        var verticalPadding = sheet.classList.contains("editorial") || sheet.classList.contains("portfolio") ? 18 : sheet.classList.contains("creative") ? 12 : 28;
        var usableHeight = pageHeight - (verticalPadding * 96 / 25.4);
        var contentHeight = Math.max(content.scrollHeight, content.getBoundingClientRect().height, 1);
        var scale = Math.min(1, usableHeight / contentHeight);
        sheet.style.setProperty("--resume-print-scale", scale.toFixed(4));
        sheet.style.setProperty("--resume-print-width", (100 / scale).toFixed(3) + "%");
    }

    function restoreResumeAfterPrint() {
        document.body.classList.remove("printing-resume");
        var sheet = app.querySelector("#resumeSheet");
        if (sheet) {
            sheet.style.removeProperty("--resume-print-scale");
            sheet.style.removeProperty("--resume-print-width");
        }
    }

    window.addEventListener("beforeprint", prepareResumePrint);
    window.addEventListener("afterprint", restoreResumeAfterPrint);

    function syncProfileLive() {
        if (state.view !== "profile") return;
        var list = app.querySelector(".missing-list");
        var score = readiness();
        var strength = profileStrength();
        var readyText = app.querySelector("#profileReadinessValue");
        var readyBar = app.querySelector("#profileReadinessBar");
        var strengthText = app.querySelector("#profileStrengthValue");
        var strengthBar = app.querySelector("#profileStrengthBar");
        if (readyText) readyText.textContent = score + "%";
        if (readyBar) readyBar.style.width = score + "%";
        if (strengthText) strengthText.textContent = strength + "%";
        if (strengthBar) strengthBar.style.width = strength + "%";
        if (list) {
            var items = getProfileMissing();
            list.innerHTML = items.map(function (item) { return "<li>" + esc(item.text) + "</li>"; }).join("") || "<li class='complete'>Your key details are in place.</li>";
        }
        var bars = app.querySelectorAll(".profile-coverage-row");
        coverageByCategory().forEach(function (item, index) {
            var row = bars[index];
            if (!row) return;
            var label = row.querySelector("b");
            var line = row.querySelector("i span");
            if (label) label.textContent = item.value + "%";
            if (line) line.style.width = item.value + "%";
        });
        var avatar = document.querySelector(".avatar-button");
        if (avatar) avatar.textContent = initials();
        persist();
    }

    function applyResumeStyle() {
        var sheet = app.querySelector("#resumeSheet");
        var style = state.resumeStyle;
        if (!sheet) return;
        sheet.style.setProperty("--resume-font", "'" + style.font + "', Arial, sans-serif");
        sheet.style.setProperty("--resume-size", Number(style.size) + "px");
        sheet.style.setProperty("--resume-text", style.text);
        sheet.style.setProperty("--resume-accent", style.accent);
        sheet.style.setProperty("--resume-bg", style.background);
        sheet.style.setProperty("--resume-spacing", Number(style.spacing));
        sheet.style.setProperty("--resume-weight", style.bold ? "700" : "400");
        sheet.style.setProperty("--resume-style", style.italic ? "italic" : "normal");
        sheet.style.setProperty("--resume-decoration", style.underline ? "underline" : "none");
        ["textColor", "accentColor", "backgroundColor"].forEach(function (id) {
            var input = document.getElementById(id);
            if (input && input.nextElementSibling) input.nextElementSibling.textContent = input.value.toUpperCase();
        });
        var size = document.getElementById("fontSizeValue");
        if (size) size.textContent = Number(style.size) + " px";
        persist();
    }

    function loadResumeFont(font) {
        if (["Nunito Sans", "Inter", "Manrope", "DM Sans", "Georgia", "Lora"].indexOf(font) >= 0) return;
        var id = "resume-font-" + font.replace(/\s+/g, "-");
        if (document.getElementById(id)) return;
        var link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(font).replace(/%20/g, "+") + "&display=swap";
        document.head.appendChild(link);
    }

    function openProgressFor(skill, openPanel) {
        state.view = "progress";
        state.focusSkill = skill || getFocusSkill();
        state.focusManual = !!skill;
        state.roadmapOpen = !!openPanel;
        state.openStage = openPanel ? Number(state.journeyProgress[state.focusSkill] || 0) : null;
        state.whyOpen = false;
        state.progressWhyOpen = false;
        state.adaptNotice = null;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleArrayValue(array, value) {
        var next = (array || []).slice();
        var index = next.indexOf(value);
        if (index >= 0) next.splice(index, 1); else next.push(value);
        return next;
    }

    function completeJourneyStage(skill, stageIndex) {
        var oldProgress = Number(state.journeyProgress[skill] || 0);
        if (stageIndex !== oldProgress) return;
        var oldReady = readiness();
        var oldGaps = getSkillGaps().length;
        var oldGoodMatches = getMatches().filter(function (match) { return match.score >= 70; }).length;
        var totalSteps = stepsFor(skill).length;
        var nextProgress = Math.min(oldProgress + 1, totalSteps);
        state.journeyProgress[skill] = nextProgress;
        var level = levelOf(skill);
        if (nextProgress >= 2 && (!level || level === "Beginner")) state.profile.skills[skill] = "Intermediate";
        if (nextProgress >= 3 && state.profile.skills[skill] === "Intermediate") state.profile.skills[skill] = "Advanced";
        if (nextProgress >= totalSteps) state.profile.skills[skill] = "Advanced";
        var newReady = readiness();
        var newGaps = getSkillGaps().length;
        var newGoodMatches = getMatches().filter(function (match) { return match.score >= 70; }).length;
        var steps = stepsFor(skill);
        state.adaptNotice = {
            skill: skill,
            beforeReady: oldReady,
            afterReady: newReady,
            newMatches: newGoodMatches - oldGoodMatches,
            beforeGaps: oldGaps,
            afterGaps: newGaps,
            next: nextProgress < steps.length ? steps[nextProgress].title : "Choose another priority skill"
        };
        state.focusSkill = skill;
        state.roadmapOpen = nextProgress < steps.length;
        state.openStage = nextProgress < steps.length ? nextProgress : null;
        state.whyOpen = false;
        persist();
        render();
        window.scrollTo({ top: app.offsetTop, behavior: "smooth" });
    }

    function runAdaptAnalysis() {
        var before = readiness();
        var gapsBefore = getSkillGaps().length;
        var matchesBefore = getMatches().filter(function (match) { return match.score >= 70; }).length;
        var phases = ["Analyzing your progress", "Updating skill gaps", "Recalculating matches", "Refreshing your roadmap"];
        state.analyzing = true;
        state.analysisText = phases[0];
        render();
        var index = 0;
        function advance() {
            index += 1;
            if (index < phases.length) {
                state.analysisText = phases[index];
                render();
                setTimeout(advance, 430);
            } else {
                state.analyzing = false;
                var focus = getFocusSkill();
                state.adaptNotice = {
                    skill: focus,
                    beforeReady: before,
                    afterReady: readiness(),
                    newMatches: getMatches().filter(function (match) { return match.score >= 70; }).length - matchesBefore,
                    beforeGaps: gapsBefore,
                    afterGaps: getSkillGaps().length,
                    next: stepsFor(focus)[Number(state.journeyProgress[focus] || 0)] ? stepsFor(focus)[Number(state.journeyProgress[focus] || 0)].title : "Choose another priority skill"
                };
                render();
            }
        }
        setTimeout(advance, 430);
    }

    document.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-action]");
        if (!trigger) return;
        var action = trigger.getAttribute("data-action");
        var p = state.profile;
        if (trigger.tagName === "A") event.preventDefault();

        if (action === "navigate") {
            state.view = trigger.getAttribute("data-view") || "dashboard";
            if (state.view === "progress" && !state.focusSkill) state.focusSkill = getFocusSkill();
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (action === "toggle-skill") {
            var skill = trigger.getAttribute("data-skill");
            if (levelOf(skill)) delete p.skills[skill]; else p.skills[skill] = "Beginner";
            state.focusManual = false;
            persist(); render();
        } else if (action === "toggle-interest") {
            p.interests = toggleArrayValue(p.interests, trigger.getAttribute("data-interest"));
            state.focusManual = false;
            render();
        } else if (action === "toggle-role") {
            p.roles = toggleArrayValue(p.roles, trigger.getAttribute("data-role"));
            state.selectedRole = trigger.getAttribute("data-role");
            state.focusManual = false;
            render();
        } else if (action === "choose-degree") {
            p.degree = trigger.getAttribute("data-degree");
            render();
        } else if (action === "choose-year") {
            p.year = trigger.getAttribute("data-year");
            render();
        } else if (action === "choose-work") {
            p.workPreference = trigger.getAttribute("data-value");
            state.focusManual = false;
            render();
        } else if (action === "choose-experience-type") {
            p.experienceType = trigger.getAttribute("data-value");
            p.experienceYes = p.experienceType !== "None yet";
            if (!p.experienceYes) { p.experienceRole = ""; p.experienceOrg = ""; p.experienceDetails = ""; }
            state.focusManual = false;
            render();
        } else if (action === "project-state") {
            p.projectYes = trigger.getAttribute("data-value") === "yes";
            state.focusManual = false;
            render();
        } else if (action === "experience-state") {
            p.experienceYes = trigger.getAttribute("data-value") === "yes";
            render();
        } else if (action === "toggle-tech") {
            p.projectTech = toggleArrayValue(p.projectTech, trigger.getAttribute("data-tech"));
            state.focusManual = false;
            render();
        } else if (action === "toggle-accordion") {
            var index = Number(trigger.getAttribute("data-index"));
            state.dnaOpen = state.dnaOpen === index ? -1 : index;
            render();
        } else if (action === "toggle-dna-option") {
            var question = trigger.getAttribute("data-question");
            state.dna[question] = toggleArrayValue(state.dna[question], trigger.getAttribute("data-option"));
            state.focusManual = false;
            render();
        } else if (action === "skip-dna") {
            state.dna[trigger.getAttribute("data-question")] = [];
            state.focusManual = false;
            render();
        } else if (action === "ring-metric") {
            state.ringMetric = trigger.getAttribute("data-metric");
            render();
        } else if (action === "select-orbit-role") {
            state.selectedRole = trigger.getAttribute("data-role");
            render();
        } else if (action === "open-role") {
            state.expandedRole = trigger.getAttribute("data-role");
            state.recFilter = roleByName(state.expandedRole).short;
            state.recModeFilter = "All";
            state.recIndex = 0;
            state.view = "recommendations";
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (action === "select-skill-map") {
            state.selectedSkill = trigger.getAttribute("data-skill");
            render();
        } else if (action === "set-rec-role") {
            state.recFilter = trigger.getAttribute("data-role-short");
            state.recIndex = 0;
            render();
        } else if (action === "open-focus") {
            openProgressFor(trigger.getAttribute("data-skill"), false);
        } else if (action === "why-insight") {
            var focus = getSkillGaps()[0];
            openProgressFor(focus ? focus.skill : getFocusSkill(), true);
            state.whyOpen = true;
            render();
        } else if (action === "expand-match") {
            var roleName = trigger.getAttribute("data-role");
            state.expandedRole = state.expandedRole === roleName ? "" : roleName;
            render();
        } else if (action === "save-role") {
            var savedName = trigger.getAttribute("data-role");
            state.savedRoles = toggleArrayValue(state.savedRoles, savedName);
            render();
            showToast(state.savedRoles.indexOf(savedName) >= 0 ? "Saved " + savedName + " to your roles." : "Removed " + savedName + " from saved roles.");
        } else if (action === "deck-scroll") {
            var filteredCount = getMatches().filter(function (match) { return (state.recFilter === "All" || match.role.short === state.recFilter) && (state.recModeFilter === "All" || match.role.modes.indexOf(state.recModeFilter) >= 0); }).length;
            state.recIndex = clamp(Number(state.recIndex || 0) + Number(trigger.getAttribute("data-dir")), 0, Math.max(0, filteredCount - 1));
            render();
        } else if (action === "choose-template") {
            state.template = trigger.getAttribute("data-template");
            render();
        } else if (action === "resume-scroll") {
            var sectionTarget = document.getElementById(trigger.getAttribute("data-target"));
            if (sectionTarget) sectionTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (action === "add-resume-section") {
            var customId = "custom-" + Date.now();
            state.resumeCustomSections.push({ id: customId, title: "New section", body: "Add your details here." });
            render();
            var added = app.querySelector("[data-custom-section='" + customId + "']");
            if (added) added.querySelector("h3").focus();
        } else if (action === "remove-resume-section") {
            var sectionToHide = trigger.getAttribute("data-section-id");
            state.resumeHiddenSections = toggleArrayValue(state.resumeHiddenSections, sectionToHide);
            render();
        } else if (action === "remove-custom-resume-section") {
            var customToRemove = trigger.getAttribute("data-custom-id");
            state.resumeCustomSections = state.resumeCustomSections.filter(function (item) { return item.id !== customToRemove; });
            render();
        } else if (action === "restore-resume-sections") {
            state.resumeHiddenSections = [];
            render();
        } else if (action === "toggle-resume-arrange") {
            state.resumeArrangeMode = !state.resumeArrangeMode;
            render();
        } else if (action === "reset-resume-positions") {
            state.resumeSectionOffsets = state.resumeSectionOffsets || {};
            delete state.resumeSectionOffsets[state.template];
            render();
            showToast("Section positions reset for this template.");
        } else if (action === "toggle-resume-images") {
            var currentPortraitRemoved = (state.resumePortraitHiddenTemplates || []).indexOf(state.template) >= 0;
            if (currentPortraitRemoved) {
                state.resumePortraitHiddenTemplates = state.resumePortraitHiddenTemplates.filter(function (template) { return template !== state.template; });
                state.resumeImagesVisible = true;
                showToast("Portrait restored to this resume.");
            } else {
                state.resumeImagesVisible = !state.resumeImagesVisible;
            }
            render();
        } else if (action === "toggle-resume-portrait") {
            var portraitTemplate = trigger.getAttribute("data-template") || state.template;
            state.resumePortraitHiddenTemplates = toggleArrayValue(state.resumePortraitHiddenTemplates || [], portraitTemplate);
            var portraitWasRemoved = state.resumePortraitHiddenTemplates.indexOf(portraitTemplate) >= 0;
            render();
            showToast(portraitWasRemoved ? "Portrait removed from this resume." : "Portrait restored to this resume.");
        } else if (action === "build-resume") {
            state.resumeEdits = {};
            state.template = "minimal";
            render();
            showToast("Resume refreshed from your current Student Profile.");
        } else if (action === "download-resume") {
            prepareResumePrint();
            window.print();
        } else if (action === "font-size") {
            state.resumeStyle.size = clamp(Number(state.resumeStyle.size) + Number(trigger.getAttribute("data-delta")), 9, 20);
            render();
        } else if (action === "style-toggle") {
            var styleKey = trigger.getAttribute("data-style");
            state.resumeStyle[styleKey] = !state.resumeStyle[styleKey];
            render();
        } else if (action === "continue-roadmap") {
            var activeSkill = getFocusSkill();
            var activeSteps = stepsFor(activeSkill);
            var activeProgress = Number(state.journeyProgress[activeSkill] || 0);
            if (activeProgress >= activeSteps.length) {
                var nextJourney = journeySkills().find(function (item) { return item.skill !== activeSkill && Number(state.journeyProgress[item.skill] || 0) < stepsFor(item.skill).length; });
                if (nextJourney) {
                    state.focusSkill = nextJourney.skill;
                    activeSkill = nextJourney.skill;
                    activeProgress = Number(state.journeyProgress[activeSkill] || 0);
                    state.adaptNotice = null;
                }
            }
            state.roadmapOpen = true;
            state.openStage = Math.min(activeProgress, stepsFor(activeSkill).length - 1);
            state.whyOpen = false;
            render();
        } else if (action === "open-stage") {
            state.roadmapOpen = true;
            state.openStage = Number(trigger.getAttribute("data-stage"));
            state.whyOpen = false;
            render();
        } else if (action === "toggle-why") {
            state.whyOpen = !state.whyOpen;
            render();
        } else if (action === "toggle-progress-why") {
            state.progressWhyOpen = !state.progressWhyOpen;
            render();
        } else if (action === "mark-stage") {
            completeJourneyStage(trigger.getAttribute("data-skill"), Number(trigger.getAttribute("data-stage")));
        } else if (action === "adapt") {
            runAdaptAnalysis();
        }
    });

    var matchSwipeStart = null;
    var resumePositionDrag = null;
    function finishResumePositionDrag() {
        if (!resumePositionDrag) return;
        var drag = resumePositionDrag;
        drag.item.classList.remove("resume-item-moving");
        state.resumeSectionOffsets = state.resumeSectionOffsets || {};
        state.resumeSectionOffsets[drag.template] = state.resumeSectionOffsets[drag.template] || {};
        state.resumeSectionOffsets[drag.template][drag.id] = { x: drag.x, y: drag.y };
        if (drag.captureTarget.hasPointerCapture && drag.captureTarget.hasPointerCapture(drag.pointerId)) {
            drag.captureTarget.releasePointerCapture(drag.pointerId);
        }
        resumePositionDrag = null;
        persist();
    }
    app.addEventListener("pointerdown", function (event) {
        if (state.view !== "resume" || state.resumeArrangeMode !== true) return;
        if (!(event.target instanceof Element) || event.target.closest("button,a,input,select,textarea,[data-action],.resume-remove-control,.resume-portrait-control")) return;
        var item = event.target.closest("[data-resume-moveable]");
        var sheet = app.querySelector("#resumeSheet");
        if (!item || !sheet) return;
        event.preventDefault();
        var offsets = (state.resumeSectionOffsets || {})[state.template] || {};
        var moveId = item.getAttribute("data-resume-move-id");
        var savedOffset = offsets[moveId] || { x: 0, y: 0 };
        var itemRect = item.getBoundingClientRect();
        var sheetRect = sheet.getBoundingClientRect();
        var minX = sheetRect.left - itemRect.left;
        var maxX = sheetRect.right - itemRect.right;
        var minY = sheetRect.top - itemRect.top;
        var maxY = sheetRect.bottom - itemRect.bottom;
        if (maxX < minX) { minX = 0; maxX = 0; }
        if (maxY < minY) { minY = 0; maxY = 0; }
        resumePositionDrag = {
            item: item,
            captureTarget: item,
            id: moveId,
            template: state.template,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startOffsetX: Number(savedOffset.x) || 0,
            startOffsetY: Number(savedOffset.y) || 0,
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY,
            x: Number(savedOffset.x) || 0,
            y: Number(savedOffset.y) || 0
        };
        item.classList.add("resume-item-moving");
        if (item.setPointerCapture) {
            try { item.setPointerCapture(event.pointerId); } catch (error) { /* Pointer capture is optional. */ }
        }
    });
    app.addEventListener("pointermove", function (event) {
        if (!resumePositionDrag || event.pointerId !== resumePositionDrag.pointerId) return;
        var drag = resumePositionDrag;
        drag.x = drag.startOffsetX + clamp(event.clientX - drag.startX, drag.minX, drag.maxX);
        drag.y = drag.startOffsetY + clamp(event.clientY - drag.startY, drag.minY, drag.maxY);
        drag.item.style.translate = drag.x + "px " + drag.y + "px";
        event.preventDefault();
    });
    app.addEventListener("pointerup", function (event) {
        if (resumePositionDrag && event.pointerId === resumePositionDrag.pointerId) finishResumePositionDrag();
    });
    app.addEventListener("pointercancel", function (event) {
        if (resumePositionDrag && event.pointerId === resumePositionDrag.pointerId) finishResumePositionDrag();
    });
    app.addEventListener("pointerdown", function (event) {
        if (event.target.closest(".match-deck-card")) matchSwipeStart = event.clientX;
    });
    app.addEventListener("pointerup", function (event) {
        if (matchSwipeStart == null) return;
        var distance = event.clientX - matchSwipeStart;
        matchSwipeStart = null;
        if (Math.abs(distance) < 55 || state.view !== "recommendations") return;
        var count = getMatches().filter(function (match) { return (state.recFilter === "All" || match.role.short === state.recFilter) && (state.recModeFilter === "All" || match.role.modes.indexOf(state.recModeFilter) >= 0); }).length;
        state.recIndex = clamp(Number(state.recIndex || 0) + (distance < 0 ? 1 : -1), 0, Math.max(0, count - 1));
        render();
    });

    app.addEventListener("input", function (event) {
        var field = event.target.closest("[data-profile]");
        if (field) {
            state.profile[field.getAttribute("data-profile")] = field.value;
            state.focusManual = false;
            persist();
            syncProfileLive();
            return;
        }
        var editableField = event.target.closest("[data-resume-edit]");
        if (editableField) {
            var editableCopy = editableField.cloneNode(true);
            Array.prototype.slice.call(editableCopy.querySelectorAll(".resume-move-control,.resume-remove-control")).forEach(function (control) { control.remove(); });
            state.resumeEdits[editableField.getAttribute("data-resume-edit")] = editableCopy.innerText.replace(/\s+/g, " ").trim();
            persist();
            return;
        }
        if (event.target.id === "textColor") state.resumeStyle.text = event.target.value;
        else if (event.target.id === "accentColor") state.resumeStyle.accent = event.target.value;
        else if (event.target.id === "backgroundColor") state.resumeStyle.background = event.target.value;
        else if (event.target.id === "spacing") state.resumeStyle.spacing = Number(event.target.value);
        else return;
        applyResumeStyle();
    });

    app.addEventListener("change", function (event) {
        var target = event.target;
        if (target.matches("[data-skill-level]")) {
            state.profile.skills[target.getAttribute("data-skill-level")] = target.value;
            state.focusManual = false;
            render();
        } else if (target.id === "roleFilter") {
            state.recFilter = target.value;
            state.recIndex = 0;
            render();
        } else if (target.id === "workModeFilter") {
            state.recModeFilter = target.value;
            state.recIndex = 0;
            render();
        } else if (target.id === "journeySelect") {
            state.focusSkill = target.value;
            state.focusManual = true;
            state.roadmapOpen = false;
            state.openStage = null;
            state.adaptNotice = null;
            render();
        } else if (target.id === "fontPicker") {
            state.resumeStyle.font = target.value;
            loadResumeFont(target.value);
            applyResumeStyle();
        } else if (target.id === "textColor") {
            state.resumeStyle.text = target.value;
            applyResumeStyle();
        } else if (target.id === "accentColor") {
            state.resumeStyle.accent = target.value;
            applyResumeStyle();
        } else if (target.id === "backgroundColor") {
            state.resumeStyle.background = target.value;
            applyResumeStyle();
        } else if (target.id === "spacing") {
            state.resumeStyle.spacing = Number(target.value);
            applyResumeStyle();
        }
    });

    render();
})();



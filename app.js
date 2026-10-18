document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. THEME TOGGLE LOGIC (Dark Default)
    // =========================================================================
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');

    const applyTheme = (isDark) => {
        if (isDark) {
            html.classList.add('dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun text-sm text-amber-400';
            }
            if (mobileThemeIcon) {
                mobileThemeIcon.className = 'fas fa-sun text-amber-400';
            }
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon text-sm text-slate-700';
            }
            if (mobileThemeIcon) {
                mobileThemeIcon.className = 'fas fa-moon text-slate-700';
            }
            localStorage.setItem('theme', 'light');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme !== 'light');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => applyTheme(!html.classList.contains('dark')));
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', () => applyTheme(!html.classList.contains('dark')));
    }

    // =========================================================================
    // 2. SPOTLIGHT BENTO CARD MOUSE TRACKING
    // =========================================================================
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // =========================================================================
    // 3. TOAST NOTIFICATION & QUICK EMAIL COPY
    // =========================================================================
    const toastEl = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    const showToast = (message) => {
        if (!toastEl || !toastMsg) return;
        toastMsg.textContent = message;
        toastEl.classList.remove('opacity-0', 'translate-y-3');
        toastEl.classList.add('opacity-100', 'translate-y-0');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('opacity-100', 'translate-y-0');
            toastEl.classList.add('opacity-0', 'translate-y-3');
        }, 2800);
    };

    const copyEmailAddress = (email = 'wildan.ismanto@ms.mii.co.id') => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`);
            }).catch(() => {
                showToast(`Email: ${email}`);
            });
        } else {
            showToast(`Email: ${email}`);
        }
    };

    document.querySelectorAll('.copy-email-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-copy-email') || 'wildan.ismanto@ms.mii.co.id';
            copyEmailAddress(email);
        });
    });

    // =========================================================================
    // 4. MOBILE MENU
    // =========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // =========================================================================
    // 5. INTERACTIVE C# / .NET TERMINAL WIDGET
    // =========================================================================
    const terminalOutput = document.getElementById('terminal-output');
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');

    const appendTerminalLine = (htmlContent, className = 'text-slate-300') => {
        if (!terminalOutput) return;
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = htmlContent;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const executeTerminalCommand = (rawCmd) => {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        appendTerminalLine(`<span class="text-azure-400 font-bold">PS whi.dev&gt;</span> <span class="text-white">${rawCmd}</span>`);

        switch (cmd) {
            case 'help':
                appendTerminalLine(
                    `<div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                        <div class="text-sky-400 font-semibold">Available WHI.dev CLI Commands:</div>
                        <div><span class="text-emerald-400">whoami</span>     — Display developer profile & current role</div>
                        <div><span class="text-emerald-400">skills</span>     — List .NET, Database & Azure technical stack</div>
                        <div><span class="text-emerald-400">projects</span>   — Inspect featured enterprise systems</div>
                        <div><span class="text-emerald-400">metrics</span>    — View production engineering impact metrics</div>
                        <div><span class="text-emerald-400">trace</span>      — Trigger live Azure & .NET architecture simulation</div>
                        <div><span class="text-emerald-400">resume</span>     — Open printable executive CV modal</div>
                        <div><span class="text-emerald-400">contact</span>    — Copy email address to clipboard</div>
                        <div><span class="text-emerald-400">clear</span>      — Clear terminal screen</div>
                    </div>`
                );
                break;

            case 'whoami':
            case 'dotnet --info':
                appendTerminalLine(
                    `<div class="text-slate-300 space-y-1">
                        <div><span class="text-sky-400">Developer:</span> Wildan Hilmy Ismanto</div>
                        <div><span class="text-sky-400">Role:</span> Application Developer Associate @ PT. Mitra Integrasi Informatika</div>
                        <div><span class="text-sky-400">Education:</span> B.Eng Informatics, Jenderal Soedirman University (GPA 3.42)</div>
                        <div><span class="text-sky-400">Certs:</span> DevSecOps Certified (PT. Pertamina Hulu Energi, Oct 2024)</div>
                    </div>`
                );
                break;

            case 'skills':
            case 'skills --list':
                appendTerminalLine(
                    `<div class="space-y-1 text-[11px]">
                        <div><span class="text-azure-400">[Backend]</span> C#, .NET Core / .NET 6-8, ASP.NET MVC/WebAPI, Blazor, EF Core, Serenity</div>
                        <div><span class="text-teal-400">[Data]</span>    SQL Server, PostgreSQL, Oracle, MySQL, Query Optimization</div>
                        <div><span class="text-amber-400">[Cloud]</span>   Azure DevOps CI/CD, Azure API Management, App Insights, Power BI</div>
                    </div>`
                );
                break;

            case 'projects':
            case 'projects --top':
                appendTerminalLine(
                    `<div class="space-y-1 text-[11px]">
                        <div class="text-sky-300 font-semibold">Featured Enterprise Systems (Click Case Studies below to inspect):</div>
                        <div>1. <span class="text-white">U-CAN System</span> — PT. Pertamina Hulu Energi (.NET MVC, SQL Server)</div>
                        <div>2. <span class="text-white">RFPO Portal</span> — PT. Bungasari Flour Mills (.NET 7, WebAPI, PostgreSQL)</div>
                        <div>3. <span class="text-white">Inventory & Gift Tracking</span> — PT. Bank Danamon (.NET 6, Worker Service)</div>
                        <div>4. <span class="text-white">Site Lease Agreement</span> — Protelindo (ASP.NET, Serenity FW)</div>
                        <div>5. <span class="text-white">Azure APIM & App Insights</span> — Enterprise Observability & Power BI</div>
                        <div>6. <span class="text-white">COMPASS</span> — PT. Pertamina Hulu Mahakam (ASP.NET MVC)</div>
                    </div>`
                );
                break;

            case 'metrics':
                appendTerminalLine(
                    `<div class="text-emerald-400 text-[11px]">
                        ✔ 6+ Years Experience | 10+ Enterprise Systems | 4 Major RDBMS | 24/7 App Insights Telemetry
                    </div>`
                );
                break;

            case 'trace':
            case 'arch':
                appendTerminalLine(`<span class="text-sky-400">↻ Launching live enterprise architecture request trace...</span>`);
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => runArchitectureSimulation(), 500);
                break;

            case 'contact':
            case 'contact --copy':
                copyEmailAddress('wildan.ismanto@ms.mii.co.id');
                appendTerminalLine(`<span class="text-emerald-400">✔ Copied wildan.ismanto@ms.mii.co.id to clipboard!</span>`);
                break;

            case 'resume':
            case 'cv':
                appendTerminalLine(`<span class="text-emerald-400">✔ Opening Executive Resume Viewer...</span>`);
                openResumeModal();
                break;

            case 'clear':
            case 'cls':
                if (terminalOutput) terminalOutput.innerHTML = '';
                break;

            default:
                appendTerminalLine(
                    `<span class="text-rose-400">Command not recognized: '${rawCmd}'. Type <span class="underline cursor-pointer" data-terminal-cmd="help">'help'</span> for available commands.</span>`
                );
                break;
        }
    };

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = terminalInput.value;
            terminalInput.value = '';
            executeTerminalCommand(val);
        });
    }

    document.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-terminal-cmd]');
        if (chip) {
            const cmd = chip.getAttribute('data-terminal-cmd');
            executeTerminalCommand(cmd);
        }
    });

    // =========================================================================
    // 6. INTERACTIVE ENTERPRISE ARCHITECTURE VISUALIZER
    // =========================================================================
    const archData = {
        client: {
            badge: 'LAYER 01 • ENTERPRISE PORTALS',
            title: 'Responsive Enterprise Web Portals (Blazor & ASP.NET MVC)',
            desc: 'Engineered intuitive, role-based enterprise interfaces for complex workflows—such as upstream oil & gas contracting (U-CAN) and telecommunication site lease management (Protelindo)—ensuring fast rendering, strict input validation, and complete user audit trails.',
            tags: ['Blazor Components', 'ASP.NET MVC 5 / Core', 'Serenity Framework', 'Role-Based Access Control'],
            proof: '"Streamlined multi-department approval workflows for Pertamina Hulu Energi & Protelindo with responsive web portals."'
        },
        apim: {
            badge: 'LAYER 02 • AZURE API GATEWAY',
            title: 'Azure API Management (APIM) & Security Governance',
            desc: 'Centralized API gateway policies enforcing JWT validation, rate-limiting, request/response transformation, and versioned routing across internal and external microservices.',
            tags: ['Azure API Management', 'Inbound/Outbound Policies', 'OAuth2 / JWT', 'Throttling & Caching'],
            proof: '"Maintained mission-critical Azure API Management gateways at PT. Mitra Integrasi Informatika with zero unauthorized exposure."'
        },
        backend: {
            badge: 'LAYER 03 • .NET CORE MICROSERVICES & WORKERS',
            title: 'High-Throughput C# / .NET Core WebAPI & Background Services',
            desc: 'Clean-architecture backend services built on .NET 6/7/8 and Entity Framework Core, paired with asynchronous .NET Worker Services for scheduled inventory reconciliation, notifications, and batch processing.',
            tags: ['C# / .NET 6-8', 'ASP.NET Core WebAPI', '.NET Worker Service', 'Entity Framework Core'],
            proof: '"Powered Bank Danamon Inventory & Gift Tracking and Bungasari RFPO Payment Portal with resilient .NET backend services."'
        },
        database: {
            badge: 'LAYER 04 • ENTERPRISE RELATIONAL DATA TIER',
            title: 'Multi-Engine Relational Database Architecture & Migration',
            desc: 'Designed normalized schemas, complex stored procedures, indexing strategies, and zero-data-loss migration pipelines across SQL Server, PostgreSQL, Oracle, and MySQL.',
            tags: ['Microsoft SQL Server', 'PostgreSQL', 'Oracle DB', 'MySQL', 'Query Tuning & Migrations'],
            proof: '"Architected high-integrity relational data models across 4 major RDBMS engines for banking, energy, and manufacturing clients."'
        },
        observability: {
            badge: 'LAYER 05 • DEVSECOPS, APP INSIGHTS & POWER BI',
            title: 'Automated Azure DevOps CI/CD & Live Power BI Observability',
            desc: 'End-to-end DevSecOps pipelines automating build, security scanning, and release gates, coupled with Azure Application Insights telemetry feeding directly into executive Power BI dashboards.',
            tags: ['Azure DevOps CI/CD', 'Application Insights', 'Power BI Dashboards', 'DevSecOps Certified'],
            proof: '"Delivered real-time Power BI observability dashboards linked with Application Insights to monitor enterprise SLA health."'
        }
    };

    const archNodes = document.querySelectorAll('.arch-node');
    const archBadge = document.getElementById('arch-detail-badge');
    const archTitle = document.getElementById('arch-detail-title');
    const archDesc = document.getElementById('arch-detail-desc');
    const archTags = document.getElementById('arch-detail-tags');
    const archProof = document.getElementById('arch-detail-proof');
    const simulateBtn = document.getElementById('simulate-arch-btn');
    const simulateLabel = document.getElementById('simulate-arch-label');
    const archFlowBar = document.getElementById('arch-flow-bar');
    const archTraceStatus = document.getElementById('arch-trace-status');

    const selectArchNode = (key) => {
        const data = archData[key];
        if (!data) return;

        archNodes.forEach((n) => {
            n.classList.toggle('active', n.getAttribute('data-arch-node') === key);
        });

        if (archBadge) archBadge.textContent = data.badge;
        if (archTitle) archTitle.textContent = data.title;
        if (archDesc) archDesc.textContent = data.desc;
        if (archProof) archProof.textContent = data.proof;
        if (archTags) {
            archTags.innerHTML = data.tags
                .map((t) => `<span class="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${t}</span>`)
                .join('');
        }
    };

    archNodes.forEach((node) => {
        node.addEventListener('click', () => {
            const key = node.getAttribute('data-arch-node');
            selectArchNode(key);
        });
    });

    let isSimulating = false;
    const runArchitectureSimulation = () => {
        if (isSimulating) return;
        isSimulating = true;

        const keys = ['client', 'apim', 'backend', 'database', 'observability'];
        const latencies = ['8ms UI Render', '6ms APIM Gate', '14ms .NET API', '11ms SQL Query', '3ms Telemetry'];

        if (simulateLabel) simulateLabel.textContent = 'Tracing Live Request...';
        if (archFlowBar) archFlowBar.classList.add('simulating');
        if (archTraceStatus) archTraceStatus.classList.add('hidden');

        keys.forEach((key, idx) => {
            setTimeout(() => {
                selectArchNode(key);
                const nodeEl = document.querySelector(`.arch-node[data-arch-node="${key}"] .node-metric`);
                if (nodeEl) {
                    nodeEl.textContent = `⚡ ${latencies[idx]}`;
                }
            }, idx * 550);
        });

        setTimeout(() => {
            if (simulateLabel) simulateLabel.textContent = 'Simulate Live Request Trace';
            if (archFlowBar) archFlowBar.classList.remove('simulating');
            if (archTraceStatus) archTraceStatus.classList.remove('hidden');
            showToast('Live Trace Complete: 42ms across .NET + Azure + SQL + Power BI');
            isSimulating = false;
        }, keys.length * 550 + 200);
    };

    if (simulateBtn) {
        simulateBtn.addEventListener('click', runArchitectureSimulation);
    }

    // =========================================================================
    // 7. PROJECT FILTERING & CASE STUDY MODAL
    // =========================================================================
    const filterBtns = document.querySelectorAll('#project-filters .filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    const applyProjectFilter = (category) => {
        filterBtns.forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });

        projectItems.forEach((item) => {
            const itemCat = item.getAttribute('data-category');
            if (category === 'all' || itemCat === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            applyProjectFilter(btn.getAttribute('data-filter'));
        });
    });

    // Clicking skill badges in Technical Arsenal filters the projects section
    document.querySelectorAll('[data-skill-filter]').forEach((badge) => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => {
            const filter = badge.getAttribute('data-skill-filter');
            applyProjectFilter(filter);
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            showToast(`Filtered projects by: ${badge.textContent.trim()}`);
        });
    });

    // Case Study Rich Data
    const caseStudies = {
        ucan: {
            client: 'PT. Pertamina Hulu Energi',
            year: 'Upstream Oil & Gas • Contracting',
            title: 'U-CAN (Upstream Contracting Application)',
            summary: 'An enterprise contracting management platform built for PT. Pertamina Hulu Energi to standardize, track, and audit complex upstream procurement and contract lifecycles.',
            challenge: 'Upstream oil & gas contracting involves multi-stage regulatory approvals, strict compliance documentation, and coordination across numerous internal departments.',
            solution: 'Engineered a structured ASP.NET MVC (.NET 4.6.1) application backed by SQL Server with granular role-based workflows, automated status tracking, and comprehensive audit logs.',
            deliverables: [
                'End-to-end contract lifecycle workflow from initiation to final approval.',
                'Optimized SQL Server relational schema for contract milestones and vendor records.',
                'Role-based access control and compliance reporting for internal stakeholders.'
            ],
            tech: ['.NET Framework 4.6.1', 'C#', 'ASP.NET MVC', 'SQL Server', 'Enterprise Workflow']
        },
        rfpo: {
            client: 'PT. Bungasari Flour Mills Indonesia',
            year: 'Manufacturing • FinTech Portal',
            title: 'RFPO (Request For Payment Online) Portal',
            summary: 'Digital payment request and corporate reimbursement platform designed to eliminate manual paper-based payment approvals at PT. Bungasari Flour Mills Indonesia.',
            challenge: 'Manual payment requisitions caused approval bottlenecks, limited visibility into pending liabilities, and slow finance reconciliation.',
            solution: 'Built a modern decoupled architecture utilizing .NET 7 WebAPI and PostgreSQL, providing high-speed REST endpoints for multi-tier financial approval routing.',
            deliverables: [
                'RESTful .NET 7 WebAPI services handling payment requisitions and approval matrices.',
                'Normalized PostgreSQL database design ensuring transactional financial integrity.',
                'Real-time status tracking for requesters, department heads, and finance teams.'
            ],
            tech: ['.NET 7', 'ASP.NET Core WebAPI', 'C#', 'PostgreSQL', 'REST API']
        },
        danamon: {
            client: 'PT. Bank Danamon Tbk',
            year: 'Enterprise Banking • Asset & Logistics',
            title: 'Inventory & Promotional Gift Tracking System',
            summary: 'Centralized banking inventory and promotional gift lifecycle management platform engineered for PT. Bank Danamon Tbk across branch networks.',
            challenge: 'Tracking promotional stock allocations, branch requests, and threshold alerts across branches required automated background processing and strict auditability.',
            solution: 'Developed a .NET 6 web application paired with a dedicated .NET Background Worker Service and SQL Server to automate stock reconciliation and scheduled alerts.',
            deliverables: [
                'Automated .NET 6 Background Service for scheduled inventory sync and notifications.',
                'Real-time stock allocation, branch distribution tracking, and audit reporting.',
                'High-reliability SQL Server backend tailored for banking compliance.'
            ],
            tech: ['.NET 6', 'C#', 'Background Worker Service', 'SQL Server', 'Enterprise Banking']
        },
        protelindo: {
            client: 'PT. Profesional Telekomunikasi Indonesia (Protelindo)',
            year: 'Telecommunications • Infrastructure',
            title: 'Site Lease Agreement Management System',
            summary: 'Mission-critical telecommunication tower site lease agreement platform managing thousands of landlord contracts and renewal schedules for Protelindo.',
            challenge: 'Managing nationwide telecom tower leases requires rapid filtering over massive datasets, document tracking, and proactive lease expiration workflows.',
            solution: 'Leveraged ASP.NET 4.5, Serenity Application Framework, and SQL Server to deliver high-density interactive data grids, document attachments, and automated lease calculations.',
            deliverables: [
                'Centralized repository for nationwide telecom site lease agreements and amendments.',
                'High-performance Serenity Framework UI grids with server-side filtering and export.',
                'Automated lease term and payment schedule calculations in SQL Server.'
            ],
            tech: ['ASP.NET 4.5', 'Serenity Framework', 'C#', 'SQL Server', 'Telecom Asset Mgmt']
        },
        appinsights: {
            client: 'Enterprise Internal & Client Operations',
            year: 'Cloud Observability & DevSecOps',
            title: 'Azure Application Insights, APIM & Power BI Telemetry',
            summary: 'Enterprise-wide observability and API governance initiative integrating Azure API Management, Application Insights, and executive Power BI dashboards.',
            challenge: 'Distributed enterprise applications needed unified API gateway security, proactive anomaly detection, and executive-ready SLA visualizations.',
            solution: 'Configured Azure DevOps CI/CD pipelines, instrumented .NET applications with Azure Application Insights, enforced API Management policies, and connected telemetry streams to Power BI.',
            deliverables: [
                'Centralized API governance and throttling via Azure API Management (APIM).',
                'Real-time exception tracking, dependency latency, and performance metrics in App Insights.',
                'Interactive Power BI executive dashboards displaying live application health and usage trends.'
            ],
            tech: ['Azure DevOps CI/CD', 'Azure API Management', 'Application Insights', 'Power BI', 'C# / .NET']
        },
        compass: {
            client: 'PT. Pertamina Hulu Mahakam',
            year: 'Energy Sector • Workforce Competency',
            title: 'COMPASS (Competency Assessment System)',
            summary: 'Enterprise workforce competency evaluation and gap-analysis platform designed and deployed for PT. Pertamina Hulu Mahakam.',
            challenge: 'Evaluating technical competencies across specialized upstream oil & gas roles required structured assessment matrices and multi-assessor review flows.',
            solution: 'Architected and deployed an ASP.NET MVC and SQL Server web platform enabling structured competency profiling, automated gap scoring, and historical progression tracking.',
            deliverables: [
                'Role-specific competency matrices and multi-stage employee assessment workflows.',
                'Automated competency gap calculations and training recommendation reports.',
                'Secure SQL Server data layer supporting historical workforce analytics.'
            ],
            tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'Enterprise HR Tech']
        }
    };

    const caseModal = document.getElementById('case-study-modal');
    const closeCaseModalBtn = document.getElementById('close-case-modal');

    const openCaseStudyModal = (projectId) => {
        const data = caseStudies[projectId];
        if (!data || !caseModal) return;

        document.getElementById('modal-client-badge').textContent = data.client;
        document.getElementById('modal-year').textContent = data.year;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-summary').textContent = data.summary;
        document.getElementById('modal-challenge').textContent = data.challenge;
        document.getElementById('modal-solution').textContent = data.solution;

        const delivList = document.getElementById('modal-deliverables');
        delivList.innerHTML = data.deliverables
            .map((item) => `<li class="flex items-start gap-2.5"><i class="fas fa-check-circle text-azure-500 mt-1 text-xs"></i><span>${item}</span></li>`)
            .join('');

        const techContainer = document.getElementById('modal-tech-stack');
        techContainer.innerHTML = data.tech
            .map((t) => `<span class="px-2.5 py-1 rounded-md bg-azure-500/10 text-azure-600 dark:text-azure-300 border border-azure-500/20">${t}</span>`)
            .join('');

        caseModal.classList.remove('hidden');
        caseModal.classList.add('flex');
    };

    const closeCaseStudyModal = () => {
        if (!caseModal) return;
        caseModal.classList.add('hidden');
        caseModal.classList.remove('flex');
    };

    document.querySelectorAll('.open-case-study').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project-id');
            openCaseStudyModal(id);
        });
    });

    if (closeCaseModalBtn) {
        closeCaseModalBtn.addEventListener('click', closeCaseStudyModal);
    }
    if (caseModal) {
        caseModal.addEventListener('click', (e) => {
            if (e.target === caseModal) closeCaseStudyModal();
        });
    }

    // =========================================================================
    // 8. RESUME MODAL (VIEW & PRINT / PDF)
    // =========================================================================
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeBtn = document.getElementById('close-resume-modal');
    const printResumeBtn = document.getElementById('print-resume-action');

    const openResumeModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.remove('hidden');
        resumeModal.classList.add('flex');
    };

    const closeResumeModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.add('hidden');
        resumeModal.classList.remove('flex');
    };

    ['open-resume-btn', 'hero-resume-btn', 'footer-resume-btn', 'mobile-resume-btn'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', openResumeModal);
    });

    if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    // =========================================================================
    // 9. COMMAND PALETTE (CTRL + K / CMD + K)
    // =========================================================================
    const cmdModal = document.getElementById('cmd-palette-modal');
    const cmdInput = document.getElementById('cmd-search-input');
    const cmdList = document.getElementById('cmd-list');

    const paletteCommands = [
        {
            icon: 'fa-bolt text-azure-500',
            label: 'Simulate Live Enterprise Architecture Trace',
            category: 'Interactive',
            action: () => {
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => runArchitectureSimulation(), 400);
            }
        },
        {
            icon: 'fa-file-pdf text-rose-500',
            label: 'Open Printable Executive Resume / CV',
            category: 'Resume',
            action: () => openResumeModal()
        },
        {
            icon: 'fa-copy text-emerald-500',
            label: 'Copy Email Address (wildan.ismanto@ms.mii.co.id)',
            category: 'Contact',
            action: () => copyEmailAddress('wildan.ismanto@ms.mii.co.id')
        },
        {
            icon: 'fa-folder-open text-sky-500',
            label: 'Case Study: U-CAN System (Pertamina Hulu Energi)',
            category: 'Project',
            action: () => openCaseStudyModal('ucan')
        },
        {
            icon: 'fa-folder-open text-teal-500',
            label: 'Case Study: RFPO Payment Portal (.NET 7 & PostgreSQL)',
            category: 'Project',
            action: () => openCaseStudyModal('rfpo')
        },
        {
            icon: 'fa-folder-open text-indigo-500',
            label: 'Case Study: Inventory & Gift Tracking (Bank Danamon)',
            category: 'Project',
            action: () => openCaseStudyModal('danamon')
        },
        {
            icon: 'fa-folder-open text-amber-500',
            label: 'Case Study: Azure APIM & Application Insights Rollout',
            category: 'Project',
            action: () => openCaseStudyModal('appinsights')
        },
        {
            icon: 'fa-terminal text-azure-400',
            label: 'Jump to Bento Profile & Interactive .NET CLI',
            category: 'Navigation',
            action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: 'fa-briefcase text-sky-400',
            label: 'Jump to Professional Experience Timeline',
            category: 'Navigation',
            action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: 'fa-adjust text-amber-400',
            label: 'Toggle Dark / Light Appearance',
            category: 'Preferences',
            action: () => applyTheme(!html.classList.contains('dark'))
        }
    ];

    const renderCommandList = (query = '') => {
        if (!cmdList) return;
        const q = query.trim().toLowerCase();
        const filtered = paletteCommands.filter(
            (c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            cmdList.innerHTML = `<div class="p-4 text-center text-xs text-slate-400 font-mono">No matching commands found.</div>`;
            return;
        }

        cmdList.innerHTML = filtered
            .map(
                (c, i) => `
                <button data-cmd-idx="${paletteCommands.indexOf(c)}" class="cmd-item w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors group">
                    <div class="flex items-center gap-3">
                        <i class="fas ${c.icon} w-4 text-center"></i>
                        <span class="text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm group-hover:text-azure-600 dark:group-hover:text-white">${c.label}</span>
                    </div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">${c.category}</span>
                </button>`
            )
            .join('');

        cmdList.querySelectorAll('.cmd-item').forEach((btn) => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-cmd-idx'), 10);
                closeCommandPalette();
                if (paletteCommands[idx]) paletteCommands[idx].action();
            });
        });
    };

    const openCommandPalette = () => {
        if (!cmdModal) return;
        cmdModal.classList.remove('hidden');
        cmdModal.classList.add('flex');
        if (cmdInput) {
            cmdInput.value = '';
            renderCommandList('');
            setTimeout(() => cmdInput.focus(), 50);
        }
    };

    const closeCommandPalette = () => {
        if (!cmdModal) return;
        cmdModal.classList.add('hidden');
        cmdModal.classList.remove('flex');
    };

    ['cmd-palette-trigger', 'mobile-cmd-btn', 'card-cmd-btn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', openCommandPalette);
    });

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => renderCommandList(e.target.value));
    }

    if (cmdModal) {
        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) closeCommandPalette();
        });
    }

    // Global Keyboard Shortcuts (Ctrl+K / Cmd+K and Escape)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdModal && cmdModal.classList.contains('hidden')) {
                openCommandPalette();
            } else {
                closeCommandPalette();
            }
        } else if (e.key === 'Escape') {
            closeCommandPalette();
            closeCaseStudyModal();
            closeResumeModal();
        }
    });

    // =========================================================================
    // 10. SCROLL REVEAL ANIMATIONS
    // =========================================================================
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach((section) => {
        section.classList.add('fade-in-section');
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });
});

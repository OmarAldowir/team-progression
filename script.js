document.addEventListener("DOMContentLoaded", () => {

    // ══════════════════════════════════════════════════════════════
    // TRANSLATIONS
    // ══════════════════════════════════════════════════════════════
    const translations = {
        ar: {
            appTitle:        'متابعة تقدم الفرق',
            appSubtitle:     'تزامن مباشر لتقدم الفرق النشطة',
            navTasks:        'المهام',
            navReport:       'التقرير ',
            reportTitle:     'التقرير',
            reportSubtitle:  'ملخص تقدم المشروع والأقسام',
            reportPlaceholder: 'سيتم عرض بيانات التقرير هنا',
            globalProgress:  'الإنجاز الكلي',
            totalTasksReport: 'إجمالي المهام',
            completedTasksReport: 'المهام المنجزة',
            globalProgressReport: 'الإنجاز الكلي',
            tasksCount:      'مهمة',
            teamPlaceholder: 'أدخل اسم الفريق الجديد...',
            createTeam:      'إنشاء فريق',
            // importData:      '📂 رفع ملف',
            printReport:     '🖨️ طباعة التقرير',
            darkMode:        '🌙 الوضع الداكن',
            lightMode:       '☀️ الوضع الفاتح',
            langBtn:         'EN',
            todo:            'قيد الانتظار',
            ongoing:         'جارٍ التنفيذ',
            done:            'مكتملة',
            taskPlaceholder: 'أضف مهمة جديدة...',
            addTask:         'إضافة',
            editTeam:        'تعديل',
            saveTeam:        'حفظ',
            deleteTeam:      'حذف',
            notes:           'ملاحظات',
            edit:            'تعديل',
            delete:          'حذف',
            saveNote:        'حفظ الملاحظة',
            notePlaceholder: 'اكتب ملاحظتك هنا...',
            unnamedTeam:     'فريق بدون اسم',
            unnamedTask:     'مهمة بدون اسم',
        },
        en: {
            appTitle:        'Team Progress Tracker',
            appSubtitle:     'Live progress synchronization for active teams',
            navTasks:        'Tasks',
            navReport:       'Sponsor Report',
            reportTitle:     'Sponsor Report',
            reportSubtitle:  'Project and Department Progress Summary',
            reportPlaceholder: 'Report data will be displayed here',
            globalProgress:  'Total Progress',
            totalTasksReport: 'Total Tasks',
            completedTasksReport: 'Completed Tasks',
            globalProgressReport: 'Total Progress',
            tasksCount:      'tasks',
            teamPlaceholder: 'Enter new team name...',
            createTeam:      'Create Team',
            importData:      '📂 Import',
            printReport:     '🖨️ Print Report',
            darkMode:        '🌙 Dark Mode',
            lightMode:       '☀️ Light Mode',
            langBtn:         'عربي',
            todo:            'To Do',
            ongoing:         'On Going',
            done:            'Done',
            taskPlaceholder: 'Add a new task...',
            addTask:         'Add',
            editTeam:        'Edit',
            saveTeam:        'Save',
            deleteTeam:      'Delete',
            notes:           'Notes',
            edit:            'Edit',
            delete:          'Delete',
            saveNote:        'Save Note',
            notePlaceholder: 'Write your note here...',
            unnamedTeam:     'Unnamed Team',
            unnamedTask:     'Unnamed Task',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ar';

    function t(key) { return translations[currentLang][key]; }

    function applyLanguage() {
        const isAr = currentLang === 'ar';
        document.documentElement.lang = currentLang;
        document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
        document.body.style.direction  = isAr ? 'rtl' : 'ltr';

        document.getElementById('app-title').textContent    = t('appTitle');
        document.getElementById('app-subtitle').textContent = t('appSubtitle');
        document.getElementById('new-team-input').placeholder = t('teamPlaceholder');
        document.getElementById('add-team-btn').textContent  = t('createTeam');
        document.querySelector('#import-data-label span').textContent = t('importData');
        
        const printBtnObj = document.getElementById('print-report-btn');
        if(printBtnObj) printBtnObj.textContent = t('printReport');
        
        document.getElementById('lang-toggle').textContent   = t('langBtn');
        document.getElementById('modal-save-btn').textContent = t('saveNote');
        document.getElementById('modal-note-text').placeholder = t('notePlaceholder');

        document.querySelector('#sidebar-app-title').textContent = t('appTitle');
        document.querySelector('#sidebar-app-subtitle').textContent = t('appSubtitle');
        document.querySelector('#nav-tasks .nav-text').textContent = t('navTasks');
        document.querySelector('#nav-report .nav-text').textContent = t('navReport');
        document.querySelector('.global-progress-label').textContent = t('globalProgress');
        
        const reportTitleObj = document.querySelector('#report-container h1');
        if(reportTitleObj) reportTitleObj.textContent = t('reportTitle');
        
        const reportSubtitleObj = document.querySelector('#report-container p');
        if(reportSubtitleObj) reportSubtitleObj.textContent = t('reportSubtitle');

        const reportTotalObj = document.querySelector('[data-i18n="totalTasksReport"]');
        if(reportTotalObj) reportTotalObj.textContent = t('totalTasksReport');
        
        const reportCompObj = document.querySelector('[data-i18n="completedTasksReport"]');
        if(reportCompObj) reportCompObj.textContent = t('completedTasksReport');
        
        const reportGlobObj = document.querySelector('[data-i18n="globalProgressReport"]');
        if(reportGlobObj) reportGlobObj.textContent = t('globalProgressReport');

        document.querySelector('#ctx-notes span').textContent  = t('notes');
        document.querySelector('#ctx-edit span').textContent   = t('edit');
        document.querySelector('#ctx-delete span').textContent = t('delete');

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.getElementById('theme-toggle').textContent = isDark ? t('lightMode') : t('darkMode');

        document.querySelectorAll('.team-section').forEach(teamDiv => {
            const sections = teamDiv.querySelectorAll('.kanban-section');
            sections.forEach(sec => {
                const status = sec.getAttribute('data-status');
                const h3 = sec.querySelector('h3');
                if (h3) h3.textContent = t(status); 
            });

            const taskInput = teamDiv.querySelector('.task-input');
            if (taskInput) taskInput.placeholder = t('taskPlaceholder');

            const addBtn = teamDiv.querySelector('.add-task-btn');
            if (addBtn) addBtn.textContent = t('addTask');

            const editTeamBtn = teamDiv.querySelector('.edit-team-btn');
            if (editTeamBtn && editTeamBtn.textContent !== t('saveTeam')) {
                editTeamBtn.textContent = t('editTeam');
            }

            const delTeamBtn = teamDiv.querySelector('.delete-team-btn');
            if (delTeamBtn) delTeamBtn.textContent = t('deleteTeam');
        });

        const adminControls = document.querySelector('.admin-controls');
        adminControls.style.flexDirection = isAr ? 'row-reverse' : 'row';

        document.querySelectorAll('.team-task-controls').forEach(ctrl => {
            ctrl.style.flexDirection = isAr ? 'row-reverse' : 'row';
        });

        if(document.getElementById('report-container').style.display === 'block') {
            renderReport();
        }
    }

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', currentLang);
        applyLanguage();
    });


    // ══════════════════════════════════════════════════════════════
    // DATA PERSISTENCE (SAVE / LOAD / IMPORT)
    // ══════════════════════════════════════════════════════════════

    function saveState() {
        const teamsData = [];
        document.querySelectorAll('.team-section').forEach(team => {
            const teamObj = {
                id: team.id,
                name: team.querySelector('.team-title-text').textContent,
                color: team.style.getPropertyValue('--team-color'),
                collapsed: team.classList.contains('collapsed'),
                tasks: []
            };

            ['todo', 'ongoing', 'done'].forEach(status => {
                team.querySelectorAll(`[data-status="${status}"] .task-item`).forEach(task => {
                    teamObj.tasks.push({
                        text: task.querySelector('.task-text-content').textContent,
                        status: status,
                        checked: task.querySelector('.task-checkbox').checked,
                        note: task.dataset.note || ''
                    });
                });
            });
            teamsData.push(teamObj);
        });
        
        localStorage.setItem('kanban_data', JSON.stringify(teamsData));
    }

    function loadState(jsonData) {
        document.getElementById('dynamic-teams-container').innerHTML = '';
        if (!jsonData || !jsonData.length) return;

        jsonData.forEach(teamData => {
            createTeamBlock(teamData.name, teamData); 
        });
        
        updateGlobalProgress();
        if(document.getElementById('report-container').style.display === 'block') renderReport();
    }

    // // Import JSON File Handler
    // document.getElementById('import-data-file').addEventListener('change', (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const reader = new FileReader();
    //     reader.onload = function(event) {
    //         try {
    //             const jsonData = JSON.parse(event.target.result);
    //             loadState(jsonData);
    //             saveState(); 
    //         } catch (err) {
    //             alert("Error parsing JSON file. Please ensure it is a valid backup.");
    //         }
    //     };
    //     reader.readAsText(file);
    //     e.target.value = ''; 
    // });


    // ══════════════════════════════════════════════════════════════
    // REPORT GENERATOR ENGINE & PRINT
    // ══════════════════════════════════════════════════════════════
    function renderReport() {
        const reportList = document.getElementById('report-teams-list');
        reportList.innerHTML = ''; 

        let globalTotal = 0;
        let globalDone = 0;

        const teams = document.querySelectorAll('.team-section');

        if (teams.length === 0) {
            reportList.innerHTML = `<div style="text-align:center; color: var(--text-muted); padding: 40px;">${t('reportPlaceholder')}</div>`;
        }

        teams.forEach(team => {
            const teamName = team.querySelector('.team-title-text').textContent;
            const teamColor = team.style.getPropertyValue('--team-color');
            const totalTasks = team.querySelectorAll('.task-item').length;
            const doneTasks = team.querySelector('[data-status="done"] .task-list').querySelectorAll('.task-item').length;
            
            globalTotal += totalTasks;
            globalDone += doneTasks;

            const percentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

            const row = document.createElement('div');
            row.className = 'report-team-row';
            
            row.innerHTML = `
                <div class="report-team-info">
                    <div class="report-team-name">${teamName}</div>
                    <div class="report-team-stats">${doneTasks} / ${totalTasks} ${t('tasksCount')}</div>
                </div>
                <div class="report-team-bar-container">
                    <div class="report-team-bar-track">
                        <div class="report-team-bar-fill" style="width: ${percentage}%; background-color: ${teamColor};"></div>
                    </div>
                    <div class="report-team-percentage" style="color: ${teamColor};">${percentage}%</div>
                </div>
            `;
            reportList.appendChild(row);
        });

        document.getElementById('report-total-tasks').textContent = globalTotal;
        document.getElementById('report-completed-tasks').textContent = globalDone;
        
        const globalPerc = globalTotal > 0 ? Math.round((globalDone / globalTotal) * 100) : 0;
        document.getElementById('report-global-progress').textContent = `${globalPerc}%`;
    }

    const printBtn = document.getElementById('print-report-btn');
    if(printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // ══════════════════════════════════════════════════════════════
    // GLOBAL PROGRESS & NAVIGATION
    // ══════════════════════════════════════════════════════════════
    const navTasks = document.getElementById('nav-tasks');
    const navReport = document.getElementById('nav-report');
    const toolContainer = document.getElementById('tool-container');
    const reportContainer = document.getElementById('report-container');

    navTasks.addEventListener('click', (e) => {
        e.preventDefault();
        navTasks.classList.add('active');
        navReport.classList.remove('active');
        toolContainer.style.display = 'block';
        reportContainer.style.display = 'none';
    });

    navReport.addEventListener('click', (e) => {
        e.preventDefault();
        navReport.classList.add('active');
        navTasks.classList.remove('active');
        toolContainer.style.display = 'none';
        reportContainer.style.display = 'block';
        renderReport();
    });

    function updateGlobalProgress() {
        const allTasks = document.querySelectorAll('.task-item').length;
        const allChecked = document.querySelectorAll('.task-checkbox:checked').length;
        
        let globalPercentage = 0;
        if (allTasks > 0) {
            globalPercentage = Math.round((allChecked / allTasks) * 100);
        }

        document.getElementById('global-progress-fill').style.width = `${globalPercentage}%`;
        document.getElementById('global-progress-text').textContent = `${globalPercentage}%`;
    }

    // ══════════════════════════════════════════════════════════════
    // CONTEXT MENU
    // ══════════════════════════════════════════════════════════════
    const contextMenu = document.getElementById('context-menu');
    let contextTarget = null;

    document.addEventListener('click', () => hideContextMenu());
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { hideContextMenu(); closeModal(); }
    });

    function showContextMenu(e, li) {
        e.preventDefault();
        contextTarget = li;
        const menuW = 170, menuH = 120;
        let x = e.clientX, y = e.clientY;
        if (x + menuW > window.innerWidth)  x = window.innerWidth  - menuW - 8;
        if (y + menuH > window.innerHeight) y = window.innerHeight - menuH - 8;
        contextMenu.style.top  = `${y}px`;
        contextMenu.style.left = `${x}px`;
        contextMenu.classList.add('visible');
    }

    function hideContextMenu() {
        contextMenu.classList.remove('visible');
        contextTarget = null;
    }

    document.getElementById('ctx-notes').addEventListener('click', () => {
        if (!contextTarget) return;
        openModal(contextTarget, contextTarget.querySelector('.task-text-content').textContent);
        hideContextMenu();
    });

    document.getElementById('ctx-edit').addEventListener('click', () => {
        if (!contextTarget) return;
        triggerEdit(contextTarget);
        hideContextMenu();
    });

    document.getElementById('ctx-delete').addEventListener('click', () => {
        if (!contextTarget) return;
        const teamSection = contextTarget.closest('.team-section');
        contextTarget.remove();
        if (teamSection) updateTeamProgress(teamSection.id);
        hideContextMenu();
        saveState(); 
    });

    // ══════════════════════════════════════════════════════════════
    // NOTES MODAL
    // ══════════════════════════════════════════════════════════════
    const modal          = document.getElementById('notes-modal');
    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalNoteText  = document.getElementById('modal-note-text');
    const modalSaveBtn   = document.getElementById('modal-save-btn');
    const modalCloseBtn  = document.getElementById('modal-close-btn');
    let currentNoteTarget = null;

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    modalSaveBtn.addEventListener('click', () => {
        if (!currentNoteTarget) return;
        const note = modalNoteText.value.trim();
        currentNoteTarget.dataset.note = note;
        const dot = currentNoteTarget.querySelector('.note-dot');
        dot.style.display = note ? 'inline-block' : 'none';
        dot.title = note;
        closeModal();
        saveState(); 
    });

    function openModal(li, taskText) {
        currentNoteTarget = li;
        modalTaskTitle.textContent = taskText;
        modalNoteText.value = li.dataset.note || '';
        modal.classList.add('open');
        setTimeout(() => modalNoteText.focus(), 50);
    }

    function closeModal() {
        modal.classList.remove('open');
        currentNoteTarget = null;
    }

    // ══════════════════════════════════════════════════════════════
    // HELPERS
    // ══════════════════════════════════════════════════════════════
    const colorPalette = ['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#6366f1','#8b5cf6','#d946ef','#f43f5e'];
    let colorIndex  = 0;
    let draggedItem = null;

    function getNextColor() {
        const color = colorPalette[colorIndex];
        colorIndex = (colorIndex + 1) % colorPalette.length;
        return color;
    }

    function updateTeamProgress(teamId) {
        const teamBlock = document.getElementById(teamId);
        if (!teamBlock) return;
        const allTasks   = teamBlock.querySelectorAll('.task-item').length;
        const doneTasks  = teamBlock.querySelector('[data-status="done"] .task-list').querySelectorAll('.task-item').length;
        const percentage = allTasks > 0 ? Math.round((doneTasks / allTasks) * 100) : 0;
        const bar  = teamBlock.querySelector('.progress-fill');
        const perc = teamBlock.querySelector('.percentage');
        if (bar)  bar.style.width    = `${percentage}%`;
        if (perc) perc.textContent   = `${percentage}%`;
        
        updateGlobalProgress(); 
    }

    function triggerEdit(li) {
        const textSpan = li.querySelector('.task-text-content');
        if (li.dataset.editing === 'true') return;
        li.dataset.editing = 'true';
        const currentText = textSpan.textContent;
        textSpan.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
        const inp = textSpan.querySelector('.edit-input');
        inp.focus();
        inp.addEventListener('keypress', (e) => { if (e.key === 'Enter') saveEdit(li, textSpan, inp); });
        inp.addEventListener('blur', () => saveEdit(li, textSpan, inp));
    }

    function saveEdit(li, textSpan, inp) {
        if (li.dataset.editing !== 'true') return;
        li.dataset.editing = 'false';
        textSpan.textContent = inp.value.trim() !== '' ? inp.value.trim() : t('unnamedTask');
        saveState(); 
    }

    // ══════════════════════════════════════════════════════════════
    // CREATE TEAM
    // ══════════════════════════════════════════════════════════════
    function createTeamBlock(teamName, existingData = null) {
        const teamId    = existingData ? existingData.id : ('team-' + Date.now());
        const teamColor = existingData ? existingData.color : getNextColor();
        const isAr      = currentLang === 'ar';

        const teamDiv = document.createElement('div');
        
        if (existingData && existingData.collapsed === false) {
            teamDiv.className = 'team-section';
        } else {
            teamDiv.className = 'team-section collapsed'; 
        }

        teamDiv.style.setProperty('--team-color', teamColor);
        teamDiv.id = teamId;

        teamDiv.innerHTML = `
            <div class="team-header">
                <div class="team-title-group">
                    <div class="team-title-row">
                        <button class="toggle-collapse-btn">▼</button>
                        <h2 class="team-title-text">${teamName}</h2>
                    </div>
                    <div class="team-actions">
                        <button class="edit-team-btn">${t('editTeam')}</button>
                        <button class="delete-team-btn">${t('deleteTeam')}</button>
                    </div>
                </div>
                <div class="percentage">0%</div>
            </div>
            <div class="progress-track">
                <div class="progress-fill"></div>
            </div>

            <div class="team-content-wrapper">
                <div class="team-content-inner">
                    <div class="team-kanban">
                        <div class="kanban-section" data-status="todo">
                            <h3>${t('todo')}</h3>
                            <ul class="task-list"></ul>
                        </div>
                        <div class="kanban-section" data-status="ongoing">
                            <h3>${t('ongoing')}</h3>
                            <ul class="task-list"></ul>
                        </div>
                        <div class="kanban-section" data-status="done">
                            <h3>${t('done')}</h3>
                            <ul class="task-list"></ul>
                        </div>
                    </div>
                    <div class="team-task-controls" style="flex-direction: ${isAr ? 'row-reverse' : 'row'}">
                        <input type="text" class="task-input" placeholder="${t('taskPlaceholder')}">
                        <button class="add-task-btn">${t('addTask')}</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('dynamic-teams-container').appendChild(teamDiv);

        const toggleBtn = teamDiv.querySelector('.toggle-collapse-btn');
        toggleBtn.addEventListener('click', () => {
            teamDiv.classList.toggle('collapsed');
            saveState(); 
        });

        teamDiv.querySelectorAll('.kanban-section').forEach(section => {
            const list = section.querySelector('.task-list');
            section.addEventListener('dragover', e => e.preventDefault());
            section.addEventListener('drop', e => {
                e.preventDefault();
                if (draggedItem && draggedItem.closest('.team-section').id === teamId) {
                    list.appendChild(draggedItem);
                    draggedItem.querySelector('.task-checkbox').checked = section.getAttribute('data-status') === 'done';
                    updateTeamProgress(teamId);
                    saveState(); 
                }
            });
        });

        const deleteTeamBtn = teamDiv.querySelector('.delete-team-btn');
        const editTeamBtn   = teamDiv.querySelector('.edit-team-btn');
        const teamTitleText = teamDiv.querySelector('.team-title-text');

        deleteTeamBtn.addEventListener('click', () => {
            teamDiv.remove();
            updateGlobalProgress();
            saveState(); 
        });

        editTeamBtn.addEventListener('click', () => {
            if (editTeamBtn.textContent === t('editTeam')) {
                teamTitleText.innerHTML = `<input type="text" class="edit-team-input" value="${teamTitleText.textContent}">`;
                editTeamBtn.textContent = t('saveTeam');
                teamTitleText.querySelector('.edit-team-input').focus();
            } else {
                const inp = teamTitleText.querySelector('.edit-team-input');
                teamTitleText.textContent = inp && inp.value.trim() !== '' ? inp.value.trim() : t('unnamedTeam');
                editTeamBtn.textContent = t('editTeam');
                saveState(); 
            }
        });

        const addTaskBtn = teamDiv.querySelector('.add-task-btn');
        const taskInput  = teamDiv.querySelector('.task-input');

        function buildTaskElement(taskData) {
            const li = document.createElement('li');
            li.className       = 'task-item';
            li.draggable       = true;
            li.dataset.note    = taskData.note || '';
            li.dataset.editing = 'false';

            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${taskData.checked ? 'checked' : ''}>
                <span class="task-text-content">${taskData.text}</span>
                <span class="note-dot" title="${taskData.note || ''}" style="display:${taskData.note ? 'inline-block' : 'none'}">📝</span>
            `;

            li.addEventListener('contextmenu', (e) => showContextMenu(e, li));

            li.addEventListener('dragstart', () => {
                draggedItem = li;
                setTimeout(() => li.classList.add('dragging'), 0);
            });
            li.addEventListener('dragend', () => {
                draggedItem = null;
                li.classList.remove('dragging');
            });

            li.addEventListener('click', (e) => {
                if (e.target === li.querySelector('.task-checkbox')) return;
                document.querySelectorAll('.task-item').forEach(item => {
                    if (item !== li) item.classList.remove('focused');
                });
                li.classList.toggle('focused');
            });

            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    teamDiv.querySelector('[data-status="done"] .task-list').appendChild(li);
                } else {
                    teamDiv.querySelector('[data-status="todo"] .task-list').appendChild(li);
                }
                updateTeamProgress(teamId);
                saveState(); 
            });

            return li;
        }

        function addNewTask() {
            const taskText = taskInput.value.trim();
            if (!taskText) return;

            const li = buildTaskElement({ text: taskText, status: 'todo', checked: false, note: '' });
            teamDiv.querySelector('[data-status="todo"] .task-list').appendChild(li);
            taskInput.value = '';

            teamDiv.classList.remove('collapsed');

            updateTeamProgress(teamId);
            saveState(); 
        }

        addTaskBtn.addEventListener('click', addNewTask);
        taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addNewTask(); });

        if (existingData && existingData.tasks) {
            existingData.tasks.forEach(task => {
                const li = buildTaskElement(task);
                const targetList = teamDiv.querySelector(`[data-status="${task.status}"] .task-list`);
                if (targetList) targetList.appendChild(li);
            });
        }
        
        updateTeamProgress(teamId);
    }

    const addTeamBtn   = document.getElementById('add-team-btn');
    const newTeamInput = document.getElementById('new-team-input');

    addTeamBtn.addEventListener('click', () => {
        const teamName = newTeamInput.value.trim();
        if (teamName) { 
            createTeamBlock(teamName); 
            newTeamInput.value = ''; 
            saveState(); 
        }
    });
    newTeamInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTeamBtn.click(); });

    // ══════════════════════════════════════════════════════════════
    // DARK MODE
    // ══════════════════════════════════════════════════════════════
    const themeToggleBtn = document.getElementById('theme-toggle');
    const isDarkSaved    = localStorage.getItem('theme') === 'dark';
    if (isDarkSaved) document.documentElement.setAttribute('data-theme', 'dark');

    themeToggleBtn.addEventListener('click', () => {
        const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (currentlyDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        applyLanguage();
    });

    // ══════════════════════════════════════════════════════════════
    // INIT
    // ══════════════════════════════════════════════════════════════
    applyLanguage();

    const savedKanbanData = localStorage.getItem('kanban_data');
    if (savedKanbanData) {
        try {
            const parsedData = JSON.parse(savedKanbanData);
            loadState(parsedData);
        } catch (e) {
            console.error("Could not load saved data.", e);
        }
    }
});
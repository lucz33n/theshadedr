(function() {
    const rows = document.querySelectorAll('.orders-table tbody tr');
    const actionsPanel = document.getElementById('order-actions');
    const selectedOrderNum = document.getElementById('selected-order-num');
    const priorityBtns = document.querySelectorAll('.priority-btn');
    const statusBtns = document.querySelectorAll('.status-btn');
    const noteModal = document.getElementById('note-modal');
    const noteContent = document.getElementById('note-content');
    const noteModalClose = document.getElementById('note-modal-close');
    let currentRow = null;

    // Row click handler
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rows.forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
            currentRow = row;
            const orderNum = row.querySelector('.order-number').textContent;
            selectedOrderNum.textContent = orderNum;
            actionsPanel.classList.add('visible');

            // Reset buttons based on current row state
            const currentPriority = row.querySelector('.priority-dot').classList.contains('green') ? 'green' :
                                    row.querySelector('.priority-dot').classList.contains('yellow') ? 'yellow' :
                                    row.querySelector('.priority-dot').classList.contains('red') ? 'red' : 'none';
            const currentStatus = row.querySelector('.status-badge').classList.contains('repaired') ? 'repaired' :
                                  row.querySelector('.status-badge').classList.contains('repairing') ? 'repairing' : 'pending';

            priorityBtns.forEach(btn => {1  
                btn.classList.remove('active');
                if (btn.dataset.priority === currentPriority) btn.classList.add('active', currentPriority);
            });

            statusBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.status === currentStatus) btn.classList.add('active');
            });
        });
    });

    // Priority buttons
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentRow) return;
            priorityBtns.forEach(b => b.classList.remove('active', 'green', 'yellow', 'red'));
            btn.classList.add('active', btn.dataset.priority);
            const dot = currentRow.querySelector('.priority-dot');
            dot.className = 'priority-dot ' + (btn.dataset.priority === 'none' ? '' : btn.dataset.priority);
        });
    });

    // Status buttons
    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentRow) return;
            statusBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const badge = currentRow.querySelector('.status-badge');
            badge.className = 'status-badge ' + btn.dataset.status;
            badge.textContent = btn.dataset.status === 'pending' ? 'Pending Repair' :
                                btn.dataset.status === 'repairing' ? 'Currently Repairing' : 'Repaired';

            // Show email prompt when status is changed to repaired
            if (btn.dataset.status === 'repaired') {
                const emailCustomer = confirm('Do you want to email the customer that the order is ready?');
                if (emailCustomer) {
                    alert('customer email sent!');
                } else {
                    alert('customer has not been notified');
                }
            }
        });
    });

    // Note buttons
    document.querySelectorAll('.note-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const note = btn.dataset.note;
            noteContent.textContent = note;
            noteModal.classList.add('open');
        });
    });

    noteModalClose && noteModalClose.addEventListener('click', () => {
        noteModal.classList.remove('open');
    });

    noteModal && noteModal.addEventListener('click', (e) => {
        if (e.target === noteModal) noteModal.classList.remove('open');
    });
})();
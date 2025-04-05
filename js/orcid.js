async function fetchPublications() {
    const orcidId = '0000-0002-1303-0669'; // My ORCID ID
    // const orcidId = '0000-0001-6097-6708'; // Caroline ORCID for testing
    const listElement = document.getElementById('publications-list');

    try {
        const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const works = data.group || [];

        if (works.length === 0) {
            listElement.innerHTML = '<li>No publications found.</li>';
            return;
        }

        listElement.innerHTML = ''; // Clear loading message

        works.forEach(work => {
            const summary = work['work-summary'][0];

            const title = summary?.title?.title?.value || 'Untitled';
            const year = summary['publication-date']?.year?.value || 'Unknown Year';
            const month = summary['publication-date']?.month?.value || 'Unknown Month';
            const date = new Date(0, month - 1); // Month is 0-based in Date object
            const monthName = date.toLocaleString('en-us', { month: 'long' });
            // Determine the publication URL (preprint or regular publication)
            let url = summary?.url?.value || '#';
            const workType = summary.type || '';
            let journal = summary['journal-title']?.value || 'Unknown Journal';

            // If it's a preprint and no journal title is available, label it as "Preprint"
            if (journal === 'Unknown Journal' && workType.toLowerCase() === 'preprint') {
                journal = 'Preprint';
            }

            // Display entire summary for debugging
            /*const debugContainer = document.createElement('div');
            debugContainer.innerHTML = `<pre>${JSON.stringify(summary, null, 2)}</pre>`;
            listElement.appendChild(debugContainer);*/

            const isPreprint = workType.toLowerCase() === 'preprint';
            const iconClass = isPreprint ? 'fa-wrench' : 'fa-book';
            const li = document.createElement('li');
            const iconColor = isPreprint ? '#f39c12' : '#007bff';

            // Render the icon as a clickable link, only the icon will be clickable
            li.className = 'publication';
            li.innerHTML = `
                          <div class="publication-content">
                            <a href="${url}" target="_blank" class="publication-icon-link" aria-label="${isPreprint ? 'Preprint' : 'Published Article'}">
                              <i class="fa ${iconClass}" style="color: ${iconColor};" aria-hidden="true"></i>
                            </a>
                            <div class="publication-details">
                              <strong>${title}</strong>
                              <p><em>${journal}, ${monthName} ${year}</em></p>
                            </div>
                          </div>
                        `;
            listElement.appendChild(li);
        });
    } catch (error) {
        listElement.innerHTML = `<li>Error fetching publications: ${error.message}</li>`;
        console.error(error);
    }
}

fetchPublications();

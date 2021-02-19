document.addEventListener('message', (e) => {
    const { data, origin } = e;
    // prevent messages from other domains for security
    if (origin !== "https://www.catalyzesv.org") {
      return
    }

    const mapApp = document.querySelector('#map');
    const projectName = document.querySelector('#title').textContent;

    if (data === 'ready') {
        const payload = {
            presetMarker: projectName
        };

        const formattedPayload = JSON.stringify(payload);

        mapApp.postMessage(formattedPayload, CONSTANTS.authorized_parent_domain);
    }
});
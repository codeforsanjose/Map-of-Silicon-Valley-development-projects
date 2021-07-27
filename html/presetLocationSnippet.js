// the wix velo version of the snippet

// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixLocation from 'wix-location';

$w.onReady(function () {
	// this should be the id of the html element containing the map
	const map = $w('#html1');

	// allow iframe to be fullscreened
	$w("#html1").allowFullScreen(); 

	// wait for the map iframe component to signal it's ready to receive
	map.onMessage( (e) => {
		const { data } = e;
		// this should be the id of the text element containing the Project Name to search,
		// match, and get the corresponding project from the mapbox dataset
		const projectName = $w('#text51').text || "";

		if (data === 'ready') {
			const payload = {
				presetMarker: projectName
			};

			const formattedPayload = JSON.stringify(payload);

			map.postMessage(formattedPayload);
		} else if (data.includes('{OPEN}=')) {
			// if it has the command string, we need to open the page url sent from iframe
			const [cmd = '', url = ''] = data.split('=');
			wixLocation.to(url);
		}
	});
});

// for non wix pages

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
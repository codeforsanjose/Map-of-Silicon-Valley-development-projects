// Filename: public/handleMapMessages.js
import wixLocation from 'wix-location';
import { versionCheck } from 'public/versionCheck'

/**
 * Snippet to handle messages from the iframe code of the project map.
 * import {handleMapMessages} from 'public/handleMapMessages.js'
 */
export function handleMapMessages() {
	// this should be the id of the html element containing the map
	const map = $w('#html1');

	// allow iframe to be fullscreened
	$w("#html1").allowFullScreen(); 

	// wait for the map iframe component to signal it's ready to receive
	map.onMessage( (e) => {
		const { data = '' } = e;
		// this should be the id of the text element containing the Project Name to search,
		// match, and get the corresponding project from the mapbox dataset
		const projectName = $w('#text51').text || "";

		if (data.includes('ready')) {

			const version = data.match(/\d.\d.\d/)
			const versionMatchingMessage = versionCheck(version)
			console.log(versionMatchingMessage)

			const payload = {
				presetMarker: projectName
			};

			const formattedPayload = JSON.stringify(payload);

			map.postMessage(formattedPayload);
		} else if (data.includes('{OPEN}=')) {
			// if it has the command string, we need to open the page url sent from iframe
			const [cmd = '', url = ''] = data.split('=');
			wixLocation.to(url.toString());
		}
	});
}

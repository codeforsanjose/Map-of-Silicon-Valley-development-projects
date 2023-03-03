// Filename: public/versionCheck.js

// this version should be incremented every time the map source code is updated or changed
// in both the code and here for checking
const CURRENT_MAP_VERSION = "1.0.0"

/**
 * Compares the passed version string with the current map version,
 * coercing the type to string if it isn't.
 * @param version (str) the version number to check agains the current version constant
 * @return (bool) whether the code version is current
 */
export function versionCheck(version = "", currentVersion = CURRENT_MAP_VERSION) {
    if (!version) {
        return "No version found. Cannot compare map code versions. Please update the map code with a version value."
    }

    const versionString = `${version}`.trim();
	const versionCompareResult = compareVersions(currentVersion, versionString)

    switch (versionCompareResult) {
        case "v1":
            return `Version defined in public/versionCheck is ahead of map code version on the page, ${versionString} < ${currentVersion}. Update the map code on the current page.` 
        case "v2":
            return `Map code version on the page is ahead of version defined in public/versionCheck, ${versionString} > ${currentVersion}. Update the version value in public/versionCheck.`
        case "equal":
            return `Map code version on this page matches the current latest version! This page: ${versionString} = Version Check: ${currentVersion}.`
        case "Invalid versions!":
            return `Unable to check versions, version format is probably wrong. It should be something like 1.0.0: This page: ${versionString} Version Check: ${currentVersion}.`
        default:
            console.log('Unable to check versions, something went wrong!')
    }
}

/**
 * Checks if 2 semver formatted version strings are equal or if 1 is more recent.
 * @param version1 (str) version number 1 to compare
 * @param version2 (str) version number 2 to compare
 * @return compareResult (str) 'v1' if the first value is larger, 'v2' if the second value is larger, or 'equal' if the same
 */
export function compareVersions(version1 = "0.0.0", version2 = "0.0.0") {
    try {
        if (version1 === version2) {
            return "equal"
        }
        
        const [v1Major, v1Minor, v1Patch] = version1.split('.')
        const [v2Major, v2Minor, v2Patch] = version2.split('.')
        
        const isMajorLarger = Number(v1Major) > Number(v2Major)
        const isMajorSame = Number(v1Major) === Number(v2Major)
        const isMinorLarger = Number(v1Minor) > Number(v2Minor)
        const isMinorSame = Number(v1Minor) === Number(v2Minor)
        const isPatchLarger = Number(v1Patch) > Number(v2Patch)
        
        if (isMajorLarger) {
            return 'v1'
        } else if (isMajorSame && isMinorLarger) {
            return 'v1'
        } else if (isMajorSame && isMinorSame && isPatchLarger) {
            return 'v1'
        } else {
            return 'v2'
        }
    } catch (e) {
        return 'Invalid versions!'
    }
}
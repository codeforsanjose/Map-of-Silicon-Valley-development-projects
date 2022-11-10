# Catalyze SV Project Tracker

A map of Silicon Valley development projects and project information in a easy to use, accessible format for the public, making it easier to see what local construction is going on and how it impacts the community. Primarily used as an embed on a webpage.

Built through the collaboration of [Catalyze SV](https://catalyzesiliconvalley.org/) and [Code for San Jose](https://www.codeforsanjose.com/) members.

View the deployed Project Tracker Map: [https://catalyzesiliconvalley.org/map](https://catalyzesiliconvalley.org/map)

Or see just the map deployed on Github pages from the main branch:
[https://codeforsanjose.github.io/Map-of-Silicon-Valley-development-projects/](https://codeforsanjose.github.io/Map-of-Silicon-Valley-development-projects/).

## How to Use

Open the map in your web browser to view it. Click on different development project icons on the map to view information related to a specific development project.

You can switch views by clicking on the buttons at the top of the map.

Navigation controls are also available on the top right corner, including zoom and fullscreen buttons.

You can rotate the map and change the angle of viewing by holding down the right mouse button and moving the cursor.

## How to Add Developments Projects to the Map

You'll need to login to the relevant [Mapbox](https://www.mapbox.com) account and update the data there.

This requires the use of Mapbox studio: [View Mapbox Studio Documentation](https://docs.mapbox.com/studio-manual/overview/)

Mapbox is a service that provides interactive mapping tools to developers. It's used in this project for the map and to maintain the data for the map.

Contact development team for more information and access.

### Contact Info

Slack Workspace: [https://www.codeforsanjose.slack.com](https://www.codeforsanjose.slack.com)
Join the #catalyze-sv-map channel

Meetup: [https://www.meetup.com/Code-for-San-Jose/](https://www.meetup.com/Code-for-San-Jose/)
Website: [https://www.codeforsanjose.com/](https://www.codeforsanjose.com/)

## Contributing

Please clone this repository to your local machine for your work.

For any contributions, please create a feature branch (a branch with your work on it). Name your branch descriptively, preferably with a category tag prefix:

* `feat` is for adding a new feature
* `fix` is for fixing a bug
* `refactor` is for changing code for peformance or convenience purpose (e.g. readibility)
* `chore` is for everything else (writing documentation, formatting, adding tests, cleaning useless code etc.)

Example: `feat/adding-auto-zoom` or `refactor/optimize-initial-render`

Feel free to be more specific in the tag for chore branches: `test` for adding tests, `docs` for docs changes, `style` for cleaning up whitespace/prettying up things, are other possible tags you can use. 

Smaller commits with a focus on a specfic chunk of work are appreciated. Descriptive commit messages are gold, feel free to use the above tag prefixes in your commit messages as well.

Once you have finished your work, pull the latest changes from develop and merge them into your work branch, resolving any conflicts. This ensures you have the latest changes that other people may have pushed while you were working. Push your feature branch up to the repository. On GitHub, open a PR (Pull Request) to the `develop` branch, which is basically requesting your branch gets merged into another branch using GitHub's code review process tools.

Please message someone to review/approve your contribution in the Slack channel. Once reviewed and approved, you can merge your changes into develop.

## Developer Notes

Everything--logic, styling, markup--is in the index.html file in the html directory.

App styling/CSS is contained within the 2nd pair of style tags in the `<head>`.

App logic/JS is contained within the `<script>` tags at the end of the `<body`.

Primarily used by Catalyze SV as an embed on pages of their website. All embeds on their website are rendered in iframes for security, so there is also some iframe communication code included.

### Updating Mapbox Styles

Updating the styling within the map itself is done through Mapbox Studio, a WYSIWIG tool for generating hosted map styles. Mapbox Studio can be accessed at [https://studio.mapbox.com/](https://studio.mapbox.com/) though you will need access to the Catalyze SV Mapbox account.

When updating the map styles, it may not show the changes instantly. Try clearing your browser cache first. If it still doesn't show, you can try some tricks that clear Mapbox's style caching. In the style editor for Mapbox studio, you can hit the setting button, uncheck source compositing in the menu, then publish those changes. Then, reopen the settings menu, check source compositing again, and then republish. This sometimes helps the cache clear go through.

### Migration Notes

**IMPORTANT: Make sure you have source compositing turned on in your Style.**

If Source compositing is not turned on, it will break the map. Turn it on by opening your style in Mapbox Studio, clicking on Settings in the top right, then scrolling down to the bottom where it says Source compositing. This feature compresses all the map layers together, increasing speed, but this app assumes we're accessing layers through the composite.

When switching data and style to another Mapbox account, you will need to make 2 changes in the `index.html` file.

In the `CONSTANTS` object, about 3/4 of the way down the file, you'll need to switch 2 values: `mapbox_key` and `mapbox_style_url`. It'll look something like this:

```
const CONSTANTS = {
      mapbox_key: 'pk.wieen2m0j1jz20gtia.qbvc4ri1oura82oyfzkyrdymnxgdy0dfojmaeszixgzjenyoymt5wm2iig6iejgn2eb2ixd',
      mapbox_style_url: 'mapbox://styles/ACCOUNTNAME/ckhdasjoiio12312938ajs923udjeq',
      ... // etc more stuff
```

`mapbox_key`: Get the public token from either the Mapbox.com account page or in Mapbox Studio with the style for the map open, click on the **Share** button and look for the field that says `Access Token`. Copy that token and replace the `mapbox_key` value in the `CONSTANTS` object.
`mapbox_style_url`: Get the style url from either the Mapbox Studio Styles page showing all the saved styles or with when you have the style open in Mapbox Studio. On the Styles page, you can just click the share button or the 3 dot button to view the Style Url. When you have the style actually open, you just click on the **Share** button in the top right and look for the field that says `Style URL`. Copy that url and replace the value of `mapbox_style_url` in the `CONSTANTS` object.

### Architecture Notes

The intended use case is within an iframe element due to limitations on the Wix platform. One of the main project requirements was the ability to integrate the app code onto Wix as the client uses it to make it easy for non-technical people to maintain their website. Wix does not allow direct access to the DOM, so raw markup and scripts must be run in an iframe element for sandboxing. Thus, the code assumes no access to a backend or even the page it is being rendered on.
[View Wix Velo Documentation](https://www.wix.com/velo/reference/api-overview)

This requires loading all external libraries and resources from CDNs. You'll notice most of it comes from cdnjs.

Built on the Mapbox GL API. Having the documentation available for reference will save your life: [View Mapbox GL API Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)

The app uses data and styles built with Mapbox's WYSIWIG style editor, and obtusely enterprise-grade web app that allows you to import data, do CRUD operations on data, generate tilesets, and style your map in a highly faceted manner. It does have a bit of a learning curve though, so you should read the documentation for it: [View Mapbox Studio Documentation](https://docs.mapbox.com/studio-manual/overview/)

Scaffolded using [HTML5 Boilerplate for Iframes.](https://github.com/sunnymui/html5-boilerplate-for-iframes)

### Quick Architecture Diagram

Catalyze Website --renders--> App Code (sets up basic ui and interaction handlers) --fetches map data--> Mapbox Data & Map Styling


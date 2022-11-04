# Catalyze SV Project Tracker

A map of Silicon Valley development projects and project information in a easy to use, accessible format for the public, making it easier to see what local construction is going on and how it impacts the community.

Built through the collaboration of [Catalyze SV](https://www.catalyzesv.org/) and [Code for San Jose](https://www.codeforsanjose.com/) members.

View the deployed Project Tracker Map: [https://www.catalyzesv.org/map](https://www.catalyzesv.org/map)

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

## Developer Notes

Everything--logic, styling, markup--is in the index.html file in the html directory.

App styling/CSS is contained within the 2nd pair of style tags in the `<head>`.

App logic/JS is contained within the `<script>` tags at the end of the `<body`.

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

### Tech Notes

The intended use case is within an iframe element due to limitations on the Wix platform. One of the main project requirements was the ability to integrate the app code onto Wix as the client uses it to make it easy for non-technical people to maintain their website. Wix does not allow direct access to the DOM, so raw markup and scripts must be run in an iframe element for sandboxing. Thus, the code assumes no access to a backend or even the page it is being rendered on.

This requires loading all external libraries and resources from CDNs. You'll notice most of it comes from cdnjs.

Built on the Mapbox GL API. Having the documentation available for reference will save your life: [View Mapbox GL API Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)

The app uses data and styles built with Mapbox's WYSIWIG style editor, and obtusely enterprise-grade web app that allows you to import data, do CRUD operations on data, generate tilesets, and style your map in a highly faceted manner. It does have a bit of a learning curve though, so you should read the documentation for it: [View Mapbox Studio Documentation](https://docs.mapbox.com/studio-manual/overview/)

Scaffolded using [HTML5 Boilerplate for Iframes.](https://github.com/sunnymui/html5-boilerplate-for-iframes)

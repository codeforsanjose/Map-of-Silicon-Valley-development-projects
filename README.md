# Catalyze SV Project Tracker

A map of Silicon Valley development projects and project information in a easy to use, accessible format for the public, making it easier to see what local construction is going on and how it impacts the community.

Built through the collaboration of [Catalyze SV](https://www.catalyzesv.org/) and [Code for San Jose](https://www.codeforsanjose.com/) members.

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

The intended use case is within an iframe element due to limitations on the Wix platform. One of the main project requirements was the ability to integrate the app code onto Wix as the client uses it to make it easy for non-technical people to maintain their website. Wix does not allow direct access to the DOM, so raw markup and scripts must be run in an iframe element for sandboxing. Thus, the code assumes no access to a backend or even the page it is being rendered on.

This requires loading all external libraries and resources from CDNs. You'll notice most of it comes from cdnjs.

This app is built on the Mapbox GL API. Having the documentation available for reference will save your life: [View Mapbox GL API Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)

The app uses data and styles built with Mapbox's WYSIWIG style editor, and obtusely enterprise-grade web app that allows you to import data, do CRUD operations on data, generate tilesets, and style your map in a highly faceted manner. It does have a bit of a learning curve though, so you should read the documentation for it: [View Mapbox Studio Documentation](https://docs.mapbox.com/studio-manual/overview/)

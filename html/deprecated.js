list_view.addEventListener('click', (e) => {
    const current_listing = e.target.closest('li');
    const current_project_id = current_listing.getAttribute('data-index');
    const current_feature = data.features[current_project_id];
    const current_page = current_feature.properties[CONSTANTS.webpage_key];

    // activate_feature({
    //   feature: data.features[current_project_id],
    //   listing: current_listing
    // }, state);

    sendMessageToParent(`{OPEN}=${current_page}`);
  });
          
          // When a click event occurs on a marker in the projects layer, show info
          map.on('click', CONSTANTS.layers.projects, (e) => {

            const current_project = e.features[0];
            const current_project_name = current_project.properties[CONSTANTS.projects_id_key];
            const current_project_page = current_project.properties[CONSTANTS.webpage_key];
    
            sendMessageToParent(`{OPEN}=${current_project_page}`);
    
            // activate_feature({
            //   feature: current_project,
            //   listing: state.listings[current_project_name]
            // }, state);
          });
    
          // add an event handler for clicks on workshops
          map.on('click', CONSTANTS.layers.workshops, (e) => {
    
            const current_workshop = e.features[0];
            const current_workshop_name = current_workshop.properties[CONSTANTS.projects_id_key];
            const current_workshop_page = current_workshop.properties[CONSTANTS.webpage_key];
    
            // activate_feature({
            //   feature: current_workshop,
            //   listing: state.listings[current_workshop_name]
            // }, state);
            
            sendMessageToParent(`{OPEN}=${current_workshop_page}`)
          });      

    // handle clicks on dev zone areas
      // map.on('click', CONSTANTS.layers.dev_zones, (e) => {
      //   const current_project_name = e.features[0].properties[CONSTANTS.projects_id_key];

      //   activate_feature({
      //     feature: data.features_map[current_project_name],
      //     listing: state.listings[current_project_name]
      //   }, state);
      // });
      
      // deprecate the dev zone interactivity for now

      // map.on('mouseenter', CONSTANTS.layers.dev_zones, function (e) {
      //   const current_project = e.features[0].properties[CONSTANTS.projects_id_key];
      //   const corresponding_feature = data.features_map[current_project];

      //   // Change the cursor to a pointer when the mouse is over the projects layer
      //   map.getCanvas().style.cursor = 'pointer';

      //   // don't want mouseovers to change the opened popup when sidebar is open
      //   if (!state.sidebar_open) {
      //     hoverize_feature(corresponding_feature, state);
      //   }
      // });

      // map.on('mouseleave', CONSTANTS.layers.dev_zones, deactivate.bind(this, state));
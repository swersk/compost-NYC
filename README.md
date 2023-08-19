# CompostNYC: A Proximity-Based 3D Visualization

CompostNYC is an immersive 3D visualization that maps the buildings within 400m (5 min walking) to a compost location in NYC. 

# Build Process

Phase 1: Data Collection
• Obtain composite site location data from NYC OpenData. On CARTO, add data to the data warehouse > organization data. CARTO generates the schemas automatically and plots the data on the map. This is the first spatial layer.
• Obtain NYC building data via PLUTO from Carto data warehouse > demo data.

Phase 2: Spatial Analyses

• Goal: Determine which buildings are within 400m (5min walking) of a compost bin.
• Create a buffer of 400m around each compost bin.  

Phase 3: Styling

• Buildings that are within 400m of a compost bin are colored green; else red.

Phase 4: Ship!
 


 

   

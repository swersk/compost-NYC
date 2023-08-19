# compostNYC

Phase 1: Data Collection
• Obtain composite site location data from NYC OpenData. On CARTO, add data to the data warehouse > organization data. CARTO generates the schemas automatically and plots the data on the map.
• Obtain NYC building data via PLUTO from Carto data warehouse > demo data.

Phase 2: Spatial Analyses

• Determine which buildings are within 400m of a compost bin using "Intersect and aggregate" SQL analysis. This finds overlapping geometries between two different sources.  

Phase 3: Styling

• Buildings that are within 400m of a compost bin are colored green; else red.

 

   

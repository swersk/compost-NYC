# CompostNYC: A Proximity-Based 3D Visualization

🗽🌱 Welcome!📍🌎 </br>
</br>
CompostNYC is an immersive 3D visualization of building distance from a compost location in NYC. <br>

# Build Process

## Phase 1: Data Collection</br>

• Obtain data for composite site location data and NYC buildingdata</br>

• Data sources: NYC OpenData and BigQuery>PLUTO from CARTO data warehouse</br>

## Phase 2: Spatial Analyses</br>

• Goal: Determine which buildings are within various distances of the nearest compost bin.</br>

• Write SQL commands to identify the buildings that are within 83m (1 block), 3 blocks, and 5 blocks.

```
SELECT
    b.* -- Select all columns from building_locations
FROM
    carto-demo-data.demo_tables.manhattan_pluto_data b,
    carto-dw-ac-zp3r15zi.shared.CompostNYC c
WHERE
    ST_DWithin(b.geom, c.geom, 400);
```

## Phase 3: Add a CARTO Layer</br>

• To visualize data using the CARTO API. </br>

## Phase 4: Render the 3D Map</br>

• Connect to Google Tiles API and render the photorealistic tiles on deck.gl.</br>

## Phase 5: Styling</br>

• After getting the data via CARTO API, color-code the buildings accordingly.</br>

## Phase 6: Ship!</br>

👉 Live link [here](https://compost-nyc.vercel.app/)

# Comments? Questions? Feedback? Message me!</br>

Lauren.Swersky@Gmail.com

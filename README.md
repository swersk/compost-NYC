# CompostNYC: A Proximity-Based 3D Visualization

🗽🌱 Welcome!📍🌎 </br>
</br>
CompostNYC is an immersive 3D visualization of buildings within 400m (5 min walking) of a compost location in NYC. <br>


# Build Process

## Phase 1: Data Collection</br>
• Obtain composite site location data from NYC OpenData. On CARTO, add data to the data warehouse > organization data. CARTO generates the schemas automatically and plots the data on the map. This is the first spatial layer.</br>

*Compost Locations:*
![compost_locations](https://github.com/swersk/compostNYC/assets/111617376/b6889b29-c2e5-46ce-9742-dc6d175005f5)


• Obtain NYC building data via PLUTO from CARTO data warehouse > demo data.</br>

*Buildings in NYC:*
![building_locations](https://github.com/swersk/compostNYC/assets/111617376/2b52d846-9d65-4a4e-9056-128f731c58e4)

## Phase 2: Spatial Analyses</br>

• Goal: Determine which buildings are within 400m (5min walking) of a compost bin.</br>
• Create a buffer of 400m around each compost bin.</br>

*Buffer (400m) around each compost site:*
![buffer_zone](https://github.com/swersk/compostNYC/assets/111617376/7b60c35f-eff1-48b3-8038-800a87f5883d)

Write SQL commands to identify the buildings that are within 83m (1 block), 250m (3min walking), and 400m (5min walking). 

```
SELECT
    b.* -- Select all columns from building_locations
FROM
    carto-demo-data.demo_tables.manhattan_pluto_data b,
    carto-dw-ac-zp3r15zi.shared.CompostNYC c
WHERE
    ST_DWithin(b.geom, c.geom, 400);
```

*Buildings within 400m of a compost bin:*
<img width="966" alt="Screenshot 2023-08-19 at 12 04 22 PM" src="https://github.com/swersk/compostNYC/assets/111617376/28b679b4-585f-4eaa-bf73-2568603d9365"> </br>

*Buildings within 250m of a compost bin:*
<img width="974" alt="Screenshot 2023-08-19 at 12 04 18 PM" src="https://github.com/swersk/compostNYC/assets/111617376/2202e3f4-b179-4d90-83d8-4b88fd94f939"></br>

*Buildings within 83m (1 street block) of a compost bin:*
<img width="931" alt="Screenshot 2023-08-19 at 12 04 12 PM" src="https://github.com/swersk/compostNYC/assets/111617376/de124256-7421-45b1-9757-0f050f80f973"></br>





## Phase 3: Styling</br>

• Buildings that are within 400m of a compost bin are colored green; else red.</br>

## Phase 4: Ship!
 
# Comments? Questions? Feedback? Message me! 
Lauren.Swersky@Gmail.com

 

   

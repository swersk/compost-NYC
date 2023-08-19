# CompostNYC: A Proximity-Based 3D Visualization

🗽🌱 Welcome!📍🌎 </br>
CompostNYC is an immersive 3D visualization that maps the buildings within 400m (5 min walking) to a compost location in NYC. <br>

---

# Build Process

## Phase 1: Data Collection</br>
• Obtain composite site location data from NYC OpenData. On CARTO, add data to the data warehouse > organization data. CARTO generates the schemas automatically and plots the data on the map. This is the first spatial layer.</br>
• Obtain NYC building data via PLUTO from Carto data warehouse > demo data.</br>

Compost Locations:
![compost_locations](https://github.com/swersk/compostNYC/assets/111617376/b6889b29-c2e5-46ce-9742-dc6d175005f5)

Buildings in NYC:
![building_locations](https://github.com/swersk/compostNYC/assets/111617376/2b52d846-9d65-4a4e-9056-128f731c58e4)

Buffer (400m) around each compost site:
![buffer_zone](https://github.com/swersk/compostNYC/assets/111617376/7b60c35f-eff1-48b3-8038-800a87f5883d)


## Phase 2: Spatial Analyses</br>

• Goal: Determine which buildings are within 400m (5min walking) of a compost bin.</br>
• Create a buffer of 400m around each compost bin.  

## Phase 3: Styling</br>

• Buildings that are within 400m of a compost bin are colored green; else red.</br>

## Phase 4: Ship!
 
# Comments? Questions? Feedback? Message me! 

 

   

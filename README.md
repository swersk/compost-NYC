# compostNYC

Steps: 
1. Obtain data for compost sites from NYC OpenData
2. On CARTO, add data to the data warehouse > organization data. CARTO generates the schemas automatically and plots the data on the map
3. Obtain NYC building data via PLUTO from Carto data warehouse > demo data.

Example query:
   ```
   SELECT * 
FROM `bigquery-public-data.geo_openstreetmap.planet_ways`
WHERE 'building' IN (SELECT key FROM UNNEST(all_tags))
AND ST_DWithin(bounding_area.geometry, planet_features.geometry, 0)  -- Adjust this to filter only buildings within NYC.
```

4. Import building data into CARTO
5. Proximity Analysis in CARTO using CARTO's SQL panel

Query to colorcode buidings; if < 400m distance, color is green; else red

```
UPDATE your_building_data_layer
SET proximity_color = CASE 
    WHEN EXISTS (
        SELECT 1 FROM your_compost_data_layer
        WHERE ST_DWithin(your_building_data_layer.geom, your_compost_data_layer.geom, 400)
    ) THEN 'green'
    ELSE 'red'
END;
```

6. Visualize the results!

   

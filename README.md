# Vehicle Inventory Management System

A simple web-based vehicle inventory management system built for a Perodua Bangladesh dealership use case. Created as a mini software development project (Week 7 assignment).

## Overview

This is a lightweight, browser-based prototype that lets a dealership staff member manage their vehicle stock — adding new vehicles, updating their status, searching the inventory, and viewing quick summary reports.

## Features

- **Add Vehicle** — Add new vehicles with make, model, year, price (BDT), and plate/VIN number
- **Update Status** — Change a vehicle's status between `Available`, `Reserved`, and `Sold` directly from the inventory table
- **Search Inventory** — Search by make, model, or plate/VIN, with an additional status filter
- **Generate Reports** — Live summary showing total units, breakdown by status, total inventory value, and average listed price

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks or libraries)

No backend, database, or installation required — the app runs entirely in the browser, with vehicle data held in memory during the session.

## Project Structure

```
vehicle-inventory-management-system/
├── index.html      # Page structure and layout
├── style.css       # Styling and theme
├── script.js       # App logic (add, update, search, report)
└── README.md
```

## How to Run

1. Clone or download this repository
2. Open `index.html` in any web browser (double-click the file, or use a tool like VS Code's Live Server extension)
3. That's it — no build steps or dependencies needed

## Notes

- Data is not saved permanently — refreshing the page resets the inventory back to the sample data included in `script.js`
- Prices are displayed in Bangladeshi Taka (৳), formatted using the lakh/crore numbering convention




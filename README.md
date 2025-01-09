
# 🌱 Advanced Green Transit Tracker

> A simple, one-page web application that promotes eco-friendly commuting by helping users calculate their CO2 emissions.

---

## 📌 Overview

**Advanced Green Transit Tracker** is a lightweight web app designed to raise awareness about the carbon footprint of daily travel. By allowing users to select their transportation mode, input journey distance, and choose weather conditions, the app estimates CO2 emissions and helps users track their sustainability progress.

It’s an educational tool built for simplicity — no accounts, no databases, just instant insights.

---

## ✨ Features

* 🚗 **Select Transportation Mode** (Car, Bus, Train, Bike, Walk)
* 📏 **Enter Distance** (in kilometers or miles)
* 🌦️ **Choose Weather Conditions** (Sunny, Rainy, Snowy, etc.)
* ♻️ **Instant CO2 Emission Estimate**
* 🌲 **Tree Offset Visualization**
* 🎯 **Set & Track Monthly CO2 Goals**
* 📈 **Basic Emission Summary for User’s Journeys** *(stored temporarily in session)*

---

## ⚙️ Tech Stack

* **React** – Component-based UI
* **TypeScript** – Safer code with static typing
* **Tailwind CSS** – Quick and responsive styling
* **Vite** – Fast development build tool

> 💡 Note: This is a single-page app. All logic and data are handled on the frontend only. No server, database, or login system is included.

---

## 📐 CO2 Calculation


emissions = baseEmission * distance * weatherMultiplier


* Example base values:

  * Car: 404g/km
  * Train: 80g/km

* Weather multiplier:

  * Sunny: 1.0
  * Rainy: 1.2
  * Snowy: 1.3

* Tree offset: 48,000g CO2/year/tree

---

## 🖼️ UI Highlights

* Simple layout with clean buttons and icons
* Instant result updates after each input
* Small visual chart or summary to show monthly goal progress

---

## 🚀 Getting Started

```bash
git clone https://github.com/mahendra8432/Advanced-Green-Transit---Tracker.git
cd Advanced-Green-Transit---Tracker
npm install
npm run dev
```

---

## 📌 Limitations

* No real-time API integrations (weather/emissions)
* No user login or persistent storage
* All data is cleared on page refresh

---

## 🔮 Future Improvements 

* Add more transport types (e.g., electric vehicles)
* Save data using localStorage or a small backend
* Integrate real-time weather API
* Build a mobile-friendly version

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Mahendra Shrimant Bansode**
📧 [msbansode8432@gmail.com](mailto:msbansode8432@gmail.com)

---
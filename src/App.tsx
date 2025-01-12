import React, { useState, useEffect } from 'react';
import {
  Bike, Bus, Car, TreePine, ArrowRight, Leaf,
  Train, User, CloudRain, Thermometer,
  TrendingUp, Calendar, Target, History,
} from 'lucide-react';

interface Journey {
  mode: string;
  distance: number;
  date: string;
  emissions: number;
  weather: string;
}

interface WeatherImpact {
  [key: string]: number;
  sunny: number;
  rainy: number;
  snowy: number;
  windy: number;
}

function App() {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [distance, setDistance] = useState<number>(5);
  const [journeyHistory, setJourneyHistory] = useState<Journey[]>([]);
  const [weather, setWeather] = useState<string>('sunny');
  const [monthlyGoal, setMonthlyGoal] = useState<number>(500); // kg CO2
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

  // Weather impact factors on emissions (multipliers)
  const weatherImpact: WeatherImpact = {
    sunny: 1,
    rainy: 1.2,
    snowy: 1.4,
    windy: 1.1
  };

  const transportModes = [
    { icon: Car, mode: 'car', label: 'Car', baseEmission: 404 },
    { icon: Bus, mode: 'bus', label: 'Bus', baseEmission: 140 },
    { icon: Train, mode: 'train', label: 'Train', baseEmission: 80 },
    { icon: Bike, mode: 'Bicycle', label: 'Bicycle', baseEmission: 0 },
    { icon: User, mode: 'walk', label: 'Walk', baseEmission: 0 }
  ];

  const calculateEmissions = (mode: string, dist: number, weatherCondition: string = 'sunny') => {
    const baseEmissions = transportModes.find(m => m.mode === mode)?.baseEmission || 0;
    const weatherMultiplier = weatherImpact[weatherCondition as keyof WeatherImpact];
    return ((baseEmissions * dist * weatherMultiplier)).toFixed(1);
  };

  const calculateTreesNeeded = (emissions: number) => {
    return (emissions / 48000).toFixed(2);
  };

  const getTotalMonthlyEmissions = () => {
    const currentMonth = new Date().getMonth();
    return journeyHistory
      .filter(journey => new Date(journey.date).getMonth() === currentMonth)
      .reduce((total, journey) => total + journey.emissions, 0);
  };

  const getEmissionsByMode = () => {
    return transportModes.map(mode => ({
      mode: mode.mode,
      total: journeyHistory
        .filter(journey => journey.mode === mode.mode)
        .reduce((sum, journey) => sum + journey.emissions, 0)
    }));
  };

  const saveJourney = () => {
    if (!selectedMode) return;
    
    const emissions = Number(calculateEmissions(selectedMode, distance, weather));
    const newJourney: Journey = {
      mode: selectedMode,
      distance,
      date: new Date().toISOString(),
      emissions,
      weather
    };
    
    setJourneyHistory(prev => [...prev, newJourney]);
  };

  const getProgressToGoal = () => {
  const monthlyEmissions = getTotalMonthlyEmissions();
  const monthlyEmissionsInKg = monthlyEmissions / 1000; // Convert grams to kilograms
  const progress = (monthlyEmissionsInKg / monthlyGoal) * 100;
  return Math.min(Math.max(progress, 0), 100); // Ensure the value is between 0 and 100
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">Advanced Green Transit Tracker</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make informed commuting choices with advanced analytics and real-time environmental impact tracking.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Journey Planner */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Plan Your Journey
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (miles)
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="block text-center mt-2 text-gray-600">{distance} miles</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weather Conditions
                </label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="sunny">Sunny</option>
                  <option value="rainy">Rainy</option>
                  <option value="snowy">Snowy</option>
                  <option value="windy">Windy</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {transportModes.map(({ icon: Icon, mode, label }) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedMode === mode
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <span className="block text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={saveJourney}
                disabled={!selectedMode}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Save Journey
              </button>
            </div>
          </div>

          {/* Real-time Impact */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Real-time Impact
            </h2>
            
            {selectedMode ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {transportModes.map(({ icon: Icon, mode }) => 
                      selectedMode === mode && <Icon key={mode} className="w-6 h-6 text-gray-700" />
                    )}
                    <span className="text-lg capitalize">{selectedMode}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {calculateEmissions(selectedMode, distance, weather)}g
                    </div>
                    <div className="text-sm text-gray-500">CO2 emissions</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CloudRain className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-medium">Weather Impact</div>
                      <div className="text-sm text-gray-600">
                        {weather === 'sunny' ? 'Optimal conditions' : `${Math.round((weatherImpact[weather] - 1) * 100)}% increased emissions`}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedMode !== 'bike' && selectedMode !== 'walk' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <TreePine className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium">Trees needed to offset yearly impact:</div>
                      <div className="text-lg text-green-700">
                        {calculateTreesNeeded(Number(calculateEmissions(selectedMode, distance, weather)) * 365)} trees
                      </div>
                    </div>
                  </div>
                )}

                {(selectedMode === 'bike' || selectedMode === 'walk') && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-center text-green-700">
                      <Leaf className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">Congratulations!</div>
                      <div>You're making a zero-emission journey!</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a transport mode to see its environmental impact
              </div>
            )}
          </div>

          {/* Analytics Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Monthly Analytics
            </h2>

            <div className="space-y-6">
              {/* Monthly Goal Progress */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Goal Progress</span>
                  <span className="text-sm text-gray-600">
                    {(getTotalMonthlyEmissions()/1000).toFixed(1)}kg / {monthlyGoal}kg
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${getProgressToGoal()}%` }}
                  ></div>
                </div>
              </div>

              {/* Recent Journeys */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recent Journeys
                  </h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {journeyHistory.slice(-5).reverse().map((journey, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded-lg text-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {transportModes.map(({ icon: Icon, mode }) => 
                            journey.mode === mode && <Icon key={mode} className="w-4 h-4" />
                          )}
                          <span>{journey.distance} miles</span>
                        </div>
                        <span className="text-gray-600">{journey.emissions.toFixed(1)}g CO2</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emissions by Mode */}
              <div>
                <h3 className="font-medium mb-4">Emissions by Mode</h3>
                <div className="space-y-2">
                  {getEmissionsByMode()
                    .filter(({ total }) => total > 0)
                    .map(({ mode, total }) => (
                      <div key={mode} className="flex justify-between items-center text-sm">
                        <span className="capitalize">{mode}</span>
                        <span className="text-gray-600">{total.toFixed(1)}g CO2</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
'use client';

import { useState } from 'react';

type DashboardState = 'empty' | 'breakfast' | 'breakfast-lunch' | 'over-limit' | 'on-target' | 'mixed' | 'dark';

interface MacroData {
  name: string;
  consumed: number;
  target: number;
  unit: string;
  status: 'optimal' | 'warning' | 'over';
}

const dashboardStates: Record<DashboardState, {
  caloriesRemaining: number;
  caloriesTarget: number;
  caloriesConsumed: number;
  maintenanceCalories: number;
  macros: MacroData[];
  meals: Array<{
    name: string;
    time: string;
    cals: number;
    suggestion: string;
    ingredients: string[];
  }> | null;
}> = {
  empty: {
    caloriesRemaining: 1600,
    caloriesTarget: 1600,
    caloriesConsumed: 0,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 0, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 0, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 0, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 0, target: 80, unit: 'g', status: 'optimal' },
    ],
    meals: null,
  },
  breakfast: {
    caloriesRemaining: 1200,
    caloriesTarget: 1600,
    caloriesConsumed: 400,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 0, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 0, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 42, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 0, target: 80, unit: 'g', status: 'optimal' },
    ],
    meals: [
      {
        name: 'Breakfast',
        time: '~400 kcal',
        cals: 400,
        suggestion: 'Oatmeal & Eggs:\nYou hit your protein goal, which is vital for weight loss target. To make dinner even better, try to double the green veggies.',
        ingredients: ['1/2 cup rolled oats', '1/2 cup berries', '2 scrambled eggs'],
      },
    ],
  },
  'breakfast-lunch': {
    caloriesRemaining: 650,
    caloriesTarget: 1600,
    caloriesConsumed: 950,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 22, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 7, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 42, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 15, target: 80, unit: 'g', status: 'optimal' },
    ],
    meals: [
      {
        name: 'Breakfast',
        time: '~400 kcal',
        cals: 400,
        suggestion: 'Oatmeal & Eggs:\nYou hit your protein goal, which is vital for weight loss target. To make dinner even better, try to double the green veggies.',
        ingredients: ['1/2 cup rolled oats', '1/2 cup berries', '2 scrambled eggs'],
      },
      {
        name: 'Lunch',
        time: '~550 kcal',
        cals: 550,
        suggestion: 'Chicken Quinoa Bowl:\n150g grilled chicken breast\n1/2 cup cooked quinoa\nFresh spinach and lemon vinaigrette.',
        ingredients: ['150g grilled chicken breast', '1/2 cup cooked quinoa', 'Fresh spinach', 'Lemon vinaigrette'],
      },
    ],
  },
  'over-limit': {
    caloriesRemaining: 650,
    caloriesTarget: 1600,
    caloriesConsumed: 950,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 70, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 16, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 87, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 33, target: 80, unit: 'g', status: 'warning' },
    ],
    meals: [
      {
        name: 'Lunch',
        time: '~550 kcal',
        cals: 550,
        suggestion: 'Salmon & Sweet Potato:\n170g baked salmon fillet,\n150g roasted sweet potato,\n1 tsp olive oil.',
        ingredients: ['170g baked salmon fillet', '150g roasted sweet potato', '1 tsp olive oil'],
      },
    ],
  },
  'on-target': {
    caloriesRemaining: 650,
    caloriesTarget: 1600,
    caloriesConsumed: 950,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 22, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 7, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 42, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 15, target: 80, unit: 'g', status: 'optimal' },
    ],
    meals: [
      {
        name: 'Lunch',
        time: '~550 kcal',
        cals: 550,
        suggestion: 'Great Lunch!\nYou hit your protein goal, which is vital for weight loss target. To make dinner even better, try to double the green veggies.',
        ingredients: ['150g grilled chicken breast', '1/2 cup cooked quinoa', 'Fresh spinach'],
      },
    ],
  },
  mixed: {
    caloriesRemaining: 650,
    caloriesTarget: 1600,
    caloriesConsumed: 950,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 70, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 16, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 87, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 33, target: 'warning' } as any,
    ],
    meals: [
      {
        name: 'Lunch',
        time: '~550 kcal',
        cals: 550,
        suggestion: 'Salmon & Sweet Potato:\n170g baked salmon fillet,\n150g roasted sweet potato,\n1 tsp olive oil.',
        ingredients: ['170g baked salmon fillet', '150g roasted sweet potato', '1 tsp olive oil'],
      },
    ],
  },
  dark: {
    caloriesRemaining: 650,
    caloriesTarget: 1600,
    caloriesConsumed: 950,
    maintenanceCalories: 2300,
    macros: [
      { name: 'PROTEIN', consumed: 70, target: 150, unit: 'g', status: 'optimal' },
      { name: 'FIBRE', consumed: 16, target: 25, unit: 'g', status: 'optimal' },
      { name: 'CARBOHYDRATES', consumed: 87, target: 300, unit: 'g', status: 'optimal' },
      { name: 'DIETARY FATS', consumed: 33, target: 80, unit: 'g', status: 'warning' },
    ],
    meals: null,
  },
};

export default function Dashboard() {
  const [currentState, setCurrentState] = useState<DashboardState>('empty');
  const state = dashboardStates[currentState];
  const isDark = currentState === 'dark';

  const getProgressPercentage = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100);
  };

  const getStatusColor = (status: string, consumed: number, target: number) => {
    if (consumed >= target) return 'bg-red-500';
    if (consumed >= target * 0.8) return 'bg-yellow-400';
    return 'bg-gray-300';
  };

  const getStatusIndicator = (status: string) => {
    if (status === 'warning') return '⚠️';
    if (status === 'over') return '🔴';
    return '✓';
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* State selector */}
      <div className="mb-8">
        <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
          Test Different States:
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(dashboardStates).map((stateKey) => (
            <button
              key={stateKey}
              onClick={() => setCurrentState(stateKey as DashboardState)}
              className={`px-4 py-2 rounded font-medium transition ${
                currentState === stateKey
                  ? 'bg-blue-500 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {stateKey.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Card */}
      <div
        className={`max-w-md mx-auto rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              CALORIES REMAINING
            </p>
            <p className={`text-3xl font-bold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
              {state.caloriesRemaining} kcal left
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Target {state.caloriesTarget}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Maintenance {state.maintenanceCalories}
            </p>
          </div>
        </div>

        {/* Macros */}
        <div className="space-y-4 mb-6">
          {state.macros.map((macro) => (
            <div key={macro.name}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  {macro.name}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {macro.consumed}g
                </span>
              </div>
              <div className={`flex items-center gap-2 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <div
                  className={`h-full ${getStatusColor(macro.status, macro.consumed, macro.target)}`}
                  style={{ width: `${getProgressPercentage(macro.consumed, macro.target)}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Optimal
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {macro.target}{macro.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Meals */}
        {state.meals ? (
          <div className="space-y-4">
            {state.meals.map((meal, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-4 ${isDark ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'} border ${isDark ? 'border-blue-800' : 'border-blue-200'}`}
              >
                <p className={`font-semibold mb-1 ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                  {meal.name} - {meal.time}
                </p>
                <p className={`text-sm ${isDark ? 'text-blue-100' : 'text-blue-800'} whitespace-pre-line`}>
                  {meal.suggestion}
                </p>
              </div>
            ))}
            <button
              className={`w-full py-2 rounded font-medium transition ${isDark ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              + Log This Meal
            </button>
          </div>
        ) : (
          <button
            className={`w-full py-3 rounded font-medium transition ${isDark ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
          >
            Add First Meal
          </button>
        )}
      </div>
    </div>
  );
}

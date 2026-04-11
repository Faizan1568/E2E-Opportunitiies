/**
 * Utility to extract city from address strings
 */
export const extractCity = (address) => {
  if (!address) return '';
  const cities = ['Mumbai', 'Navi Mumbai', 'Pune', 'Thane', 'Nagpur', 'Delhi', 'Bangalore', 'Karnataka', 'Gujarat', 'Rajasthan', 'Bihar'];
  for (const city of cities) {
    if (address.toLowerCase().includes(city.toLowerCase())) return city;
  }
  
  // Try to find common pattern "City-XXXXXX"
  const match = address.match(/([a-zA-Z\s]+)-\d{6}/);
  if (match) {
    const cityName = match[1].split(',').pop().trim();
    if (cityName) return cityName;
  }
  
  return '';
};
/**
 * Utility to extract state from eligibility descriptions
 */
export const extractState = (eligibility) => {
  if (!eligibility) return '';
  const states = [
    'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 
    'Gujarat', 'Rajasthan', 'Bihar', 'West Bengal', 'Madhya Pradesh', 
    'Kerala', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Telangana'
  ];
  
  const text = eligibility.toLowerCase();
  for (const state of states) {
    if (text.includes(state.toLowerCase())) return state;
  }
  
  return '';
};

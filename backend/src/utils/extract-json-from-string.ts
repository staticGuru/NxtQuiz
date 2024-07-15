export const extractJsonFromText = <T>(text: string): T | null => {
  // Regular expression to match JSON objects or arrays
  const jsonRegex = /\{.*?\}|\[.*?\]/s;

  // Find the JSON object/array in the text
  const match = text.match(jsonRegex);

  // If match is found, parse it as JSON
  if (match) {
    try {
      const jsonObject = JSON.parse(match[0]) as T;
      return jsonObject;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  } else {
    console.error('No JSON found in the text.');
  }

  return null;
};

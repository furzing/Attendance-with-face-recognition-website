export const checkBrowserCompatibility = async () => {
  // Check if running in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('This application requires a browser environment');
  }

  // Check for camera access
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop()); // Clean up
    return true;
  } catch (error) {
    throw new Error('Camera access is required for face recognition. Please allow camera access.');
  }
};
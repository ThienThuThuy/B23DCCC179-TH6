export const STORAGE_KEY_DESTINATIONS = 'destinations';
export const getDestinations = (): Destination[] => {
    const saved = localStorage.getItem(STORAGE_KEY_DESTINATIONS);
    return saved ? JSON.parse(saved) : [];
};
export const saveDestinations = (destinations: Destination[]) => {
    localStorage.setItem(STORAGE_KEY_DESTINATIONS, JSON.stringify(destinations));
};
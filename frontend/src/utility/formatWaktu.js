export const formatWaktu = (isaDate) => {
    const date = new Date(isaDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
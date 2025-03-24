function saveLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Gagal menyimpan ke localStorage:", error);
    }
}

function getLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Gagal mengambil data dari localStorage:", error);
        return null;
    }
}

export { getLocalStorage, saveLocalStorage }
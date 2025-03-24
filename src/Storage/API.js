import axios from "axios";

const ikey = "blablabla3-bleb2leble-blubl1ublu-SALAMALEKUM-MALEKUM-SALAMMM-QUA33SONGGGGGG37";

const savePlayerData = async (playerId, data) => {
    try {
        const response = await axios.post(`/api/v1/data/${playerId}`, data, {
            headers: {
                "x-api-key": ikey, // Ganti dengan API key Anda
            },
        });
        // console.log("Data saved:", response.data);
        return true;
    } catch (error) {
        console.error("Error saving data:", error);
        console.log(data)
        return false;
    }
};

const getPlayerData = async (playerId) => {
    try {
        const response = await axios.get(`/api/v1/data/${playerId}`, {
            headers: {
                "x-api-key": ikey, // Ganti dengan API key Anda
            },
        });
        
        if(response.data.status === "error") {
            return false;
        } 

        return response.data;
    } catch (error) {
        // console.error("Error retrieving data:", error);
        return false;
    }
};

// // Contoh penggunaan
// const playerId = '12345';
// const data = { score: 100, level: 5 };

// savePlayerData(playerId, data);
// getPlayerData(playerId);
export { savePlayerData, getPlayerData };
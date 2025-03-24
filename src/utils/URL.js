import axios from 'axios';

function parseURL(url) {
    if(!url.toLowerCase().startsWith("https://aki-gm-resources-oversea.aki-game.net")) {
        return null;
    }

    const queryString = url.split("#")[1].split("?")[1]; 
    const params = new URLSearchParams(queryString);

    const data = {
        svr_id: params.get("svr_id"),
        player_id: params.get("player_id"),
        lang: params.get("lang"),
        gacha_id: params.get("gacha_id"),
        gacha_type: params.get("gacha_type"),
        record_id: params.get("record_id"),
        resources_id: params.get("resources_id")
    };

    // console.log(data);
    return data
}



async function fetchData(serverId, playerId, recordId, cardPoolId, languageCode) {
    const CurrentBanner = 8;
    const url = "/api/v1/history";
    const body = {
        serverId,
        playerId,
        recordId,
        cardPoolId,
        languageCode,
        cardPoolType: 1,
    };
    try {

        let mergedData = { status: 0, message: "success", data: [], duplicates: [] };
        let resonatorCount = {};
        
        let allData = [];
        for (let cardPoolType = 1; cardPoolType <= CurrentBanner; cardPoolType++) {
            let requestBody = { ...body, cardPoolType };
            
            const response = await axios.post(url, requestBody, {
                headers: { "Content-Type": "application/json" }
            });
            
            if(response.data.length < 1) {
                return { status: 1, message: "error", data: [], duplicates: [] };;
            }

            if (response.data && Array.isArray(response.data.data)) {
                allData = [...allData, ...response.data.data];
            }
        }
        
        allData.forEach(item => {
            if (item.resourceType === "Resonator") {
                if (!resonatorCount[item.name]) {
                    resonatorCount[item.name] = {
                        count: 0,
                        data: item
                    };
                }
                resonatorCount[item.name].count++;
            } else {

                mergedData.data.push(item);
            }
        });
        
        
        Object.entries(resonatorCount).forEach(([name, info]) => {
            mergedData.duplicates.push({
                id: mergedData.duplicates.length + 1,
                name: name,
                count: info.count,
                qualityLevel: info.data.qualityLevel,
                resourceId: info.data.resourceId,
                sequences: info.count > 1 ? info.count - 1 : 0, // sequences = count - 1 jika count > 1
                resourceType: info.data.resourceType,
                time: info.data.time
            });
        });
        
        return mergedData;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return { status: 1, message: "error", data: [], duplicates: [] };
    }
}

export { fetchData, parseURL };

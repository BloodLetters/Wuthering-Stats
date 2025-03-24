function formatter(data, obtained = true) {
    if (!Array.isArray(data)) {
        throw new Error("Data harus berupa array");
    }

    const rarityMap = {
        'Encore': 5, 'Mortefi': 4, 'Baizhi': 4, 'Brant': 5, 'Camellya': 5,
        'Lumi': 4, 'Phoebe': 5, 'Jianxin': 5, 'Jinhsi': 5, 'Jiyan': 5,
        'Verina': 5, 'Calcharo': 5, 'Carlotta': 5, 'Roccia': 5, 'Chixia': 4,
        'Danjin': 4, 'Aalto': 4, 'Sanhua': 4, 'Shorekeeper': 5, 'Taoqi': 4,
        'Xiangli Yao': 5, 'Yangyang': 4, 'Yinlin': 5, 'Youhu': 4, 'Yuanwu': 4,
        'Zhezhi': 5
    };

    return data.map((item, index) => {
        let image = '';
        switch (item.name) {
            case 'Encore': image = 'Assets\\Portrait\\T_IconRole_Pile_anke_UI.png'; break;
            case 'Mortefi': image = 'Assets\\Portrait\\T_IconRole_Pile_baer_UI.png'; break;
            case 'Baizhi': image = 'Assets\\Portrait\\T_IconRole_Pile_bailian_UI.png'; break;
            case 'Brant': image = 'Assets\\Portrait\\T_IconRole_Pile_Bulante_UI.png'; break;
            case 'Camellya': image = 'Assets\\Portrait\\T_IconRole_Pile_chun_UI.png'; break;
            case 'Lumi': image = 'Assets\\Portrait\\T_IconRole_Pile_dengdeng_UI.png'; break;
            case 'Phoebe': image = 'Assets\\Portrait\\T_IconRole_Pile_Feibi_UI.png'; break;
            case 'Jianxin': image = 'Assets\\Portrait\\T_IconRole_Pile_jiexin_UI.png'; break;
            case 'Jinhsi': image = 'Assets\\Portrait\\T_IconRole_Pile_jinxi_UI.png'; break;
            case 'Jiyan': image = 'Assets\\Portrait\\T_IconRole_Pile_jiyan_UI.png'; break;
            case 'Verina': image = 'Assets\\Portrait\\T_IconRole_Pile_jueyuan_UI.png'; break;
            case 'Calcharo': image = 'Assets\\Portrait\\T_IconRole_Pile_kakaluo_UI.png'; break;
            case 'Carlotta': image = 'Assets\\Portrait\\T_IconRole_Pile_kelaita_UI.png'; break;
            case 'Roccia': image = 'Assets\\Portrait\\T_IconRole_Pile_luokeke_UI.png'; break;
            case 'Chixia': image = 'Assets\\Portrait\\T_IconRole_Pile_maxiaofang_UI.png'; break;
            case 'Danjin': image = 'Assets\\Portrait\\T_IconRole_Pile_micai_UI.png'; break;
            case 'Aalto': image = 'Assets\\Portrait\\T_IconRole_Pile_qiushui_UI.png'; break;
            case 'Sanhua': image = 'Assets\\Portrait\\T_IconRole_Pile_shanhua_UI.png'; break;
            case 'Shorekeeper': image = 'Assets\\Portrait\\T_IconRole_Pile_shouanren_UI.png'; break;
            case 'Taoqi': image = 'Assets\\Portrait\\T_IconRole_Pile_taohua_UI.png'; break;
            case 'Xiangli Yao': image = 'Assets\\Portrait\\T_IconRole_Pile_xiangliyao_UI.png'; break;
            case 'Yangyang': image = 'Assets\\Portrait\\T_IconRole_Pile_yangyang_UI.png'; break;
            case 'Yinlin': image = 'Assets\\Portrait\\T_IconRole_Pile_yinlin_UI.png'; break;
            case 'Youhu': image = 'Assets\\Portrait\\T_IconRole_Pile_youhu_UI.png'; break;
            case 'Yuanwu': image = 'Assets\\Portrait\\T_IconRole_Pile_yuanwu_UI.png'; break;
            case 'Zhezhi': image = 'Assets\\Portrait\\T_IconRole_Pile_zhezhi_UI.png'; break;
            default: image = ''; break;
        }

        return {
            id: item.id || index + 1,
            name: item.name,
            image: image,
            rarity: rarityMap[item.name] || 4,
            obtained,
            resourceId: item.resourceId,
            sequences: item.count - 1,
            time: item.time
        };
    });
}

const getAllResonance = async () => {
    const characters = [
        'Encore', 'Mortefi', 'Baizhi', 'Brant', 'Camellya', 'Lumi', 'Phoebe', 'Jianxin', 'Jinhsi', 'Jiyan',
        'Verina', 'Calcharo', 'Carlotta', 'Roccia', 'Chixia', 'Danjin', 'Aalto', 'Sanhua', 'Shorekeeper', 'Taoqi',
        'Xiangli Yao', 'Yangyang', 'Yinlin', 'Youhu', 'Yuanwu', 'Zhezhi'
    ];

    const rawData = characters.map((name, index) => ({
        id: index + 1,
        name,
        qualityLevel: 5,
        resourceId: `res_${index + 1}`,
        count: 1,
        time: new Date().toISOString()
    }));

    return formatter(rawData, false);
};

export { formatter, getAllResonance }
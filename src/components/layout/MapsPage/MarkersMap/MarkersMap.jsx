import React, { useState } from "react";
import L, { popup } from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import SchoolVector from "./school-black-18dp.svg";
import CenterVector from "./account_balance-black-18dp.svg";
import "./MarkersMap.css";
import "leaflet/dist/leaflet.css";

const markers1 = [
    {
        "Flag": "TRUE",
        "School": "אור-לציון",
        "Address": "דרך ירושלים 1 רחובות",
        "Phone": "089352462",
        "X": "31.88808911",
        "Y": "34.81992042"
    },
    {
        "Flag": "TRUE",
        "School": "אור-לציון",
        "Address": "דרך ירושלים 1 רחובות",
        "Phone": "089352462",
        "X": "31.88808911",
        "Y": "34.81992042"
    },
    {
        "Flag": "TRUE",
        "School": "אמית הלל",
        "Address": "לחי 36 רחובות",
        "Phone": "089457796",
        "X": "31.89030869",
        "Y": "34.82304235"
    },
    {
        "Flag": "TRUE",
        "School": "אמית עמיחי",
        "Address": "מגיני הגליל 2 רחובות",
        "Phone": "089494097",
        "X": "31.88902246",
        "Y": "34.82377475"
    },
    {
        "Flag": "TRUE",
        "School": "אשכול פיס",
        "Address": "חנה אברך 25",
        "Phone": "089315481",
        "X": "31.89199689",
        "Y": "34.79804683"
    },
    {
        "Flag": "TRUE",
        "School": "בארי בשדה",
        "Address": "גבריאלוב 20",
        "Phone": "086889161",
        "X": "31.88743512",
        "Y": "34.78565016"
    },
    {
        "Flag": "TRUE",
        "School": "בגין",
        "Address": "צאלון 1 רחובות",
        "Phone": "089315828",
        "X": "31.89645954",
        "Y": "34.77293971"
    },
    {
        "Flag": "TRUE",
        "School": "בית יעקב",
        "Address": "נורדאו 14 רחובות",
        "Phone": "089451801",
        "X": "31.89435785",
        "Y": "34.81548373"
    },
    {
        "Flag": "TRUE",
        "School": "בית ספר עתיד",
        "Address": "חיים מורי 2",
        "Phone": "086220541",
        "X": "31.89514612",
        "Y": "34.79776365"
    },
    {
        "Flag": "TRUE",
        "School": "בית שלמה",
        "Address": "הורוביץ 3 קרית משה",
        "Phone": "089467025",
        "X": "31.88211819",
        "Y": "34.78718803"
    },
    {
        "Flag": "TRUE",
        "School": "בכור לוי",
        "Address": "הרב הרצוג פינת הנשיא הראשון",
        "Phone": "089475522",
        "X": "31.90353827",
        "Y": "34.81498885"
    },
    {
        "Flag": "TRUE",
        "School": "בן איש חיל",
        "Address": "זכריה מדר 28",
        "Phone": "089495183",
        "X": "31.88787455",
        "Y": "34.81611812"
    },
    {
        "Flag": "TRUE",
        "School": "בן גוריון",
        "Address": "שמחה הולצברג 4",
        "Phone": "089414549",
        "X": "31.87861626",
        "Y": "34.81601714"
    },
    {
        "Flag": "TRUE",
        "School": "בן צבי",
        "Address": "הרשינזון 25",
        "Phone": "089451452",
        "X": "31.88933071",
        "Y": "34.80860305"
    },
    {
        "Flag": "TRUE",
        "School": "בנות אסתר",
        "Address": "חפץ חיים 28 א'",
        "Phone": "089417640",
        "X": "31.88990471",
        "Y": "34.8246813"
    },
    {
        "Flag": "TRUE",
        "School": "בנות אסתר תיכון",
        "Address": "חפץ חיים 28",
        "Phone": "089452470",
        "X": "31.89023724",
        "Y": "34.82417649"
    },
    {
        "Flag": "TRUE",
        "School": "בני משה",
        "Address": "הגנה 46",
        "Phone": "089410017",
        "X": "31.89287266",
        "Y": "34.82319551"
    },
    {
        "Flag": "TRUE",
        "School": "בראשית ממד",
        "Address": "מרגולין רחובות",
        "Phone": "086171541",
        "X": "31.89612295",
        "Y": "34.82444594"
    },
    {
        "Flag": "TRUE",
        "School": "דה שליט",
        "Address": "מנוחה ונחלה 58",
        "Phone": "089379956",
        "X": "31.89965844",
        "Y": "34.81790061"
    },
    {
        "Flag": "TRUE",
        "School": "דה שליט ב'",
        "Address": "מילר 10 רחובות 76110",
        "Phone": "089379645",
        "X": "31.90050924",
        "Y": "34.81912764"
    },
    {
        "Flag": "TRUE",
        "School": "הראם",
        "Address": "נורדאו 14",
        "Phone": "089453040",
        "X": "31.89343387",
        "Y": "34.81566943"
    },
    {
        "Flag": "TRUE",
        "School": "הרצוג",
        "Address": "הר הצופים 70",
        "Phone": "089470954",
        "X": "31.89241994",
        "Y": "34.78209217"
    },
    {
        "Flag": "TRUE",
        "School": "השיטה",
        "Address": "הדגניות 28",
        "Phone": "089357799",
        "X": "31.87671255",
        "Y": "34.81405485"
    },
    {
        "Flag": "TRUE",
        "School": "ויצו",
        "Address": "ארלוזורוב 18",
        "Phone": "089335500",
        "X": "31.88605682",
        "Y": "34.806864"
    },
    {
        "Flag": "TRUE",
        "School": "ויצמן",
        "Address": "מרשוב 3 רחובות",
        "Phone": "089450251",
        "X": "31.89414346",
        "Y": "34.80429118"
    },
    {
        "Flag": "TRUE",
        "School": "חב\"ד יסודי בנות",
        "Address": "מדר 28 רחובות",
        "Phone": "086901756",
        "X": "31.88935973",
        "Y": "34.81940166"
    },
    {
        "Flag": "TRUE",
        "School": "חב\"ד בנים",
        "Address": "שטיינברג 10 רחובות",
        "Phone": "089491191",
        "X": "31.89163842",
        "Y": "34.81939217"
    },
    {
        "Flag": "TRUE",
        "School": "חב\"ד בנות",
        "Address": "נפתלי בן אפרים 1",
        "X": "31.88888963",
        "Y": "34.81979522"
    },
    {
        "Flag": "TRUE",
        "School": "יבניאלי",
        "Address": "החבורה 14 רחובות",
        "Phone": "089410181",
        "X": "31.8818338",
        "Y": "34.82015378"
    },
    {
        "Flag": "TRUE",
        "School": "יצחק נבון",
        "Address": "הר כנען 9, רחובות ההולנדית",
        "Phone": "086635009",
        "X": "31.89219422",
        "Y": "34.77685969"
    },
    {
        "Flag": "TRUE",
        "School": "ישיבת הדרום",
        "Address": "הגרא 10, רחובות",
        "Phone": "089474190",
        "X": "31.90290213",
        "Y": "34.81800344"
    },
    {
        "Flag": "TRUE",
        "School": "לוטם",
        "Address": "גד פיינשטיין",
        "Phone": "089415512",
        "X": "31.90513603",
        "Y": "34.79218121"
    },
    {
        "Flag": "TRUE",
        "School": "לוטם",
        "Address": "גד פיינשטיין",
        "Phone": "089415512",
        "X": "31.90513603",
        "Y": "34.79218121"
    },
    {
        "Flag": "TRUE",
        "School": "מאור מנחם",
        "Address": "חב\"ד 1 ת.ד 770 רחובות",
        "Phone": "089453656",
        "X": "31.89220451",
        "Y": "34.81907324"
    },
    {
        "Flag": "TRUE",
        "School": "מדעים",
        "Address": "דרך ירושלים 32",
        "Phone": "086373759",
        "X": "31.88917238",
        "Y": "34.83044013"
    },
    {
        "Flag": "TRUE",
        "School": "מעלות",
        "Address": "שי עגנון 1",
        "Phone": "089414169",
        "X": "31.88892839",
        "Y": "34.82065302"
    },
    {
        "Flag": "TRUE",
        "School": "נועם",
        "Address": "שד' הקיבוצים 2",
        "Phone": "089416534",
        "X": "31.88388348",
        "Y": "34.81724834"
    },
    {
        "Flag": "TRUE",
        "School": "ניצני המדע",
        "Address": "פרופ' צ'חנובר אהרון 4",
        "Phone": "089252310",
        "X": "31.90146453",
        "Y": "34.82271303"
    },
    {
        "Flag": "TRUE",
        "School": "נתיבות משה",
        "Address": "רייפן 1",
        "Phone": "089496321",
        "X": "31.88268388",
        "Y": "34.81023461"
    },
    {
        "Flag": "TRUE",
        "School": "תחכמוני",
        "Address": "מילר 10",
        "Phone": "089466181",
        "X": "31.90075743",
        "Y": "34.81951616"
    },
    {
        "Flag": "TRUE",
        "School": "שריד",
        "Address": "בר שאול 16",
        "Phone": "089475333",
        "X": "31.89801349",
        "Y": "34.81561191"
    },
    {
        "Flag": "TRUE",
        "School": "שפרינצק",
        "Address": "המעפיל 25 רחובות 76348",
        "Phone": "08462424",
        "X": "31.90049272",
        "Y": "34.79960289"
    },
    {
        "Flag": "TRUE",
        "School": "שזר",
        "Address": "בר לב 32 רחובות",
        "Phone": "089458918",
        "X": "31.88640494",
        "Y": "34.82737822"
    },
    {
        "Flag": "TRUE",
        "School": "שובו",
        "Address": "דוד אלעזר 11",
        "Phone": "089463582",
        "X": "31.8935496",
        "Y": "34.77759652"
    },
    {
        "Flag": "TRUE",
        "School": "שביט",
        "Address": "יעקב מזרחי",
        "Phone": "089475542",
        "X": "31.88450148",
        "Y": "34.79051602"
    },
    {
        "Flag": "TRUE",
        "School": "רמת אלון",
        "Address": "זכריה מדאר 26",
        "Phone": "089414167",
        "X": "31.88945075",
        "Y": "34.82033386"
    },
    {
        "Flag": "TRUE",
        "School": "רמון",
        "Address": "קרוננברג 3",
        "Phone": "089102709",
        "X": "31.87904716",
        "Y": "34.8124076"
    },
    {
        "Flag": "TRUE",
        "School": "רון ארד ברוח היי טק היי",
        "Address": "רחוב הר הצופים 10",
        "Phone": "086731439",
        "X": "31.89591708",
        "Y": "34.78000299"
    },
    {
        "Flag": "TRUE",
        "School": "רון ארד ברוח היי טק היי",
        "Address": "רחוב הר הצופים 10",
        "Phone": "086731439",
        "X": "31.89591708",
        "Y": "34.78000299"
    },
    {
        "Flag": "TRUE",
        "School": "קציר",
        "Address": "דב קלין 1 רחובות",
        "Phone": "089464431",
        "X": "31.89305951",
        "Y": "34.79630704"
    },
    {
        "Flag": "TRUE",
        "School": "קציר א",
        "Address": "חנה אברך 25",
        "Phone": "089471653",
        "X": "31.89174479",
        "Y": "34.79927735"
    },
    {
        "Flag": "TRUE",
        "School": "צביה",
        "Address": "הרב מאיר 1 רחובות",
        "Phone": "089451131",
        "X": "31.88811788",
        "Y": "34.81450669"
    },
    {
        "Flag": "TRUE",
        "School": "פרחי המדע",
        "Address": "יובל נאמן 106 רחובות",
        "Phone": "089109716",
        "X": "31.90460934",
        "Y": "34.82361164"
    },
    {
        "Flag": "TRUE",
        "School": "עץ החיים",
        "Address": "נדב דוד 5 רחובות",
        "X": "31.88554457",
        "Y": "34.78565755"
    },
    {
        "Flag": "TRUE",
        "School": "סמילנסקי",
        "Address": "יעקב 42",
        "Phone": "089451096",
        "X": "31.89649591",
        "Y": "34.81546428"
    },
    {
        "Flag": "TRUE",
        "School": "סיני",
        "Address": "דוד כוכבי 12 רחובות",
        "Phone": "089471322",
        "X": "31.89572036",
        "Y": "34.80015495"
    },

]

const markers2 = [
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות רחובות ההולנדית",
        "Address": "הר תבור 3, רחובות",
        "X": "31.89175731",
        "Y": "34.78237044"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות מופת",
        "Address": "לוין אפשטיין 22, רחובות",
        "X": "31.89738403",
        "Y": "34.80849058"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות מופת",
        "Address": "לוין אפשטיין 22, רחובות",
        "X": "31.89738403",
        "Y": "34.80849058"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות מופת",
        "Address": "משה זכריה 6, רחובות",
        "X": "31.88779532",
        "Y": "34.81624983"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "הספריה המרכזית",
        "Address": "גולדין 6, רחובות",
        "X": "31.89358722",
        "Y": "34.81259767"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "עירונוער רחובות",
        "Address": "בנימין 4, רחובות",
        "X": "31.89437496",
        "Y": "34.81213272"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות שוויץ המדע",
        "Phone": "89310700",
        "Address": "סירני 52, רחובות",
        "X": "31.90107676",
        "Y": "34.82130665"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות שוויץ רחובות החדשה",
        "Phone": "86366171",
        "Address": "קרוננברג 1, רחובות",
        "X": "31.87915592",
        "Y": "34.8115331"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות אושיות",
        "Phone": "89377702",
        "Address": "החבורה 20, רחובות",
        "X": "31.88252036",
        "Y": "34.8200334"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות חשמונאים",
        "Phone": "89493927",
        "Address": "חשמונאים 1, רחובות",
        "X": "31.88521043",
        "Y": "34.80275127"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות קרית משה",
        "Phone": "89312700",
        "Address": "גבריאלוב 20, רחובות",
        "X": "31.88743945",
        "Y": "34.78595275"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות נווה יהודה",
        "Phone": "89312700",
        "Address": "אהרונוביץ 14, רחובות",
        "X": "31.90164307",
        "Y": "34.80090467"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות רחובות הצעירה",
        "Phone": "89312700",
        "Address": "הרב זבולון גרז 2, רחובות",
        "X": "31.88269264",
        "Y": "34.79035744"
    },
    {
        "Flag": "FALSE",
        "CommunityCenterName": "חוויות כפר גבירול",
        "Phone": "89472410",
        "Address": "צאלון 1, רחובות",
        "X": "31.89652162",
        "Y": "34.77478686"
    }

]


const MarkersMap = () => {
    const [ShowSchools, setShowSchools] = useState(true);
    const [ShowCenters, setShowCenters] = useState(true);
    const position = [31.90341, 34.806831];
    return (
        <React.Fragment>
            <div className='filter'>
                <input type='checkbox' onClick={() => setShowSchools(!ShowSchools)} />
                <input type='checkbox' onClick={() => setShowCenters(!ShowCenters)} />
                <h1>שכבות לצפייה</h1>
            </div>
            <Map className='map' center={position} zoom={14}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {ShowSchools
                    ? markers1.map((item, index) => {
                        return (
                            <Marker
                                key={index}
                                position={[parseFloat(item.X), parseFloat(item.Y)]}
                                icon={icon}
                                onmouseover={(e) => {
                                    e.target.openPopup();
                                }}
                            >
                                <Popup className='popup'>
                                    <h1>{item.School}</h1>
                                    <p>כתובת: {item.Address}</p>
                                    <p>טלפון: {item.Phone}</p>
                                </Popup>
                            </Marker>
                        );
                    })
                    : null}

                {ShowCenters
                    ? markers2.map((item, index) => {
                        return (
                            <Marker
                                key={index}
                                position={[parseFloat(item.X), parseFloat(item.Y)]}
                                icon={Ic}
                                onmouseover={(e) => {
                                    e.target.openPopup();
                                }}
                            >
                                <Popup className='popup'>
                                    <h1 style={{ borderColor: "#3C91E6" }}>
                                        {item.CommunityCenterName}
                                    </h1>
                                    <p>כתובת: {item.Address}</p>
                                    <p>טלפון: {item.Phone}</p>
                                </Popup>
                            </Marker>
                        );
                    })
                    : null}
            </Map>
        </React.Fragment>
    );
}

const icon = L.icon({
    iconUrl: SchoolVector,
    //shadowUrl: leafShadow,
    iconSize: [30, 60], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76],
});

const Ic = L.icon({
    iconUrl: CenterVector,
    //shadowUrl: leafShadow,
    iconSize: [30, 60], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76],
});

export default MarkersMap;

import reducerL from "./logger";
import reducerT from "./texter";
import reducerA from "./adminer";
import { combineReducers } from "redux";
import reducerP from "./passworder";
import reducerU from "./user";
import reducerDim from "./dimmer";
import reducerF from "./visiter";
import reducerF1 from "./visiter1";
import reducerDT from "./DTer";
import reducerOB from "./ober";
import reducerOB1 from "./ober1";
import reducerOB2 from "./ober2";
import reducerE from "./eliminer";
import reducerID from "./IDer";
import reducerM from "./mostrer";
import reducerDT1 from "./DT1er";
import reducerS from "./successer";
import reducerOB3 from "./ober3";
import reducerDT2 from "./DT2er";
import reducerSC from "./scelter";
import reducerMOD from "./modder";
import reducerPr from "./prezzer";
import reducerDI from "./DIer";
import reducerOI from "./OIer";
import reducerC from "./Cer";

const rootReducer = combineReducers({
    L: reducerL,
    T: reducerT,
    A: reducerA,
    email: reducerU,
    password: reducerP,
    D: reducerDim,
    F: reducerF,
    F1: reducerF1,
    DT: reducerDT,
    OB: reducerOB,
    OB1: reducerOB1,
    OB2: reducerOB2,
    OB3: reducerOB3,
    E: reducerE,
    ID: reducerID,
    M: reducerM,
    DT1: reducerDT1,
    DT2: reducerDT2,
    MO: reducerS,
    SC: reducerSC,
    MOD: reducerMOD,
    P: reducerPr,
    DI: reducerDI,
    OI: reducerOI,
    C: reducerC
})

export default rootReducer;
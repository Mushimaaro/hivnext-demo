import Client from "../models/clientsModel.js";

export const getClient = async (req, res) => {
   const {IC_PASSPORT_NO} = req.body

   try {
      const client = await Client.findOne({IC_PASSPORT_NO:IC_PASSPORT_NO});
      
      if(!client){
         return res.status(401).json({success: false, message: "Client not found."})
      }

      return res.status(200).json({
         success: true, 
         IC_PASSPORT_NO: client.IC_PASSPORT_NO, 
         STATE: client.STATE,
         ETHNICITY: client.ETHNICITY,
         SPECIAL_CAT_POP: client.SPECIAL_CAT_POP,
         COMOROBIDITY: client.COMOROBIDITY,
         OUTREACH_MODE: client.OUTREACH_MODE,
         OUTREACH_METHOD: client.OUTREACH_METHOD,
         EMPLOYMENT_STATUS: client.EMPLOYMENT_STATUS,
         KEY_POPULATION: client.KEY_POPULATION,
         COMMUNITY_SERVICE_KDK_IF_PWUD: client.COMMUNITY_SERVICE_KDK_IF_PWUD,
         RISK_BEHAVIOUR: client.RISK_BEHAVIOUR,
         RISK_BEHAVIOUR_OPTION: client.RISK_BEHAVIOUR_OPTION,
         MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER: client.MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER,
         COMMODITIES: client.COMMODITIES,
         CONDOM: client.CONDOM,
         LUBS: client.LUBS,
         NEEDLE_GIVEN: client.NEEDLE_GIVEN,
         NEEDLE_COLLECTED: client.NEEDLE_COLLECTED,
         SYRINGE_GIVEN: client.SYRINGE_GIVEN,
         SYRINGE_COLLECTED: client.SYRINGE_COLLECTED,
         HIV_SCREENING: client.HIV_SCREENING,
         HIV_SCREENING_RESULT_IF_YES: client.HIV_SCREENING_RESULT_IF_YES,
         CONFIRMATORY_TEST: client.CONFIRMATORY_TEST,
         OPTIONS_FOR_CONFIRMATORY_TEST: client.OPTIONS_FOR_CONFIRMATORY_TEST,
         REFERRAL_FOR_PREP: client.REFERRAL_FOR_PREP,
         OPTIONS_FOR_REFERAL_FOR_PrEP: client.OPTIONS_FOR_REFERAL_FOR_PrEP,
         HIV_SCREENING_RESULT_IF_NO: client.HIV_SCREENING_RESULT_IF_NO,
         TREATMENT_IF_HAS_TESTED_POSITIVE_HIV: client.TREATMENT_IF_HAS_TESTED_POSITIVE_HIV,
         REASON_IF_TREATMENT_NO: client.REASON_IF_TREATMENT_NO,
         SYP_SCREENING: client.SYP_SCREENING,
         SYP_REASON_IF_NO: client.SYP_REASON_IF_NO,
         SYP_OPTIONS_IF_YES: client.SYP_OPTIONS_IF_YES,
         SYP_CONFIRMATORY_TEST: client.SYP_CONFIRMATORY_TEST,
         SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO: client.SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         HEP_C_SCREENING: client.HEP_C_SCREENING,
         HEP_C_REASON_IF_NO: client.HEP_C_REASON_IF_NO,
         HEP_C_OPTIONS_IF_YES: client.HEP_C_OPTIONS_IF_YES,
         HEP_C_CONFIRMATORY_TEST: client.HEP_C_CONFIRMATORY_TEST,
         HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO: client.HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         PERFORMED_BY: client.PERFORMED_BY,
         VOLUNTEER_EMAIL: client.VOLUNTEER_EMAIL,
         NGO_ID_NUMBER: client.NGO_ID_NUMBER,
         NGO_NAME: client.NGO_NAME,
         SCREENING_DATE: client.SCREENING_DATE,
         MYVAS_ACCOUNT: client.MYVAS_ACCOUNT,
         message: `Found client`
      })
      
   } catch (error) {
      return res.status(400).json({success: false, message: error.message})
   }
}

export const getAllClients = async (req, res) => {
   try {
      const response = await Client.find({})

      if(!response){
         return res.status(401).json({success: false, message: "Client(s) not found."})
      }

      const outputClient = response.map(client => ({
         IC_PASSPORT_NO: client.IC_PASSPORT_NO, 
         STATE: client.STATE,
         ETHNICITY: client.ETHNICITY,
         SPECIAL_CAT_POP: client.SPECIAL_CAT_POP,
         COMOROBIDITY: client.COMOROBIDITY,
         OUTREACH_MODE: client.OUTREACH_MODE,
         OUTREACH_METHOD: client.OUTREACH_METHOD,
         EMPLOYMENT_STATUS: client.EMPLOYMENT_STATUS,
         KEY_POPULATION: client.KEY_POPULATION,
         COMMUNITY_SERVICE_KDK_IF_PWUD: client.COMMUNITY_SERVICE_KDK_IF_PWUD,
         RISK_BEHAVIOUR: client.RISK_BEHAVIOUR,
         RISK_BEHAVIOUR_OPTION: client.RISK_BEHAVIOUR_OPTION,
         MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER: client.MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER,
         COMMODITIES: client.COMMODITIES,
         CONDOM: client.CONDOM,
         LUBS: client.LUBS,
         NEEDLE_GIVEN: client.NEEDLE_GIVEN,
         NEEDLE_COLLECTED: client.NEEDLE_COLLECTED,
         SYRINGE_GIVEN: client.SYRINGE_GIVEN,
         SYRINGE_COLLECTED: client.SYRINGE_COLLECTED,
         HIV_SCREENING: client.HIV_SCREENING,
         HIV_SCREENING_RESULT_IF_YES: client.HIV_SCREENING_RESULT_IF_YES,
         CONFIRMATORY_TEST: client.CONFIRMATORY_TEST,
         OPTIONS_FOR_CONFIRMATORY_TEST: client.OPTIONS_FOR_CONFIRMATORY_TEST,
         REFERRAL_FOR_PREP: client.REFERRAL_FOR_PREP,
         OPTIONS_FOR_REFERAL_FOR_PrEP: client.OPTIONS_FOR_REFERAL_FOR_PREP,
         HIV_SCREENING_RESULT_IF_NO: client.HIV_SCREENING_RESULT_IF_NO,
         TREATMENT_IF_HAS_TESTED_POSITIVE_HIV: client.TREATMENT_IF_HAS_TESTED_POSITIVE_HIV,
         REASON_IF_TREATMENT_NO: client.REASON_IF_TREATMENT_NO,
         SYP_SCREENING: client.SYP_SCREENING,
         SYP_REASON_IF_NO: client.SYP_REASON_IF_NO,
         SYP_OPTIONS_IF_YES: client.SYP_OPTIONS_IF_YES,
         SYP_CONFIRMATORY_TEST: client.SYP_CONFIRMATORY_TEST,
         SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO: client.SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         HEP_C_SCREENING: client.HEP_C_SCREENING,
         HEP_C_REASON_IF_NO: client.HEP_C_REASON_IF_NO,
         HEP_C_OPTIONS_IF_YES: client.HEP_C_OPTIONS_IF_YES,
         HEP_C_CONFIRMATORY_TEST: client.HEP_C_CONFIRMATORY_TEST,
         HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO: client.HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         PERFORMED_BY: client.PERFORMED_BY,
         VOLUNTEER_EMAIL: client.VOLUNTEER_EMAIL,
         NGO_ID_NUMBER: client.NGO_ID_NUMBER,
         NGO_NAME: client.NGO_NAME,
         SCREENING_DATE: client.SCREENING_DATE,
         MYVAS_ACCOUNT: client.MYVAS_ACCOUNT,
      }))

      return res.status(200).json({
         success: true,
         clientsData: outputClient
      })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message})
   }
}

export const updateClient = async (req, res) => {

}

export const deleteClient = async (req, res) => {

}

export const createOneClient = async (req, res) => {
   const {IC_PASSPORT_NO, 
         STATE,
         ETHNICITY,
         SPECIAL_CAT_POP,
         COMOROBIDITY,
         OUTREACH_MODE,
         OUTREACH_METHOD,
         EMPLOYMENT_STATUS,
         KEY_POPULATION,
         COMMUNITY_SERVICE_KDK_IF_PWUD,
         RISK_BEHAVIOUR,
         RISK_BEHAVIOUR_OPTION,
         MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER,
         COMMODITIES,
         CONDOM,
         LUBS,
         NEEDLE_GIVEN,
         NEEDLE_COLLECTED,
         SYRINGE_GIVEN,
         SYRINGE_COLLECTED,
         HIV_SCREENING,
         HIV_SCREENING_RESULT_IF_YES,
         CONFIRMATORY_TEST,
         OPTIONS_FOR_CONFIRMATORY_TEST,
         REFERRAL_FOR_PREP,
         OPTIONS_FOR_REFERAL_FOR_PREP,
         HIV_SCREENING_RESULT_IF_NO,
         TREATMENT_IF_HAS_TESTED_POSITIVE_HIV,
         REASON_IF_TREATMENT_NO,
         SYP_SCREENING,
         SYP_REASON_IF_NO,
         SYP_OPTIONS_IF_YES,
         SYP_CONFIRMATORY_TEST,
         SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         HEP_C_SCREENING,
         HEP_C_REASON_IF_NO,
         HEP_C_OPTIONS_IF_YES,
         HEP_C_CONFIRMATORY_TEST,
         HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO,
         PERFORMED_BY,
         VOLUNTEER_EMAIL,
         NGO_ID_NUMBER,
         NGO_NAME,
         SCREENING_DATE,
         MYVAS_ACCOUNT} = req.body
}

export const createClients = async (req, res) => {
   const {clientsData} = req.body
   let foundIC = false

   try {
      clientsData.forEach(async ic => {
         const findIC = await Client.findOne({IC_PASSPORT_NO: ic.IC_PASSPORT_NO})
         if(findIC){
            foundIC = true;
            return;
         }
      })

      if(foundIC){
         return res.status(401).json({success: false, message: "IC/Passport already exist in database"})
      }else{
         let DataArray = []
         clientsData.forEach(async data => {
            DataArray.push(new Client(data))
         })

         for(let i=0; i<DataArray.length; i++){
            await DataArray[i].save();
         }

         return res.status(201).json({success: true, message: "Clients successfully created."});
      }

   } catch (error) {

      if (error.code === 11000) {
         if (error.keyPattern && error.keyPattern.IC_PASSPORT_NO) {
            return res.status(400).json({success: false, message: `IC/Passport number "${error.keyValue[Object.keys(error.keyValue)[0]]}" have duplicate(s) in the database`})
         }
      }

      return res.status(400).json({success: false, message: error.message})
   }
}
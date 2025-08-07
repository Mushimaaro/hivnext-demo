import mongoose from "mongoose";

const clientsSchema = mongoose.Schema({
   IC_PASSPORT_NO: {
      type: String,
      required: true,
      unique: true
   },
   STATE: {
      type: String
   },
   ETHNICITY: {
      type: String
   },
   SPECIAL_CAT_POP:{
      type: Boolean
   },
   COMOROBIDITY: {
      type: Boolean
   },
   OUTREACH_MODE: {
      type: String,
      required: true
   },
   OUTREACH_METHOD: {
      type: String
   },
   EMPLOYMENT_STATUS: {
      type: String
   },
   KEY_POPULATION: {
      type: String,
      required: true
   },
   COMMUNITY_SERVICE_KDK_IF_PWUD: {
      type: Boolean
   },
   RISK_BEHAVIOUR: {
      type: Boolean
   },
   RISK_BEHAVIOUR_OPTION: {
      type: [String]
   },
   MMT_PROGRAM_REFERRAL_IF_INJECTING_DRUG_USER: {
      type: String
   },
   COMMODITIES: {
      type: Boolean
   },
   CONDOM: {
      type: Number
   },
   LUBS: {
      type: Number
   },
   NEEDLE_GIVEN: {
      type: Number
   },
   NEEDLE_COLLECTED: {
      type: Number
   },
   SYRINGE_GIVEN: {
      type: Number
   },
   SYRINGE_COLLECTED: {
      type: Number
   },
   HIV_SCREENING: {
      type: Boolean
   },
   HIV_SCREENING_RESULT_IF_YES: {
      type: String
   },
   CONFIRMATORY_TEST: {
      type: Boolean
   },
   OPTIONS_FOR_CONFIRMATORY_TEST: {
      type: [String]
   },
   REFERRAL_FOR_PREP: {
      type: Boolean
   },
   OPTIONS_FOR_REFERAL_FOR_PREP: {
      type: String
   },
   HIV_SCREENING_RESULT_IF_NO: {
      type: String
   },
   TREATMENT_IF_HAS_TESTED_POSITIVE_HIV: {
      type: String
   },
   REASON_IF_TREATMENT_NO: {
      type: String
   },
   SYP_SCREENING: {
      type: Boolean
   },
   SYP_REASON_IF_NO: {
      type: String
   },
   SYP_OPTIONS_IF_YES: {
      type: String
   },
   SYP_CONFIRMATORY_TEST: {
      type: Boolean
   },
   SYP_OPTIONS_FOR_CONFIRMATORY_TEST_NO: {
      type: String
   },
   HEP_C_SCREENING: {
      type: Boolean
   },
   HEP_C_REASON_IF_NO: {
      type: String
   },
   HEP_C_OPTIONS_IF_YES: {
      type: String
   },
   HEP_C_CONFIRMATORY_TEST: {
      type: Boolean
   },
   HEP_C_OPTIONS_FOR_CONFIRMATORY_TEST_NO: {
      type: String
   },
   PERFORMED_BY: {
      type: String
   },
   VOLUNTEER_EMAIL: {
      type: String,
      required: true,
   },
   NGO_ID_NUMBER: {
      type: String
   },
   NGO_NAME: {
      type: String
   },
   SCREENING_DATE: {
      type: Date
   },
   MYVAS_ACCOUNT: {
      type: String
   }
},{
   timestamps: true,
   strict: false
})

const Client = mongoose.model("Client", clientsSchema);

export default Client;
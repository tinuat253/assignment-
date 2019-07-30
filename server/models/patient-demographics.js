'use strict';
module.exports = function(Patientdemographics) {;
/**
 * to get details demographocs
 * @param {number} id id of patient
 */
Patientdemographics.patientdem = async(id)=> { 
    try{   
        let patient = await Patientdemographics.find()
        if(patient.length > 0){
            let patients = patient.filter(patients=>patients['PatientId']==id)
            .map(patients => (
                 {
                      id: patients.PatientId,
                      DOB: patients.Dob,
                      age: patients.Age,
                      sex: patients.Gender,
                      maritalstatus: patients.MaritalStatus,
                      bloodgroup: patients.BloodGroup,
                      name: {
                           first:patients.FirstName,
                           last:patients.LastName
                      },
                      create:{
                          on: patients.CreateDate,
                          by: patients.CreateBy
                      },
                      modify: {
                           by: patients.ModifyBy,
                           on: patients.ModifyDate
                      }
                 }));
            return patients;
       }
       else{
            let s = `No Patient!`;
            throw new Error(s);
       }
    }catch(err) {
        return ({
             error: true,
             message: err.message
        });
   }  
  };  
};

'use strict';
let loopback = require('loopback');

module.exports = function (Patients) {
  /**
* getting patient details
* @param {number} id patient id for validaation
*/

  Patients.getPatientDetails = async () => {
    try {
      let Patientdemographics = loopback.getModel('Patient_Demographics');
      let demo = await Patientdemographics.find();
      let patient = await Patients.find();

      let demograhicsDetails = demo.map(demograhics => ({
        id: demograhics.PatientId,
        DOB: demograhics.Dob,
        age: demograhics.Age,
        sex: demograhics.Gender,
        maritalstatus: demograhics.MaritalStatus,
        bloodgroup: demograhics.BloodGroup,
        create: {
          on: demograhics.CreateDate,
          by: demograhics.CreateBy
        },
        modify: {
          by: demograhics.ModifyBy,
          on: demograhics.ModifyDate
        }
      }));
      let patientDetail = patient.map(patientDetail => ({
        id: patientDetail.PatientId,
        email: patientDetail.Email,
        name: {
          first: patientDetail.FirstName,
          last: patientDetail.LastName
        },
        createOn: patientDetail.CreateDate,
        modify: {
          by: patientDetail.ModifyBy,
          on: patientDetail.ModifyDate
        },
      }
      ));
      let getPatientsDemographics = (patientDetail) => {
        patientDetail.map(pataient => {
          pataient.demograhics = demograhicsDetails.filter(demoDetail =>
            demoDetail.id == pataient.id)
          console.log("patient=>", pataient.demograhics);
        })
      }

      if (patientDetail.length > 0) {
        getPatientsDemographics(patientDetail);
        return patientDetail;
      } else {
        let s = `No patient Exists!`;
        throw new Error(s);
      }
    } catch (err) {
      return ({
        error: true,
        message: err.message
      });
    }
  };
};

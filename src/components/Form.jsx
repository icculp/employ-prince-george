import React from "react";
import { useForm } from 'react-hook-form';
// <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const rainbow = "red orange yellow green blue indigo violet".split(' ');
    const MWEMappings = require('../MWEMappings.json')

    console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Business Information</h2>
        <label>Business Name</label>
      <input type="text" placeholder="Business Name" {...register("Business_Name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="DBA (if applicable)" {...register("DBA", {required: false, maxLength: 100})} />
      <br/><label>Address:</label>
      <input type="num" placeholder="Street number" {...register("Street number", {required: true, minLength: 1, maxLength: 8})} />
      <input type="text" placeholder="Street" {...register("Street", {required: true, minLength: 1, maxLength: 20})} />
      <input type="Suite" placeholder="Suite" {...register("Suite", {required: false, minLength: 1, maxLength: 9})} />
      <br />
      <input type="text" placeholder="City" {...register("City", {required: true, minLength: 6, maxLength: 12})} />
      <input type="zip" placeholder="Zip" {...register("Zip", {required: true, minLength: 5, maxLength: 9})} />
      <label>Within a municipality?</label>
      <input {...register("Municipality", { required: true })} type="radio" value="Yes" /> Yes <br/>
      <input {...register("Municipality", { required: true })} type="radio" value="No" /> No
      <label>State</label>
      <select {...register("State", { required: true })}>
        <option value="DC">DC</option>
        <option value="MD">MD</option>
        <option value="VA">VA</option>
      </select>

      <br/>
      <label>MD Tax Assessors Office</label>Known or verified in good standing? <br />
          <input {...register("Assessor", { required: true })} type="radio" value="Yes" /> Yes <br />
          <input {...register("Assessor", { required: true })} type="radio" value="No" /> No
      <br/>
      <br />
      <label>Business Point of Contact</label>  
      <input type="text" placeholder="Name " {...register("POC_Name", {required: false, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("POC_Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Phone" {...register("POC_Phone", {required: true, minLength: 1, maxLength: 8})} />
      <label>Business Social Media Accounts</label>
      <input type="text" placeholder="List accounts separated by ; " {...register("Socials", {required: false, maxLength: 100})} />

      <label>Business Website</label>
      <input type="text" placeholder="Website" {...register("Website", {required: false, maxLength: 100})} />
      <br /><br />
      <h2>Business Assessment</h2>
      <label>How long has this business been in business?</label>
      <select {...register("business_length", { required: true })}>
        <option value="under1">Under 1 year</option>
        <option value="1to3">1 to 3 years</option>
        <option value="1to3">3 to 5 years</option>
        <option value="5more">5 or more years</option>
      </select>


      <input type="num" placeholder="Number of Locations" {...register("Number of Locations", {required: false, maxLength: 10})} />
      <input type="num" placeholder="Number of Current FT Employees" {...register("Number of Current FT Employees", {required: false, maxLength: 10})} />
      <input type="num" placeholder="Number of Current PT Employees" {...register("Number of Current PT Employees", {required: false, maxLength: 10})} />
      
      <label>Employees Remote or On-site?</label>
      <select {...register("site", { required: true })}>
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
        <option value="mixed">Mixed</option>
      </select>

      <label>Description of Type and Work of Business</label>
      <input type="num" placeholder="Description" {...register("description", {required: false, maxLength: 200})} />
      
      <h2>Business Employer Needs</h2>

      <label>How many employees is the business looking to hire?</label>
      <select {...register("hire", { required: true })}>
        <option value="1to3">1 to 3</option>
        <option value="onsite">3 to 5</option>
        <option value="mixed">5+</option>
      </select>

      <label>What is the hiring time frame?</label>
      <select {...register("hire", { required: true })}>
        <option value="1to3">1 to 3 months</option>
        <option value="onsite">3 to 6 months</option>
        <option value="onsite">6 to 12 months</option>
        <option value="mixed">unsure</option>
      </select>

      <label>What is the expected compensation or level of employment offered?</label>
      <input type="text" placeholder="Compensation offered " {...register("POC_Name", {required: false, maxLength: 100})} />
      
      <label>What skills or credentials is the employer looking for?</label>
      <input type="text" placeholder="Skills needed" {...register("skills", {required: false, maxLength: 100})} />
      <label>Where does the employer currently find or look for employees?</label>
      <input type="text" placeholder="Seeking employees at..." {...register("seek", {required: false, maxLength: 100})} />
      <label>What is the greatest challenge the employer is currently facing?</label>
      <input type="text" placeholder="Challenges" {...register("challenge", {required: false, maxLength: 100})} />
      <label>Services Employer May be interested in:</label>
      <div class="threecols">
      <label key="i"><input type="checkbox" value="i Job Posting Services" name="i Job Posting Services "  />i Job Posting Services </label>
      <label key="ii"><input type="checkbox" value="ii. Customized Recruitment Services" name="ii. Customized Recruitment Services"  />ii. Customized Recruitment Services</label>
      <label key="iii"><input type="checkbox" value="iii. Community Outreach & Engagement Services" name="iii. Community Outreach & Engagement Services"  /> iii. Community Outreach & Engagement Servicess </label>
      <label key="iv"><input type="checkbox" value="iv. Hosting of Job Fairs and Hiring Events" name="iv. Hosting of Job Fairs and Hiring Events"  />iv. Hosting of Job Fairs and Hiring Events</label>
      <label key="v"><input type="checkbox" value="v. Apprenticeship Services" name="v. Apprenticeship Services"  />v. Apprenticeship Services </label>
      <label key="vi"><input type="checkbox" value="vi. Hiring Incentives" name="vi. Hiring Incentives"  />vi. Hiring Incentives </label>
      <label key="vii"><input type="checkbox" value="vii. Perspective, New and Existing Employee Training Services" name="vii. Perspective, New and Existing Employee Training Services"  />vii. Perspective, New and Existing Employee Training Services</label>
      <label key="viii"><input type="checkbox" value=" viii. Prince George’s County Government Navigation Services" name=" viii. Prince George’s County Government Navigation Services"  /> viii. Prince George’s County Government Navigation Services</label>
      </div>

      <h2>MD Specific Fields</h2>
        <label>Maryland Workforce Exchange Registration</label>
        <label key="registered"><input type="checkbox" value="registered" name="registered"  />Registered</label>
        <label>Maryland Specific Employment Industry Sector Code (see code list)</label>
      <select {...register("mwemappings", { required: false })}>
        {MWEMappings.map((code) => {
            return <option value={code}>{code}</option>;
        })}
      </select>
      <h2>Additional Notes</h2>
      <label>Are there any other employers the business would like to refer to the team?</label>
      <input type="text" placeholder="Employer referrals" {...register("referrals", {required: false, maxLength: 100})} />
      <label>Is the business minority owned?</label>
      <input type="text" placeholder="Seeking employees at..." {...register("seek", {required: false, maxLength: 100})} />
      <label>Does the Business need language assistance?</label>
      <input type="text" placeholder="Language needing assistance with" {...register("language_assistance", {required: false, maxLength: 100})} />
      <label>Any additional notes</label>
      <input type="text" placeholder="Additional notes" {...register("additional_notes", {required: false, maxLength: 100})} />
      <h2>Contact Log</h2>
      <label>General Input Field for listing contact phone calls or meetings with employer</label>
      <input type="text" placeholder="General input" {...register("general_input", {required: false, maxLength: 100})} />








      <br />
      <input type="submit" />
    </form>
    );
  }


export default Form;
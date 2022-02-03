import React from "react";
import { useForm } from 'react-hook-form';
// <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />




const heroku = "postgres://moouhckqiziaiu:e333306222f0d66bc33d75c4d9b2ad91f3666e400acdb9238655bdeda4c1731a@ec2-3-212-143-188.compute-1.amazonaws.com:5432/d2sp34opj2r6ok"

function Form() {
    const { register, handleSubmit, formState: { errors }, getValues, watch, reset} = useForm({mode: "onBlur",});
    const onSubmit = data => {
      console.log(data)
      //pool.query()

      alert("Submitting... If you don't see an error after clicking okay, it went through")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:5000/employer/add', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
      
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
      
                this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
  
      reset();
    }
    const MWEMappings = require('../MWEMappings.json')
    const industry = ['Healthcare',
      'Retail',
      'Restaurant',
      'IT',
      'Transportation',
      'Manufacturing',
      'Professional',
      'Services',
      'Financial',
      'Hospitality',
      'Administrative',
      'Construction',
      'Management',
      'Education',
      'Other']

    const employer_services = [
      'i. Job Posting Services',
      'ii. Customized Recruitment Services',
      'iii. Community Outreach & Engagement Servicess',
      'iv. Hosting of Job Fairs and Hiring Events',
      'v. Apprenticeship Services',
      'vi. Hiring Incentives',
      'vii. Perspective, New and Existing Employee Training Services',
      'viii. Prince George’s County Government Navigation Services'
    ]

    console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        <h2>Business Information</h2>
        <label>Business Name</label>
      <input type="text" placeholder="Business Name" {...register("business_name", {required: true, maxLength: 80})} />
      {errors.business_name && <p class="error">Please check the field above</p>}

      <label>DBA (if applicable)</label>
      <input type="text" placeholder="DBA" {...register("DBA", {required: false, maxLength: 100})} />
      {errors.DBA && <p class="error">Please check the field above</p>}
     
      <br/><h5>Address:</h5>
      <label>Street number</label>
      <input type="num" placeholder="Street number" {...register("street_number", {required: true, maxLength: 10})} />
      {errors.street_number && <p class="error">Please check the field above</p>}
      <label>Street</label>
      <input type="text" placeholder="Street" {...register("street", {required: true, maxLength: 20})} />
      {errors.street && <p class="error">Please check the field above</p>}
      <label>Suite</label>
      <input type="Suite" placeholder="Suite" {...register("suite", {required: true, maxLength: 10})} />
      {errors.suite && <p class="error">Please check the field above</p>}
      <label>City</label>
      <input type="text" placeholder="City" {...register("city", {required: true, minLength: 2, maxLength: 20})} />
      {errors.city && <p class="error">Please check the field above</p>}
      <label>Zip</label>
      <input type="zip" placeholder="Zip" {...register("zip", {required: true, minLength: 5, maxLength: 9})} />
      {errors.zip && <p class="error">Zip must be a number betweet 5 and 9 digits</p>}
      <label>Within a municipality?</label>
      <input {...register("municipality", { required: true })} type="radio" value="Yes" /> Yes <br/>
      <input {...register("municipality", { required: true })} type="radio" value="No" /> No
      {errors.municipality && <p class="error">Please check the field above</p>}

      <label>State</label>
      <select {...register("state", { required: true } )} >
        <option value="DC">DC</option>
        <option value="MD">MD</option>
        <option value="VA">VA</option>
      </select>
      {errors.state && <p class="error">Please check the field above</p>}
      {watch("state") === 'MD' && (
        <div>

        <h2>MD Specific Fields</h2>
          <label>Maryland Workforce Exchange Registration</label>
          <input {...register("mwe_registered", { required: true })} type="radio" value="true" /> Registered <br/>
          <input {...register("mwe_registered", { required: true })} type="radio" value="false" /> Not registered
          {errors.mwe_registered && <p class="error">Please check the field above</p>}
          <br /><br />
          
          <label>Maryland Specific Employment Industry Sector Code (see code list)</label>
          <select {...register("mwe_mappings", { required: false })}>
            {MWEMappings.map((code) => {
                return <option value={code}>{code}</option>;
            })}
          </select>
          {errors.mwe_mappings && <p class="error">Please check the field above</p>}

          <label>MD Tax Assessors Office</label>
          <label>Known or verified in good standing?</label>
          <input {...register("md_assessor", { required: true })} type="radio" value="Yes" /> Yes <br />
          <input {...register("md_assessor", { required: true })} type="radio" value="No" /> No
          {errors.md_assessor && <p class="error">Please check the field above</p>}

        </div>
        )}


      <label>Industry Sector (all states)</label>
      <select {...register("industry_sector", { required: true })}>
        {industry.map((code) => {
            return <option value={code}>{code}</option>;
        })}
      </select>
      {errors.industry_sector && <p class="error">Please check the field above</p>}

      <br/>
  
      <br />
      <h5>Business Point of Contact</h5>
      <label>Name</label>  
      <input type="text" placeholder="Name " {...register("poc_name", {required: true, maxLength: 100})} /><br />
      {errors.poc_name && <p class="error">Please check the field above</p>}
      <label>Email</label>  
      <input type="text" placeholder="email@domain.com" {...register("poc_email", {required: true, pattern: /^\S+@\S+$/i})} /><br/>
      {errors.poc_email && <p class="error">Email must be formatted like email@domain.com</p>}
      <label>Phone Number</label>  
      <input type="tel" placeholder="123-456-7890" {...register("poc_phone", {required: true, minLength: 9, maxLength: 10})} /><br/>
      {errors.poc_phone && <p class="error">Please check the field above</p>}

      <label>Business Social Media Accounts</label>
      <input type="text" placeholder="List social media accounts " {...register("business_socials", {required: false, maxLength: 100})} />
      {errors.business_socials && <p class="error">Please check the field above</p>}

      <label>Business Website</label>
      <input type="text" placeholder="Website" {...register("business_website", {required: false, maxLength: 100})} />
      {errors.business_website && <p class="error">Please check the field above</p>}

      <br /><br />
      <h2>Business Assessment</h2>
      <label>How long has this business been in business?</label>
      <select {...register("business_length", { required: true })}>
        <option value="under1">Under 1 year</option>
        <option value="1to3">1 to 3 years</option>
        <option value="1to3">3 to 5 years</option>
        <option value="5more">5 or more years</option>
      </select>
      {errors.business_length && <p class="error">Please check the field above</p>}
      <label>Number of Locations</label>  
      <input type="num" placeholder="Number of Locations" {...register("num_locations", {required: false, maxLength: 10})} />
      {errors.num_locations && <p class="error">Please check the field above</p>}
      <h5>Number of Employees</h5>  
      <label>Full time</label>  
      <input type="num" placeholder="Number of Current FT Employees" {...register("num_fulltime", {required: false, maxLength: 10})} />
      {errors.num_fulltime && <p class="error">Please check the field above</p>}
      <label>Part time</label>  
      <input type="num" placeholder="Number of Current PT Employees" {...register("num_parttime", {required: false, maxLength: 10})} />
      {errors.num_parttime && <p class="error">Please check the field above</p>}
      

      <label>Employees Remote or On-site?</label>
      <select {...register("business_site", { required: true })}>
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
        <option value="mixed">Mixed</option>
      </select>
      {errors.business_site && <p class="error">Please check the field above</p>}

      <label>Description of Type and Work of Business</label>
      <input type="num" placeholder="Description" {...register("business_description", {required: false, maxLength: 200})} />
      {errors.business_description && <p class="error">Please check the field above</p>}
      
      <h2>Business Employer Needs</h2>

      <label>How many employees is the business looking to hire?</label>
      <select {...register("hire_quantity", { required: true })}>
        <option value="1to3">1 to 3</option>
        <option value="onsite">3 to 5</option>
        <option value="mixed">5+</option>
      </select>
      {errors.hire_quantity && <p class="error">Please check the field above</p>}

      <label>What is the hiring time frame?</label>
      <select {...register("hire_timeframe", { required: true })}>
        <option value="1to3">1 to 3 months</option>
        <option value="3to6">3 to 6 months</option>
        <option value="6to12">6 to 12 months</option>
        <option value="unsure">unsure</option>
      </select>
      {errors.hire_timeframe && <p class="error">Please check the field above</p>}

      <label>What is the expected compensation or level of employment offered?</label>
      <input type="text" placeholder="Compensation offered " {...register("hire_compensation", {required: false, maxLength: 100})} />
      {errors.hire_compensation && <p class="error">Please check the field above</p>}
      
      <label>What skills or credentials is the employer looking for?</label>
      <input type="text" placeholder="Skills needed" {...register("hire_skills", {required: false, maxLength: 100})} />
      {errors.hire_skills && <p class="error">Please check the field above</p>}
      <label>Where does the employer currently find or look for employees?</label>
      <input type="text" placeholder="Seeking employees at..." {...register("hire_seeking", {required: false, maxLength: 100})} />
      {errors.hire_seeking && <p class="error">Please check the field above</p>}
      <label>What is the greatest challenge the employer is currently facing?</label>
      <input type="text" placeholder="Challenges" {...register("hire_challenge", {required: false, maxLength: 100})} />
      {errors.hire_challenge && <p class="error">Please check the field above</p>}

      <label>Services Employer May be interested in:</label>
      <div class="threecols">
      {
            employer_services.map(
              (c,i) => <label key={c}><input type="checkbox" {...register("{c}")}  />{c}</label>
            )
          }
      
      </div>
      {errors.hire_challenge && <p class="error">Please check the field above</p>}
      
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
      <div>
      <input type="textarea" placeholder="General input" {...register("general_input", {required: false, maxLength: 500})} />
      {errors.general_input && <p style={{'color': 'red'}}>Please check the general input</p>}
      </div>



      <br />
      <input type="submit" class="submit-button"  />
    </form>
    );
  }


export default Form;
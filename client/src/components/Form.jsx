import React from "react";
import { useForm, Controller } from 'react-hook-form';
// import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
// import PhoneInput from 'react-phone-input-2';
// import "react-phone-number-input/style.css";
// import Input from 'react-phone-number-input/input'


function Form() {
  // const [value, setValue] = useState()
    const { register, handleSubmit, formState: { errors }, getValues, watch, reset, control} = useForm({mode: "onBlur",});
    const onSubmit = data => {
      console.log(data)
      //pool.query()
      data.date = Date.parse(Date()) //gives us the date in ms since UTC time zero
      alert("Submitting... If you don't see an error after clicking okay, it went through")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('https://employ-prince-george.herokuapp.com/employer/add', requestOptions)
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
      'Logistics',
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
      'Other',
      'Unknown']

    const employer_services = [
      'i. Job Posting Services',
      'ii. Customized Recruitment Services',
      'iii. Community Outreach & Engagement Servicess',
      'iv. Hosting of Job Fairs and Hiring Events',
      'v. Apprenticeship Services',
      'vi. Hiring Incentives',
      'vii. Perspective, New and Existing Employee Training Services',
      'viii. Prince George’s County Government Navigation Services',
      'ix. Incumbent Worker Training',
      'x. On the Job Training Support',
    ]

    console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>All fields are required. Place "na" in unknown fields.</p> <br />
        {/* <PhoneInput inputRef={register("phoneinput")}  />
      
        {errors.phoneinput && (
          <p className="error-message">Invalid Phone</p>
        )} */}
   
        {/* <input type="tel" placeholder="Mobile number" {...register("Mobile", {required: true, pattern: /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, maxLength: 12})} /> */}

        {errors.Mobile && <p class="error">Please check the field above</p>}


        <h2>Business Information</h2>
        <label>Business Name</label>
      <input type="text" placeholder="Business Name" {...register("business_name", {required: true, maxLength: 80})} />
      {errors.business_name && <p class="error">Please check the field above</p>}

      <label>DBA (if applicable)</label>
      <input type="text" placeholder="DBA" {...register("DBA", {required: true, maxLength: 100})} />
      {errors.DBA && <p class="error">Please check the field above</p>}
     
      <br/><h5>Address:</h5>
      <label>Street number</label>
      <input type="number" placeholder="Street number" {...register("street_number", {required: true, maxLength: 10})} />
      {errors.street_number && <p class="error">Please check the field above</p>}
      <label>Street</label>
      <input type="text" placeholder="Street" {...register("street", {required: true,  pattern: /^[a-zA-Z1-9 ]+$/, maxLength: 20})} />
      {errors.street && <p class="error">Please check the field above</p>}
      <label>Suite</label>
      <input type="text" placeholder="Suite" {...register("suite", {required: true, maxLength: 10})} />
      {errors.suite && <p class="error">Please check the field above</p>}
      <label>City</label>
      <input type="text" placeholder="City" {...register("city", {required: true, pattern: /^[a-zA-Z ]+$/, minLength: 2, maxLength: 20})} />
      {errors.city && <p class="error">Please check the field above</p>}
      <label>Zip</label>
      <input type="number" placeholder="Zip" {...register("zip", {required: true, minLength: 5, maxLength: 9})} />
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
        <option value="unknown">Unknown</option>
      </select>
      {errors.state && <p class="error">Please check the field above</p>}
      {/* {watch("state") === 'MD' && ( */}

      
        <label>Industry Sector (all states)</label>
      <select {...register("industry_sector", { required: true })}>
        {industry.map((code) => {
            return <option value={code}>{code}</option>;
        })}
      </select>
      {errors.industry_sector && <p class="error">Please check the field above</p>}
      <label>Have you heard about the Rapid Re-Employment Grant?</label>
      <input {...register("rrgrant", { required: true })} type="radio" value="Yes" /> Yes <br/>
      <input {...register("rrgrant", { required: true })} type="radio" value="No" /> No
      {errors.municipality && <p class="error">Please check the field above</p>}

        <br /><br />
        <h3>MD Specific Fields</h3>
          <label>Interested in Registering with Maryland Workforce Exchange</label>
          <input {...register("mwe_registration", { required: true })} type="radio" value="yes" /> Yes <br/>
          <input {...register("mwe_registration", { required: true })} type="radio" value="no" /> No <br/>
          <input {...register("mwe_registration", { required: true })} type="radio" value="unknown" /> Unknown
          {errors.mwe_registered && <p class="error">Please check the field above</p>}
          <br /><br />
          
          <label>Maryland Specific Employment Industry Sector Code (see code list)</label>
          <select {...register("mwe_mappings", { required: true })}>
            {MWEMappings.map((code) => {
                return <option value={code}>{code}</option>;
            })}
          </select>
          {errors.mwe_mappings && <p class="error">Please check the field above</p>}

          <label>MD Tax Assessors Office</label>
          <label>Known or verified in good standing?</label>
          <input {...register("md_assessor", { required: true })} type="radio" value="Yes" /> Yes <br />
          <input {...register("md_assessor", { required: true })} type="radio" value="No" /> No <br />
          <input {...register("md_assessor", { required: true })} type="radio" value="unknown" /> Unknown
          {errors.md_assessor && <p class="error">Please check the field above</p>}
        {/* )} */}


      <br/>
  
      <br />
      <h5>Business Point of Contact</h5>
      <label>Name</label>  
      <input type="text" placeholder="Name " {...register("poc_name", {required: true, pattern: /^[a-zA-Z ]+$/, maxLength: 100})} /><br />
      {errors.poc_name && <p class="error">Please check the field above</p>}
      <label>Email</label>  
      <input type="text" placeholder="email@domain.com" {...register("poc_email", {required: true, pattern: /^\S+@\S+$/i})} /><br/>
      {errors.poc_email && <p class="error">Email must be formatted like email@domain.com</p>}
      <label>Phone Number</label>  
      <input type="number" placeholder="123-456-7890" {...register("poc_phone", {required: true, minLength: 10, maxLength: 10})} /><br/>
      {/* <PhoneInput
        name="phoneInput"
        control={control}
        rules={{ required: true }} />


        {errors["phone-input"] && (
          <p className="error-message">Invalid Phone</p>
        )} */}

      {errors.poc_phone && <p class="error">Please check the field above</p>}

      <label>Business Social Media Accounts</label>
      <input type="text" placeholder="List social media accounts " {...register("business_socials", {required: true, maxLength: 100})} />
      {errors.business_socials && <p class="error">Please check the field above</p>}

      <label>Business Website</label>
      <input type="text" placeholder="Website" {...register("business_website", {required: true, maxLength: 100})} />
      {errors.business_website && <p class="error">Please check the field above</p>}

      <br /><br />
      <h2>Business Assessment</h2>
      <label>How long has this business been in business?</label>
      <select {...register("business_length", { required: true })}>
        <option value="under1">Under 1 year</option>
        <option value="1to3">1 to 3 years</option>
        <option value="1to3">3 to 5 years</option>
        <option value="5+">5 or more years</option>
        <option value="unknown">Unknown</option>
      </select>
      {errors.business_length && <p class="error">Please check the field above</p>}

      <label>Number of Locations</label>  
      <input type="number" placeholder="Number of Locations" {...register("num_locations", {required: true, maxLength: 10})} />
      {errors.num_locations && <p class="error">Please check the field above</p>}
      <h5>Number of Employees</h5>  
      <label>Full time</label>  
      <input type="number" placeholder="Number of Current FT Employees" {...register("num_fulltime", {required: true, maxLength: 10})} />
      {errors.num_fulltime && <p class="error">Please check the field above</p>}
      <label>Part time</label>  
      <input type="number" placeholder="Number of Current PT Employees" {...register("num_parttime", {required: true, maxLength: 10})} />
      {errors.num_parttime && <p class="error">Please check the field above</p>}
      

      <label>Employees Remote or On-site?</label>
      <select {...register("business_site", { required: true })}>
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
        <option value="mixed">Mixed</option>
        <option value="unknown">Unknown</option>
      </select>
      {errors.business_site && <p class="error">Please check the field above</p>}

      <label>Description of Type and Work of Business</label>
      <input type="text" placeholder="Description" {...register("business_description", {required: true, maxLength: 200})} />
      {errors.business_description && <p class="error">Please check the field above</p>}
      <label>Links to company's job descriptions</label>
      <input type="text" placeholder="Links" {...register("job_descriptions", {required: true, maxLength: 200})} />
      


      <br /><br />
      <h2>Business Employer Needs</h2>

      <label>How many employees is the business looking to hire?</label>
      <select {...register("hire_quantity", { required: true })}>
        <option value="1to3">1 to 3</option>
        <option value="3to5">3 to 5</option>
        <option value="5+">5+</option>
        <option value="unknown">Unknown</option>
      </select>
      {errors.hire_quantity && <p class="error">Please check the field above</p>}

      <label>What is the hiring time frame?</label>
      <select {...register("hire_timeframe", { required: true })}>
        <option value="1to3">1 to 3 months</option>
        <option value="3to6">3 to 6 months</option>
        <option value="6to12">6 to 12 months</option>
        <option value="unsure">Unsure</option>
      </select>
      {errors.hire_timeframe && <p class="error">Please check the field above</p>}

      <label>What is the expected compensation or level of employment offered?</label>
      <input type="text" placeholder="Compensation offered " {...register("hire_compensation", {required: true, maxLength: 100})} />
      {errors.hire_compensation && <p class="error">Please check the field above</p>}
      
      <label>What skills or credentials is the employer looking for?</label>
      <input type="text" placeholder="Skills needed" {...register("hire_skills", {required: true, maxLength: 100})} />
      {errors.hire_skills && <p class="error">Please check the field above</p>}
      <label>Where does the employer currently find or look for employees?</label>
      <input type="text" placeholder="Seeking employees at" {...register("hire_seeking", {required: true, maxLength: 100})} />
      {errors.hire_seeking && <p class="error">Please check the field above</p>}
      <label>What is the greatest challenge the employer is currently facing?</label>
      <input type="text" placeholder="Challenges" {...register("hire_challenge", {required: true, maxLength: 100})} />
      {errors.hire_challenge && <p class="error">Please check the field above</p>}

      <label>Services Employer May be interested in:</label>
      <div class="threecols">
      
            {employer_services.map(
              (c ,i) => <label key={c}><input type="checkbox" {...register("Services")} value={c}  />{c}</label>
            )}
          
      
      </div>
      {errors.hire_challenge && <p class="error">Please check the field above</p>}
      


      <br /><br />
      <h2>Additional Notes</h2>
      <label>Are there any other employers the business would like to refer to the team?</label>
      <input type="text" placeholder="Employer referrals" {...register("referrals", {required: true, maxLength: 100})} />
      
      <label>Is the business minority owned?</label>
      <input type="text" placeholder="Minority" {...register("minority", {required: true, maxLength: 100})} />

      <label>Does the Business need language assistance?</label>
      <select {...register("language_assistance", { required: true })}>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="Other">Other</option>
        <option value="none">No assistance needed</option>
        <option value="unsure">Unsure</option>
      </select>
      <label>Any additional notes</label>
      <input type="text" placeholder="Additional notes" {...register("additional_notes", {required: true, maxLength: 100})} />

      <br /><br />
      <h2>Contact Log</h2>
      <label>General Input Field for listing contact phone calls or meetings with employer</label>
      <div>
      <input type="textarea" placeholder="General input" {...register("general_input", {required: true, maxLength: 500})} />
      {errors.general_input && <p style={{'color': 'red'}}>Please check the general input</p>}
      </div>

      <label>Person who referred you</label>  
      <input type="text" placeholder="Referrer " {...register("referrer", {required: true, maxLength: 100})} /><br />
      {errors.referrer && <p class="error">Please check the field above</p>}
      <br />
      <input type="submit" class="submit-button"  />
    </form>
    );
  }


export default Form;
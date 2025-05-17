import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './DataEntry.module.css';
import StaffLayout from "../../components/Layouts/SalesMLayout";

const DataEntryForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    district: "",
    place: "",
    location_preferences: "",
    address: "",
    purpose: "",
    mode_of_property: "",
    demand_price: "",
    advance_price: "",
    area_in_sqft: "",
    area_in_cent: "",
    building_roof: "",
    number_of_floors: "",
    building_bhk: "",
    additional_note: "",
    location_link: "",
    lead_category: "",
    image_folder: "",
  });

  const accessToken = localStorage.getItem("access_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = { ...formData };

      await axios.post(
        `https://bussinesstoolcrm.up.railway.app/databank/datacollection/`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      alert("Data submitted successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMessage(error.response?.data?.error || "Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaffLayout>
      <div className={styles['form-container']}>
        <h2 className={styles.header}>
          Step {step}: {step === 1 ? "Personal Details" : "Property Details"}
        </h2>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name*" required className={styles['input-field']} />
              <input name="phonenumber" value={formData.phonenumber} onChange={handleChange} placeholder="Phone*" required className={styles['input-field']} />
              <input name="district" value={formData.district} onChange={handleChange} placeholder="District*" required className={styles['input-field']} />
              <input name="place" value={formData.place} onChange={handleChange} placeholder="Place*" required className={styles['input-field']} />
              <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className={styles['input-field']} />
              <input name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Purpose*" required className={styles['input-field']} />
              <input name="mode_of_property" value={formData.mode_of_property} onChange={handleChange} placeholder="Property Type*" required className={styles['input-field']} />
              <button type="button" onClick={() => setStep(2)} className={`${styles['button']} ${styles['button-next']}`}>Next</button>
            </>
          ) : (
            <>
              <select
                name="lead_category"
                value={formData.lead_category}
                onChange={handleChange}
                className={styles['select-field']}
                required
              >
                <option value="">Choose Lead Category</option>
                <option value="Marketing data">Marketing data</option>
                <option value="Social Media">Social Media</option>
                <option value="Main data">Main data</option>
                <option value="General Lead">General Lead</option>
              </select>

              <input name="demand_price" value={formData.demand_price} onChange={handleChange} placeholder="Demand Price" className={styles['input-field']} />
              <input name="advance_price" value={formData.advance_price} onChange={handleChange} placeholder="Advance Price" className={styles['input-field']} />
              <input name="area_in_sqft" value={formData.area_in_sqft} onChange={handleChange} placeholder="Area in Sqft" className={styles['input-field']} />
              <input name="area_in_cent" value={formData.area_in_cent} onChange={handleChange} placeholder="Area in Cent" className={styles['input-field']} />
              <input name="location_preferences" value={formData.location_preferences} onChange={handleChange} placeholder="Preferred Locations" className={styles['input-field']} />
              <input name="building_roof" value={formData.building_roof} onChange={handleChange} placeholder="Building Roof" className={styles['input-field']} />
              <input name="number_of_floors" value={formData.number_of_floors} onChange={handleChange} placeholder="Number of Floors" className={styles['input-field']} />
              <input name="building_bhk" value={formData.building_bhk} onChange={handleChange} placeholder="BHK" className={styles['input-field']} />
              <textarea name="additional_note" value={formData.additional_note} onChange={handleChange} placeholder="Additional Notes" className={styles['textarea-field']} />
              <input name="location_link" value={formData.location_link} onChange={handleChange} placeholder="Google Maps Link" className={styles['input-field']} />
              <input name="image_folder" value={formData.image_folder} onChange={handleChange} placeholder="Image Folder Name" className={styles['input-field']} />

              <button type="button" onClick={() => setStep(1)} className={`${styles['button']} ${styles['button-back']}`}>Back</button>
              <button type="submit" className={`${styles['button']} ${styles['button-submit']}`} disabled={loading}>
                {loading ? <>Submitting... <span className={styles.spinner}></span></> : "Submit"}
              </button>
            </>
          )}
        </form>
      </div>
    </StaffLayout>
  );
};

export default DataEntryForm;

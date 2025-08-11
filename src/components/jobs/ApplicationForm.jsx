import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  submitApplication,
  clearError,
  clearSuccess,
} from "../../store/slices/applicationsSlice";
import { validateEmail, validatePhone } from "../../utils/validation";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const ApplicationForm = ({ job, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    applicantName: user?.name || "",
    applicantEmail: user?.email || "",
    phone: "",
    coverLetter: "",
    experience: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
        onClose();
      }, 2000);
    }
  }, [success, dispatch, onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = "Name is required";
    }

    if (!formData.applicantEmail) {
      newErrors.applicantEmail = "Email is required";
    } else if (!validateEmail(formData.applicantEmail)) {
      newErrors.applicantEmail = "Please enter a valid email";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.length < 100) {
      newErrors.coverLetter = "Cover letter should be at least 100 characters";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const applicationData = {
      ...formData,
      resumeFileName: formData.resume?.name || null,
    };

    dispatch(submitApplication(applicationData));
  };

  const handleErrorDismiss = () => {
    dispatch(clearError());
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-[#115e59] text-lg font-medium mb-2">
          Application Submitted Successfully!
        </div>
        <p className="text-primary">
          Thank you for applying. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-primary">{job.title}</h4>
        <p className="text-primary">{job.company}</p>
      </div>

      <ErrorMessage
        message={error}
        onDismiss={handleErrorDismiss}
        className="mb-4"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            error={errors.applicantName}
            required
            placeholder="Your full name"
          />

          <Input
            label="Email Address"
            type="email"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleChange}
            error={errors.applicantEmail}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="(555) 123-4567"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-tertiary mb-1">
            Resume/CV
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            className="block w-full text-sm text-tertiary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-tertiary mb-1">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="6-8">6-8 years</option>
            <option value="9+">9+ years</option>
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-tertiary mb-1">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            name="coverLetter"
            rows="6"
            value={formData.coverLetter}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.coverLetter ? "border-red-500" : "border-tertiary"
            }`}
            placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
            required
          />
          <div className="flex justify-between mt-1">
            {errors.coverLetter && (
              <p className="text-sm text-red-600">{errors.coverLetter}</p>
            )}
            <p className="text-xs text-tertiary ml-auto">
              {formData.coverLetter.length}/500 characters
            </p>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            Submit Application
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

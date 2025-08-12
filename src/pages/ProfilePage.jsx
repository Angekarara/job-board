import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApplications } from "../store/slices/applicationsSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { applications, isLoading } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#e17654] text-white";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-accent rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>

       
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Applications ({applications.length})
          </h2>

          {isLoading ? (
            <LoadingSpinner />
          ) : applications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No applications yet. Start applying to jobs!
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-4 bg-secondary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {application.jobTitle}
                      </h3>
                      <p className="text-gray-600">{application.company}</p>
                      <p className="text-sm text-gray-500">
                        Applied:{" "}
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

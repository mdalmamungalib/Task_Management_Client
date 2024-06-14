import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { title, description, dueDate } = data;

      // Perform validation or additional processing if needed

      const newData = {
        title,
        description,
        dueDate,
      };

      console.log(newData);
      //   Simulate backend request
      const res = await axiosSecure.post("/task", newData);
      console.log("condition data", res);
      if (res?.data?.acknowledged === true) {
        reset();
        const dialog = document.getElementById("my_modal_3");
        if (dialog) {
          dialog.close();
        }
        console.log("condition data", newData);
        navigate("/dashboard/allTasks");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Add your task</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white text-left"
              >
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.title && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white text-left"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.description && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-white text-left"
              >
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", { required: "Due Date is required" })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddTask;
